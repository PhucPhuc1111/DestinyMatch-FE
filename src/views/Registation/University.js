// universityTable.js

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
import { fetchUniversities, deleteUniversity, updateUniversity, createUniversity } from '../../APIclient';
import GeneralDialog from './Dialog';

const University = () => {
  const [universities, setUniversities] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUniversity, setcurrentUniversity] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [totalUniversities, settotalUniversities] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, search, universities, totalUniversities]);

  const fetchData = async () => {
    try {
      const data = await fetchUniversities(search, page, rowsPerPage);
      setUniversities(data.universities);
      settotalUniversities(data.count);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await deleteUniversity(id);
      if (success) {
        setUniversities(universities.filter((university) => university.id !== id));
        settotalUniversities(totalUniversities - 1);
      }
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  const handleEdit = (university) => {
    setcurrentUniversity(university);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setcurrentUniversity(null);
    setDialogOpen(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSave = async (university) => {
    try {
      if (university.id) {
        await updateUniversity(university);
        setUniversities(universities.map((h) => (h.id === university.id ? university : h)));
      } else {
        const createduniversity = await createUniversity(university);
        setUniversities([...universities, createduniversity]);
        settotalUniversities(totalUniversities + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving university:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sorteduniversities = universities.slice().sort((a, b) => {
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
          Add university
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
            {sorteduniversities.map((university) => (
              <TableRow key={university.id} sx={{ background: 'rgb(246,247,251)' }}>
                <TableCell>{university.name}</TableCell>
                <TableCell>{university.code}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(university)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(university.id)}>
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
        count={Math.ceil(totalUniversities / rowsPerPage)}
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

      <GeneralDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} object={currentUniversity} onSave={handleSave} />
    </>
  );
};

export default University;
