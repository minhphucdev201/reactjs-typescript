import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import productApi from 'api/productApi';
import { Product } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';

export default function AddEditPage() {
  const history = useHistory();
  const { ProductId } = useParams<{ ProductId: string }>();

  const isEdit = Boolean(ProductId);
  // get data product
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    if (!ProductId) return;
    (async () => {
      try {
        const data: Product = await productApi.getById(ProductId);
        setProduct(data);
      } catch (error) {
        console.log('failed to fetch product details:', error);
      }
    })();
  }, [ProductId]);
  const initialValues: Product = {
    name: '',
    desc: '',
    price: '',
    picture: '',
    danhmuc: '',
    ...product,
  } as Product;

  const handleProductFormSubmit = async (formValues: Product) => {
    if (isEdit) {
      await productApi.update(formValues);
      toast.success('Cập nhật sản phẩm thành công', { icon: true });
    } else {
      await productApi.add(formValues);
      toast.success('Thêm sản phẩm thành công', { icon: true });
    }
    // throw new Error('My testing error');
    history.push('/admin/products');
  };
  return (
    <Box>
      <Link to="/admin/products">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Quay lại trang danh sách
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</Typography>
      {(!isEdit || Boolean(product)) && (
        <Box mt={3}>
          <ProductForm initialValues={initialValues} onSubmit={handleProductFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
