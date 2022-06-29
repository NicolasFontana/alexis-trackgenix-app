import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Home';

const MainHomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/`} component={Home} />
      <Redirect to={`${url}/`} />
    </Switch>
  );
};

export default MainHomeRoutes;
