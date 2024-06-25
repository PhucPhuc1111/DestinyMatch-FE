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
import HobbyDialog from './HobbyDialog';
import { fetchHobbies, deleteHobby, updateHobby, createHobby } from '../../APIclient';

const HobbyTable = () => {
  const [hobbies, setHobbies] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentHobby, setCurrentHobby] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalHobbies, setTotalHobbies] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchHobbies(search, page, rowsPerPage);
        setHobbies(data.hobbies);
        setTotalHobbies(data.count);
      } catch (error) {
        console.error('Error fetching hobbies:', error);
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
          style={{
            width: '300px',
            padding: '10px',
            outline: 'none',
            border: 'none',
            borderBottom: '2px solid #FFC085'
          }}
        />
        <Button onClick={handleCreate} variant="contained" style={{ background: '#FFC085' }}>
          Add Hobby
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
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '30%' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '55%' }}>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? order : 'asc'}
                    onClick={() => handleRequestSort('description')}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '15%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedHobbies.map((hobby) => (
                <TableRow key={hobby.id} sx={{ background: 'rgb(243,247,251)' }}>
                  <TableCell sx={{ width: '30%' }}>{hobby.name}</TableCell>
                  <TableCell sx={{ width: '55%' }}>{hobby.description}</TableCell>
                  <TableCell sx={{ width: '15%' }}>
                    <IconButton onClick={() => handleEdit(hobby)} style={{ color: '#FFC085' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(hobby.id)} style={{ color: 'orangered' }}>
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
        {rowsPerPage >= 1 && rowsPerPage <= 25 ? (
          <label>Rows Per Page:</label>
        ) : (
          <label style={{ color: 'red' }}>Value must be between 1 - 25</label>
        )}
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
        count={Math.ceil(totalHobbies / rowsPerPage)}
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

      <HobbyDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} hobby={currentHobby} onSave={handleSave} />
    </>
  );
};

export default HobbyTable;
