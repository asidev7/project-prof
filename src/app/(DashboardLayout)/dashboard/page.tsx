'use client';

import { Grid, Box, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
  ArcElement
} from 'chart.js';

// Configuration de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [documentData, setDocumentData] = useState([]);

  useEffect(() => {
    // Fetching data for the dashboard
    axios.get('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/user-list/')
      .then(response => {
        console.log("User Data:", response.data);
        setUserData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching user data:", error));

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs_groupes/list-groups/')
      .then(response => {
        console.log("Group Data:", response.data);
        setGroupData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching group data:", error));

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/services/list-services/')
      .then(response => {
        console.log("Service Data:", response.data);
        // Check if response.data is an array, if not, handle accordingly
        if (Array.isArray(response.data)) {
          setServiceData(response.data);
        } else {
          console.error("Expected an array for service data, but received:", response.data);
          setServiceData([]); // Fallback to an empty array if the data is not as expected
        }
      })
      .catch(error => console.error("Error fetching service data:", error));

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/documents/dossiers/')
      .then(response => {
        console.log("Document Data:", response.data);
        setDocumentData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching document data:", error));
  }, []);

  // Dynamically created charts
  const userChart = {
    labels: userData.map((item) => item.month),
    datasets: [
      {
        label: 'Utilisateurs actifs',
        data: userData.map((item) => item.activeUsers),
        backgroundColor: '#556cd6',
        borderColor: '#4e73df',
        borderWidth: 1,
      },
    ],
  };

  const groupChart = {
    labels: groupData.map((item) => item.groupName),
    datasets: [
      {
        label: 'Groupes utilisateurs',
        data: groupData.map((item) => item.memberCount),
        backgroundColor: '#ff6384',
        borderColor: '#ff6384',
        borderWidth: 1,
      },
    ],
  };

  const serviceChart = {
    labels: serviceData.map((item) => item.serviceName),
    datasets: [
      {
        label: 'Services',
        data: serviceData.map((item) => item.serviceUsage),
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        borderWidth: 1,
      },
    ],
  };

  const documentChart = {
    labels: documentData.map((item) => item.documentType),
    datasets: [
      {
        label: 'Documents',
        data: documentData.map((item) => item.documentCount),
        backgroundColor: '#ffcd56',
        borderColor: '#ffcd56',
        borderWidth: 1,
      },
    ],
  };

  return (
    <PageContainer title="Dashboard" description="Vue d'ensemble des services et utilisateurs">
      <Box sx={{ margin: 3 }}>
        <Grid container spacing={3}>
          {/* Utilisateurs Card */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Nombre d'Utilisateurs" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Utilisateurs actifs
                </Typography>
                <Bar data={userChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Groupes Card */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Groupes Utilisateurs" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Groupes et Membres
                </Typography>
                <Pie data={groupChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Services Card */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Services" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Usage des services
                </Typography>
                <Line data={serviceChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Documents Card */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader title="Documents" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Documents Disponibles
                </Typography>
                <Bar data={documentChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
