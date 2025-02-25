import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import SlotSelection from './components/SlotSelection';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<DoctorList />} />
          <Route path="/doctor/:doctorId" element={<SlotSelection />} />
          <Route path="/book/:doctorId/:date/:time" element={<AppointmentForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
