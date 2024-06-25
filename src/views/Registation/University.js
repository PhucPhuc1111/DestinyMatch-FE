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
import { fetchUniversities, deleteUniversity, updateUniversity, createUniversity } from '../../APIclient';
import GeneralDialog from './Dialog';

const UniversityTable = () => {
  const [universities, setUniversities] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUniversities(search, page, rowsPerPage);
        setUniversities(data.data);
        setTotalUniversities(data.count);
      } catch (error) {
        console.error('Error fetching universities:', error);
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
      const success = await deleteUniversity(id);
      if (success) {
        setUniversities(universities.filter((university) => university.id !== id));
        setTotalUniversities(totalUniversities - 1);
      }
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  const handleEdit = (university) => {
    setCurrentUniversity(university);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setCurrentUniversity(null);
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
        setUniversities(universities.map((u) => (u.id === university.id ? university : u)));
      } else {
        const createdUniversity = await createUniversity(university);
        setUniversities([...universities, createdUniversity]);
        setTotalUniversities(totalUniversities + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving university:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedUniversities = universities.slice().sort((a, b) => {
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
          Add University
        </Button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
          <CircularProgress style={{ color: '#FFC085' }} />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '5px', marginTop: '10px', minHeight: '300px' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ height: '25px' }}>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '50%' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '30%' }}>
                  <TableSortLabel
                    active={orderBy === 'code'}
                    direction={orderBy === 'code' ? order : 'asc'}
                    onClick={() => handleRequestSort('code')}
                  >
                    Code
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '20%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUniversities.map((university) => (
                <TableRow key={university.id} sx={{ background: 'rgb(246,247,251)' }}>
                  <TableCell>{university.name}</TableCell>
                  <TableCell>{university.code}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(university)} style={{ color: '#FFC085' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(university.id)} style={{ color: 'orangered' }}>
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
        <label>Rows Per Page: </label>
        <input
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          type="number"
          min={1}
          max={25}
          style={{ width: '50px' }}
        />
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
            color: 'white'
          }
        }}
      />

      <GeneralDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} object={currentUniversity} onSave={handleSave} />
    </>
  );
};

export default UniversityTable;
