import { Grid, Typography, TextField, Link, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthLayout } from "../../components/layouts";
import { MuiButton } from "../../components/shared/MuiButton";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { entriesApi } from "./../../apis/";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";
type FormData = {
  email: string;
  password: string;
};
const LoginPage = () =>  {
  const {replace} = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const {loginUser} = useContext(AuthContext)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password)
    if(!isValidLogin){
      setShowError(true)
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return; 
    }

    replace('/')

    // Replaced because we have the user context

    // try {
    //   const { data } = await entriesApi.post("/user/login", {
    //     email,
    //     password,
    //   });
    //   const { token, user } = data;
    // } catch (error) {
    //   console.log(error);
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    // }
  };
  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesion
              </Typography>
              <Chip
                label="Usuario o contraseña no validos"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: (val) => validations.isEmail(val),
                })}
                label="Correo"
                variant="filled"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "Ingresar al menos 6 letras",
                  },
                })}
                label="Contraseña"
                variant="filled"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiButton type="submit" color="secondary" size="large" fullWidth>
                Ingresar
              </MuiButton>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
