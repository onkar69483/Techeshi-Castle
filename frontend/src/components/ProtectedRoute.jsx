import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    toast.error('Admin login required to access this page', {
      position: 'top-center',
      duration: 3000
    });
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;