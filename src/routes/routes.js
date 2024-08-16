import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/components/homePage';
import AboutPage from '../pages/about/components/aboutPage';
import TableComponent from '../pages/about/components/table';
import CalendarComponent from '../pages/about/components/calendar';
import ShowImage from '../pages/about/components/showImage';
import NotFound from '../pages/404'; 

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/index.html" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<AboutPage />}>
            <Route path="table" element={<TableComponent />} />
            <Route path="calendar" element={<CalendarComponent />} />
            <Route path="showImage" element={<ShowImage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
