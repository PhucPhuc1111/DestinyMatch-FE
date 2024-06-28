import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const PackageDialog = ({ open, handleClose, packageData, onSave }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  useEffect(() => {
    if (packageData) {
      setCode(packageData.code);
      setName(packageData.name);
      setDescription(packageData.description);
      setPrice(packageData.price);
    } else {
      setCode('');
      setName('');
      setDescription('');
      setPrice(0);
    }
  }, [packageData, open]);

  const handleSave = () => {
    const newpackage = packageData ? { ...packageData, code, name, description, price } : { code, name, description, price };
    onSave(newpackage);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{packageData ? 'Edit package' : 'Create package'}</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Code" type="text" fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
        <TextField margin="dense" label="Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField margin="dense" label="Price" type="text" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>{packageData ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageDialog;
