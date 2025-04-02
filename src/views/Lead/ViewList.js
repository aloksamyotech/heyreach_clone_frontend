import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowBackIos, Edit } from '@mui/icons-material';
import ActionMenu from 'common/ActionMenu/ActionMenu';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import './lead.css';
import RenameModal from 'common/Modal/RenameModal';
import { useLocation,useNavigate } from 'react-router';
import { filterLeads } from 'api/config';
import DeleteModal from 'common/Modal/DeleteModal';
import ImportModal from 'common/Modal/ImportModal';
import ViewProfile from './ViewLeadProfile';
import { exportToExcel } from 'utils/helperfunction'; 

const ViewLeadList = () => {
    const navigate = useNavigate();
    const [openModal,setModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [rowData,setRowData] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const location = useLocation();
    const toggleDrawer = (openDrawer) => {
        setOpenDrawer(openDrawer);
    };
    const data = [
        {
          image:'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
          fullName: 'Capt Singh',
          headline: 'Founder and Chief Executive Officer',
          jobTitle: 'CEO',
          company: 'Absolute Training Solutions',
          location: 'Indore',
          email: 'capt.singh@example.com', 
          phone: '9876543210',
          industry: 'Training',
          linkedin: 'http://localhost:3000/lead/list/1/linkedin.com/in/captsingh',
          activity:[
            {title:'Connection Sent',sender:'vikas chouhan',date:'1 week ago'},
            {title:'Like Post',sender:'vikas chouhan',date:'26/03/2025'},
            {title:'Sent Message',sender:'vikas chouhan',date:'28/03/2025'},
            {title:'Like Post',sender:'vikas chouhan',date:'29/03/2025'},
          ]
        },
        {
          image:'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
          fullName: 'Ankit Mukati',
          headline: 'Founder & Director at Digital Marketing Agency',
          jobTitle: '/',
          company: '/',
          location: 'Indore',
          email: 'ankit.mukati@example.com',  
          phone: '9876543210',
          industry: 'Training',
          linkedin: 'http://localhost:3000/lead/list/1/linkedin.com/in/captsingh',
          activity:[
            {title:'Connection Sent',sender:'vikas chouhan',date:'1 week ago'},
            {title:'Like Post',sender:'vikas chouhan',date:'26/03/2025'},
            {title:'Sent Message',sender:'vikas chouhan',date:'28/03/2025'},
            {title:'Like Post',sender:'vikas chouhan',date:'29/03/2025'},
          ]
        },
        {
          image:'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
          fullName: 'Ronak Bhavsar',
          headline: 'Co-Founder & CEO at Prama',
          jobTitle: 'Co-Founder and CEO',
          company: 'Prama',
          location: 'Greater Phoenix Area',
          email: 'ronak.bhavsar@example.com',  
          phone: '9876543210',
          industry: 'Training',
          linkedin: 'http://localhost:3000/lead/list/1/linkedin.com/in/captsingh',
          activity:[
            {title:'Connection Sent',sender:'vikas chouhan',date:'1 week ago'},
            {title:'Like Post',sender:'vikas chouhan',date:'26/03/2025'},
            {title:'Sent Message',sender:'vikas chouhan',date:'28/03/2025'},
            {title:'Like Post',sender:'vikas chouhan',date:'29/03/2025'},
          ]
        },
        {
          image:'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
          fullName: 'Anil Patel',
          headline: 'Entrepreneur & Technologist',
          jobTitle: '/',
          company: '/',
          location: 'Ahmedabad',
          email: 'anil.patel@example.com',  
          phone: '9876543210',
          industry: 'Training',
          linkedin: 'http://localhost:3000/lead/list/1/linkedin.com/in/captsingh',
          activity:[
            {title:'Connection Sent',sender:'vikas chouhan',date:'1 week ago'},
            {title:'Like Post',sender:'vikas chouhan',date:'26/03/2025'},
            {title:'Sent Message',sender:'vikas chouhan',date:'28/03/2025'},
            {title:'Like Post',sender:'vikas chouhan',date:'29/03/2025'},
          ]
        },
        {
          image:'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
          fullName: 'Nihal Pawar',
          headline: "GSSoC'23 Contributor | Software Developer",
          jobTitle: '/',
          company: '/',
          location: 'Chhindwara',
          email: 'nihal.pawar@example.com',
          phone: '9876543210',
          industry: 'Training',
          linkedin: 'http://localhost:3000/lead/list/1/linkedin.com/in/captsingh',
          activity:[
            {title:'Connection Sent',sender:'vikas chouhan',date:'1 week ago'},
            {title:'Like Post',sender:'vikas chouhan',date:'26/03/2025'},
            {title:'Sent Message',sender:'vikas chouhan',date:'28/03/2025'},
            {title:'Like Post',sender:'vikas chouhan',date:'29/03/2025'},
          ]
        },
        {
          image:'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
          fullName: 'Ajay Thakur',
          headline: 'Head Of Recruitment & Business Development',
          jobTitle: '/',
          company: '/',
          location: 'Frisco, TX',
          email: 'ajay.thakur@example.com',
          phone: '9876543210',
          industry: 'Training',
          linkedin: 'http://localhost:3000/lead/list/1/linkedin.com/in/captsingh',
          activity:[
            {title:'Connection Sent',sender:'vikas chouhan',date:'1 week ago'},
            {title:'Like Post',sender:'vikas chouhan',date:'26/03/2025'},
            {title:'Sent Message',sender:'vikas chouhan',date:'28/03/2025'},
            {title:'Like Post',sender:'vikas chouhan',date:'29/03/2025'},
          ]
        },
      ];
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleExport = ()=>{
        const bodyData = data?.map((data, index) => {
            return {
                'S. No': index + 1,
                'Full Name': data?.fullName,
                'Headline': data.headline,
                'Job Title': data?.jobTitle,
                'Company': data?.company,
                'Address':data?.location,
                'Email':data?.email,
                'Phone':data?.phone,
                'Industry':data?.industry,
                'Profile URL':data?.linkedin
            };
        });     
        console.log("bodyData : ",bodyData);
        
        exportToExcel(bodyData, location.state.name);
    }

    return (
        <Container>
            <ViewProfile open={openDrawer} toggleDrawer={toggleDrawer} rowData={rowData}/>
            <RenameModal open={openModal} title={"List"} name="name" path={filterLeads} setModal={setModal} rowData={location?.state}/>
            <DeleteModal open={deleteModal} name="fullName" path={filterLeads} setDeleteModal={setDeleteModal} rowData={rowData} />
            <ImportModal open={importModal} name="file" path={filterLeads} setImportModal={setImportModal} rowData={rowData} />

            <Stack direction="row" alignItems="center" mb={2} justifyContent={'flex-start'}>
                <IconButton onClick={() => { navigate('/lead')}}>
                    <ArrowBackIos sx={{ color: 'grey', fontWeight: '400', fontSize: '17px',cursor:'pointer' }} />
                </IconButton>
                <Typography variant="h3" sx={{ paddingLeft: '25px' }}>
                    {location?.state?.name}
                </Typography>
                <IconButton mx={1} onClick={()=>{setModal(true)}}>
                    <Edit fontSize='10px' />
                </IconButton>
            </Stack>
            <Box width="100%" sx={{ background: 'white', borderRadius: '10px' }}>
                <Grid container>
                    <Grid item xs={12} p={2} className="d-flex justify-content-around align-item-center">
                        <TextField 
                            placeholder='Search Lead' 
                            variant="outlined" 
                            size="small" 
                            InputProps={{ 
                                startAdornment: <SearchIcon />, 
                                sx: {
                                    background: "none !important",
                                    border: "2px solid #e5e7eb !important",
                                    color: "grey !important",
                                    width: "170px",
                                    height:'45px',
                                    borderRadius: "8px",
                                    margin: "0 10px !important",
                                    marginTop: "-5px !important",
                                    fontWeight: 400,
                                },
                                notchedOutline: { border: "none" },
                            }}
                            sx={{
                                "& .css-7boqks-MuiFormLabel-root-MuiInputLabel-root":{
                                    color:'grey !important'
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { border: "none",background:'none',color:'grey !important' }, // Removes default border
                                    "&:hover fieldset": { border: "none",color:'grey !important' },
                                    "&.Mui-focused fieldset": { border: "none",color:'grey !important' },
                                },
                                "& .MuiOutlinedInput-input":{
                                    background:'none !important',
                                    color:'grey !important'
                                }
                            }} 
                        />
                        <Button variant="outlined" className="custom-btn" onClick={()=>handleExport()} size="small" startIcon={<FileDownloadOutlinedIcon/>}>
                            Export to CSV
                        </Button>
                        <Button variant="outlined" className="custom-btn" onClick={()=>setImportModal(true)} size="small" startIcon={<FileUploadIcon/>}>Import CSV</Button>
                        {/* <Button variant="outlined" className="custom-btn" size="small" startIcon={<Settings/>}>Edit Columns</Button> */}
                    </Grid>
                    <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ maxWidth: "1050px", overflowX: "auto" }} className='table-container'>
                        <Table id="lead" sx={{ tableLayout: 'fixed', width: '100%' }}>
                            <TableHead sx={{ backgroundColor: '#f8f9fa' }} className="table-head">
                                <TableRow>
                                    {[
                                        "Full Name", "Headline", "Job Title", "Company", "Location",
                                        "Email", "Phone", "Industry", "LinkedIn", "Action"
                                    ].map((header, index) => (
                                        <TableCell key={index} 
                                            className="table-cell" 
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody className='table-body'>
                                {paginatedData.map((row, index) => (
                                    <TableRow key={index} className="table-row">
                                            <TableCell key={ index} className="table-cell" >
                                                <div style={{width:'100%',display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    <img src={row.image} style={{width:'50px',height:'50px',borderRadius:'50%',margin:'0 10px'}} alt='lead name'/>
                                                    <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {row.fullName}
                                                    </div>
                                                </div>    
                                            </TableCell>
                                            <TableCell key={ index} className="table-cell" >
                                                <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {row.headline}
                                                </div>
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {row.jobTitle}
                                                </div>
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {row.company}
                                                </div>
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {row.location}
                                                </div>
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                {row?.email}
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                {row?.phone}
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                {row?.industry}
                                           </TableCell>
                                           <TableCell key={ index} className="table-cell" >
                                                <Button variant='outlined' className='custom-btn'>
                                                   <a href={row?.linkedin} style={{textDecoration:'none',color:'grey'}}> Profile </a>
                                                </Button>
                                           </TableCell>
                                           <TableCell >
                                             <ActionMenu 
                                                canDelete={true}
                                                canExport={true}
                                                canView={true}
                                                viewTitle="View Profile"
                                                deleteTitle="Delete Profile"
                                                onView={() => {setRowData(row);toggleDrawer(true);}}
                                                onDelete={() => {
                                                   setRowData(row);
                                                   setDeleteModal(true);
                                                }}
                                               onExport={() => console.log("Export Clicked")}
                                             />
                                           </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container p={2}>
                            <Grid item xs={6} display="flex" justifyContent="flex-start">
                                <Typography color="grey">
                                Showing <span style={{ fontWeight: 'bold', color: 'grey' }}>{currentPage}-{totalPages}</span> of <span style={{ fontWeight: 'bold', color: 'grey' }}>4</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} display="flex" justifyContent="flex-end">
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
    );
};

export default ViewLeadList;