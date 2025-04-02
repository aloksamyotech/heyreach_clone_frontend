import React, { useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  SwipeableDrawer,
  TextField,
  Typography,
  Button,
  FormLabel,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { Add, Close,LinkedIn,Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { postData } from 'api';
import { toast } from 'react-toastify';

const ViewProfile = (props) => {
  const { open, toggleDrawer,rowData } = props;
  const [isMore,setIsMore] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await postData('linkedin/connect-account', data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        toggleDrawer(false);
      } else {
        toast.error(response?.data?.message)
        toggleDrawer(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '43%',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px'
        }
      }}
    >
      <Box sx={{ padding: '10px' }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h3" mx={2}  sx={{ fontWeight: '600' }}>
          Lead View
        </Typography>
        <IconButton mx={2} onClick={()=>toggleDrawer(false)}> 
           <Close />
        </IconButton>
      </Box>
      <Divider sx={{
            borderBottomWidth:'2px !important',
      }} />
      <Box py={4} px={2}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
           <Grid display={'flex'} justifyContent={'space-around'} alignItems={'start'}>
              <img src={rowData?.image} style={{width:'70px',height:'70px',borderRadius:'50%',margin:'0 10px'}} alt='profileimage' />
              <Typography variant='h4' my={1}>{rowData?.fullName}</Typography>
           </Grid>
           <Grid display={'flex'} justifyContent={'center'} alignItems={'start'}>
              <IconButton>
                <LinkedIn sx={{color:'#3b82f680'}} />
              </IconButton>
           </Grid>
        </Box> 

        <Box sx={{border:'2px solid #e5e7eb',borderRadius:'8px'}} my={2} py={1} px={2}>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'start'}>
            <Typography variant='h4' my={1}>Tags</Typography>
            <IconButton>
                <Add/>
            </IconButton>
          </Grid>  
        </Box>

        <Box sx={{border:'2px solid #e5e7eb',borderRadius:'8px'}} my={2} py={1} px={2}>
            <Typography variant='h4' my={1}>Activity</Typography>
            <Grid container 
                sx={{
                    height:'300px',
                    overflowY:'scroll',
                    display:isMore?'black':'none',
                    scrollbarWidth: 'thin', // For Firefox
                    scrollbarColor: '#6b7280 transparent', // Firefox scrollbar color
                    '&::-webkit-scrollbar': {
                        width: '6px', // Adjust width
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent', // Hide track
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#6b7280', // Scrollbar color
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-button': {
                        display: 'none' // Hides top & bottom arrows in Chrome, Edge, Safari
                    }
                }}>
            {
                rowData?.activity?.map((item,index)=>(
                        <Grid key={index} item xs={12}>
                            <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} mt={3} alignItems={'start'}>
                                <Typography variant='h4' fontWeight={'400'} >{item?.title}</Typography>
                                <Grid display={'flex'} my={1} justifyContent={'space-around'} alignItems={'start'}>
                                    <LinkedIn sx={{marginInline:'10px',color:'#6b7280',fontSize:'18px'}}/>
                                    <Typography fontSize={'14px'} pt={0.3} fontWeight={'400'} sx={{color:'#6b7280'}}>
                                        {item?.sender}
                                    </Typography>
                                    <SvgIcon sx={{fontSize:'18px',fill:'none',marginInline:'10px'}} viewBox="0 0 20 20">
                                        <path
                                            d="M5.76361 4.87491L13.5854 2.26822C17.0955 1.09843 19.0026 3.0143 17.8417 6.52367L15.2345 14.3437C13.484 19.6032 10.6096 19.6032 8.85915 14.3437L8.08526 12.0226L5.76361 11.2489C0.503041 9.4988 0.503041 6.6342 5.76361 4.87491Z"
                                            stroke="#9CA3AF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.26039 11.627L11.5586 8.32031"
                                            stroke="#9CA3AF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </SvgIcon>
                                    <Typography fontSize={'14px'} pt={0.3} fontWeight={'400'} sx={{color:'#6b7280'}}>
                                        Job
                                    </Typography>
                                </Grid>
                                <Typography fontSize={'14px'} fontWeight={'500'} sx={{color:'#6b7280'}} >{item?.date}</Typography>
                            </Grid>  
                        </Grid>    
                ))
            }
            </Grid>

            <Button variant='text' onClick={()=>{setIsMore(!isMore)}} sx={{color:'black',background:'none',margin:'10px auto',display:'block'}}>{isMore ? 'Show Less':'Show More'}</Button>
        </Box>
        <Box sx={{border:'2px solid #e5e7eb',borderRadius:'8px'}} my={2} py={1} px={2}>
            <Typography variant='h4' my={1}>Headline</Typography>
            <p style={{color:'#6b7280',fontSize:'15px'}}>
                {rowData?.headline}
            </p>
        </Box>
        <Box sx={{border:'2px solid #e5e7eb',borderRadius:'8px'}} my={2} py={1} px={2}>
            <Typography variant='h4' my={1}>Address</Typography>
            <p style={{color:'#6b7280',fontSize:'15px'}}>
                {rowData?.location}
            </p>
        </Box>
        
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel>Your LinkedIn Email Address</FormLabel>
              <TextField
                {...register('email')}
                type="email"
                variant="outlined"
                fullWidth
                sx={{ marginTop: '8px' }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Your LinkedIn Password</FormLabel>
              <TextField
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                sx={{ marginTop: '8px' }}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox {...register('isAuthenticate')} />} label="Enable Two-Factor Authentication" />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
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
                Connect Account
              </Button>
            </Grid>
          </Grid>
        </form> */}
      </Box>
    </SwipeableDrawer>
  );
};

export default ViewProfile;
