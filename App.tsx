
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import Landing from './components/views/Landing';
import DashboardHome from './components/views/DashboardHome';
import TasksView from './components/views/TasksView';
import ProfileView from './components/views/ProfileView';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
  );
  
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="login" element={<AuthLayout.Login />} />
          <Route path="signup" element={<AuthLayout.Signup />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="tasks" element={<TasksView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
