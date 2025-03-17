/* eslint-disable react/prop-types */
import * as React from 'react';
import { Stack, Container, Grid } from '@mui/material';
import './lead.css';
import Typography from '@mui/material/Typography';
import searchbar from '../../assets/images/searchImage.svg';
import salesnavigator from '../../assets/images/salesnavigator.png';
import recruiter from '../../assets/images/linkedinrecruiter.svg';
import events from '../../assets/images/eventatendeessearch.svg';
import post from '../../assets/images/postengagementssearch.svg';
import seacrhcsv from '../../assets/images/import-csv-active.svg';
import company from '../../assets/images/companysearch.svg';
import account from '../../assets/images/download.png';
import rightimg from '../../assets/images/rightimg.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const AddLead = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ paddingLeft: '0', paddingRight: '0' }}>
      <Stack direction="row" alignItems="center" mb={2} justifyContent={'flex-start'}>
        <ArrowBackIosNewIcon
          sx={{ color: 'grey', fontWeight: '400', fontSize: '17px' }}
          onClick={() => {
            navigate('/lead');
          }}
        />{' '}
        <Typography variant="h2" sx={{ paddingLeft: '25px' }}>
          Leads
        </Typography>
      </Stack>
      <Grid container p={1}>
        <Grid item md={5} p={2}>
          <Grid container sx={{ background: 'white', border: 'none', borderRadius: '10px' }}>
            <Grid md={12} sm={12} xs={12} sx={{ padding: '20px 25px', borderBottom: '2px solid #eeeeee' }}>
              <Typography variant="h4">Import Methods</Typography>
            </Grid>
            <Grid
              md={12}
              sm={12}
              xs={12}
              sx={{
                overflowY: 'scroll',
                height: '300px',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 25px',
                '&::-webkit-scrollbar': {
                  width: '5px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'lightgrey',
                  borderRadius: '10px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'white'
                }
              }}
            >
              <div className="w-100 lead-button" style={{ background: '#eeeeee !important' }}>
                <div style={{ width: '40%' }}>
                  <img src={searchbar} className="lead-img" alt="searchbar" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>LinkedIn Search Bar</p>
                </div>
              </div>
              <div className="w-100 lead-button">
                <div style={{ width: '40%' }}>
                  <img src={salesnavigator} className="lead-img" alt="sales" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>Sales Navigator Leads</p>
                </div>
              </div>
              <div className="w-100 lead-button d-flex align-items-center justify-content-center">
                <div style={{ width: '40%' }}>
                  <img src={recruiter} className="lead-img" alt="recruiters" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>LinkedIn Recruiter</p>
                </div>
              </div>
              <div className="w-100 lead-button d-flex align-items-center justify-content-center">
                <div style={{ width: '40%' }}>
                  <img src={events} className="lead-img" alt="events" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>LinkedIn Events (Attendees)</p>
                </div>
              </div>
              <div className="w-100 lead-button d-flex align-items-center justify-content-center">
                <div style={{ width: '40%' }}>
                  <img src={post} className="lead-img" alt="post" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>LinkedIn Post (Reactors)</p>
                </div>
              </div>
              <div className="w-100 lead-button d-flex align-items-center justify-content-center">
                <div style={{ width: '40%' }}>
                  <img src={seacrhcsv} className="lead-img" alt="import csv" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>Import from CSV</p>
                </div>
              </div>
              <div className="w-100 lead-button d-flex align-items-center justify-content-center">
                <div style={{ width: '40%' }}>
                  <img src={company} className="lead-img" alt="company" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>LinkedIn Search Bar (Companies)</p>
                </div>
              </div>
              <div className="w-100 lead-button d-flex align-items-center justify-content-center">
                <div style={{ width: '40%' }}>
                  <img src={account} className="lead-img" alt="account" />
                </div>
                <div style={{ width: '60%', textAlign: 'left' }}>
                  <p>Sales Navigator (Accounts)</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7} sm={7} md={7} py={2}>
          <Grid container sx={{ background: 'white', border: 'none', borderRadius: '10px' }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                padding: '20px 25px',
                borderBottom: '2px solid #eeeeee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={searchbar} className="lead-img" alt="searchbar" />
                <Typography variant="h4">Import from LinkedIn Search Bar</Typography>
              </div>
              <Link
                to={'/lead/add/extractLead'}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#1c64f2',
                  textAlign: 'center'
                }}
              >
                Continue
                <ArrowForwardIosOutlined color="white" fontSize="10px" />
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                border: 'none',
                borderRadius: '10px',
                '&::-webkit-scrollbar': {
                  width: '5px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'lightgrey',
                  borderRadius: '10px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'white'
                }
              }}
            >
              <p style={{ textAlign: 'justify', padding: '0 20px', color: 'grey' }}>
                Start a new search to find unlimited, unique leads on LinkedIn! Search and filter by position, company, industry, location
                and much more. Use an upgraded multi-account version of LinkedIns people search to find your leads.
              </p>
              <img src={rightimg} alt="rightimage" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddLead;
