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
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
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
import { useCustomLeadHook } from './customHook';
import moment from 'moment';
import { useEffect } from 'react';
import { apiRoutes } from 'api/config';
// import { exportToExcel } from 'utils/helperfunction';
// ----------------------------------------------------------------------

const Lead = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    watch
  } = useForm();
  const {
    fetchList,
    list,
    setList,
    setLimit,
    limit,
    page,
    setPage,
    openModal,
    setModal,
    deleteModal,
    setDeleteModal,
    listCount,
    setListCount
  } = useCustomLeadHook(watch);

  const [rowData, setRowData] = useState(null);
  const totalPages = Math.ceil(list.length /limit);

  useEffect(()=>{
     fetchList();
  },[page,limit]);

  useEffect(() => {
    const interval = setTimeout(() => {
      fetchList();
    }, 500);

    return () => clearTimeout(interval);
  }, [watch('search'),watch('type')]);

  return (
    <>
      <Container>
        <DeleteModal open={deleteModal} name="name" path={'filterLeads'} setDeleteModal={setDeleteModal} rowData={rowData} />
        <RenameModal open={openModal} title={"List"} name="name" path={apiRoutes?.updateList} setModal={setModal} rowData={rowData} />
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h2">List</Typography>
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
                  color: 'grey !important',
                  fontWeight: 500,
                }}>
                  List Type
                </InputLabel>
                <Select
                  {...register('type')}
                  labelId="demo-simple-select-label"
                  label="List Type"
                  sx={{
                    background: "none",
                    border: "2px solid #e5e7eb",
                    color: "grey",
                    width: "200px",
                    height: '45px',
                    borderRadius: "8px",
                    margin: "5px 10px",
                    fontWeight: 400,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiSelect-select": {
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      color: "grey",
                      background: 'none'
                    },
                  }}
                >
                  <MenuItem value="">List Type:All</MenuItem>
                  <MenuItem value="people">Lead List</MenuItem>
                  <MenuItem value="company">Companies List</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid xs={2} p={2}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-center'} spacing={2}>
                <Button variant="contained" m={1} startIcon={<AddIcon />}>
                  <Link to="/lead/importType" style={{ textDecoration: 'none', color: 'white' }}>
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
                  {list.map((row, index) => (
                    <TableRow key={index} className='table-row'>
                      <TableCell>
                        {
                          row?.type !== 'company'?
                          <PersonOutline sx={{ fontSize: 20, color: '#6b7280', marginRight: '5px' }} />
                          :<DomainOutlinedIcon sx={{ fontSize: 20, color: '#6b7280', marginRight: '5px' }} />
                        }
                        {row.name}<br />
                        <small>{moment(row.date).format('MMMM DD YYYY, hh:mm A')}</small>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={'In 1 Campaign'}
                          sx={{ borderRadius: '10px', fontWeight: 'bold', backgroundColor: '#def7ec' , color: '#31c48d' }}
                        />
                      </TableCell>
                      <TableCell>
                        <PersonOutline sx={{ fontSize: 16, color: '#6b7280', marginRight: '5px' }} />
                        {row.leadCount}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'end' }}>
                        <ActionMenu
                          canDelete={true}
                          canRename={true}
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
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12} >
              <Grid container p={2}>
                <Grid item xs={6} md={6} lg={6} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                  <Typography color={'grey'}>Showing <span style={{ fontWeight: 'bold', color: 'grey' }} >{page}-{totalPages}</span> of <span style={{ fontWeight: 'bold', color: 'grey' }}>{totalPages}</span></Typography>
                </Grid>
                <Grid item xs={6} md={6} lg={6} display={'flex'} justifyContent={'flex-end'}>
                  <Grid display="flex" justifyContent="center" alignItems={'center'} px={1}>
                      <Typography color="grey" sx={{ mr: 1 }}>
                        Rows per page:
                      </Typography>
                      <Select
                        value={limit}
                        onChange={(e) => {
                          setLimit(e.target.value);
                        }}
                        size="small"
                      >
                        {[10, 25, 50].map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                  </Grid>
                  <div style={{ background: 'rgba(233, 233, 233, 0.8)', border: 'none', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" className="paginate-btn prev-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                      Previous
                    </Button>
                    <Button variant="outlined" className="paginate-btn next-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)} sx={{ marginLeft: 1 }}>
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
