import * as Yup from 'yup';
import { Grid, FormControl, TextField, FormHelperText, Button, Box, useTheme, InputAdornment, Typography, IconButton } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import AuthCard from '../Card';
import { Block, CategoryOutlined, Check, CloseOutlined, DriveFileRenameOutline, Groups } from '@mui/icons-material';

const validationSchema = Yup.object({
    capacity: Yup.number().required('Campo obrigatório'),
    name: Yup.string().required('Campo obrigatório'),
    status: Yup.string().required('Campo obrigatório'),
});


const MesasComponentEdit = ({ data, onSubmit, functionStates, onClose }) => {
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
                        initialValues={{
                            capacity: data.capacity,
                            name: data.name,
                            status: data.status,

                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <Field name="capacity">
                                                    {({ field }) => (
                                                        <FormControl fullWidth error={Boolean(errors.name && touched.name)}>

                                                            <TextField
                                                                {...field}
                                                                id="capacity"
                                                                type="number"
                                                                label="capacity"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <Groups sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
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
                                            <Grid item xs={4}>
                                                <Field name="name">
                                                    {({ field }) => (
                                                        <FormControl fullWidth error={Boolean(errors.name && touched.name)}>
                                                            <Grid item xs={12}></Grid>
                                                            <TextField
                                                                {...field}
                                                                id="name"
                                                                type="string"
                                                                label="Adicione o nome"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <DriveFileRenameOutline sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
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
                                            <Grid item xs={4}>
                                                <Field name="status">
                                                    {({ field }) => (
                                                        <FormControl fullWidth error={Boolean(errors.name && touched.name)}>
                                                            <TextField
                                                                {...field}
                                                                id="status"
                                                                type="string"
                                                                label="Altere o status"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {data.status === "livre" ? (
                                                                                <Check sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
                                                                            ) : (
                                                                                <Block sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
                                                                            )}

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
                                        </Grid>
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

export default MesasComponentEdit
