import { Route, Switch, useLocation } from 'react-router-dom';
import { routes } from '../../router';

const AppRouter = () => {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <Switch location={location}>
        {routes.map(({ path, Component, exact }) => (
          <Route key={path} exact={exact} path={path}>
            {() => <Component />}
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default AppRouter;
