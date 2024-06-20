import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const HobbyDialog = ({ open, handleClose, hobby, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (hobby) {
      setName(hobby.name);
      setDescription(hobby.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [hobby, open]);

  const handleSave = () => {
    const newHobby = hobby ? { ...hobby, name, description } : { name, description };
    onSave(newHobby);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{hobby ? 'Edit Hobby' : 'Create Hobby'}</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>{hobby ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HobbyDialog;
