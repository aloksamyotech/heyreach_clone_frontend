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
  TableRow,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MessageOutlined, PersonOutline } from '@mui/icons-material';
import ActionMenu from 'common/ActionMenu/ActionMenu';
import { useForm } from 'react-hook-form';
import './campaign.css';
import { useNavigate } from 'react-router-dom';
import RenameModal from 'common/Modal/RenameModal';
import DeleteModal from 'common/Modal/DeleteModal';
import CreateModal from 'common/Modal/CreateModal';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
// import { exportToExcel } from 'utils/helperfunction';
// ----------------------------------------------------------------------

const CampaignList = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    watch
  } = useForm();
  const rows = [
    { _id: 1, status: 'Completed', name:"Campaign 1", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Vikas Chouhan', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 2, status: 'Ongoing', name:"Campaign 2", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Dipesh Dabi', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 3, status: 'Failed', name:"Campaign 3", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Vikas Chouhan', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 4, status: 'Ongoing', name:"Campaign 4", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Vedant Chellani', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 5, status: 'Ongoing', name:"Campaign 5", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Dipesh Dabi', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 6, status: 'Paused', name:"Campaign 6", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Vikas Chouhan', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 7, status: 'Cancelled', name:"Campaign 8", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Vedant Chellani', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
    { _id: 8, status: 'Ongoing', name:"Campaign 9", date: 'Mar 5, 2025, 11:18:35 AM', senders:'Vikas Chouhan', performance: { connected_acceptance:'10', message_reply:'5'}, progress: { not_in_campaign:'10', in_campaign:'15', complete_campaign:'5'} },
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
        <CreateModal open={create} setModal={setCreate} path={'filterLeads'} name={'name'} />
        <DeleteModal open={deleteModal} name="name" path={'filterLeads'} setDeleteModal={setDeleteModal} rowData={rowData} />
        <RenameModal open={openModal} title={"Campaign"} name="name" path={'filterLeads'} setModal={setModal} rowData={rowData} />
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h2">Campaigns</Typography>
        </Stack>
        <Box width="100%" sx={{ background: 'white', borderRadius: '10px' }}>
          <Grid container>
            <Grid xs={9} p={1} className="d-flex justify-content-around p-2 align-item-center">
              <TextField
                variant="outlined"
                {...register('search')}
                placeholder="Search By title or description"
                InputProps={{
                  startAdornment: <SearchIcon />,
                  sx: {
                    background: "none !important",
                    border: "2px solid #e5e7eb !important",
                    color: "grey !important",
                    width: "170px",
                    height: '45px',
                    borderRadius: "8px",
                    margin: "10px 10px !important",
                    fontWeight: 400,
                  },
                  notchedOutline: { border: "none" },
                }}
                sx={{
                  "& .css-7boqks-MuiFormLabel-root-MuiInputLabel-root": {
                    color: 'grey !important'
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none", background: 'none', color: 'grey !important' }, // Removes default border
                    "&:hover fieldset": { border: "none", color: 'grey !important' },
                    "&.Mui-focused fieldset": { border: "none", color: 'grey !important' },
                  },
                  "& .MuiOutlinedInput-input": {
                    background: 'none !important',
                    color: 'grey !important'
                  }
                }}
              />
              <FormControl sx={{ margin: '5px', minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label" className='inputLabel'>Status</InputLabel>
                <Select
                  {...register('type')}
                  sx={{
                    background: "none !important",
                    border: "2px solid #e5e7eb !important",
                    color: "grey !important",
                    width: "200px",
                    height: '45px',
                    borderRadius: "8px",
                    margin: "5px 10px !important",
                    fontWeight: 400,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none",color:'grey' }, // Removes border
                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none",color:'grey' },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none",color:'grey' },
                    "& .MuiSelect-select": {
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      color: "grey !important",
                      background: 'none'
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#cfd4db' }} />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="starting">Starting</MenuItem>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="paused">Paused</MenuItem>
                  <MenuItem value="finished">Finished</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ margin: '5px', minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label" className='inputLabel'
                  sx={{
                    left: "33% !important",
                  }}
                >Select Senders</InputLabel>
                <Select
                  {...register('campaign')}
                  sx={{
                    background: "none !important",
                    border: "2px solid #e5e7eb !important",
                    color: "grey !important",
                    width: "200px",
                    height: '45px',
                    borderRadius: "8px",
                    margin: "5px 10px !important",
                    fontWeight: 400,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none",color:'grey' }, // Removes border
                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none",color:'grey' },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none",color:'grey' },
                    "& .MuiSelect-select": {
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      color: "grey !important",
                      background: 'none'
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#cfd4db' }} />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value="vikas_chouhan">Vikas Chouhan</MenuItem>
                  <MenuItem value="dipesh_dabi">Dipesh Dabi</MenuItem>
                  <MenuItem value="vedant_chellani">Vedant Chellani</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={3} py={2.5} px={1}>
              <Stack direction="row" alignItems="center" justifyContent={'center'} spacing={1}>
                <Button onClick={()=>{setCreate(true)}} variant="contained" sx={{minWidth:'150px !important',maxWidth:'250px'}}  m={1} startIcon={<AddIcon />}>
                    Start New Campaign
                </Button>
              </Stack>
            </Grid>

            {/* Table */}
            <Grid item xs={12}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8f9fa' }} className='table-head'>
                  <TableRow>
                    <TableCell sx={{ color: 'grey' }}>Status</TableCell>
                    <TableCell sx={{ color: 'grey' }}>Name</TableCell>
                    <TableCell sx={{ color: 'grey' }}>Performance</TableCell>
                    <TableCell sx={{ color: 'grey' }}>Progress</TableCell>
                    <TableCell sx={{ color: 'grey' }}>Senders</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ border: '2px solid #e5e7eb' }}>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index} className='table-row'>
                      <TableCell>
                        {
                            console.log("row.status : ",row.status)                         
                        }
                        <Typography 
                            color={
                                row.status === 'Draft' || row.status === 'Paused' ? 'warning.main' :
                                row.status === 'Completed' ? 'success.main' :
                                row.status === 'Ongoing' ? 'secondary.main' : 
                                'error.main'
                            }
                        >
                            {row.status}
                        </Typography>

                      </TableCell>  
                      <TableCell>
                        <PersonOutline sx={{ fontSize: 20, color: '#6b7280', marginRight: '5px' }} />
                        {row.name}<br />
                        <small>{row.date}</small>
                      </TableCell>
                      <TableCell>
                        <div className='d-flex w-100 justify-content-between align-items-center'> 
                            <Tooltip title={'Connection Acceptance rate'}>
                               <PersonAddAlt1OutlinedIcon color='grey' fontSize='15px' />
                               {row.performance.connected_acceptance} %
                            </Tooltip>
                            <Tooltip title={'Message reply rate'}>
                               <MessageOutlined color='grey' fontSize='15px' />
                               {row.performance.message_reply} %
                            </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PersonOutline sx={{ fontSize: 16, color: '#6b7280', marginRight: '5px' }} />
                        {row.senders}
                      </TableCell>
                      <TableCell>
                        <PersonOutline sx={{ fontSize: 16, color: '#6b7280', marginRight: '5px' }} />
                        {row.senders}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'end' }}>
                        <ActionMenu
                          canDelete={true}
                          canRename={true}
                          canExport={true}
                          canView={true}
                          viewTitle="View List"
                          renameTitle="Rename List"
                          deleteTitle="Delete List"
                          onView={() => navigate(`/campaigns/viewcampaign/${row?._id}`, {
                            state: { ...row }
                          })}
                          onRename={() => { setModal(true); setRowData(row) }}
                          onDelete={() => {
                            setDeleteModal(true);
                            setRowData(row);
                          }}
                          onExport={() => console.log("Export clicked")}
                        />
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

export default CampaignList;
