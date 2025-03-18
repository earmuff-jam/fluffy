import { AssetRoutes } from '@utils/router';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AssetContainer from '@src/AssetContainer';
import LandingPage from '@features/LandingPage/LandingPage';

import { useAuthenticator } from '@aws-amplify/ui-react';
import AwsAuthenticator from '@features/LandingPage/AwsAuthenticator';

export const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== 'authenticated') {
    return <Navigate to="/external" state={{ from: location }} replace />;
  }
  return element;
};

const App = () => {
  const buildAppRoutes = (routes) => {
    return routes.map((route) => <Route key={route.path} exact path={route.path} element={route.element} />);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/external" element={<AwsAuthenticator />} />
        <Route path="/assets" element={<ProtectedRoute element={<AssetContainer />} />}>
          {buildAppRoutes(AssetRoutes)}
        </Route>
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
