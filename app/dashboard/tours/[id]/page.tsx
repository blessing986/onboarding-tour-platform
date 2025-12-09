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
    target_selector: '',
    position: 'bottom' as 'top' | 'bottom' | 'left' | 'right',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
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
      target_selector: '',
      position: 'bottom',
    });
    setShowAddStepDialog(true);
  };

  const openEditStepDialog = (step: TourSteps) => {
    setEditingStep(step);
    setStepForm({
      title: step.title,
      content: step.content,
      target_selector: step.target,
      position: step.position,
    });
    setShowAddStepDialog(true);
  };

  //   const saveStep = async () => {
  //     setError('');

  //     if (!stepForm.title.trim() || !stepForm.content.trim()) {
  //       setError('Title and content are required');
  //       return;
  //     }

  //     setSaving(true);

  //     try {
  //       if (editingStep) {
  //         const { error } = await supabase
  //           .from('Tours')
  //           .update({
  //             steps: [],
  //           })
  //           .eq('id', editingStep.id);

  //         if (error) throw error;
  //       } else {
  //         const nextOrder = steps.length;
  //         const { error } = await supabase.from('tour_steps').insert({
  //           tour_id: tourId,
  //           step_order: nextOrder,
  //           ...stepForm,
  //         });

  //         if (error) throw error;
  //       }

  //       setShowAddStepDialog(false);
  //       fetchSteps();
  //     } catch (err: Error | unknown) {
  //       setError(err instanceof Error ? err.message : 'Failed to save step');
  //     } finally {
  //       setSaving(false);
  //     }
  //   };

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
          steps_viewed: 0,
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save step');
    } finally {
      setSavingStep(false);
    }
  };

  //   const deleteStep = async (stepId: string) => {
  //     if (!confirm('Are you sure you want to delete this step?')) return;

  //     try {
  //       const { error } = await supabase
  //         .from('tour_steps')
  //         .delete()
  //         .eq('id', stepId);

  //       if (error) throw error;
  //       fetchSteps();
  //     } catch (err) {
  //       console.error('Error deleting step:', err);
  //     }
  //   };

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

  //   const moveStep = async (stepIndex: number, direction: 'up' | 'down') => {
  //     if (
  //       (direction === 'up' && stepIndex === 0) ||
  //       (direction === 'down' && stepIndex === steps.length - 1)
  //     ) {
  //       return;
  //     }

  //     const newIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
  //     const newSteps = [...steps];
  //     [newSteps[stepIndex], newSteps[newIndex]] = [
  //       newSteps[newIndex],
  //       newSteps[stepIndex],
  //     ];

  //     try {
  //       const updates = newSteps.map((step, index) => ({
  //         id: step.id,
  //         step_order: index,
  //       }));

  //       for (const update of updates) {
  //         const { error } = await supabase
  //           .from('tour_steps')
  //           .update({ step_order: update.step_order })
  //           .eq('id', update.id);

  //         if (error) throw error;
  //       }

  //       await fetchTour();
  //     } catch (err) {
  //       console.error('Error reordering steps:', err);
  //     }
  //   };

  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!user || !tour) {
    return null;
  }

  return (
    <div className='min-h-screen bg-muted/30'>
      <div className='container mx-auto px-4 py-8 max-w-5xl'>
        <div className='mb-6'>
          <Link href='/dashboard'>
            <Button variant='ghost' size='sm'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Tour Details</CardTitle>
            <CardDescription>
              Configure your tour settings and information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='tourName'>Tour Name</Label>
              <Input
                id='tourName'
                value={tour.name}
                onChange={(e) => setTour({ ...tour, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor='tourDescription'>Description</Label>
              <Textarea
                id='tourDescription'
                value={tour.description}
                onChange={(e) =>
                  setTour({ ...tour, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className='flex gap-2'>
              <Button onClick={saveTourDetails} disabled={saving}>
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
              <Badge variant={tour.is_active ? 'default' : 'secondary'}>
                {tour.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle>Tour Steps</CardTitle>
                <CardDescription>
                  Add and manage the steps in your tour (minimum 5 required)
                </CardDescription>
              </div>
              <Button onClick={openAddStepDialog}>
                <Plus className='mr-2 h-4 w-4' />
                Add Step
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!tour.steps || tour.steps.length === 0 ? (
              <div className='text-center py-12 border-2 border-dashed rounded-lg'>
                <p className='text-muted-foreground mb-4'>
                  No steps added yet. Create at least 5 steps for your tour.
                </p>
                <Button onClick={openAddStepDialog}>
                  <Plus className='mr-2 h-4 w-4' />
                  Add First Step
                </Button>
              </div>
            ) : (
              <div className='space-y-4'>
                {tour.steps &&
                  tour.steps.map((step, index) => (
                    <Card key={step.id}>
                      <CardContent className='p-4'>
                        <div className='flex gap-4'>
                          <div className='flex flex-col justify-center gap-2'>
                            <Button
                              size='sm'
                              variant='ghost'
                              // onClick={() => moveStep(index, 'up')}
                              disabled={index === 0}
                            >
                              <MoveUp className='h-4 w-4' />
                            </Button>
                            <GripVertical className='h-4 w-4 text-muted-foreground mx-auto' />
                            <Button
                              size='sm'
                              variant='ghost'
                              // onClick={() => moveStep(index, 'down')}
                              // disabled={index === steps.length - 1}
                            >
                              <MoveDown className='h-4 w-4' />
                            </Button>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between mb-2'>
                              <div className='flex-1'>
                                <div className='flex items-center gap-2 mb-1'>
                                  <Badge variant='outline'>
                                    Step {index + 1}
                                  </Badge>
                                  <h4 className='font-semibold'>
                                    {step.title}
                                  </h4>
                                </div>
                                <p className='text-sm text-muted-foreground mb-2'>
                                  {step.content}
                                </p>
                                {step.target && (
                                  <code className='text-xs bg-muted px-2 py-1 rounded'>
                                    {step.target}
                                  </code>
                                )}
                              </div>
                              <div className='flex gap-2'>
                                <Button
                                  size='sm'
                                  variant='outline'
                                  onClick={() => openEditStepDialog(step)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size='sm'
                                  variant='destructive'
                                  onClick={() => deleteStep(step.id)}
                                >
                                  <Trash2 className='h-4 w-4 text-white' />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {!tour.steps ||
                  (tour.steps.length < 5 && (
                    <Alert>
                      <AlertDescription>
                        You need at least 5 steps for a complete tour.
                        Currently: {tour.steps.length}/5
                      </AlertDescription>
                    </Alert>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddStepDialog} onOpenChange={setShowAddStepDialog}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {editingStep ? 'Edit Step' : 'Add New Step'}
            </DialogTitle>
            <DialogDescription>
              Configure the step content and target element
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className='space-y-4'>
            <div>
              <Label htmlFor='stepTitle'>Step Title</Label>
              <Input
                id='stepTitle'
                placeholder='e.g., Welcome to Dashboard'
                value={stepForm.title}
                onChange={(e) =>
                  setStepForm({ ...stepForm, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor='stepContent'>Step Content</Label>
              <Textarea
                id='stepContent'
                placeholder='Describe what this step teaches the user'
                value={stepForm.content}
                onChange={(e) =>
                  setStepForm({ ...stepForm, content: e.target.value })
                }
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor='targetSelector'>
                Target Element (CSS Selector)
              </Label>
              <Input
                id='targetSelector'
                placeholder='e.g., #dashboard or .welcome-button'
                value={stepForm.target_selector}
                onChange={(e) =>
                  setStepForm({ ...stepForm, target_selector: e.target.value })
                }
              />
              <p className='text-xs text-muted-foreground mt-1'>
                Leave empty for center-screen display
              </p>
            </div>
            <div>
              <Label htmlFor='position'>Tooltip Position</Label>
              <Select
                value={stepForm.position}
                onValueChange={(value: 'top' | 'bottom' | 'left' | 'right') =>
                  setStepForm({ ...stepForm, position: value })
                }
              >
                <SelectTrigger>
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
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowAddStepDialog(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={saveStep} disabled={saving}>
              {savingStep ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save Step'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
