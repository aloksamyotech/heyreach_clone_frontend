import * as React from 'react';
import { Stack, Container, Grid, Tabs, Tab, TextField, InputAdornment, Autocomplete, Button, IconButton } from '@mui/material';
import './lead.css';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import searchbar from '../../assets/images/searchImage.svg';
import { ArrowBackIos, CorporateFare, DomainAdd, Factory, LocalActivityOutlined, LocationOn, Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Person, Link, List } from '@mui/icons-material';
import { post, fetchData } from 'api';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DynamicLoader from 'ui-component/Loader';
import { GetAllCities,GetCountries,GetState } from 'react-country-state-city';

const ExtractLead = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const [tabvalue, setValue] = useState(1);
  const [linkedAccounts, setLinkedAccount] = useState([]);

  const filterAccount = async (data) => {
    try {
      setLoading(true);
      const response = await post('linkedin/filterData', data);
      if (response?.status === 201) {
        toast.success('Lead Generated');
      } else {
        toast.error('Failed');
      }
    } catch (error) {
      console.log('Error while fetching', error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const getLinkedInAccount = async () => {
    try {
      const response = await fetchData('/linkedin/get_linkedIn_account');
      setLinkedAccount(
        response?.data?.map((item) => ({
          label: item?.email,
          value: item?._id
        }))
      );
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    getLinkedInAccount();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      const countries = await GetCountries();
      
      let allCities = [];

      for (const country of countries) {
        
        const states = await GetState(country.iso2);
        
        for (const state of states) {
          const stateCities = await GetAllCities(country.iso2, state.isoCode);
          stateCities.forEach(city => {
            allCities.push({
              name: city.name,
              state: state.name,
              country: country.name,
            });
          });
        }
      }

      setCities(allCities);
    };

    fetchCities();
  }, []);

  const handleCityChange = (_, value) => {
    setSelectedCity(value);
  };
  return (
    <Container>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <DynamicLoader />
        </Box>
      )}
      <Stack direction="row" alignItems="center" mb={2} justifyContent={'flex-start'}>
        <IconButton onClick={() => { navigate('/lead')}}>
            <ArrowBackIos sx={{ color: 'grey', fontWeight: '400', fontSize: '17px',cursor:'pointer' }} />
        </IconButton>
        <Typography variant="h2" sx={{ paddingLeft: '25px' }}>
          Leads
        </Typography>
      </Stack>
      <Grid container sx={{ background: 'white', borderRadius: '10px' }}>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            padding: '20px 25px',
            borderBottom: '2px solid #eeeeee',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={searchbar} className="lead-img" alt="searchbar" />
            <Typography variant="h4">Import from LinkedIn Search Bar</Typography>
          </div>
        </Grid>
        <Grid item md={12} sm={12} xs={12} sx={{ padding: '10px 20px' }}>
          <Box>
            <Tabs
              sx={{ borderBottom: 1, borderColor: '#eeeeee' }}
              value={tabvalue}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Extract from URL" value={1} />
              <Tab label="Search By Keyword" value={2} />{' '}
            </Tabs>
            <Grid container>
              {tabvalue === 1 ? (
                <Grid item xs={12} sm={12} md={12} sx={{ padding: '20px 20px', display: 'flex', flexDirection: 'column' }}>
                  <form onSubmit={handleSubmit(filterAccount)}>
                    <TextField
                      {...register('title', { required: 'Title is required' })}
                      fullWidth
                      sx={{
                        marginBottom: '20px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                          '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                        },
                        '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                          backgroundColor: 'white'
                        }
                      }}
                      helperText={errors?.title?.message}
                      variant="outlined"
                      label="Enter Your List Name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <List />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Controller
                      name="userId"
                      control={control}
                      rules={{ required: 'Send Account is required' }}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={linkedAccounts}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value}
                          onChange={(_, newValue) => field.onChange(newValue ? newValue.value : '')}
                          helperText={errors?.userId?.message}
                          sx={{ marginBottom: '20px' }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="outlined"
                              label="Select Name"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person sx={{ color: '#2B6CB0' }} />
                                  </InputAdornment>
                                )
                              }}
                              sx={{
                                marginBottom: '16px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: 'white',
                                  borderRadius: '8px',
                                  '& fieldset': { borderColor: '#CBD5E0' },
                                  '&:hover fieldset': { borderColor: '#2B6CB0' }
                                },
                                '& .css-1uj75u1-MuiInputBase-input-MuiOutlinedInput-input': {
                                  backgroundColor: 'white'
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    />
                    <Typography variant="h4" color={'grey'} sx={{ marginBottom: '20px' }}>
                      Search Query
                    </Typography>
                    <TextField
                      {...register('url', { required: 'URL is required' })}
                      fullWidth
                      helperText={errors?.url?.message}
                      sx={{
                        marginBottom: '20px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                          '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                        },
                        '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                          backgroundColor: 'white'
                        }
                      }}
                      variant="outlined"
                      label="Enter Search URL"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Link sx={{ transform: 'rotate(-45deg)' }} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <Button variant="contained" type="submit">
                      Search
                    </Button>
                  </form>
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} sx={{ padding: '20px 20px', display: 'flex', flexDirection: 'column' }}>
                  <form onSubmit={handleSubmit(filterAccount)}>
                  <TextField
                      {...register('title', { required: 'Title is required' })}
                      fullWidth
                      sx={{
                        marginBottom: '20px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                          '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                        },
                        '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                          backgroundColor: 'white'
                        }
                      }}
                      helperText={errors?.title?.message}
                      variant="outlined"
                      label="Enter Your List Name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <List />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Controller
                      name="userId"
                      control={control}
                      rules={{ required: 'Send Account is required' }}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={linkedAccounts}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value}
                          onChange={(_, newValue) => field.onChange(newValue ? newValue.value : '')}
                          helperText={errors?.userId?.message}
                          sx={{ marginBottom: '20px' }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="outlined"
                              label="Select Name"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person sx={{ color: '#2B6CB0' }} />
                                  </InputAdornment>
                                )
                              }}
                              sx={{
                                marginBottom: '16px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: 'white',
                                  borderRadius: '8px',
                                  '& fieldset': { borderColor: '#CBD5E0' },
                                  '&:hover fieldset': { borderColor: '#2B6CB0' }
                                },
                                '& .css-1uj75u1-MuiInputBase-input-MuiOutlinedInput-input': {
                                  backgroundColor: 'white'
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    />
                    <Typography variant="h4" sx={{ marginBottom: '20px',color:'grey' }}>
                      Search Query
                    </Typography>
                    <TextField
                      {...register('keyword', { required: 'Keyword is required' })}
                      fullWidth
                      sx={{
                        marginBottom: '20px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                          '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                        },
                        '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                          backgroundColor: 'white'
                        }
                      }}
                      helperText={errors?.title?.message}
                      variant="outlined"
                      label="Enter Keyword for search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Grid container>
                      <Grid item xs={12} sm={6} px={1}>
                      <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => `${option.name}, ${option.state}, ${option.country}`}
                        onChange={handleCityChange}
                        renderInput={(params) => <TextField {...params} label="Search Location" sx={{background:'white'}} variant="outlined" InputLabelProps={<LocationOn/>} />}
                      />

                      {selectedCity && (
                        <p><strong>Selected:</strong> {selectedCity.name}, {selectedCity.state}, {selectedCity.country}</p>
                      )}
                      </Grid>
                      <Grid item xs={12} sm={6} px={1}>
                          <TextField
                            {...register('company')}
                            fullWidth
                            helperText={errors?.url?.message}
                            sx={{
                              marginBottom: '20px',
                              borderRadius: '8px',
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                                '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                              },
                              '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                                backgroundColor: 'white'
                              }
                            }}
                            variant="outlined"
                            label="Company Name"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <DomainAdd />
                                </InputAdornment>
                              )
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6} px={1}>
                          <TextField
                            {...register('industry')}
                            fullWidth
                            helperText={errors?.url?.message}
                            sx={{
                              marginBottom: '20px',
                              borderRadius: '8px',
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                                '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                              },
                              '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                                backgroundColor: 'white'
                              }
                            }}
                            variant="outlined"
                            label="Industry"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Factory />
                                </InputAdornment>
                              )
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6} px={1}>
                          <TextField
                            {...register('past_company')}
                            fullWidth
                            helperText={errors?.url?.message}
                            sx={{
                              marginBottom: '20px',
                              borderRadius: '8px',
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '& fieldset': { borderColor: '#CBD5E0' }, // Border color
                                '&:hover fieldset': { borderColor: '#2B6CB0' } // Hover effect
                              },
                              '& .css-rwr04n-MuiInputBase-input-MuiOutlinedInput-input': {
                                backgroundColor: 'white'
                              }
                            }}
                            variant="outlined"
                            label="Past Comapany"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CorporateFare/>
                                </InputAdornment>
                              )
                            }}
                          />
                      </Grid>
                    </Grid>

                    <Button variant="contained" type="submit">
                      Search
                    </Button>
                  </form>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExtractLead;
