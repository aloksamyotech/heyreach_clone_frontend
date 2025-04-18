import { Grid, TextField, InputAdornment, Button, IconButton, Autocomplete } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useForm,Controller } from 'react-hook-form';
import { Person,Link,List } from '@mui/icons-material';
import { postData } from 'api';
import { apiRoutes } from 'api/config';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function FilterByUrl ({linkedAccounts,type}){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    const filterAccount = async (data) => {
        try {
          data={
            ...data,
            type:type,
            userId:user?._id
          }
          const response = await postData(apiRoutes.createList, data);
          if (response?.success) {
            toast.success('List Created');
            navigate(`/lead/importleads/${response?.data?._id}`);
          } else {
            toast.error('Failed');
          }
        } catch (error) {
            toast.error('Erroe ',error);
        }
    };

    return (
        <Grid item xs={12} sm={12} md={12} sx={{ padding: '20px 20px', display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={handleSubmit(filterAccount)}>
            <TextField
                {...register('name', { required: 'Title is required' })}
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
                name="linkedInId"
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
    )
}