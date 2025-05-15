import React from 'react';
import { Route } from 'react-router-dom';
import Overview from '../pages/Overview/overview';
import Students from '../pages/students';
import Store from '../pages/Store';
import ContactForm from '../pages/ContactUs';
import Teachers from '../pages/teachers';
import AddStudent from '../pages/students/addStudent';
import AddTeacher from '../pages/teachers/addTeacher';

export const getRoleBasedRoutes = (role) => {
  const commonRoutes = [
    <Route key="overview" path="" element={<Overview />} />,
    <Route key="students" path="/students" element={<Students />} />,
    <Route key="store" path="/store" element={<Store />} />,
    <Route key="contact" path="/contactUs" element={<ContactForm />} />,
  ];

  const adminRoutes = [
    <Route key="addStudent" path="/addStudent" element={<AddStudent />} />,
    <Route key="addTeacher" path="/addTeacher" element={<AddTeacher />} />,
    <Route key="teachers" path="/teachers" element={<Teachers />} />,
  ];

  const teacherRoutes = [
    <Route key="teachers" path="/teachers" element={<Teachers />} />,
  ];

  if (role === 'admin') {
    return [...commonRoutes, ...adminRoutes];
  } else if (role === 'teacher') {
    return [...commonRoutes, ...teacherRoutes];
  } else {
    return commonRoutes;
  }
};
