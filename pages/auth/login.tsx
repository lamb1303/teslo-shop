import {
  Grid,
  Typography,
  TextField,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { AuthLayout } from "../../components/layouts";
import { MuiButton } from "../../components/shared/MuiButton";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { entriesApi } from "./../../apis/";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";
import { getSession, signIn, getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";
type FormData = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const { replace, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  // const { loginUser } = useContext(AuthContext);
  const [providers, setProviders] = useState<any>({});

  // useEffect(() => {
  //   getProviders().then((prov) => {
  //     setProviders(prov);
  //   });
  // }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    await signIn("credentials", {
      email,
      password,
    });
    // Without NextAuth

    //   const isValidLogin = await loginUser(email, password)
    //   if(!isValidLogin){
    //     setShowError(true)
    //     setTimeout(() => {
    //       setShowError(false);
    //     }, 3000);
    //     return;
    //   }
    //  const destination = query.p?.toString() || '/'
    //   replace(destination)

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
              <NextLink
                href={
                  query.p ? `/auth/register?p=${query.p}` : "/auth/register"
                }
                passHref
              >
                <Link underline="always">No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>

          {/* <Grid item xs={12} display="flex" justifyContent="end" flexDirection='column'>
            <Divider sx={{ width: "100%", mb: 2 }} />
            {Object.values(providers).map((provider: any) => {
              if(provider.id === 'credentials'){
                return <Box key='credentials'></Box>
              }
              return (
                <MuiButton
                onClick={()=> signIn(provider.id)}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  key={provider.id}
                  sx={{
                    ":hover": {
                      backgroundColor: "#3A64D8",
                      color: 'white'
                    },
                  }}
                >
                  {provider.name}
                </MuiButton>
              );
            })}
          </Grid> */}
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default LoginPage;
