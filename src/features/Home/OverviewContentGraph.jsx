import { useState, useMemo } from 'react';

import { Bar, Pie } from 'react-chartjs-2';

import { Box, Typography, Button, Grid, Card, CardContent, useTheme } from '@mui/material';

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';

import { fetchTopContentsWithLimit } from '@utils/utils';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const OverviewContentGraph = ({ assets = []}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const assetAnalysis = useMemo(() => {
    const statusCounts = {};
    const priceRanges = {
      'Under $25': 0,
      '$25-$100': 0,
      '$100-$500': 0,
      'Over $500': 0,
    };
    const updatedDates = {};

    assets.forEach((asset) => {
      const status = asset.storageLocationId.location || 'unspecified';
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      const price = parseFloat(asset.price || 0);
      if (price < 25) priceRanges['Under $25']++;
      else if (price < 100) priceRanges['$25-$100']++;
      else if (price < 500) priceRanges['$100-$500']++;
      else priceRanges['Over $500']++;

      if (asset.updatedAt) {
        const date = new Date(asset.updatedAt);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        updatedDates[monthYear] = (updatedDates[monthYear] || 0) + 1;
      }
    });

    const topFiveStatusCounts = fetchTopContentsWithLimit(statusCounts, 5);
    const topFivePriceRanges = fetchTopContentsWithLimit(priceRanges, 5);
    const topFiveUpdatedDates = fetchTopContentsWithLimit(updatedDates, 5);

    return { statusCounts: topFiveStatusCounts, priceRanges: topFivePriceRanges, updatedDates: topFiveUpdatedDates };
  }, [assets]);

  const statusChartData = {
    labels: Object.keys(assetAnalysis.statusCounts),
    datasets: [
      {
        label: 'Status Count',
        data: Object.values(assetAnalysis.statusCounts),
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const priceRangeChartData = {
    labels: Object.keys(assetAnalysis.priceRanges),
    datasets: [
      {
        label: 'Assets',
        data: Object.values(assetAnalysis.priceRanges),
        backgroundColor: theme.palette.secondary.main,
      },
    ],
  };

  const updatedDatesChartData = {
    labels: Object.keys(assetAnalysis.updatedDates).sort(),
    datasets: [
      {
        label: 'Assets Last updated',
        data: Object.values(assetAnalysis.updatedDates),
        backgroundColor: theme.palette.success.main,
      },
    ],
  };

  return (
    <Box data-tour="overview-4">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Assets overview / trends
      </Typography>

      <Box mb={3} display="flex" gap={1}>
        {['overview', 'trends'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </Box>

      {activeTab === 'overview' && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Distribution by Storage Location
                </Typography>
                <Typography variant="caption" gutterBottom>
                  Vewing top 5 distributions
                </Typography>
                <div style={{ maxWidth: '250px', margin: 'auto' }}>
                  <Pie data={statusChartData} options={{ maintainAspectRatio: false }} width={300} height={250} />
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Distribution by Price Range
                </Typography>
                <Typography variant="caption" gutterBottom>
                  Vewing top 5 distributions
                </Typography>
                <div>
                  <Bar
                    data={priceRangeChartData}
                    options={{ maintainAspectRatio: false, barThickness: 30 }}
                    width={300}
                    height={250}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 'trends' && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Asset Revision Trend By Month
            </Typography>
            <Typography variant="caption" gutterBottom>
              Vewing top 5 distributions
            </Typography>
            <div>
              <Bar
                data={updatedDatesChartData}
                options={{ maintainAspectRatio: false, barThickness: 30 }}
                width={300}
                height={250}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default OverviewContentGraph;
