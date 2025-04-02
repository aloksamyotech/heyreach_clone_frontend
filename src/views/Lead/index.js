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
import { useState } from 'react';
import { PersonOutline } from '@mui/icons-material';
import ActionMenu from 'common/ActionMenu/ActionMenu';
import { useForm } from 'react-hook-form';
import './lead.css';
import { useNavigate } from 'react-router-dom';
import './lead.css';
import RenameModal from 'common/Modal/RenameModal';
import DeleteModal from 'common/Modal/DeleteModal';
import { filterLeads } from 'api/config';
// import { exportToExcel } from 'utils/helperfunction';
// ----------------------------------------------------------------------

const Lead = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    watch
  } = useForm();
  const rows = [
    { _id: 1, name: 'CEO of USA', date: 'Mar 5, 2025, 11:18:35 AM', status: '1 in campaign', leads: 2 },
    { _id: 2, name: 'CTO of Canada', date: 'Mar 5, 2025, 11:18:35 AM', status: '3 in campaign', leads: 5 },
    { _id: 3, name: 'Manager of UK', date: 'Mar 5, 2025, 11:18:35 AM', status: '2 in campaign', leads: 3 },
    { _id: 4, name: 'Director of India', date: 'Mar 5, 2025, 11:18:35 AM', status: '4 in campaign', leads: 7 },
    { _id: 5, name: 'CEO of Germany', date: 'Mar 5, 2025, 11:18:35 AM', status: '2 in campaign', leads: 6 },
    { _id: 6, name: 'CFO of France', date: 'Mar 5, 2025, 11:18:35 AM', status: '5 in campaign', leads: 9 },
    { _id: 7, name: 'VP of Italy', date: 'Mar 5, 2025, 11:18:35 AM', status: '1 in campaign', leads: 1 },
    { _id: 8, name: 'Head of Spain', date: 'Mar 5, 2025, 11:18:35 AM', status: '2 in campaign', leads: 3 },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
        <DeleteModal open={deleteModal} name="name" path={filterLeads} setDeleteModal={setDeleteModal} rowData={rowData} />
        <RenameModal open={openModal} title={"List"} name="name" path={filterLeads} setModal={setModal} rowData={rowData} />
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h2">Lead</Typography>
        </Stack>
        <Box width="100%" sx={{ background: 'white', borderRadius: '10px' }}>
          <Grid container>
            <Grid xs={10} p={1} className="d-flex justify-content-around p-2 align-item-center">
              <TextField
                variant="outlined"
                {...register('search')}
                placeholder="Search lists"
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
                    // marginTop: "-5px !important",
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
                <InputLabel id="demo-simple-select-label" sx={{
                  color: 'grey',
                  fontWeight: '500',
                  left: "30%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>Search List</InputLabel>
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
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Removes border
                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
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
                  <MenuItem>List Type:All</MenuItem>
                  <MenuItem>Lead List</MenuItem>
                  <MenuItem>Companies List</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ margin: '5px', minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label"
                  sx={{
                    color: 'grey',
                    fontWeight: '500',
                    left: "40%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >Search Campaigns</InputLabel>
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
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Removes border
                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
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
                  <MenuItem>All Campaigns</MenuItem>
                  <MenuItem>CEO Connection</MenuItem>
                  <MenuItem>CEO Connection</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={2} p={2}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-center'} spacing={2}>
                <Button variant="contained" m={1} startIcon={<AddIcon />}>
                  <Link to="/lead/add" style={{ textDecoration: 'none', color: 'white' }}>
                    Add Lead
                  </Link>
                </Button>
              </Stack>
            </Grid>

            {/* Table */}
            <Grid item xs={12}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8f9fa' }} className='table-head'>
                  <TableRow>
                    <TableCell sx={{ color: 'grey' }}>List Name</TableCell>
                    <TableCell sx={{ color: 'grey' }}>Status</TableCell>
                    <TableCell sx={{ color: 'grey' }}>Leads</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ border: '2px solid #e5e7eb' }}>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index} className='table-row'>
                      <TableCell>
                        <PersonOutline sx={{ fontSize: 20, color: '#6b7280', marginRight: '5px' }} />
                        {row.name}<br />
                        <small>{row.date}</small>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          sx={{ borderRadius: '10px', fontWeight: 'bold', backgroundColor: row.status.includes('Not') ? '#e5e7eb' : '#def7ec', color: row.status.includes('Not') ? '#6b7280' : '#31c48d' }}
                        />
                      </TableCell>
                      <TableCell>
                        <PersonOutline sx={{ fontSize: 16, color: '#6b7280', marginRight: '5px' }} />
                        {row.leads}
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
                          onView={() => navigate(`/lead/list/${row?._id}`, {
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

export default Lead;
