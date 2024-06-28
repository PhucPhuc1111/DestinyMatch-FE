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
  Pagination,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createPackage, fetchPackage, deletePackage, fetchPackages, updatePackage } from '../../../APIclient';
import PackageDialog from './PackageDIalog';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('code');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPackages, setTotalPackages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPackages(search, page, rowsPerPage);
      setPackages(data.data);
      setTotalPackages(data.count);
    } catch (error) {
      console.error('Error fetching package:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchData, search]);

  const handleDelete = async (id) => {
    try {
      const response = await deletePackage(id);
      if (response) {
        setPackages(packages.filter((p) => p.id !== id));
        setTotalPackages(totalPackages - 1);
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const packageData = await fetchPackage(id);
      setCurrentPackage(packageData);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching hobby:', error);
    }
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

  const handleSave = async (packageData) => {
    try {
      let savedPackage;
      if (packageData.id) {
        savedPackage = await updatePackage(packageData);
        setPackages(packages.map((p) => (p.id === packageData.id ? savedPackage : p)));
      } else {
        savedPackage = await createPackage(packageData);
        setPackages([...packages, savedPackage]);
        setTotalPackages(totalPackages + 1);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const sortedPackages =
    packages && Array.isArray(packages)
      ? packages.slice().sort((a, b) => {
          if (order === 'asc') {
            return a[orderBy].localeCompare(b[orderBy]);
          } else {
            return b[orderBy].localeCompare(a[orderBy]);
          }
        })
      : [];

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
          Add Package
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
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, padding: '8px', color: '#2e2e2e' }}>
                  <TableSortLabel
                    active={orderBy === 'code'}
                    direction={orderBy === 'code' ? order : 'asc'}
                    onClick={() => handleRequestSort('code')}
                  >
                    Code
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, padding: '8px', color: '#2e2e2e' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, padding: '8px', color: '#2e2e2e' }}>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? order : 'asc'}
                    onClick={() => handleRequestSort('description')}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, padding: '8px', color: '#2e2e2e' }}>
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={() => handleRequestSort('price')}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: '16px', fontWeight: 700, padding: '8px', color: '#2e2e2e' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPackages.map((packagedata) => (
                <TableRow key={packagedata.id} sx={{ background: 'rgb(246, 247, 251)' }}>
                  <TableCell>{packagedata.code}</TableCell>
                  <TableCell>{packagedata.name}</TableCell>
                  <TableCell>{packagedata.description}</TableCell>
                  <TableCell>{packagedata.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(packagedata.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(packagedata.id)}>
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
        count={Math.ceil(totalPackages / rowsPerPage)}
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
