import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookAppointment } from '../api/appointmentApi';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const AppointmentForm = () => {
  const { doctorId, date, time } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentType: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      doctorId,
      date: `${date}T${time}:00`,
      duration: 30,
      ...formData,
    };

    bookAppointment(appointmentData)
      .then(() => navigate('/appointments'))
      .catch(error => console.error('Error booking appointment:', error));
  };
 

  return (
    <Container component={Paper} sx={{ p: 3, mt: 5, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>
        Book Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Patient Name" 
          name="patientName" 
          fullWidth 
          required 
          sx={{ mb: 2 }} 
          onChange={handleChange} 
        />
        <TextField 
          label="Appointment Type" 
          name="appointmentType" 
          fullWidth 
          required 
          sx={{ mb: 2 }} 
          onChange={handleChange} 
        />
        <TextField 
          label="Notes" 
          name="notes" 
          fullWidth 
          multiline 
          rows={3} 
          sx={{ mb: 3 }} 
          onChange={handleChange} 
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Confirm Booking
        </Button>
      </form>
      
      <Button   variant="outlined" sx={{ mb: 3 , p:1,mx:1 ,color: 'black', borderColor: 'black' }} onClick={() => navigate('/')}>
              Back
      </Button>
    </Container>
  );
};

export default AppointmentForm;
