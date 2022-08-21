import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { selectCategoryOptions } from 'features/category/categorySlice';
import { Product } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ProductFormProps {
  initialValues?: Product;
  onSubmit?: (formValues: Product) => void;
}

export default function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập tên sản phẩm')
      .test('two-words', 'Vui lòng nhập 2 từ ', (value) => {
        if (!value) return true;

        const parts = value?.split(' ') || [];
        return parts.filter((x) => Boolean(x)).length >= 2;
      }),
    price: yup
      .number()
      .integer('Vui lòng nhập con số')
      .required('Vui lòng nhập vào giá sản phẩm')
      .typeError('Vui lòng nhập con số'),
    desc: yup.string().required('Vui lòng nhập mô tả cho sản phẩm'),
    // picture: yup.string().required('Vui lòng paste link img!!'),
    danhmuc: yup.string().required('Vui lòng chọn danh mục'),
  });
  const [error, setError] = useState<any>();
  const categoryOptions = useAppSelector(selectCategoryOptions);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Product>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Product) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('failed to add/update product', error);
      // setError(error.message);
    }
  };
  return (
    <Box maxWidth={500}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Tên sản phẩm" />
        <InputField name="price" control={control} label="Giá sản phẩm" />

        <InputField name="picture.name" control={control} label="Hình ảnh"></InputField>

        <InputField name="desc" control={control} label="Mô tả" />
        {Array.isArray(categoryOptions) && categoryOptions.length > 0 && (
          <SelectField
            name="danhmuc"
            control={control}
            label="Danh mục"
            options={categoryOptions}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
