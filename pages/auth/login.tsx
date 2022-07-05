import { Grid, Typography, TextField, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { AuthLayout } from "../../components/layouts";
import { MuiButton } from "../../components/shared/MuiButton";
import NextLink from 'next/link';

const LoginPage = () => {
  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar Sesion
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              variant="filled"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <MuiButton color="secondary" size="large" fullWidth>
              Ingresar
            </MuiButton>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='end'>
            <NextLink href='/auth/register' passHref>
                <Link underline='always'>
                    No tienes cuenta?
                </Link>
                </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
