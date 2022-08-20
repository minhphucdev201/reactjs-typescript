import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@mui/material';
import productApi from 'api/productApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCategoryList } from 'features/category/categorySlice';
import { ListParams, Product } from 'models';
import { selectCategoryMap } from 'features/category/categorySlice';
import { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductFilters from '../components/ProductFilters';
import ProductTable from '../components/ProductTable';
import {
  productActions,
  selectProductFilter,
  selectProductList,
  selectProductLoading,
  selectProductPagination,
} from '../productSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  // useEffect(() => {
  //   (async () => {
  //     const response = await productApi.getAll({ _page: 2, _limit: 10 });
  //     console.log(response);
  //   })();
  // }, []);
  const match = useRouteMatch();
  const history = useHistory();
  const productList = useAppSelector(selectProductList);
  const pagination = useAppSelector(selectProductPagination);
  const filter = useAppSelector(selectProductFilter);
  const loading = useAppSelector(selectProductLoading);
  const categoryMap = useAppSelector(selectCategoryMap);
  const categoryList = useAppSelector(selectCategoryList);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [dispatch, filter]);
  const handlePageChange = (e: any, page: number) => {
    dispatch(
      productActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    console.log('search filters:', newFilter);
    dispatch(productActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilter(newFilter));
  };
  const handleRemoveProduct = async (product: Product) => {
    try {
      // remove product api
      await productApi.remove(product?.id);
      toast.success('Xóa sản phẩm thành công', { icon: true });
      dispatch(productActions.setFilter({ ...filter }));
    } catch (error) {
      console.log('failed to fetch product:', error);
    }
  };
  const handleEditProduct = async (product: Product) => {
    history.push(`${match.url}/${product.id}`);
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h5">Sản Phẩm </Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm sản phẩm
          </Button>
        </Link>
      </Box>

      {/*Product Filters*/}
      <Box mb={3}>
        <ProductFilters
          filter={filter}
          categoryList={categoryList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      {/*Product Table*/}
      <ProductTable
        productList={productList}
        categoryMap={categoryMap}
        onRemove={handleRemoveProduct}
        onEdit={handleEditProduct}
      />

      {/*Pagination*/}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination?.total / pagination?.limit)}
          page={pagination?.page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
