import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import LandinPage from 'Components/LandingPage';

const mainHomeRoutes = [
  { name: 'Log In', path: '/auth/login' },
  { name: 'Sign Up', path: '/auth/signup' }
];

const MainHomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={mainHomeRoutes}>
      <Switch>
        <Route exact path={`${url}/`} component={LandinPage} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default MainHomeRoutes;
