import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Form from 'Components/SignUp';
import Layout from 'Components/LayoutSideBar';

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/SignUp`} component={Form} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
