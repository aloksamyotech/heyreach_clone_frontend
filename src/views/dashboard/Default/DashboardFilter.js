import React, { useState } from 'react';
import { FormControl, FormLabel, Select, MenuItem, TextField, Grid, Checkbox, ListItemText } from '@mui/material';
import DatePicker from 'react-multi-date-picker';

const DashboardFilter = () => {
  const senders = [
    { id: 'all', name: 'All' },
    { id: 1, name: 'Vikas Chouhan', avatar: 'https://via.placeholder.com/40' }
  ];

  const [selectedSender, setSelectedSender] = useState(['all']); // ✅ Default to "All"
  const [campaign, setCampaign] = useState('all'); // ✅ Default to "All"
  const [dateRange, setDateRange] = useState([]);

  return (
    <Grid container spacing={2}>
      {/* Senders Select */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <FormLabel>Select senders</FormLabel>
          <Select
            size="small"
            multiple
            value={selectedSender}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedSender(value.includes('all') ? ['all'] : value);
            }}
            renderValue={(selected) =>
              selected.includes('all') ? 'All Senders' : selected.map((id) => senders.find((s) => s.id === id)?.name).join(', ')
            }
          >
            {senders.map((sender) => (
              <MenuItem key={sender.id} value={sender.id}>
                <Checkbox checked={selectedSender.includes(sender.id)} />
                {sender.id !== 'all' && (
                  <img src={sender.avatar} alt={sender.name} width={30} style={{ borderRadius: '50%', marginRight: 8 }} />
                )}
                <ListItemText primary={sender.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Campaigns Select */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <FormLabel>Select Campaign</FormLabel>
          <Select size="small" value={campaign} onChange={(e) => setCampaign(e.target.value)}>
            <MenuItem value="all">All Campaigns</MenuItem>
            <MenuItem value="specific">Specific Campaigns</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Date Range Picker */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <FormLabel>Enter a date range</FormLabel>
          <DatePicker
            value={dateRange}
            onChange={setDateRange}
            range
            dateSeparator=" to "
            format="MM/DD/YYYY"
            placeholder="Select date range"
            render={(value, openCalendar) => (
              <TextField size="small" value={value} onClick={openCalendar} placeholder="Select date range" fullWidth autoComplete="off" />
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DashboardFilter;
