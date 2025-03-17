import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableHead,
  TableCell,
  Table,
  TableBody,
  Chip,
  TableRow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------

const Lead = () => {
  // const [isLoading, setLoader] = useState(false);

  const getLead = async () => {
    const response = await fetchData('linkedin/getListData');
    setLeadData(response?.data);
  };

  // const onSubmit = async (data) => {
  //   try {
  //     setLoader(true);
  //     const response = await postData('linkedin/filterData', data);
  //     reset();
  //     if (response.status === 201) {
  //       toast.success('Lead Generated');
  //     } else {
  //       console.error('Failed to connect account');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toast.error('Something Went Wrong');
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   getLead();
  //   const interval = setInterval(() => {
  //     getLead();
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h2">Lead</Typography>
        </Stack>
        <Box width="100%" sx={{ padding: '10px', borderRadius: '10px' }}>
          <Grid container>
            <Grid xs={10} className="d-flex justify-content-around p-2 align-item-center">
              <TextField
                variant="outlined"
                placeholder="Search lists"
                sx={{
                  margin: '5px',
                  borderRadius: '25px' // Rounded corners
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon /> {/* Light gray icon */}
                    </InputAdornment>
                  )
                }}
              />
              <FormControl sx={{ margin: '5px', minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Search List</InputLabel>
                <Select
                  sx={{
                    backgroundColor: '#f7f9fc',
                    borderRadius: '25px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      '& fieldset': { borderColor: '#e0e3eb' }, // Border color
                      '&:hover fieldset': { borderColor: '#cfd4db' }, // Hover effect
                      '&.Mui-focused fieldset': { borderColor: '#cfd4db' } // Focus border color
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#cfd4db' }} />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem>List Type:All</MenuItem>
                  <MenuItem>Lead List</MenuItem>
                  <MenuItem>Companies List</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ margin: '5px', minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Search Campaigns</InputLabel>
                <Select
                  sx={{
                    backgroundColor: '#f7f9fc',
                    borderRadius: '25px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      '& fieldset': { borderColor: '#e0e3eb' }, // Border color
                      '&:hover fieldset': { borderColor: '#cfd4db' }, // Hover effect
                      '&.Mui-focused fieldset': { borderColor: '#cfd4db' } // Focus border color
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#cfd4db' }} />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem>All Campaigns</MenuItem>
                  <MenuItem>CEO Connection</MenuItem>
                  <MenuItem>CEO Connection</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={2} sx={{ paddingTop: '10px' }}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-center'} spacing={2}>
                <Button variant="contained" startIcon={<AddIcon />}>
                  <Link to="/lead/add" style={{ textDecoration: 'none', color: 'white' }}>
                    Add Lead
                  </Link>
                </Button>
              </Stack>
            </Grid>
            <Grid xs={12} sx={{ padding: '20px 0' }}>
              <Table border={0} sx={{ background: 'white', borderRadius: '10px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight={'bold'}>List Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={'bold'}>Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={'bold'}>Leads</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>CEO of USA</TableCell>
                    <TableCell>
                      <Chip
                        label={'1 in campaign'}
                        sx={{ borderRadius: '10px', backgroundColor: '#def7ec', color: '#31c48d', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CEO of USA</TableCell>
                    <TableCell>
                      <Chip
                        label={'1 in campaign'}
                        sx={{ borderRadius: '10px', backgroundColor: '#def7ec', color: '#31c48d', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CEO of USA</TableCell>
                    <TableCell>
                      <Chip
                        label={'1 in campaign'}
                        sx={{ borderRadius: '10px', backgroundColor: '#def7ec', color: '#31c48d', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CEO of USA</TableCell>
                    <TableCell>
                      <Chip
                        label={'1 in campaign'}
                        sx={{ borderRadius: '10px', backgroundColor: '#def7ec', color: '#31c48d', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
        {/* <TableStyle>
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
        </TableStyle> */}
      </Container>
    </>
  );
};

export default Lead;
