import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project imports
import { gridSpacing } from 'store/constant';
import FilterComponent from './DashboardFilter';
import StatsCard from './StatusCard';
import ChartComponent from './Chart';
import StatsTable from './StatusTable';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <FilterComponent />
      </Grid>
      <Grid item xs={12}>
        <StatsCard />
      </Grid>
      <Grid item xs={12}>
        <ChartComponent />
      </Grid>
      <Grid item xs={12}>
        <StatsTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
