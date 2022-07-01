import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;

const authRoutes = [
  { icon: home, name: 'Home', path: '/' },
  { name: 'Log In', path: '/auth/login' },
  { name: 'Sign Up', path: '/auth/signup' }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/signup`} component={SignUp} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
