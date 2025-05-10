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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useForm } from 'react-hook-form';
import { postData } from 'api';
import { toast } from 'react-toastify';
import VerifyOtp from './VerifyOtp';
import { useLinkedinCustomHook } from './customHook';

const ConnectAccount = (props) => {
  const {
      otpRequired,
      setOtpRequired,
      connectAccount
  } = useLinkedinCustomHook();
  const { open, toggleDrawer } = props;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '40%',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px'
        }
      }}
    >
      <Box sx={{ padding: '10px' }}>
        <Typography variant="h3" m={2} sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Connect LinkedIn Account
        </Typography>
      </Box>
      <Divider />
      { !otpRequired?
      <Box p={4}>
        <form onSubmit={handleSubmit(connectAccount)}>
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
        </form>
      </Box>
      :<VerifyOtp />
      }
    </SwipeableDrawer>
  );
};

export default ConnectAccount;
