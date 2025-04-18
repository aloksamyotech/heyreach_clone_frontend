import { CorporateFare, DomainAdd, Factory, LocationOnOutlined, Search,List,Person, Close } from '@mui/icons-material';
import { useForm,Controller } from 'react-hook-form';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Grid, TextField, InputAdornment, Button,Autocomplete, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
const API_KEY = process.env.REACT_APP_GOMAPS_PLACES_API_KEY;

export default function SearchByKeyword ({linkedAccounts}){
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm();

    const [suggestions, setSuggestions] = useState([]);
    const [searchLocation,setSearchLocation] = useState([]);

    const handleRemoveLocation = (id)=>{        
        const locationFilter = searchLocation.filter((item)=>(item?.id !== id));
        setSearchLocation(locationFilter);
    }
    
    const getLocationData = async(locationValue)=>{
        try{
           const response = await axios.get(`https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${locationValue}&key=${API_KEY}&pageSize=10`);
           
           if (response?.data && response?.data?.predictions) {
            setSuggestions(response?.data?.predictions);
          }
        }catch(error){
            toast.error('Error : ',error);
        }
    }

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
          toast.error('Error while generate lead',error);
        }
        finally{
          setLoading(false);
        }
    };

    const handleSelectSuggestion = (place) => {
        setSearchLocation([...searchLocation,{id:place.place_id,description:place.description}]);
        setSuggestions([]);
    };
    
    useEffect(() => {
        const locationValue = watch('location'); // Store value from watch()
    
        if (!locationValue) {
            setSuggestions([]);
            return;
        }
        const debounceTimeout = setTimeout(async () => {
            await getLocationData(locationValue);
        }, 500);
    
        return () => clearTimeout(debounceTimeout);
    
    }, [watch('location')]);
    

    return (
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
                <TextField 
                    {...register('location')} 
                    fullWidth 
                    helperText={errors?.location?.message} 
                    className='input-pos-relative'
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
                    label="Enter Location"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LocationOnOutlined />
                        </InputAdornment>
                    )
                    }}
                />
                {suggestions.length > 0 && (
                    <ul
                        className='ul-pos-absolute'
                        style={{
                            listStyle: "none",
                            padding: 0,
                            border: "1px solid #ccc",
                            maxWidth: "300px",
                            backgroundColor: "#fff",
                            zIndex: 1000,
                        }}
                    >
                    {suggestions.map((place) => (
                        <li
                            key={place.place_id}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "1px solid #ddd",
                            }}
                        >
                            <input type='checkbox' id='handleCheck' style={{border:'none',background:'#f4f6f6',padding:'10px',borderRadius:'8px'}} onClick={()=>{handleSelectSuggestion(place)}} />
                            <label htmlFor='handleCheck'>{place.description}</label>
                        </li>
                    ))}
                    </ul>
                )}
                {
                    searchLocation?.length > 0 && (
                    <ul style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 10px',listStyle:'none'}}>
                        {
                        searchLocation?.map((location,index)=>(
                            <li key={index}>
                                <IconButton sx={{
                                    fontSize:'14px',
                                    '&. MuiButtonBase-root':{
                                       '& fieldset': { background: 'none' },
                                        '&:hover fieldset': { background: 'none' }
                                    }
                                }} onClick={()=>{handleRemoveLocation(location?.id)}}>
                                    {location.description}
                                    <Close fontSize='14px'/>
                                </IconButton>
                            </li>
                        ))
                        }
                    </ul>
                    )
                }
                </Grid>
                <Grid item xs={12} sm={6} px={1}>
                    <TextField
                    {...register('company')}
                    fullWidth
                    helperText={errors?.comany?.message}
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
    )
}