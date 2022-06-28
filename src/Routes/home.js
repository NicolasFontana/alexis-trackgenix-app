import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/LayoutSideBar';
import Home from 'Components/Home';

const MainHomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default MainHomeRoutes;
