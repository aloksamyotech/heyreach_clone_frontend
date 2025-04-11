import React, { useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  SwipeableDrawer,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material';

import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { postData } from 'api';
import { toast } from 'react-toastify';
import './drawer.css';

const SetLimitDrawer = (props) => {
  const { open, toggleDrawer,rowData } = props;
  const [isMore,setIsMore] = useState(false);
  const {
    register,
    control,
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
          Setup Sender Limits
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
              <Typography variant='h4' my={1}>Dipesh Dabi</Typography>
           </Grid>
           <Grid display={'flex'} justifyContent={'center'} alignItems={'start'}>
              <Button className='senderSchedule'>Go to sender schedule</Button>
           </Grid>
        </Box> 

        <Box className="alert-box" my={1} py={2} px={2}>
          <Typography variant='h5' sx={{color:'#1c64f2'}}>
            <strong> Note </strong>: The numbers below may vary based on your account’s health and activities on other campaigns. We do this to keep your accounts safe.
          </Typography>
        </Box>

        <Box sx={{border:'none'}} my={2} py={1} px={2}>
            <Typography variant='h5' my={1}>Max Follows/Day</Typography>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <input type='range' min={0} max={40} className='textfield-css' {...register('follow',{required:'Follow range required'})} />
                <TextField type='number' min={0} max={40} {...register('follow',{required:'Follow range required'})} /> 
            </Grid>

            <Typography variant='h5' my={1}>Max Messages/Day</Typography>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <input type='range' min={0} max={40} className='textfield-css' {...register('message',{required:'Follow range required'})} />
                <TextField type='number' min={0} max={40} {...register('message',{required:'Message range required'})} /> 
            </Grid>

            <Typography variant='h5' my={1}>Max InMail Messages/Day</Typography>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <input type='range' min={0} max={40} className='textfield-css' {...register('mail',{required:'Follow range required'})} />
                <TextField type='number' min={0} max={40} {...register('mail',{required:'Mail range required'})} /> 
            </Grid>

            <Typography variant='h5' my={1}>Max Connection Requests/Day</Typography>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <input type='range' min={0} max={40} className='textfield-css' {...register('connection',{required:'Follow range required'})} />
                <TextField type='number' min={0} max={40} {...register('connection',{required:'Connection Request range required'})} /> 
            </Grid>

            <Typography variant='h5' my={1}>Max Profile Views /Day</Typography>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <input type='range' min={0} max={40} className='textfield-css' {...register('profile',{required:'Follow range required'})} />
                <TextField type='number' min={0} max={40} {...register('profile',{required:'Profile range required'})} /> 
            </Grid>

            <Typography variant='h5' my={1}>Max Post Likes/Day</Typography>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <input type='range' min={0} max={40} className='textfield-css' {...register('post',{required:'Follow range required'})} />
                <TextField type='number' min={0} max={40} {...register('post',{required:'Post range required'})} /> 
            </Grid>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default SetLimitDrawer;
