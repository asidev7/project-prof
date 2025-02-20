'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import { fetchTasks, createTask } from '@/services/workflows'; // Import des fonctions du service

const workflowId = 1; // Remplace par l'ID réel du workflow

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    workflow: workflowId,
    assigned_to: null,
  });

  // Récupérer les tâches au chargement de la page
  useEffect(() => {
    fetchTasks(workflowId)
      .then((data) => setTasks(data))
      .catch((error) => console.error('Erreur lors de la récupération des tâches :', error));
  }, []);

  // Gérer la création d'une nouvelle tâche
  const handleCreateTask = async () => {
    try {
      await createTask(workflowId, newTask); // Appel de la fonction createTask
      const updatedTasks = await fetchTasks(workflowId); // Rafraîchir la liste des tâches
      setTasks(updatedTasks);
      setOpenModal(false); // Fermer le modal
      setNewTask({ // Réinitialiser le formulaire
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        workflow: workflowId,
        assigned_to: null,
      });
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Liste des tâches</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Ajouter une tâche
      </Button>
      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Priorité</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 3, backgroundColor: 'white', margin: 'auto', marginTop: 10, width: 400 }}>
          <Typography variant="h6" gutterBottom>Créer une tâche</Typography>
          <TextField
            label="Titre"
            fullWidth
            margin="normal"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            select
            label="Statut"
            fullWidth
            margin="normal"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="in_progress">En cours</MenuItem>
            <MenuItem value="completed">Terminé</MenuItem>
          </TextField>
          <TextField
            select
            label="Priorité"
            fullWidth
            margin="normal"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <MenuItem value="low">Basse</MenuItem>
            <MenuItem value="medium">Moyenne</MenuItem>
            <MenuItem value="high">Haute</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleCreateTask}>
            Ajouter
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default TasksPage;