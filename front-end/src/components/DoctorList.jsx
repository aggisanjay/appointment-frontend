import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../api/doctorsApi';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors()
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Select a Doctor
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card sx={{ minWidth: 275, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Specialization: {doctor.specialization}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/doctor/${doctor._id}`)}
                >
                  View Slots
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DoctorList;
