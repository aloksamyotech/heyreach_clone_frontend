import { Button, Container, Typography, Box, Card, Chip, TableHead, TableCell, Table, TableBody, TableRow, Alert, FormControl, InputAdornment, TextField, Select, MenuItem, InputLabel, Grid } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link,Message,Mail, Add, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import ConnectAccount from './ConnectAccount';
import { Tooltip } from '@mui/material';
import './linkedAccount.css';
import { Search,CompareArrows } from '@mui/icons-material';
import ActionMenu from 'common/ActionMenu/ActionMenu';
import SetLimitDrawer from 'common/Drawer/SetLimitDrawer';
import { useLinkedinCustomHook } from './customHook';

const LinkedAccounts = () => {
  const {
    getPaginatedData,
    totalCount,
    linkedinAccount,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    openDrawer,
    setOpenDrawer,
    openLimitDrawer,
    setLimitDrawer,
    rowData,
    setRowData
  } = useLinkedinCustomHook();
  

  const toggleDrawer = (openDrawer) => {
    setOpenDrawer(openDrawer);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    getPaginatedData();
  }, [currentPage,pageSize]);

  return (
    <>  
      <SetLimitDrawer open={openLimitDrawer} toggleDrawer={setLimitDrawer} rowData={rowData}/>
      <ConnectAccount open={openDrawer} toggleDrawer={toggleDrawer} />
      <Container>
        <Typography variant="h3" my={2}>LinkedIn Accounts</Typography>
        {/* <Alert severity="info" variant='outlined' sx={{color:'#1c64f2'}}> The LinkedIn accounts are called senders when put in a campaign. Connect multiple LinkedIn sending accounts on one campaign to increase your daily sending volume.</Alert> */}
        <TableStyle >
          <Box width="100%" my={3}>
            <Card style={{ height: 'auto', paddingTop: '15px' }}>
              <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid xs={6} my={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <TextField
                    variant="outlined"
                    placeholder="Search lists"
                    InputProps={{ 
                      startAdornment: <Search />, 
                      sx: {
                          background: "none !important",
                          border: "2px solid #e5e7eb !important",
                          height:'40px',
                          color: "grey !important",
                          width: "200px",
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
                  <FormControl sx={{ margin: '5px', minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label" sx={{
                      color:'grey',
                      fontWeight:'500',
                      left: "30%",
                      top: "35%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>Search List</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      renderValue={(selected) => (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Search style={{ color: "grey" }} />
                          {selected || "Search List"}
                        </span>
                      )}
                      sx={{
                        background: "none !important",
                        border: "2px solid #e5e7eb !important",
                        color: "grey !important",
                        width: "200px",
                        height:'40px',
                        borderRadius: "8px",
                        margin: "0 10px !important",
                        marginTop: "-8px !important",
                        fontWeight: 400,
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Removes border
                        "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiSelect-select": {
                          padding: "10px 12px",
                          display: "flex",
                          alignItems: "center",
                          color: "grey !important",
                          background:'none'
                        },
                      }}
                    >
                      <MenuItem>List Type:All</MenuItem>
                      <MenuItem>Lead List</MenuItem>
                      <MenuItem>Companies List</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} my={1} px={1} display={'flex'} justifyContent={'flex-end'} alignItems={'center'} >
                  <Button variant="outlined" sx={{marginTop:'-5px',marginInline:'20px'}} startIcon={<Add />} onClick={() => alert('Seat Purchased')}>
                    Purchase seats
                  </Button>
                  <Button variant="contained" sx={{marginTop:'-5px'}} startIcon={<LinkedInIcon />} onClick={() => toggleDrawer(true)}>
                    Connect Account
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <Table>
                    <TableHead className='table-head'>
                      <TableCell className='table-cell'>Linked Account</TableCell>
                      <TableCell className='table-cell'>Status</TableCell>
                      <TableCell className='table-cell'>Sending Limits</TableCell>
                      <TableCell className='table-cell'></TableCell>
                      <TableCell className='table-cell'></TableCell>
                    </TableHead>
                    <TableBody sx={{border:'2px solid #e5e7eb'}}>
                      {
                        linkedinAccount?.map((data)=>{
                          return(
                            <TableRow key={data?._id}>
                              <TableCell className='table-cell'>
                                {data?.email}
                              </TableCell>
                              <TableCell className='table-cell'>
                                <Tooltip sx={{width:'200px'}} title={data?.isConnected ? 'Account Connected' : 'The LinkedIn account is not authenticated. Either the session expired or additional action is required.'}> 
                                    <Chip 
                                      variant='outlined'
                                      label={data?.isConnected ? 'Connected': 'Not Connected'} 
                                      color={data?.isConnected ? 'success':'error'} 
                                      sx={{color:data?.isConnected ? '#00e676b3':'#f98080',cursor:'pointer',width:'120px'}}
                                    />
                                </Tooltip>
                              </TableCell>
                              <TableCell className='table-cell'>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                  <Tooltip sx={{width:'200px'}} title={"Your daily limit is set to 25 connection requests per day"}>
                                    <div className='count-div'>
                                      <Link sx={{transform:'rotate(135deg)'}} className='count-icon'/>
                                      25/Day 
                                    </div>
                                  </Tooltip>
                                  <Tooltip sx={{width:'200px'}} title={"Your daily limit is set to 40 send messsage per day"}>
                                    <div className='count-div'>
                                      <Message className='count-icon'/>
                                      40/Day  
                                    </div>
                                  </Tooltip>
                                  <Tooltip sx={{width:'200px'}} title={"Your daily limit is set to 40 send email per day"}>
                                    <div className='count-div'>
                                      <Mail className='count-icon'/>
                                      40/Day
                                    </div>  
                                  </Tooltip>
                                </div>
                              </TableCell>
                              <TableCell className='table-cell'>
                                {
                                  !data?.isConnected ?
                                  <Button variant="outlined" className='reconnect-btn' startIcon={<CompareArrows className='count-icon'/>}>Re-connect</Button>
                                  :<Button variant="outlined" className='reconnect-btn' onClick={()=>{setRowData(data);setLimitDrawer(true);}} startIcon={<Settings className='count-icon'/>}>Configure Limit</Button>
                                }
                              </TableCell>
                              <TableCell className='table-cell'>
                                  <ActionMenu  canDisconnect={true} canReConnect={!data?.isConnected}/>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </Grid>
                  <Grid item xs={12}>
                      <Grid container p={2}>
                          <Grid item xs={6} display="flex" justifyContent="flex-start">
                            <Typography color="grey">
                              Showing <span style={{ fontWeight: 'bold', color: 'grey' }}>{currentPage}-{totalPages}</span> of <span style={{ fontWeight: 'bold', color: 'grey' }}>{totalPages}</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} display="flex" justifyContent="space-between" alignItems={'center'}>
                            <Grid display="flex" justifyContent="center" alignItems={'center'}>
                              <Typography color="grey" sx={{ mr: 1 }}>
                                Rows per page:
                              </Typography>
                              <Select
                                value={pageSize}
                                onChange={(e) => {
                                  setPageSize(e.target.value);
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
                            <div style={{ background: 'rgba(233, 233, 233, 0.8)', border: 'none', borderRadius: '20px', display: 'flex', justifyContent: 'flex-end' }}>
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
              </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default LinkedAccounts;
