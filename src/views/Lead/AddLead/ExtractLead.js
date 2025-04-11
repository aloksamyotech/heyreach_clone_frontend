import * as React from 'react';
import { Stack, Container, Grid, Tabs, Tab, IconButton,} from '@mui/material';
import './../lead.css';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import searchbar from '../../../assets/images/searchImage.svg';
import { ArrowBackIos } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { fetchData } from 'api';
import { useEffect } from 'react';
import DynamicLoader from 'ui-component/Loader';
import SearchByKeyword from './SearchByKeyword';
import FilterLeadByUrl from './FilterLeadByUrl';

const ExtractLead = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [tabvalue, setValue] = useState(1);
  const [linkedAccounts, setLinkedAccount] = useState([]);

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
                <FilterLeadByUrl linkedAccounts={linkedAccounts} />
              ) : (
                <SearchByKeyword linkedAccounts={linkedAccounts}/>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExtractLead;
