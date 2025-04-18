import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  TableHead,
  TableCell,
  Table,
  TableBody,
  TableRow,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AccessTime, Settings } from '@mui/icons-material';
import ActionMenu from 'common/ActionMenu/ActionMenu';
import { useForm } from 'react-hook-form';
import './../campaign.css';
import { useNavigate } from 'react-router-dom';
import { filterLeads } from 'api/config';
// import { exportToExcel } from 'utils/helperfunction';
// ----------------------------------------------------------------------

const LinkedInAccount = ({register}) => {
  const navigate = useNavigate();
  const rows = [
    { _id: 1, email:"dabidipesh7898@gmail.com", campaigncount:1, type:'Free Account' },
    { _id: 2, email:"vikaschouhan@samyotech.com", campaigncount:1, type:'Free Account' },
    { _id: 3, email:"vedantchellani@gmail.com", campaigncount:1, type:'Free Account' },
    { _id: 4, email:"alok@samyotech.com", campaigncount:1, type:'Free Account' },
    { _id: 5, email:"dipesh@samyotech.com", campaigncount:1, type:'Free Account' },
    { _id: 6, email:"vikassinghchouhan@gmail.com", campaigncount:1, type:'Free Account'},
    { _id: 7, email:"amitsharma@gmail.com", campaigncount:1, type:'Free Account' },
    { _id: 8, email:"vedant@samyotech.com", campaigncount:1, type:'Free Account' },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [create, setCreate] = useState(false);
  const [rowData, setRowData] = useState(null);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // const handleExport = ()=>{
  //   const bodyData = rows?.data?.map((data, index) => {
  //     return {
  //       'S. No': index + 1,
  //       'Title': data?.name,
  //       'Service Name': data.service_name,
  //       'Devotee Name':
  //         data?.raw_data?.persons?.length > 0
  //           ? `${data?.raw_data?.persons[0]?.first_name || '--'} ${data?.raw_data?.persons[0]?.last_name || '--'}`
  //           : '--',
  //       Gotram:
  //         data?.raw_data?.persons?.length > 0
  //           ? `${data?.raw_data?.persons[0]?.nakshatram || 'Shubh Nakshatram'} ${data?.raw_data?.persons[0]?.rashi || 'Shubh Rashi'}`
  //           : '--'
  //     };
  //   });
  //   exportToExcel(bodyData, 'PriestReport');
  // }

  // Filter Data Based on Search
  // const filteredData = rows.filter(row => 
  //   row.name.toLowerCase().includes(search.toLowerCase())
  // );

  // Paginate Data
  const paginatedData = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  // Handle Pagination
  // const handlePrev = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  // const getLead = async () => {
  //   const response = await fetchData('linkedin/getListData');
  //   setLeadData(response?.data);
  // };

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
          <Typography variant="h4">Select LinkedIn accounts that you want to use in this campaign:</Typography>
        </Stack>
        <Box width="100%" sx={{ background: 'white', borderRadius: '10px' }}>
          <Grid container>
            {/* Table */}
            <Grid item xs={12}>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(226, 232, 240, 1) !important' }} className='table-head'>
                  <TableRow>
                    <TableCell sx={{ color: 'rgba(51, 65, 85, 1) !important' }}>Name</TableCell>
                    <TableCell sx={{ color: 'rgba(51, 65, 85, 1) !important' }}>LinkedIn Subscriptions</TableCell>
                    <TableCell sx={{ color: 'rgba(51, 65, 85, 1) !important' }}>Activity</TableCell>
                    <TableCell sx={{ color: 'rgba(51, 65, 85, 1) !important' }}>Configure</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ border: '2px solid #e5e7eb' }}>
                  {paginatedData.map((row, index) => (
                    <TableRow key={row?._id} className='table-row'>
                      <TableCell>
                        <TextField type='checkbox' {...register('linkedinId')}
                          sx={{
                              paddingInline :'5px',
                              "& .MuiOutlinedInput-root": {
                                  "& fieldset": { border: "none !important", background: "none !important" },
                                  "&:hover fieldset": { border: "none !important" },
                                  "&.Mui-focused fieldset": { border: "none !important"},
                              },
                          }}
                        />
                        {row.email}
                        <br/>
                        <span>up to 40 connections/day</span>

                      </TableCell>  
                      <TableCell>
                        {row.type}
                      </TableCell>
                      <TableCell>
                        In {row.campaigncount} Campaign
                      </TableCell>
                      <TableCell>
                        <div className='d-flex justify-content-between align-item-center'>
                           <IconButton>
                             <Settings/>
                           </IconButton>
                           <IconButton>
                             <AccessTime/>
                           </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12} >
              <Grid container p={2}>
                <Grid item xs={6} md={6} lg={6} display={'flex'} justifyContent={'flex-start'}>
                  <Typography color={'grey'}>Showing <span style={{ fontWeight: 'bold', color: 'grey' }} >{currentPage}-{totalPages}</span> of <span style={{ fontWeight: 'bold', color: 'grey' }}>4</span></Typography>
                </Grid>
                <Grid item xs={6} md={6} lg={6} display={'flex'} justifyContent={'flex-end'}>
                  <div style={{ background: 'rgba(233, 233, 233, 0.8)', border: 'none', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" className="paginate-btn prev-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </Button>
                    <Button variant="outlined" className="paginate-btn next-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} sx={{ marginLeft: 1 }}>
                      Next
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LinkedInAccount;
