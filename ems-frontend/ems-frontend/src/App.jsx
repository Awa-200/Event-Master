import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import EventComponent from './components/EventComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEventComponent from './components/ListEventComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import AllEventComponent from './components/AllEventComponent';
import ViewEventComponent from './components/ViewEventComponent';
import AboutComponent from './components/AboutComponent';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHeaderComponent from './components/UserHeaderComponent';
import { auth } from './firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? <HeaderComponent /> : <UserHeaderComponent />}
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/event/all-event" element={<AllEventComponent />} />
          <Route path="/event/view-event/:id" element={<ViewEventComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event" element={<ListEventComponent />} />
          <Route path="/event/add-event" element={<EventComponent />} />
          <Route path="/event/update-event/:id" element={<EventComponent />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
