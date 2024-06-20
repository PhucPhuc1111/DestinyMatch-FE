// HobbyTable.js

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
  Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HobbyDialog from './HobbyDialog';
import { fetchHobbies, deleteHobby, updateHobby, createHobby } from '../../APIclient';

const HobbyTable = () => {
  const [hobbies, setHobbies] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentHobby, setCurrentHobby] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [totalHobbies, setTotalHobbies] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, search, hobbies, totalHobbies]);

  const fetchData = async () => {
    try {
      const data = await fetchHobbies(search, page, rowsPerPage);
      setHobbies(data.hobbies);
      setTotalHobbies(data.count);
    } catch (error) {
      console.error('Error fetching hobbies:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await deleteHobby(id);
      if (success) {
        setHobbies(hobbies.filter((hobby) => hobby.id !== id));
        setTotalHobbies(totalHobbies - 1);
      }
    } catch (error) {
      console.error('Error deleting hobby:', error);
    }
  };

  const handleEdit = (hobby) => {
    setCurrentHobby(hobby);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setCurrentHobby(null);
    setDialogOpen(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSave = async (hobby) => {
    try {
      if (hobby.id) {
        await updateHobby(hobby);
        setHobbies(hobbies.map((h) => (h.id === hobby.id ? hobby : h)));
      } else {
        const createdHobby = await createHobby(hobby);
        setHobbies([...hobbies, createdHobby]);
        setTotalHobbies(totalHobbies + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving hobby:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedHobbies = hobbies.slice().sort((a, b) => {
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
          style={{ borderRadius: '5px', width: '300px', padding: '10px' }}
        />
        <Button onClick={handleCreate} variant="contained" color="primary">
          Add Hobby
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: '5px 5px 0 0', marginTop: '10px', minHeight: '300px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#ccc', height: '25px' }}>
              <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={orderBy === 'description' ? order : 'asc'}
                  onClick={() => handleRequestSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedHobbies.map((hobby) => (
              <TableRow key={hobby.id} sx={{ background: 'rgb(246,247,251)' }}>
                <TableCell>{hobby.name}</TableCell>
                <TableCell>{hobby.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(hobby)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(hobby.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
        <label>Rows Per Page: </label>
        <input
          value={rowsPerPage}
          onChange={(e) => setRowPerPage(e.target.value)}
          type="number"
          min={1}
          max={25}
          style={{ width: '50px' }}
        ></input>
      </div>
      <Pagination
        count={Math.ceil(totalHobbies / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'rgb(252, 112, 156)',
            color: 'white' // Đổi màu chữ sang trắng nếu cần thiết
          }
        }}
      />

      <HobbyDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} hobby={currentHobby} onSave={handleSave} />
    </>
  );
};

export default HobbyTable;
