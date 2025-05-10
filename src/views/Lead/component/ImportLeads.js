import React from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Chip,
  Link,
  Container,
  Stack,
  IconButton,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import '../lead.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import nodata from '../../../assets/images/search.png';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { fetchData } from 'api';
import { apiRoutes } from 'api/config';
import { useState } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import { useRef } from 'react';

const LeadImporter = () => {
  const socket = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [leads, setLeads] = useState([]);
  const [list,setList] = useState([]);
  const [leadCount,setLeadCount] = useState(0);
  
  const fetchList = async()=>{    
    const response = await fetchData(`${apiRoutes.getListById}/${id}`);
      setList(response?.data);
  }

  useEffect(()=>{
    socket.current = io(process.env.REACT_APP_BACKEND_URL, {
      transports: ['websocket'],
    });

    socket.current.on("new_lead", (data) => {
      if (data.error) {
        setLeads(null);
      } else {
        setLeads(data?.data);
        setLeadCount(data?.data?.length);
      }
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  },[id]);

  useEffect(()=>{
    fetchList();
  },[]);
  return (
    <Container>
      <Stack direction="row" alignItems="center" mb={2} justifyContent={'flex-start'}>
        <IconButton onClick={() => { navigate('/lead/add/people')}}>
            <ArrowBackIos sx={{ color: 'grey', fontWeight: '400', fontSize: '17px',cursor:'pointer' }} />
        </IconButton>
        <Typography variant="h3"  sx={{ color:'black' }}>
          {list[0]?.name}
        </Typography>
      </Stack>
      <Box sx={{ maxWidth: '900px', mx: 'auto',height:'80vh',overflowY:'scroll' }}>
        <Grid container sx={{backgroundColor:'#f9f9f9',borderRadius:'12px',}}>
          <Grid item xs={8} sm={8} md={8} lg={8} p={2} sx={{borderRight:'1.5px solid lightgrey',borderBottom:'1.5px solid lightgrey'}}>
            <Box
              sx={{
                p: 3,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <LinkedInIcon color="primary" />
                <Typography fontWeight={500}>Import from LinkedIn Search Bar</Typography>
              </Box>
              <Button variant="contained" color="primary" endIcon={<CloseIcon />}>
                Stop importing
              </Button>
            </Box>
            {
            leads?.length === 0 ? (
              <LinearProgress
                variant="indeterminate"
                sx={{ height: 6, borderRadius: 2, mb: 4, mx: 2 }}
              />
            ) : (
              <LinearProgress
                variant="determinate"
                value={(leadCount / 100) * 100} // Replace 100 with expected max if needed
                sx={{
                  height: 6,
                  borderRadius: 2,
                  mb: 4,
                  mx: 2,
                  transition: 'all 0.5s ease-in-out',
                }}
              />
            )
          }
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} p={2} sx={{borderBottom:'1.5px solid lightgrey'}}>
            <Typography variant='h4' py={2}>Details</Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  Accounts:
                </Typography>
                <Chip label={list[0]?.LinkedinData[0]?.email} color="primary" size="small" sx={{ mt: 1 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  Search url:
                </Typography>
                <Link href={'/hello'} underline="hover" sx={{ mt: 1, display: 'block', color: '#f5c518' }}>
                  Go to link
                </Link>
              </Box>
              <Box>
                <Typography variant='body2' fontWeight={500}>
                  Lead Count :
                </Typography>
                <Chip label={leadCount} color="primary" size="small" sx={{ mt: 1 }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sm={12} lg={12} p={1}>
            <Box textAlign="center" mt={4}>
              {
                leads?.length === 0?
                (
                  <>
                  <img
                    src={nodata}
                    alt="no leads"
                    width={120}
                    style={{ marginBottom: '1rem', opacity: 0.5 }}
                  />
                  <Typography variant="h6" fontWeight={500}>
                    No Leads found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Once we fetch them, they will show up here.
                  </Typography>
                </>
                ):
                <TableContainer component={Paper} sx={{ maxWidth: "1050px", overflowX: "auto" }} className='table-container'>
                    <Table id="lead" sx={{ tableLayout: 'fixed', width: '100%' }}>
                        <TableHead sx={{ backgroundColor: '#f8f9fa' }} className="table-head">
                            <TableRow>
                                {[
                                    "S No.","Full Name", "Headline", "Location", "LinkedIn"
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
                            {leads?.map((row, index) => (
                                <TableRow key={index} className="table-row">
                                        <TableCell key={index}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell key={ index} className="table-cell" >
                                            <div style={{width:'100%',display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                <img src={row.image} style={{width:'50px',height:'50px',borderRadius:'50%',margin:'0 10px'}} alt='lead name'/>
                                                <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {row.name}
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
                                                {row.location}
                                            </div>
                                        </TableCell>
                                        <TableCell key={ index} className="table-cell" >
                                            <Button variant='outlined' className='custom-btn'>
                                                <a href={row?.profileUrl} target='_blank' rel="noreferrer" style={{textDecoration:'none',color:'grey'}}> Profile </a>
                                            </Button>
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>

  );
};

export default LeadImporter;
