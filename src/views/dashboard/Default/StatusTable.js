import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Switch,
  Button
} from '@mui/material';

const LinkedInSenderData = [
  {
    avatar: 'https://via.placeholder.com/40', // Replace with actual image URL
    name: 'Vikas Chouhan',
    campaigns: 1,
    connectionsSent: 32,
    connectionRate: '6.3%',
    messagesSent: 0,
    messageReplyRate: '0.0%',
    inMailsSent: 0,
    inMailReplyRate: '0.0%'
  }
];

const CampaignsData = [
  {
    status: true,
    name: 'my new connect',
    date: '2/26/25, 4:27 PM',
    performance: { connect: '6%', message: '0%', inMail: '0%' },
    progress: { time: 788, queued: 64, completed: 0 },
    senderAvatar: 'https://via.placeholder.com/40' // Replace with actual image URL
  }
];

const StatsTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card sx={{ width: '100%', mx: 'auto', mt: 1 }}>
      <CardContent>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All-Time Stats: LinkedIn Sender" />
          <Tab label="All-Time Stats: Campaigns" />
        </Tabs>

        {activeTab === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Campaigns</TableCell>
                  <TableCell>Connections Sent</TableCell>
                  <TableCell>Connection Rate</TableCell>
                  <TableCell>Messages Sent</TableCell>
                  <TableCell>Message Reply Rate</TableCell>
                  <TableCell>InMails Sent</TableCell>
                  <TableCell>InMail Reply Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LinkedInSenderData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar src={row.avatar} sx={{ mr: 1 }} />
                        <Typography>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.campaigns}</TableCell>
                    <TableCell>{row.connectionsSent}</TableCell>
                    <TableCell>{row.connectionRate}</TableCell>
                    <TableCell>{row.messagesSent}</TableCell>
                    <TableCell>{row.messageReplyRate}</TableCell>
                    <TableCell>{row.inMailsSent}</TableCell>
                    <TableCell>{row.inMailReplyRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 1 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Senders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CampaignsData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Switch checked={row.status} />
                    </TableCell>
                    <TableCell>
                      <Typography>{row.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {row.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button variant="contained" color="primary" size="small">
                          {row.performance.connect}
                        </Button>
                        <Button variant="contained" color="secondary" size="small">
                          {row.performance.message}
                        </Button>
                        <Button variant="contained" color="success" size="small">
                          {row.performance.inMail}
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        ⏳ {row.progress.time} | 🕒 {row.progress.queued} | ✅ {row.progress.completed}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Avatar src={row.senderAvatar} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsTabs;
