import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';

const stats = [
  { title: 'Connections Sent', value: 25, percentage: null, color: '#3b82f6' }, // Blue
  { title: 'Messages Sent', value: 0, percentage: null, color: '#f59e0b' }, // Yellow
  { title: 'InMails Sent', value: 0, percentage: null, color: '#06b6d4' }, // Cyan
  { title: 'Connections Accepted', value: 0, percentage: '0.0%', color: '#10b981' }, // Green
  { title: 'Message Replies', value: 0, percentage: '0.0%', color: '#9333ea' }, // Purple
  { title: 'InMail Replies', value: 0, percentage: '0.0%', color: '#374151' } // Dark Gray
];

const StatsCard = () => {
  return (
    <Grid container spacing={2}>
      {stats.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Card elevation={2} sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: item.color,
                    borderRadius: '15%'
                  }}
                />
                <Typography variant="body2" fontWeight={600}>
                  {item.title}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h5" fontWeight={700}>
                  {item.value}
                </Typography>
                {item.percentage !== null && (
                  <Box
                    sx={{
                      display: 'inline-block',
                      backgroundColor: '#ccf6e4',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#065f46'
                      //   mt: 1
                    }}
                  >
                    {item.percentage}
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCard;
