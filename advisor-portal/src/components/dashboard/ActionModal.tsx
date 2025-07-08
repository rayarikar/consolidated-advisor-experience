import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  actionType: 'add-note' | 'contact-client' | 'set-reminder' | null;
  item: any;
  onSubmit: (data: any) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  open,
  onClose,
  actionType,
  item,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    note: '',
    method: 'phone',
    date: '',
    task: ''
  });

  const handleSubmit = () => {
    onSubmit({
      actionType,
      item,
      data: formData
    });
    setFormData({ note: '', method: 'phone', date: '', task: '' });
    onClose();
  };

  const getTitle = () => {
    switch (actionType) {
      case 'add-note': return 'Add Note';
      case 'contact-client': return 'Contact Client';
      case 'set-reminder': return 'Set Reminder';
      default: return 'Action';
    }
  };

  const renderContent = () => {
    switch (actionType) {
      case 'add-note':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Note"
            placeholder="Enter your note about this case/policy..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            sx={{ mt: 2 }}
          />
        );

      case 'contact-client':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Contact Method</InputLabel>
              <Select
                value={formData.method}
                label="Contact Method"
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              >
                <MenuItem value="phone">Phone Call</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="text">Text Message</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              placeholder="What was discussed or what needs to be communicated?"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </Box>
        );

      case 'set-reminder':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="Reminder Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Task Description"
              placeholder="What needs to be done?"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {getTitle()}
        {item && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {item.type === 'case' ? 'Case' : 'Policy'}: {item.number} - {item.clientName}
          </Typography>
        )}
      </DialogTitle>
      
      <DialogContent>
        {renderContent()}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={
            (actionType === 'add-note' && !formData.note) ||
            (actionType === 'contact-client' && !formData.note) ||
            (actionType === 'set-reminder' && (!formData.date || !formData.task))
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};