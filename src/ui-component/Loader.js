import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Box, LinearProgress } from '@mui/material';

const loadingMessages = [
  'Scraping data from LinkedIn...',
  'Gathering profile information...',
  'Fetching company details...',
  'Analyzing connections...',
  'Almost done! Finalizing results...'
];

const DynamicLoader = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => (oldProgress >= 100 ? 100 : oldProgress + 2));
    }, 300); // Faster progress animation

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000); // Change message every 5 seconds

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        background: 'Grey',
        textAlign: 'center',
        padding: 4,
        color: '#fff'
      }}
    >
      <CircularProgress
        size={90}
        thickness={5}
        sx={{
          color: '#fff',
          animation: 'pulse 1.5s infinite ease-in-out'
        }}
      />
      <Typography variant="h5" sx={{ marginTop: 3, fontWeight: 'bold', fontSize: '1.5rem' }}>
        {loadingMessages[messageIndex]}
      </Typography>
      <Box
        sx={{
          width: '60%',
          marginTop: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: 2,
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#fff'
            }
          }}
        />
        <Typography variant="body2" sx={{ marginTop: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          {progress}% completed
        </Typography>
      </Box>
    </Box>
  );
};

export default DynamicLoader;
