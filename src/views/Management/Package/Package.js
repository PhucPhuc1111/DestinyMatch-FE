import React, { useState, useEffect, useCallback } from 'react';
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
import { createPackage, deletePackage, fetchPackages, updatePackage } from '../../../APIclient';
import PackageDialog from './PackageDIalog';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [totalpackages, setTotalpackages] = useState(0);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchPackages(search, page, rowsPerPage);
      setPackages(data.data);
      setTotalpackages(data.count);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  }, [page, rowsPerPage, search]);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);
  
    return () => clearTimeout(delayDebounceFn);
  }, [fetchData, search]);

  const handleDelete = async (id) => {
    console.log("delete with id: ", id);
    try {
        const response = await deletePackage(id);
        
        if (response.status === 200) { // Kiểm tra mã trạng thái HTTP 200
            setPackages(packages.filter((packaged) => packaged.id !== id));
            setTotalpackages(totalpackages - 1);
            
        }
    } catch (error) {
        console.error('Error deleting package:', error);
    }
};


  const handleEdit = (packageData) => {
    setCurrentPackage(packageData);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setCurrentPackage(null);
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
        await updatePackage(hobby);
        setPackages(packages.map((h) => (h.id === hobby.id ? hobby : h)));
      } else {
        const createdHobby = await createPackage(hobby);
        setPackages([...packages, createdHobby]);
        setTotalpackages(totalpackages + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving hobby:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedpackages = packages && Array.isArray(packages) ? packages.slice().sort((a, b) => {
    if (order === 'asc') {
        return a[orderBy].localeCompare(b[orderBy]);
    } else {
        return b[orderBy].localeCompare(a[orderBy]);
    }
}) : [];


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: '5px', width: '300px' }}
        />
        <Button onClick={handleCreate} variant="contained" color="primary">
          Add Package
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: '5px 5px 0 0', marginTop: '10px', minHeight: '300px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#ccc', height: '25px' }}>
            <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>
                <TableSortLabel
                  active={orderBy === 'code'}
                  direction={orderBy === 'code' ? order : 'asc'}
                  onClick={() => handleRequestSort('code')}
                >
                  Code
                </TableSortLabel>
              </TableCell>
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

              <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleRequestSort('price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ fontSize: '19px', fontWeight: 700, padding: '8px', letterSpacing: '1px', color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedpackages.map((hobby) => (
              <TableRow key={hobby.id} sx={{ background: 'rgb(246,247,251)' }}>
                <TableCell>{hobby.code}</TableCell>
                <TableCell>{hobby.name}</TableCell>
                <TableCell>{hobby.description}</TableCell>
                <TableCell>{hobby.price}</TableCell>
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
        count={Math.ceil(totalpackages / rowsPerPage)}
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

      <PackageDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} packageData={currentPackage} onSave={handleSave} />
    </>
  );
};

export default Package;
