import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAvailableSlots } from '../api/doctorsApi';
import { format, addDays } from 'date-fns';
import { Container, Typography, Select, MenuItem, Grid, Button, Paper } from '@mui/material';

const SlotSelection = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchAvailableSlots(doctorId, selectedDate)
      .then(response => setSlots(response.data))
      .catch(error => console.error('Error fetching slots:', error));
  }, [doctorId, selectedDate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Select a Time Slot
      </Typography>

      <Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} fullWidth sx={{ mb: 3 }}>
        {[...Array(7)].map((_, i) => {
          const date = format(addDays(new Date(), i), 'yyyy-MM-dd');
          return <MenuItem key={date} value={date}>{date}</MenuItem>;
        })}
      </Select>

      <Grid container spacing={2}>
        {slots.length > 0 ? (
          slots.map((slot) => (
            <Grid item xs={6} sm={4} md={3} key={slot}>
              <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                <Typography variant="body1">{slot}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/book/${doctorId}/${selectedDate}/${slot}`)}
                >
                  Book
                </Button>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No available slots for this date.
          </Typography>
        )}
      </Grid>

      <Button   variant="outlined" sx={{ mb: 3 , p:1,mx:1 ,color: 'black', borderColor: 'black' }} onClick={() => navigate(-1)}>
        Back
      </Button>

    </Container>
    
  );
};

export default SlotSelection;
