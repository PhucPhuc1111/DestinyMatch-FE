import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const GeneralDialog = ({ open, handleClose, object, onSave }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (object) {
      setName(object.name);
      setCode(object.code);
    } else {
      setName('');
      setCode('');
    }
  }, [object, open]);

  const handleSave = () => {
    const newObject = object ? { ...object, name, code } : { name, code };
    onSave(newObject);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{object ? 'Edit' : 'Create'}</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField margin="dense" label="Code" type="text" fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>{object ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralDialog;
