import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const users = [
  {
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Yashika Jain',
    headline: '--',
    jobTitle: '/',
    company: '/',
    location: '/'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Shreya Goyal',
    headline: 'Human Resources Executive',
    jobTitle: '/',
    company: '/',
    location: '/'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Ankit Sharma',
    headline: 'Full Stack Developer | NestJS',
    jobTitle: '/',
    company: '/',
    location: 'Indore'
  }
];

const UserTable = () => {
  const [search, setSearch] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.headline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <FormControl size="small" style={{ minWidth: 150 }}>
          <InputLabel>Filter by account</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="developer">Developer</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Search by keyword"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch checked={selectMode} onChange={() => setSelectMode(!selectMode)} />
          <span>Select mode</span>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Headline</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar src={user.avatar} />
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.headline}</TableCell>
                <TableCell>{user.jobTitle}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
