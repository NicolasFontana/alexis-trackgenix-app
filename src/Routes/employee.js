import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Timesheet from 'Components/Employee/Timesheet';
// import Projects from 'Components/Employee/Projects';
// import Profile from 'Components/Employee/EditProfile';

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/time-sheet`} component={Timesheet} />
      {/* <Route path={`${url}/projects`} component={Projects} />
      <Route path={`${url}/profile`} component={Profile} /> */}
      <Route exact path={`${url}/`} component={Home} />
    </Switch>
  );
};

export default Employee;
