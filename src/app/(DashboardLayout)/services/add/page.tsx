'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { createService } from "@/services/services";
import { getCSRFToken } from "@/utils/csrf"; // Import function to fetch CSRF token

const ServicesAddPage = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve CSRF token
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
      alert('CSRF token is missing.');
      return;
    }

    try {
      // Prepare the data object with expected properties
      const servicePayload = {
        name: serviceData.name,
        description: serviceData.description,
        department_id: 1,  // Example, replace with actual value
        function_id: 2,    // Example, replace with actual value
        chef_id: 3,       // Example, replace with actual value
        csrfToken,        // Include CSRF token directly
      };

      // Call createService with the payload
      const response = await createService(servicePayload);
      console.log('Service created successfully:', response);
      alert('Service created successfully!');
      setServiceData({ name: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error occurred while creating the service:', error);
      alert('An error occurred while creating the service.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add a Service
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Service Name"
            name="name"
            fullWidth
            margin="normal"
            value={serviceData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={serviceData.description}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Add Service
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ServicesAddPage;
