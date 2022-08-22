import * as React from 'react';
import { Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
export interface PhotoFieldProps {
  form: any;
  name: string;
  //   label?: string;
  disable?: boolean;
  capture?: string;
}

export function PhotoField(props: PhotoFieldProps) {
  const { form, name, disable, capture } = props;
  const { errors, watch, formState } = form;
  const previewImageUrl = watch(name);
  const hasError = formState.touched[name] && errors[name];
  const captureParams = capture ? { capture } : {};
  const { enqueueSnackbar } = useSnackbar();
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    if (!selectedFile) return;

    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(selectedFile.type)) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        form.setValue(name, { file: selectedFile, base64: reader.result as string });
      });
      reader.readAsDataURL(selectedFile);
    } else {
      enqueueSnackbar('Invalid File ', { variant: 'error' });
    }
  };
  return (
    <Controller
      name={name}
      control={form.control}
      render={() => (
        <input
          hidden
          id="contained-button-file"
          type="file"
          name={name}
          accept="image/*"
          multiple
          //   disabled={disabled}
          onChange={handleFileChange}
        />
      )}
    />
    // <label htmlFor="contained-button-file">
    //     <Button variant="contained" color="primary" component="span" style={{ backgroundColor: "#03DAC5" }}>
    //       {defaultLanguage.Post_pictures_from_the_computer}
    //     </Button>
    //   </label>
  );
}
