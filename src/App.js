import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router';
import Cookies from 'js-cookie';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';
import { jwtDecode } from 'jwt-decode';
// routing
import MainRoutes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = Cookies.get('refreshtoken');
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token || '');
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken?.exp < currentTime) {
            Cookies.remove('refreshtoken');
            Cookies.remove('accesstoken');
            localStorage.removeItem('user');
            setIsTokenExpired(true);
          } else {
            setIsTokenExpired(false);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        setIsTokenExpired(true);
      }
    };
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token || '']);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ToastContainer />
        <NavigationScroll>
          {isTokenExpired ? (
            <Routes>
              <Route path="/login" element={<AuthLogin3 />} />
              <Route path="/register" element={<AuthRegister3 />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <MainRoutes />
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
