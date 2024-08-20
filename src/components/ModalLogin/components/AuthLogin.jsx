import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneIphoneOutlined from "@mui/icons-material/PhoneIphoneOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ReactInputMask from "react-input-mask";
import { login } from "@/service/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { SET_ALERT, SET_LOGIN_DATA, SET_LOGIN_MENU, showAlert } from "@/store/actions";
import { usePathname, useRouter } from "next/navigation";

const numberMask = "(99) 99999-9999";

const AuthLogin = ({ modal, setMode }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname()
  const alert = useSelector(state => state.alert)
  console.log(alert, '901239293921932939')
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedValues = {
        ...values,
        phone: values.phone.replace(/\D/g, ''),
      };


      const response = await login(formattedValues);
      const { accessToken, refreshToken, role, message } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("role", role)
      console.log(response.data, '11')
      if (role === "ADMIN") {
        router.push("/admin");
        dispatch(showAlert(message, "success", "user"))
      }
      console.log(response, 123232939239291392n)
      dispatch({ type: SET_ALERT, message: message, severity: "success", type: "user" })
      dispatch({ type: SET_LOGIN_DATA })
      if (path === '/login') {
        router.push("/")
      }
      closeModal();
    } catch (error) {
      dispatch(showAlert(error.message, "error", "key"))
      console.error("Erro ao fazer login!", error);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    dispatch({ type: SET_LOGIN_MENU, opened: false });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.phone) {
      errors.phone = "Campo obrigatório";
    }

    if (!values.senha) {
      errors.senha = "Campo obrigatório";
    }

    return errors;
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ mb: { lg: 0, xs: 0 } }}
    >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="titleLogin"
                  fontWeight="400"
                  lineHeight={"40px"}
                  sx={{ color: "#FF4D00" }}
                >
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography>
                    Se você ainda não tem conta e deseja criar
                  </Typography>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "inherit",
                      p: 0,
                      color: "#FF4D00",
                    }}
                    onClick={() => setMode("register")}
                  >
                    Registre-se aqui!
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={{ phone: "", senha: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} container spacing={1}>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="phone" sx={{ color: "#FFF" }}>
                        Telefone
                      </InputLabel>
                      <Field name="phone">
                        {({ field }) => (
                          <FormControl
                            fullWidth
                            error={Boolean(errors.phone && touched.phone)}
                          >
                            <ReactInputMask
                              mask={numberMask}
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {(inputProps) => (
                                <InputBase
                                  {...field}
                                  {...inputProps}
                                  id="phone"
                                  type="text"
                                  placeholder="Digite seu telefone"
                                  sx={{
                                    mt: 1,
                                    borderRadius: "8px",
                                    border: `2px solid #FF4D00`,
                                    p: 1,
                                    "&:hover": {
                                      borderColor: "#fff",
                                    },
                                    "&:focus": {
                                      borderColor: "#FF4D00",
                                    },
                                  }}
                                  InputProps={{
                                    sx: {
                                      py: 0.5,
                                      color: "#fff",
                                      "& input::placeholder": {
                                        color: "#fff",
                                      },
                                    },
                                  }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <PhoneIphoneOutlined
                                        sx={{ color: "#FFF", width: 17, height: 17 }}
                                      />
                                    </InputAdornment>
                                  }
                                />
                              )}
                            </ReactInputMask>

                            {errors.phone && touched.phone && (
                              <FormHelperText error>
                                {errors.phone}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="senha" sx={{ color: "#FFF" }}>
                        Senha
                      </InputLabel>
                      <Field name="senha">
                        {({ field }) => (
                          <FormControl
                            fullWidth
                            sx={{ mt: 1 }}
                            error={Boolean(errors.senha && touched.senha)}
                          >
                            <InputBase
                              {...field}
                              id="senha"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              placeholder="Insira sua senha"
                              sx={{
                                borderRadius: "8px",
                                border: `2px solid #FF4D00`,
                                p: 1,
                                "&:hover": {
                                  borderColor: "#fff",
                                },
                                "&:focus": {
                                  borderColor: "#FF4D00",
                                },
                              }}
                              InputProps={{
                                sx: {
                                  py: 0.5,
                                  color: "#fff",
                                  "& input::placeholder": {
                                    color: "#fff",
                                  },
                                },
                              }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <LockOutlinedIcon
                                    sx={{ color: "#FFF", width: 17, height: 17 }}
                                  />
                                </InputAdornment>
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility}
                                  >
                                    {showPassword ? (
                                      <Visibility
                                        sx={{ color: "#FFF", width: 17, height: 17 }}
                                      />
                                    ) : (
                                      <VisibilityOff
                                        sx={{ color: "#FFF", width: 17, height: 17 }}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {errors.senha && touched.senha && (
                              <FormHelperText error>
                                {errors.senha}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent={"space-between"}
                    >
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#FFF",
                                "&.Mui-checked": {
                                  color: "#FF4D00",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography variant="subtitle1" sx={{ color: "#FFF" }}>
                              Lembrar-me
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="text"
                          sx={{
                            textTransform: "inherit",
                            p: 0,
                            color: "#FFF",
                          }}
                          onClick={() => setMode("forgotPassword")}
                        >
                          <Typography variant="subtitle1" sx={{ color: "#FFF" }}>
                            Esqueceu a senha?
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%", mb: { xs: 2, sm: 3, lg: 2 } }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={isSubmitting}
                          sx={{
                            backgroundColor: "#FF4D00", color: "#FFF",
                            border: `1px solid #FF4D00`,
                            ":hover": {
                              bgcolor: 'transparent',
                              color: "#FF4D00"
                            }
                          }}

                        >
                          Entrar
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AuthLogin;
