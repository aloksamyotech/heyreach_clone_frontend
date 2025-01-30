/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddLead.js';
import { useEffect } from 'react';
import { fetchData } from 'api';

// ----------------------------------------------------------------------

const Lead = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [leadData, setLeadData] = useState([]);
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'profile',
      headerName: 'Profile',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return <a href={params?.row?.profile}> {params?.row?.profile} </a>;
      }
    },
    {
      field: 'skill',
      headerName: 'Skills',
      flex: 1
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1
    }
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   flex: 1,
    //   renderCell: (params) => {
    //     return <Button variant="contained">Update Detail</Button>;
    //   }
    // }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const getData = async () => {
    const response = await fetchData('linkedin/getLeadData');
    console.log('response : ', response);

    setLeadData(response?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <AddLead open={openAdd} handleClose={handleCloseAdd} /> */}
      <Container>
        {/* <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Lead-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Lead
            </Button>
          </Stack>
        </Stack> */}
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={leadData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Lead;
