// majorTable.js

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
import { fetchMajors, deleteMajor, updateMajor, createMajor } from '../../APIclient';
import GeneralDialog from './Dialog';

const Major = () => {
  const [majors, setMajors] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentMajor, setcurrentMajor] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [totalMajors, settotalMajors] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMajors(search, page, rowsPerPage);
        setMajors(data.majors);
        settotalMajors(data.count);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };
    fetchData();
  }, [page, rowsPerPage, search, majors, totalMajors]);

  const handleDelete = async (id) => {
    try {
      const success = await deleteMajor(id);
      if (success) {
        setMajors(majors.filter((major) => major.id !== id));
        settotalMajors(totalMajors - 1);
      }
    } catch (error) {
      console.error('Error deleting major:', error);
    }
  };

  const handleEdit = (major) => {
    setcurrentMajor(major);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setcurrentMajor(null);
    setDialogOpen(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSave = async (major) => {
    try {
      if (major.id) {
        await updateMajor(major);
        setMajors(majors.map((h) => (h.id === major.id ? major : h)));
      } else {
        const createdmajor = await createMajor(major);
        setMajors([...majors, createdmajor]);
        settotalMajors(totalMajors + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving major:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedmajors = majors.slice().sort((a, b) => {
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
          Add major
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
                  active={orderBy === 'code'}
                  direction={orderBy === 'code' ? order : 'asc'}
                  onClick={() => handleRequestSort('code')}
                >
                  Code
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedmajors.map((major) => (
              <TableRow key={major.id} sx={{ background: 'rgb(246,247,251)' }}>
                <TableCell>{major.name}</TableCell>
                <TableCell>{major.code}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(major)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(major.id)}>
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
        count={Math.ceil(totalMajors / rowsPerPage)}
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

      <GeneralDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} object={currentMajor} onSave={handleSave} />
    </>
  );
};

export default Major;
