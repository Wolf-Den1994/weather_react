import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import AppRouter from '../AppRouter/AppRouter';

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/main" />
      </Route>
      <AppRouter />
    </Router>
  );
};

export default App;
