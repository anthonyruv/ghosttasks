import React, {useState} from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';

interface EditingModalProps {
    todo: taskProps; // Assuming taskProps is defined elsewhere
    children?: React.ReactNode
}

interface taskProps {
    id: string,
    title: string,
    description: string,
    tag: string,
    created_at: Date,
    
}

const EditingModal: React.FC<EditingModalProps> = (todo, children) => {
    return (
        <Dialog>
            Enter
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
        </Dialog>
    );
}

export default EditingModal;