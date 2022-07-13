import { Grid, Typography, TextField, Link, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthLayout } from "../../components/layouts";
import { MuiButton } from "../../components/shared/MuiButton";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { entriesApi } from "../../apis";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";

type FormData = {
  email: string;
  name: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterUser = async ({ email, password, name }: FormData) => {
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setErrorMessage(message!);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace("/");
    // Replaced because we have the user context
    
    // try {
    //   const { data } = await entriesApi.post("/user/register", {
    //     name,
    //     email,
    //     password,
    //   });

    //   const { token, user } = data;

    //   console.log({ token, user });
    // } catch (error) {
    //   console.log(error);
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    // }
  };
  return (
    <AuthLayout title={"Registro"}>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              <Chip
                label="No se reconoce usuario/contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Nombre requerido",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Correo requerido",
                  validate: (val) => validations.isEmail(val),
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                variant="filled"
                type="password"
                fullWidth
                {...register("password", {
                  required: "Contraseña requerida",
                  minLength: {
                    value: 6,
                    message: "Ingresar al menos 6 letras",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiButton type="submit" color="secondary" size="large" fullWidth>
                Crear
              </MuiButton>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
