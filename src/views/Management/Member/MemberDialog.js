import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';

const MemberDialog = ({ open, handleClose, member, onSave }) => {
  const [formValues, setFormValues] = useState({
    fullname: '',
    introduce: '',
    dob: '',
    gender: '',
    address: '',
    status: '',
    surplus: '',
    accountId: '',
    universityId: '',
    majorId: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setFormValues({
        fullname: member.fullname || '',
        introduce: member.introduce || '',
        dob: member.dob || '',
        gender: member.gender || '',
        address: member.address || '',
        status: member.status || '',
        surplus: member.surplus || '',
        accountId: member.accountId || '',
        universityId: member.universityId || '',
        majorId: member.majorId || ''
      });
    } else {
      setFormValues({
        fullname: '',
        introduce: '',
        dob: '',
        gender: '',
        address: '',
        status: '',
        surplus: '',
        accountId: '',
        universityId: '',
        majorId: ''
      });
    }
  }, [member]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(formValues);
      handleClose();
    } catch (error) {
      console.error('Error saving member:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{member ? 'Edit Member' : 'Add Member'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="fullname"
          label="Full Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.fullname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="introduce"
          label="Introduce"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.introduce}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="dob"
          label="Date of Birth"
          type="date"
          fullWidth
          variant="outlined"
          value={formValues.dob}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          name="gender"
          label="Gender"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.gender}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.status}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="surplus"
          label="Surplus"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.surplus}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="accountId"
          label="Account ID"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.accountId}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="universityId"
          label="University ID"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.universityId}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="majorId"
          label="Major ID"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.majorId}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDialog;
