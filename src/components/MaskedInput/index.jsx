import React from 'react';
import { Field } from 'formik';
import { FormControl, FormHelperText, InputLabel, InputAdornment, OutlinedInput } from '@mui/material';
import InputMask from 'react-input-mask';

const MaskedInput = ({ name, label, mask, placeholder, adornment, onChange, value }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl fullWidth variant="outlined" error={form.touched[name] && Boolean(form.errors[name])}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <InputMask
            {...field}
            mask={mask}
            id={name}
            maskChar={null}
            placeholder={placeholder}
            value={value}
            onChange={e => {
              form.setFieldValue(name, e.target.value);
              if (onChange) onChange(e);
            }}
          >
            {inputProps => (
              <OutlinedInput
                {...inputProps}
                label={label}
                sx={{
                  color: theme.palette.secondary.main
                }}
                startAdornment={adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null}
              />
            )}
          </InputMask>
          {form.touched[name] && form.errors[name] ? (
            <FormHelperText>{form.errors[name]}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    </Field>
  );
};

export default MaskedInput;
