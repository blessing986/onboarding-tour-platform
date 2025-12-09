import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

type Props = {
  showNewTourDialog: boolean;
  setShowNewTourDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showTrigger?: boolean;
};

const CreateTourModal = ({
  setShowNewTourDialog,
  showNewTourDialog,
  showTrigger = false,
}: Props) => {
  const [newTourName, setNewTourName] = useState('');
  const [newTourDescription, setNewTourDescription] = useState('');

  return (
    <Dialog open={showNewTourDialog} onOpenChange={setShowNewTourDialog}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button size='lg'>
            <Plus className='mr-2 h-5 w-5' />
            Create Tour
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tour</DialogTitle>
          <DialogDescription>
            Create a new onboarding tour for your website
          </DialogDescription>
        </DialogHeader>
        {/* {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Tour Name</Label>
            <Input
              id='name'
              placeholder='e.g., Welcome Tour'
              value={newTourName}
              onChange={(e) => setNewTourName(e.target.value)}
              //   disabled={creating}
            />
          </div>
          <div>
            <Label htmlFor='description'>Description (Optional)</Label>
            <Textarea
              id='description'
              placeholder='Brief description of this tour'
              value={newTourDescription}
              onChange={(e) => setNewTourDescription(e.target.value)}
              //   disabled={creating}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setShowNewTourDialog(false)}
            // disabled={creating}
          >
            Cancel
          </Button>
          <Button
          //   onClick={createTour} disabled={creating}
          >
            {/* {creating ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Creating...
              </>
            ) : ( */}
            Create Tour
            {/* )} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTourModal;
