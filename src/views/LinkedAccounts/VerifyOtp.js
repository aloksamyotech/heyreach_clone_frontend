import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  FormLabel,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useForm } from 'react-hook-form';
import { postData, putData } from 'api';
import { toast } from 'react-toastify';
import { apiRoutes } from 'api/config';

const VerifyOtp = ()=>{
    const [timer, setTimer] = useState(120);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const verifyOtp = async()=>{
      const response = await postData(apiRoutes?.verifyOtp,{sessionId:localStorage.getItem('sessionId')});
      if(response?.success){
        toast.success(response?.data?.message);
      }
    }

    const updateOtp = async (data) => {
        try {
          const response = await putData(apiRoutes?.updateOtp, {...data});
          if (response?.data?.success) {
            toast.success(response?.data?.message);
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    useEffect(() => {
        if (timer === 0) return;
    
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
    
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
       verifyOtp();
    },[]);

    return (
      <Box>
        <form onSubmit={handleSubmit(updateOtp)}>
          <Grid container p={1}>
            <Grid item xs={12}>
              <FormLabel>Enter Your OTP</FormLabel>
              <TextField
                {...register('otp',{required:'OTP is required'})}
                type="text"
                variant="outlined"
                fullWidth
                sx={{ marginTop: '8px' }}
                error={!!errors?.otp}
                helperText={errors?.otp?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' color={'error'}>
                OTP Expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={timer === 0}
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
                Verify OTP
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
};

export default VerifyOtp;