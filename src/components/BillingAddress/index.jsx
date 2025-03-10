import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Grid, FormControl, FormHelperText, InputAdornment, useTheme } from '@mui/material';
import { PhoneIphoneOutlined } from '@mui/icons-material';

// Validação com Yup
const validationSchema = Yup.object({
    road: Yup.string().required('Rua é obrigatória'),
    house_number: Yup.number().required('Número da casa é obrigatório'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatória'),
    complement: Yup.string(),
    postalCode: Yup.string().required('CEP é obrigatório'),
});

const BillingAddress = ({ handleSubmit, initialValues }) => {
    const theme = useTheme();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const formattedPostalCode = values.postalCode.replace('-', '');

                const updatedValues = {
                    ...values,
                    postalCode: formattedPostalCode,
                };
                handleSubmit(updatedValues);
            }}
        >
            {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="road">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Rua"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.road && Boolean(errors.road)}
                                            helperText={<ErrorMessage name="road" component={FormHelperText} />}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Campo de Número da Casa */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="house_number">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Número da Casa"
                                            variant="outlined"
                                            margin="normal"
                                            type="number"
                                            fullWidth
                                            error={touched.house_number && Boolean(errors.house_number)}
                                            helperText={<ErrorMessage name="house_number" component={FormHelperText} />}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Campo de Bairro */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="neighborhood">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Bairro"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.neighborhood && Boolean(errors.neighborhood)}
                                            helperText={<ErrorMessage name="neighborhood" component={FormHelperText} />}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="city">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Cidade"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={<ErrorMessage name="city" component={FormHelperText} />}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="complement">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Complemento"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.complement && Boolean(errors.complement)}
                                            helperText={<ErrorMessage name="complement" component={FormHelperText} />}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="postalCode">
                                    {({ field }) => (
                                        <InputMask
                                            mask="99999-999"
                                            {...field}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {() => (
                                                <TextField
                                                    {...field}
                                                    label="CEP"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    error={touched.postalCode && Boolean(errors.postalCode)}
                                                    helperText={<ErrorMessage name="postalCode" component={FormHelperText} />}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: theme.palette.secondary.main,
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: theme.palette.secondary.main,
                                                        },
                                                        "& .MuiFormHelperText-root": {
                                                            color: theme.palette.primary.main,
                                                        },
                                                    }}
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                </Field>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: '5px',
                                    textTransform: 'inherit',
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    color: theme.palette.primary.white,
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            >
                                Salvar Endereço
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default BillingAddress;
