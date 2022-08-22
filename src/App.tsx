import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Counter } from 'features/counter/Counter';
import { DashBoardFeature } from 'features/dashboard';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  // useEffect(() => {
  //   console.log(productApi.getAll({ _start: 1, _limit: 1, _sort: 'price:desc' }));
  // }, []);
  return (
    <>
      {/* <Header /> */}
      <Switch>
        <Route path="/" component={AdminLayout} exact />
        <Route path="/counter" component={Counter} />
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/admin/dashboard" component={DashBoardFeature} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
