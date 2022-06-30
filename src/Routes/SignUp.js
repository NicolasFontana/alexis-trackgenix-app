import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Form from 'Components/SignUp';
import Layout from 'Components/LayoutSideBar';

const SignUpRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/`} component={Form} />
      </Switch>
    </Layout>
  );
};

export default SignUpRoutes;
