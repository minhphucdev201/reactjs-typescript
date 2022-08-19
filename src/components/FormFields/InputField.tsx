import { TextField } from '@material-ui/core';
import React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}
export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      label={label}
      variant="outlined"
      // inputRef={ref}
      onBlur={onBlur}
      onChange={onChange}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
