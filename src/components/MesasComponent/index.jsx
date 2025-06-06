import * as Yup from 'yup';
import { Grid, FormControl, TextField, FormHelperText, Button, Box, useTheme, InputAdornment, Typography, IconButton } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import AuthCard from '../Card';
import { CategoryOutlined, CloseOutlined } from '@mui/icons-material';

const validationSchema = Yup.object({
    quantity: Yup.number().required('Campo obrigatório'),
});


const MesasComponent = ({ data, onSubmit, functionStates, onClose }) => {
    const theme = useTheme()
    return (
        <Box sx={{
            maxWidth: 500,
            width: "100%",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            bgcolor: '#141414',
            boxShadow: 24,
            borderRadius: '10px',
        }}>
            <Grid container spacing={0}>
                <Grid item xs={12} >
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <IconButton onClick={onClose} sx={{
                            color: theme.palette.primary.main
                        }}>
                            <CloseOutlined sx={{ width: 36, height: 36 }} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant='h5' color='primary' sx={{
                        textAlign: 'center'
                    }}>
                        {functionStates === 'create' ? 'Cadastrar Nova Mesa' : 'Editar Mesa'}
                    </Typography>
                </Grid>
                <Grid item xs={12} px={2} mt={2}>
                    <Formik
                        initialValues={{ quantity: "" }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Field name="quantity">
                                            {({ field }) => (
                                                <FormControl fullWidth error={Boolean(errors.name && touched.name)}>
                                                    <TextField
                                                        {...field}
                                                        id="quantity"
                                                        type="number"
                                                        label="Adicione a quantidade"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <CategoryOutlined sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: {
                                                                style: { color: theme.palette.primary.main }
                                                            }
                                                        }}
                                                        sx={{
                                                            "& .MuiInputBase-input": {
                                                                color: theme.palette.primary.white
                                                            },
                                                            "& .MuiFormLabel-root": {
                                                                color: theme.palette.primary.white
                                                            },
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": {
                                                                    borderWidth: 2,
                                                                    borderColor: theme.palette.primary.main
                                                                },
                                                                "&:hover fieldset": {
                                                                    borderColor: theme.palette.primary.main
                                                                },
                                                                "&.Mui-focused fieldset": {
                                                                    borderColor: theme.palette.primary.main
                                                                }
                                                            },
                                                            "& .MuiFormHelperText-root": {
                                                                color: theme.palette.primary.main
                                                            }
                                                        }}
                                                    />
                                                    {errors.quantity && touched.quantity && (
                                                        <FormHelperText error>{errors.quantity}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} mb={3}>
                                        <Box sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                sx={{
                                                    bgcolor: theme.palette.primary.main,
                                                    color: theme.palette.primary.white,
                                                    px: 4
                                                }}
                                            >
                                                {functionStates === 'create' ? 'Cadastrar' : 'Salvar Alteração'}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MesasComponent
