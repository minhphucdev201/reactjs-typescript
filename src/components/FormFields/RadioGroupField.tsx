import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl error={invalid}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
