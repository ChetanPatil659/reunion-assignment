import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteButtonWithDialog = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Handle opening the dialog
  const openDialog = () => setDialogOpen(true);

  // Handle closing the dialog
  const closeDialog = () => setDialogOpen(false);

  // Handle the deletion logic (example)
  const handleDelete = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant={"outline"}
        className="border-red-500 bg-red-100 text-red-600 hover:text-red-600"
        onClick={openDialog}
      >
        Delete Selected
      </Button>

      {/* Dialog for Deletion Confirmation */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the selected items? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButtonWithDialog;
