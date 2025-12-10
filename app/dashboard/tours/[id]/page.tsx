'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Plus,
  ArrowLeft,
  Save,
  Trash2,
  MoveUp,
  MoveDown,
  Loader2,
  GripVertical,
  Sparkles,
  Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { Tour, TourSteps } from '@/types/tours';
import { toast } from 'sonner';

export default function TourEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const tourId = params.id as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingStep, setSavingStep] = useState(false);
  const [showAddStepDialog, setShowAddStepDialog] = useState(false);
  const [editingStep, setEditingStep] = useState<TourSteps | null>(null);
  const [error, setError] = useState('');

  const [stepForm, setStepForm] = useState({
    title: '',
    content: '',
    target: '',
    position: 'bottom' as 'top' | 'bottom' | 'left' | 'right',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && tourId) {
      fetchTour();
    }
  }, [user, authLoading, tourId, router]);

  const fetchTour = async () => {
    // setLoading(true);
    try {
      const { data, error } = await supabase
        .from('Tours')
        .select('*')
        .eq('id', tourId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        router.push('/dashboard');
        return;
      }
      setTour(data);
    } catch (err) {
      console.error('Error fetching tour:', err);
    } finally {
      //   setLoading(false);
    }
  };

  const saveTourDetails = async () => {
    if (!tour) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('Tours')
        .update({
          name: tour.name,
          description: tour.description,
        })
        .eq('id', tourId)
        .eq('user_id', user?.id)
        .select();

      if (error) throw error;
      toast.success('Tour details saved successfully!');
      await fetchTour();
    } catch (err) {
      console.error('Error saving tour:', err);
      toast.error('Failed to save tour details');
    } finally {
      setSaving(false);
    }
  };

  const openAddStepDialog = () => {
    setEditingStep(null);
    setStepForm({
      title: '',
      content: '',
      target: '',
      position: 'bottom',
    });
    setShowAddStepDialog(true);
  };

  const openEditStepDialog = (step: TourSteps) => {
    setEditingStep(step);
    setStepForm({
      title: step.title,
      content: step.content,
      target: step.target,
      position: step.position,
    });
    setShowAddStepDialog(true);
  };

  const saveStep = async () => {
    setError('');

    if (!stepForm.title.trim() || !stepForm.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setSavingStep(true);

    try {
      const { data: tour, error: fetchError } = await supabase
        .from('Tours')
        .select('steps')
        .eq('id', tourId)
        .single();

      if (fetchError) throw fetchError;

      let updatedSteps = [...(tour?.steps || [])];

      if (editingStep) {
        updatedSteps = updatedSteps.map((step) =>
          step.id === editingStep.id
            ? {
                ...step,
                ...stepForm,
              }
            : step
        );
      } else {
        const newStep = {
          id: crypto.randomUUID(),
          ...stepForm,
          step_viewed: 0,
        };

        updatedSteps.push(newStep);
      }

      const { error: updateError } = await supabase
        .from('Tours')
        .update({
          steps: updatedSteps,
        })
        .eq('id', tourId);

      if (updateError) throw updateError;

      setShowAddStepDialog(false);
      await fetchTour();
      toast.success(editingStep ? 'Step updated!' : 'Step added!');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save step');
    } finally {
      setSavingStep(false);
    }
  };

  const deleteStep = async (stepId: string) => {
    try {
      const { data: tour } = await supabase
        .from('Tours')
        .select('steps')
        .eq('id', tourId)
        .single();

      const updatedSteps = (tour?.steps || []).filter(
        (step: TourSteps) => step.id !== stepId
      );

      const { error } = await supabase
        .from('Tours')
        .update({ steps: updatedSteps })
        .eq('id', tourId);

      if (error) throw error;

      await fetchTour();
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const moveStep = async (stepIndex: number, direction: 'up' | 'down') => {
    if (!tour?.steps || tour.steps.length <= 1) return;

    const lastIndex = tour.steps.length - 1;

    // boundary checks
    if (
      (direction === 'up' && stepIndex === 0) ||
      (direction === 'down' && stepIndex === lastIndex)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;

    const newSteps = [...tour.steps];
    [newSteps[stepIndex], newSteps[newIndex]] = [
      newSteps[newIndex],
      newSteps[stepIndex],
    ];

    const normalized = newSteps.map((s: TourSteps, i: number) => ({
      ...s,
      step_order: i,
    }));

    try {
      // optimistic UI update
      setTour({ ...tour, steps: normalized });
      const { error } = await supabase
        .from('Tours')
        .update({ steps: normalized })
        .eq('id', tourId);

      if (error) throw error;

      await fetchTour();
    } catch (err) {
      console.error('Error reordering steps:', err);
      await fetchTour();
    }
  };

  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20'>
        <Loader2 className='h-8 w-8 text-brand-teal animate-spin' />
      </div>
    );
  }

  if (!user || !tour) {
    return null;
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-20 left-1/3 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='container mx-auto px-4 py-8 max-w-5xl relative z-10'>
        <div className='mb-8'>
          <div className='mb-6'>
            <Link href={`/dashboard`}>
              <Button
                variant='ghost'
                size='sm'
                className='rounded-full border-2 border-brand-teal/20 text-slate-700 hover:border-brand-teal hover:text-brand-teal hover:bg-white bg-white/50 backdrop-blur-sm transition-all duration-300'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className='mt-6 text-center'>
            <Badge
              variant='outline'
              className='mb-4 text-sm border-brand-teal text-brand-teal bg-brand-teal/10 backdrop-blur-sm px-4 py-1.5 shadow-lg'
            >
              <Sparkles className='h-3 w-3 mr-2' />
              Tour Editor
            </Badge>
          </div>
        </div>

        <Card className='mb-8 border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300'>
          <CardHeader className='bg-linear-to-br from-brand-blush/10 via-brand-teal/10 to-brand-sky/10 border-b border-white/50'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-2xl flex items-center gap-2'>
                  <Target className='h-6 w-6 text-brand-teal' />
                  Tour Details
                </CardTitle>
                <CardDescription className='mt-1'>
                  Configure your tour settings and information
                </CardDescription>
              </div>
              <Badge
                variant={tour.is_active ? 'default' : 'secondary'}
                className={
                  tour.is_active
                    ? 'bg-linear-to-r from-brand-teal to-brand-sky text-white shadow-lg'
                    : ''
                }
              >
                {tour.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label
                htmlFor='tourName'
                className='text-base font-semibold text-slate-700'
              >
                Tour Name
              </Label>
              <Input
                id='tourName'
                value={tour.name}
                onChange={(e) => setTour({ ...tour, name: e.target.value })}
                className='mt-2 border-2 focus:border-brand-teal transition-colors'
              />
            </div>
            <div>
              <Label
                htmlFor='tourDescription'
                className='text-base font-semibold text-slate-700'
              >
                Description
              </Label>
              <Textarea
                id='tourDescription'
                value={tour.description}
                onChange={(e) =>
                  setTour({ ...tour, description: e.target.value })
                }
                rows={3}
                className='mt-2 border-2 focus:border-brand-teal transition-colors'
              />
            </div>
            <Button
              onClick={async () => {
                await saveTourDetails();
                router.push('/dashboard');
              }}
              disabled={saving}
              className='rounded-full bg-linear-to-r from-brand-teal to-brand-sky hover:from-brand-teal/90 hover:to-brand-sky/90 text-white shadow-lg shadow-brand-teal/20 transition-all hover:scale-105 active:scale-95'
              size='lg'
            >
              {saving ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Save Details
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className='border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-xl'>
          <CardHeader className='bg-linear-to-br from-brand-sky/10 via-brand-blush/10 to-brand-teal/10 border-b border-white/50'>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-2xl flex items-center gap-2'>
                  <GripVertical className='h-6 w-6 text-brand-sky' />
                  Tour Steps
                </CardTitle>
                <CardDescription className='mt-1'>
                  Add and manage the steps in your tour (minimum 5 required)
                </CardDescription>
              </div>
              <Button
                onClick={openAddStepDialog}
                className='bg-linear-to-r from-brand-blush to-brand-teal hover:from-brand-blush/90 hover:to-brand-teal/90 text-white shadow-lg'
              >
                <Plus className='mr-2 h-4 w-4' />
                Add Step
              </Button>
            </div>
          </CardHeader>
          <CardContent className='p-6'>
            {!tour.steps || tour.steps.length === 0 ? (
              <div className='text-center py-12 border-2 border-dashed border-brand-teal/30 rounded-2xl bg-linear-to-br from-brand-sky/5 to-brand-blush/5'>
                <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-brand-teal to-brand-sky flex items-center justify-center'>
                  <Plus className='h-10 w-10 text-white' />
                </div>
                <p className='text-slate-600 mb-6 text-lg'>
                  No steps added yet. Create at least 5 steps for your tour.
                </p>
                <Button
                  onClick={openAddStepDialog}
                  size='lg'
                  className='bg-linear-to-r from-brand-teal to-brand-sky text-white shadow-xl hover:from-brand-teal/90 hover:to-brand-sky/90'
                >
                  <Plus className='mr-2 h-5 w-5' />
                  Add First Step
                </Button>
              </div>
            ) : (
              <div className='space-y-4'>
                {tour.steps.map((step, index) => (
                  <Card
                    key={step.id}
                    className='border-2 border-white/50 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all'
                  >
                    <CardContent className='p-4'>
                      <div className='flex gap-4'>
                        <div className='flex flex-col justify-center gap-2'>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => moveStep(index, 'up')}
                            disabled={index === 0}
                            className='hover:bg-brand-teal/10'
                          >
                            <MoveUp className='h-4 w-4' />
                          </Button>
                          <div className='w-8 h-8 rounded-full bg-linear-to-br from-brand-teal to-brand-sky flex items-center justify-center text-white font-bold text-sm shadow-lg'>
                            {index + 1}
                          </div>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => moveStep(index, 'down')}
                            disabled={index === tour.steps.length - 1}
                            className='hover:bg-brand-teal/10'
                          >
                            <MoveDown className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between mb-3'>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2 mb-2'>
                                <Badge
                                  variant='outline'
                                  className='border-brand-teal text-brand-teal bg-brand-teal/5'
                                >
                                  Step {index + 1}
                                </Badge>
                                <h4 className='font-bold text-lg text-slate-900'>
                                  {step.title}
                                </h4>
                              </div>
                              <p className='text-sm text-slate-600 mb-3 leading-relaxed'>
                                {step.content}
                              </p>
                              {step.target && (
                                <code className='text-xs bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg inline-block'>
                                  {step.target}
                                </code>
                              )}
                            </div>
                            <div className='flex gap-2 ml-4'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => openEditStepDialog(step)}
                                className='hover:bg-brand-teal/10 hover:border-brand-teal'
                              >
                                Edit
                              </Button>
                              <Button
                                size='sm'
                                variant='destructive'
                                onClick={() => deleteStep(step.id)}
                                className='hover:bg-red-50 hover:border-red-500 hover:text-red-500'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {(!tour.steps || tour.steps.length < 5) && (
                  <Alert className='border-2 border-amber-200 bg-amber-50/50'>
                    <AlertDescription className='text-amber-800'>
                      ⚠️ You need at least 5 steps for a complete tour.
                      Currently: <strong>{tour.steps.length}/5</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddStepDialog} onOpenChange={setShowAddStepDialog}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-white/50 bg-white/95 backdrop-blur-sm'>
          <DialogHeader>
            <DialogTitle className='text-2xl flex items-center gap-2'>
              <Plus className='h-6 w-6 text-brand-teal' />
              {editingStep ? 'Edit Step' : 'Add New Step'}
            </DialogTitle>
            <DialogDescription>
              Configure the step content and target element
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant='destructive' className='border-2'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className='space-y-4'>
            <div>
              <Label htmlFor='stepTitle' className='text-base font-semibold'>
                Step Title
              </Label>
              <Input
                id='stepTitle'
                placeholder='e.g., Welcome to Dashboard'
                value={stepForm.title}
                onChange={(e) =>
                  setStepForm({ ...stepForm, title: e.target.value })
                }
                className='mt-2 border-2 focus:border-brand-teal'
              />
            </div>
            <div>
              <Label htmlFor='stepContent' className='text-base font-semibold'>
                Step Content
              </Label>
              <Textarea
                id='stepContent'
                placeholder='Describe what this step teaches the user'
                value={stepForm.content}
                onChange={(e) =>
                  setStepForm({ ...stepForm, content: e.target.value })
                }
                rows={4}
                className='mt-2 border-2 focus:border-brand-teal'
              />
            </div>
            <div>
              <Label
                htmlFor='targetSelector'
                className='text-base font-semibold'
              >
                Target Element (CSS Selector)
              </Label>
              <Input
                id='targetSelector'
                placeholder='e.g., #dashboard or .welcome-button'
                value={stepForm.target}
                onChange={(e) =>
                  setStepForm({ ...stepForm, target: e.target.value })
                }
                className='mt-2 border-2 focus:border-brand-teal'
              />
              <p className='text-xs text-slate-500 mt-1'>
                Leave empty for center-screen display
              </p>
            </div>
            <div>
              <Label htmlFor='position' className='text-base font-semibold'>
                Tooltip Position
              </Label>
              <Select
                value={stepForm.position}
                onValueChange={(value: 'top' | 'bottom' | 'left' | 'right') =>
                  setStepForm({ ...stepForm, position: value })
                }
              >
                <SelectTrigger className='mt-2 border-2'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='top'>Top</SelectItem>
                  <SelectItem value='bottom'>Bottom</SelectItem>
                  <SelectItem value='left'>Left</SelectItem>
                  <SelectItem value='right'>Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className='gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowAddStepDialog(false)}
              disabled={savingStep}
            >
              Cancel
            </Button>
            <Button
              onClick={saveStep}
              disabled={savingStep}
              className='bg-linear-to-r from-brand-teal to-brand-sky text-white shadow-lg hover:from-brand-teal/90 hover:to-brand-sky/90'
            >
              {savingStep ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Save Step
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
