import { Box } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { categoryActions } from 'features/category/categorySlice';
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function ProductFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(categoryActions.fetchCategoryList());
  }, [dispatch]);
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>
        <Route path={`${match.path}/:ProductId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
}
