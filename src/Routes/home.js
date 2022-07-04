import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Home';

const mainHomeRoutes = [
  { name: 'Log In', path: '/auth/login' },
  { name: 'Sign Up', path: '/auth/signup' }
];

const MainHomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={mainHomeRoutes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default MainHomeRoutes;
