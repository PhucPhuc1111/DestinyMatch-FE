import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Button,
  Pagination,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MemberDialog from './MemberDialog.js';
import { fetchMembers, fetchMember, deleteMember, updateMember, createMember } from '../../../APIclient';
import defaultAvatar from '../../../assets/images/default-avatar.png';

const MemberTable = () => {
  const [members, setMembers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullname');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalMembers, setTotalMembers] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMembers(search, page, rowsPerPage);
        setMembers(data.data);
        setTotalMembers(data.count);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    setPage(1);
  }, [search, rowsPerPage]);

  const handleDelete = async (id) => {
    try {
      const success = await deleteMember(id);
      if (success) {
        setMembers(members.filter((member) => member.id !== id));
        setTotalMembers(totalMembers - 1);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const member = await fetchMember(id);
      setCurrentMember(member);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const handleCreate = () => {
    setCurrentMember(null);
    setDialogOpen(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSave = async (member) => {
    try {
      if (member.id) {
        await updateMember(member);
        setMembers(members.map((m) => (m.id === member.id ? member : m)));
      } else {
        const createdMember = await createMember(member);
        setMembers([...members, createdMember]);
        setTotalMembers(totalMembers + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedMembers = members.slice().sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy].localeCompare(b[orderBy]);
    } else {
      return b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            outline: 'none',
            border: 'none',
            borderBottom: '2px solid #FFC085'
          }}
        />
        <Button onClick={handleCreate} variant="contained" style={{ background: '#FFC085' }}>
          Add Member
        </Button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
          <CircularProgress style={{ color: '#FFC085' }} />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '5px', marginTop: '10px', minHeight: '300px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ height: '25px' }}>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '10%' }}>Picture</TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '20%' }}>
                  <TableSortLabel
                    active={orderBy === 'fullname'}
                    direction={orderBy === 'fullname' ? order : 'asc'}
                    onClick={() => handleRequestSort('fullname')}
                  >
                    Full Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '25%' }}>
                  <TableSortLabel
                    active={orderBy === 'introduce'}
                    direction={orderBy === 'introduce' ? order : 'asc'}
                    onClick={() => handleRequestSort('introduce')}
                  >
                    Introduce
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '15%' }}>
                  <TableSortLabel
                    active={orderBy === 'dob'}
                    direction={orderBy === 'dob' ? order : 'asc'}
                    onClick={() => handleRequestSort('dob')}
                  >
                    Date of Birth
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '10%' }}>
                  <TableSortLabel
                    active={orderBy === 'gender'}
                    direction={orderBy === 'gender' ? order : 'asc'}
                    onClick={() => handleRequestSort('gender')}
                  >
                    Gender
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '15%' }}>
                  <TableSortLabel
                    active={orderBy === 'address'}
                    direction={orderBy === 'address' ? order : 'asc'}
                    onClick={() => handleRequestSort('address')}
                  >
                    Address
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '15%' }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '13px', fontWeight: 700, color: '#2e2e2e', width: '15%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMembers.map((member) => (
                <TableRow key={member.id} sx={{ background: 'rgb(243,247,251)' }}>
                  <TableCell sx={{ width: '10%' }}>
                    <img
                      src={member.pictures.length > 0 ? member.pictures[0]['url-path'] : defaultAvatar}
                      alt={member.fullname}
                      style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '20%' }}>
                    {member.fullname}
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '25%' }}>
                    {member.introduce}
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '15%' }}>
                    {member.dob}
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '10%' }}>
                    {member.gender ? 'Male' : 'Female'}
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '15%' }}>
                    {member.address}
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '15%' }}>
                    {member.status}
                  </TableCell>
                  <TableCell style={{ fontSize: '13px' }} sx={{ width: '15%' }}>
                    <IconButton aria-label="edit" onClick={() => handleEdit(member.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(member.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
        <label>Rows Per Page:</label>
        <input
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(e.target.value)}
          type="number"
          min={1}
          max={25}
          style={{ width: '50px' }}
        />
      </div>
      <Pagination
        count={Math.ceil(totalMembers / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'rgb(252, 112, 156)',
            color: 'white'
          }
        }}
      />

      <MemberDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} member={currentMember} onSave={handleSave} />
    </>
  );
};

export default MemberTable;
