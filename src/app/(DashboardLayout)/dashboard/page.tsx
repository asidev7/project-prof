'use client';

import { Grid, Box, Card, CardContent, Typography, CardHeader, Divider, CircularProgress } from '@mui/material';
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

type User = {
  month: string;
  activeUsers: number;
};

type Group = {
  groupName: string;
  memberCount: number;
};

type Service = {
  serviceName: string;
  serviceUsage: number;
};

type Document = {
  documentType: string;
  documentCount: number;
};

type Role = {
  id: number;
  name: string;
  description: string;
  parent_role: string | null;
};

const Dashboard = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [documentData, setDocumentData] = useState<Document[]>([]);
  const [rolesData, setRolesData] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data for the dashboard
    setLoading(true);

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/user-list/')
      .then(response => {
        setUserData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching user data:", error));

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs_groupes/list-groups/')
      .then(response => {
        setGroupData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching group data:", error));

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/services/list-services/')
      .then(response => {
        setServiceData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching service data:", error));

    axios.get('https://www.backend.lnb-intranet.globalitnet.org/documents/dossiers/')
      .then(response => {
        setDocumentData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching document data:", error));

    // Fetching roles data
    axios.get('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/')
      .then(response => {
        setRolesData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching roles data:", error))
      .finally(() => setLoading(false)); // End loading
  }, []);

  // Dynamically created charts
  const userChart = {
    labels: userData.map((item) => item.month),
    datasets: [
      {
        label: 'Utilisateurs actifs',
        data: userData.map((item) => item.activeUsers),
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const groupChart = {
    labels: groupData.map((item) => item.groupName),
    datasets: [
      {
        label: 'Groupes utilisateurs',
        data: groupData.map((item) => item.memberCount),
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const serviceChart = {
    labels: serviceData.map((item) => item.serviceName),
    datasets: [
      {
        label: 'Services',
        data: serviceData.map((item) => item.serviceUsage),
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const documentChart = {
    labels: documentData.map((item) => item.documentType),
    datasets: [
      {
        label: 'Documents',
        data: documentData.map((item) => item.documentCount),
        backgroundColor: 'rgba(255, 159, 64, 0.4)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
      },
    ],
  };

  const evolutionChart = {
    labels: userData.map((item) => item.month),
    datasets: [
      {
        label: 'Utilisateurs actifs',
        data: userData.map((item) => item.activeUsers),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <PageContainer title="Dashboard" description="Vue d'ensemble des services et utilisateurs">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Dashboard" description="Vue d'ensemble des services et utilisateurs">
      <Box sx={{ margin: 3 }}>
        <Grid container spacing={3}>
          {/* Utilisateurs Card */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader title="Nombre d'Utilisateurs" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Utilisateurs actifs
                </Typography>
                <Line data={evolutionChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Groupes Card */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ boxShadow: 3 }}>
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
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader title="Services" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Usage des services
                </Typography>
                <Bar data={serviceChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Documents Card */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader title="Documents" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Documents Disponibles
                </Typography>
                <Bar data={documentChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Roles Card */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader title="Rôles Utilisateurs" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Liste des rôles
                </Typography>
                <Box>
                  {rolesData.map((role) => (
                    <Card key={role.id} sx={{ marginBottom: 2 }}>
                      <CardHeader title={role.name} />
                      <CardContent>
                        <Typography variant="body2">{role.description}</Typography>
                        {role.parent_role && (
                          <Typography variant="body2" color="textSecondary">
                            Rôle parent: {role.parent_role}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
