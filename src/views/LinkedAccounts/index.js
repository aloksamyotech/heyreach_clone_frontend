import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormLabel
} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';
import { useEffect } from 'react';
import ConnectAccount from './ConnectAccount';
import { fetchData, postData } from 'api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const LinkedAccounts = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();
  const [isLoading, setLoader] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [modal, setModal] = React.useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
    reset();
  };
  const [linkedinData, setAccount] = useState([]);
  const toggleDrawer = (openDrawer) => {
    setOpenDrawer(openDrawer);
  };

  const getData = async () => {
    const response = await fetchData('linkedin/get_linkedIn_account');
    setAccount(response?.data);
  };

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await postData('linkedin/filterData', data);
      console.log('response : ', response);
      reset();
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Failed to connect account');
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Error:', error);
      toast.error('Something Went Wrong');
    }
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
      renderCell: (params) => {
        return <Button variant="contained">Update Detail</Button>;
      }
    }
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Dialog open={modal} onClose={handleClose} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        {/* <DialogTitle id="alert-dialog-title">{'Enter Filter URL from LinkedIn'}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormLabel>Enter Filter URL</FormLabel>
                  <TextField
                    {...register('url')}
                    type="text"
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: '8px' }}
                    error={!!errors.url}
                    helperText={errors.url?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={watch('url') ? false : true}
                    sx={{
                      height: '50px',
                      borderRadius: '8px',
                      backgroundColor: '#0A66C2',
                      '&:hover': {
                        backgroundColor: '#004182'
                      }
                    }}
                    startIcon={<LinkedInIcon />}
                  >
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
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
              <Button variant="contained" onClick={handleOpen}>
                Generate Lead
              </Button>
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
