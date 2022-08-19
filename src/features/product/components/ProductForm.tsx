import { Box, Button } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Product } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export interface ProductFormProps {
  initialValues?: Product;
  onSubmit?: (formValues: Product) => void;
}

export default function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const { control, handleSubmit } = useForm<Product>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: Product) => {
    console.log('Submit', formValues);
  };
  return (
    <Box maxWidth={500}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Tên sản phẩm" />
        <InputField name="price" control={control} label="Giá sản phẩm" />

        <InputField name="picture.name" control={control} label="Hình ảnh"></InputField>

        <InputField name="desc" control={control} label="Mô tả" />
        <InputField name="danhmuc.title" control={control} label="Danh mục" />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
