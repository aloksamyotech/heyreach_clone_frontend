import { useState } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormLabel
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../ui-component/TableStyle';
// import AddLead from './AddLead.js';
import { useEffect } from 'react';
import { fetchData, postData } from 'api';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useForm } from 'react-hook-form';

// ----------------------------------------------------------------------

const Lead = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();
  const [isLoading, setLoader] = useState(false);
  const [leadData, setLeadData] = useState([]);
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
    reset();
  };

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
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="primary" size="small" onClick={() => handleViewProfile(params.row._id)}>
            View Profile
          </Button>
          <Button variant="contained" color="success" size="small" onClick={() => handleSendConnectionRequest(params.row._id)}>
            Connect
          </Button>
        </Stack>
      )
    }
  ];

  const getLead = async () => {
    const response = await fetchData('linkedin/getLeadData');
    setLeadData(response?.data);
  };

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await postData('linkedin/filterData', data);
      console.log('response : ', response);
      reset();
      if (response.status === 201) {
        toast.success('Lead Generated');
      } else {
        console.error('Failed to connect account');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something Went Wrong');
    } finally {
      setLoader(false);
    }
  };

  // API call to view profile
  const handleViewProfile = async (leadId) => {
    try {
      const response = await postData('linkedin/viewProfile', { leadId });
      if (response.status === 200) {
        toast.success('Profile viewed!');
      } else {
        toast.error('Failed to view profile.');
      }
    } catch (error) {
      console.error('Error viewing profile:', error);
      toast.error('Something went wrong.');
    }
  };

  // API call to send connection request
  const handleSendConnectionRequest = async (leadId) => {
    try {
      const response = await postData('linkedin/sendConnectionRequest', { leadId });
      if (response.status === 200) {
        toast.success('Connection request sent!');
      } else {
        toast.error('Failed to send connection request.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Something went wrong.');
    }
  };

  useEffect(() => {
    getLead();
    const interval = setInterval(() => {
      getLead();
    }, 30000);

    return () => clearInterval(interval);
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            zIndex: 9999
          }}
        >
          <CircularProgress />
          <Typography>Fetching Leads Data It Require 5-10 min</Typography>
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
      {/* <AddLead open={openAdd} handleClose={handleCloseAdd} /> */}
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Lead-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<LinkedInIcon />} onClick={handleOpen}>
              Generate Lead
            </Button>
          </Stack>
        </Stack>
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
