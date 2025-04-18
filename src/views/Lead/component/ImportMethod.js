/* eslint-disable react/prop-types */
import * as React from 'react';
import { Divider } from '@mui/material';
import '../lead.css';
import rightimg from '../../../assets/images/rightimg.png';
import postimg from '../../../assets/images/Linkedin-post-reactions.png';
import companyimg from '../../../assets/images/LinkedIn-search bar-companies.png';
import imptcsv from '../../../assets/images/Import-as-csv.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ForumIcon from '@mui/icons-material/Forum';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const LeadImport = () => {
  const navigate = useNavigate();
  const [type,setType] = useState('people');
  const [content,setContent] = useState({
    text:'Import from Linkedin Search bar',
    image:rightimg,
  });
  const methods = [
    { label: 'LinkedIn Search Bar', icon: <LinkedInIcon color='primary' />,text: 'Import from Linkedin Search bar',value:'people',image:rightimg },
    { label: 'LinkedIn Post (Reactors)', icon: <ForumIcon color='primary' />,text: 'LinkedIn Post (Reactors)',value:'post_reactors',image:postimg },
    { label: 'Import from CSV', icon: <ForumIcon color='primary' />,text: 'Import From CSV',value:'csv',image:imptcsv },
    { label: 'LinkedIn Search Bar (Companies)', icon: <ForumIcon color='primary' />,text: 'LinkedIn Search Bar (Companies)',value:'company',image:companyimg },
  ];
  return (
    <Box display="flex" height="80vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Box
        width={300}
        bgcolor="#fff"
        boxShadow={1}
        display="flex"
        flexDirection="column"
        sx={{ borderRadius: '12px' }}
      >
        <Typography variant="h4" px={2} pt={3} fontWeight={600} mb={2}>
          Import methods
        </Typography>
        <Divider sx={{borderBottomWidth:'1.5px'}}/>
        <List p={2}>
          {methods.map((method, index) => (
            <ListItem
              key={index}
              onClick={()=>{
                setType(method?.value);
                setContent({text:method?.text,image:method?.image})
              }}
              sx={{
                margin:'5px',
                borderRadius: 2,
                bgcolor: method.value === type ? '#eef3fc' : 'transparent',
                mb: 1,
              }}
              button
            >
              <ListItemIcon>{method.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontWeight={method.value === type ? 600 : 400}
                    color={method.value === type ? 'primary.main' : 'text.primary'}
                  >
                    {method.label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box flex={1} px={2} height={'100%'}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 3,height:'100%' }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <LinkedInIcon fontSize="large" color="primary" />
              <Typography variant="h4" fontWeight={600}>
                {content?.text}
              </Typography>
            </Box>
            <Button variant="contained" endIcon={<ArrowForwardIcon />} sx={{background:'#1c64f2'}} onClick={()=>{navigate(`/lead/add/${type}`)}} size="large">
              Continue
            </Button>
          </Box>

          {/* Image Preview Area */}
          <Box
            sx={{
              width: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #ddd',
              backgroundColor: '#f9f9f9',
            }}
          >
            <img
              src={content?.image}
              alt="LinkedIn Search Preview"
              style={{ width: '100%', display: 'block' }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LeadImport;
