'use client';

import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

// Configuration de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Données pour le graphique des utilisateurs
  const userData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Nouveaux utilisateurs',
        data: [30, 50, 40, 60, 80, 100],
        backgroundColor: '#556cd6',
      },
    ],
  };

  // Données pour le graphique des sessions actives
  const sessionData = {
    labels: ['10h', '12h', '14h', '16h', '18h', '20h'],
    datasets: [
      {
        label: 'Sessions actives',
        data: [5, 10, 8, 15, 12, 20],
        borderColor: '#19857b',
        backgroundColor: 'rgba(25, 133, 123, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <PageContainer title="Dashboard" description="Activité des utilisateurs">
      <Box>
        <Grid container spacing={3}>
          {/* Card avec le graphique des utilisateurs */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nouveaux utilisateurs
                </Typography>
                <Bar data={userData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Card avec le graphique des sessions actives */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sessions actives
                </Typography>
                <Line data={sessionData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
