import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import { width } from '@mui/system';

const ChartComponent = () => {
  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: { show: false }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z'
      ]
    },
    tooltip: {
      enabled: true,
      shared: true,
      y: {
        formatter: (val) => val
      },
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    markers: {
      size: 5
    },
    legend: {
      show: false
    }
  };

  const chartSeries = [
    { name: 'Connections Sent', data: [0, 0, 25, 0, 0, 0] },
    { name: 'Messages Sent', data: [0, 2, 0, 0, 0, 0] },
    { name: 'Message Replies', data: [0, 0, 0, 10, 0, 0] },
    { name: 'InMails Sent', data: [0, 0, 0, 0, 0, 5] },
    { name: 'InMail Replies', data: [23, 0, 0, 0, 0, 0] }
  ];

  return (
    <Card sx={{ width: '100%', mx: 'auto', mt: 1 }}>
      <CardContent>
        <ApexCharts options={chartOptions} series={chartSeries} type="area" height={350} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
