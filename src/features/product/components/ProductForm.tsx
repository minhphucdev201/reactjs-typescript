import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { selectCategoryOptions } from 'features/category/categorySlice';
import { Product } from 'models';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
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
    picture: yup.string().required('Vui lòng paste link img!!'),
    danhmuc: yup.string().required('Vui lòng chọn danh mục'),
  });
  const categoryOptions = useAppSelector(selectCategoryOptions);
  const { control, handleSubmit } = useForm<Product>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
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
        <SelectField name="danhmuc" control={control} label="Danh mục" options={categoryOptions} />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
