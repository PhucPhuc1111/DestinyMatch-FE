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
import { fetchMajors, deleteMajor, updateMajor, createMajor } from '../../APIclient';
import GeneralDialog from './Dialog';

const MajorTable = () => {
  const [majors, setMajors] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentMajor, setCurrentMajor] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalMajors, setTotalMajors] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMajors(search, page, rowsPerPage);
        setMajors(data.majors);
        setTotalMajors(data.count);
      } catch (error) {
        console.error('Error fetching majors:', error);
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
      const success = await deleteMajor(id);
      if (success) {
        setMajors(majors.filter((major) => major.id !== id));
        setTotalMajors(totalMajors - 1);
      }
    } catch (error) {
      console.error('Error deleting major:', error);
    }
  };

  const handleEdit = (major) => {
    setCurrentMajor(major);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setCurrentMajor(null);
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
        setMajors(majors.map((m) => (m.id === major.id ? major : m)));
      } else {
        const createdMajor = await createMajor(major);
        setMajors([...majors, createdMajor]);
        setTotalMajors(totalMajors + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving major:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedMajors = majors.slice().sort((a, b) => {
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
          Add Major
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
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '40%' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, color: '#2e2e2e', width: '40%' }}>
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
              {sortedMajors.map((major) => (
                <TableRow key={major.id} sx={{ background: 'rgb(246,247,251)' }}>
                  <TableCell>{major.name}</TableCell>
                  <TableCell>{major.code}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(major)} style={{ color: '#FFC085' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(major.id)} style={{ color: 'orangered' }}>
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

export default MajorTable;
