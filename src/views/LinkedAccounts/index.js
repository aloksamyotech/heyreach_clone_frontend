import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';
import { useEffect } from 'react';
import ConnectAccount from './ConnectAccount';
import { fetchData } from 'api';

const LinkedAccounts = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [linkedinData, setAccount] = useState([]);
  const toggleDrawer = (openDrawer) => {
    setOpenDrawer(openDrawer);
  };

  const getData = async () => {
    const response = await fetchData('linkedin/get_linkedIn_account');
    setAccount(response?.data);
  };

  const columns = [
    {
      field: 'email',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: () => {
        return <Button variant="contained">Update Detail</Button>;
      }
    }
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ConnectAccount open={openDrawer} toggleDrawer={toggleDrawer} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
          <Typography variant="h2">LinkedIn Accounts</Typography>
          <Stack direction="row" m={2} alignItems="center" justifyContent={'flex-end'} spacing={2}>
            {!linkedinData[0]?.isConnected ? (
              <Button variant="contained" startIcon={<LinkedInIcon />} onClick={() => toggleDrawer(true)}>
                Connect Account
              </Button>
            ) : (
              <Button variant="contained">Connected</Button>
            )}
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={linkedinData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row?._id}
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

export default LinkedAccounts;
