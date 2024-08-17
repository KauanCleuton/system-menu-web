import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material';
import { Field } from 'formik';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const TextInput = (props) => {
  const [showPass, setShowPass] = useState(false);
  const theme = useTheme();
  const {
    label,
    name,
    mask,
    rawValueRegex,
    maskChar,
    setFieldValue,
    touched,
    errors,
    required,
    type,
    values,
    ...rest
  } = props;
  return mask ? (
    <Field name={name}>
      {({ field }) => (
        <InputMask
          mask={mask}
          maskChar={maskChar || null}
          value={values[field.name]}
          onChange={(e) => {
            const rawValue = e.target.value.replace(rawValueRegex || /\D/g, '');
            setFieldValue(field.name, rawValue);
          }}
          onBlur={field.onBlur}
          //{...rest}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              required={required || false}
              label={label}
              variant="outlined"
              fullWidth
              error={touched[name] && Boolean(errors[name])}
              helperText={touched[name] && errors[name]}
              InputProps={{
                sx: {
                  color: '#000',
                  '&::placeholder': {
                    color: '#000',
                  },
                },
              }}
              sx={{
                borderRadius: '5px',
                color: '#000',
              }}
            />
          )}
        </InputMask>
      )}
    </Field>
  ) : (
    <Field
      name={name}
      as={TextField}
      type={
        type === 'password' ? (showPass ? 'text' : 'password') : type || 'text'
      }
      label={label}
      variant="outlined"
      error={touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
      fullWidth
      required={required || false}
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPass((currentState) => !currentState)}
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              {showPass ? (
                <VisibilityOffOutlined sx={{ width: 20, height: 20 }} />
              ) : (
                <VisibilityOutlined sx={{ width: 20, height: 20 }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          color: '#000',
          '&::placeholder': {
            color: '#000',
          },
        },
      }}
      sx={{
        borderRadius: '5px',
        color: '#000',
      }}
      //{...rest}
    />
  );
};

export default TextInput;
