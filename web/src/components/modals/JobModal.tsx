import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name?: string;
    description?: string;
    id?: string;
  };
}

const JobModal = ({ isOpen, onClose, data }: JobModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg max-w-[95vw] max-h-[95vh] w-[500px] flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-xl font-semibold">Job Details</h2>
              <Button onClick={onClose} variant="ghost">✖</Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto [&_label]:text-black">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Job Name</Label>
                  <Input 
                    id="name" 
                    value={data.name || ''}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={data.description || ''}
                    readOnly
                    className="bg-gray-100 min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="px-3 py-2 bg-amber-100 text-amber-800 rounded-md font-medium">
                    Pending
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Actions</Label>
                  <div className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">Upload Files</Button>
                    <Button className="bg-green-600 hover:bg-green-700">Mark Complete</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="pt-4 mt-4 border-t flex justify-end">
              <Button onClick={onClose} className="bg-neutral-900">
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal; 