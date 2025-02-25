
import React, { useEffect, useState } from 'react';
import { fetchAppointments, cancelAppointment, updateAppointment } from '../api/appointmentApi';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Card, CardContent, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, CircularProgress, Alert 
} from '@mui/material';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedNotes, setUpdatedNotes] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedDuration, setUpdatedDuration] = useState('');
  const [updatedAppointmentType, setUpdatedAppointmentType] = useState('');
  const [updatedPatientName, setUpdatedPatientName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments()
      .then(response => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch appointments.');
        setLoading(false);
      });
  }, []);

  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId)
      .then(() => {
        setAppointments(appointments.filter(appt => appt._id !== appointmentId));
      })
      .catch(() => setError('Failed to cancel appointment.'));
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdatedNotes(appointment.notes);
    const validDate = new Date(appointment.date);
    if (!isNaN(validDate)) {
      setUpdatedDate(validDate.toISOString().slice(0, 16)); // Format as yyyy-MM-ddThh:mm
    }
    setUpdatedDuration(appointment.duration);
    setUpdatedAppointmentType(appointment.appointmentType);
    setUpdatedPatientName(appointment.patientName);
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedAppointment) return;
    const updatedAppointmentData = {
      date: updatedDate,
      duration: updatedDuration,
      appointmentType: updatedAppointmentType,
      patientName: updatedPatientName,
      notes: updatedNotes,
    };
    
    setLoading(true);

    updateAppointment(selectedAppointment._id, updatedAppointmentData)
      .then(() => {
        setAppointments(appointments.map(appt =>
          appt._id === selectedAppointment._id ? { ...appt, ...updatedAppointmentData } : appt
        ));
        setEditDialogOpen(false);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to update appointment.');
        setLoading(false);
      });
  };

  if (loading && !editDialogOpen) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#1976D2', mt: 3 }}
      >
        Your Appointments
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <Grid item xs={12} sm={6} md={4} key={appt._id}>
              <Card sx={{ 
                boxShadow: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{appt.patientName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(appt.date), 'dd MMM yyyy, HH:mm')}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {appt.appointmentType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notes: {appt.notes}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(appt)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancel(appt._id)}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
            No upcoming appointments.
          </Typography>
        )}
      </Grid>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Patient Name"
            fullWidth
            value={updatedPatientName}
            onChange={(e) => setUpdatedPatientName(e.target.value)}
          />
          <TextField
            label="Appointment Date"
            fullWidth
            type="datetime-local"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Duration (mins)"
            fullWidth
            type="number"
            value={updatedDuration}
            onChange={(e) => setUpdatedDuration(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Appointment Type"
            fullWidth
            value={updatedAppointmentType}
            onChange={(e) => setUpdatedAppointmentType(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Update Notes"
            fullWidth
            multiline
            rows={3}
            value={updatedNotes}
            onChange={(e) => setUpdatedNotes(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      
      <Button 
        variant="outlined" 
        sx={{ mb: 3, p: 1, mx: 'auto',  color: 'black', borderColor: 'black' }} 
        onClick={() => navigate('/')}
      >
        Back
      </Button>
    </Container>
  );
};

export default AppointmentList;
