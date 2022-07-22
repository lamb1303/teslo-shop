import React, { useContext, useEffect, useState } from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { MuiButton } from "../../components/shared";
import { GetServerSideProps } from "next";
import { countries, jwt } from "../../utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { CartContext } from "../../context";

type FormData = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phoneNumber: string;
};

const getUserInfoFromCookies = () => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address1: Cookies.get("address1") || "",
    address2: Cookies.get("address2") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || countries[0].code,
    phoneNumber: Cookies.get("phoneNumber") || "",
    zipCode: Cookies.get("zipCode") || "",
  };
};

const AddressPage = () => {
  const [defaultCountry, setDefaultCountry] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    //defaultValues: getUserInfoFromCookies(),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      country: countries[0].code,
      phoneNumber: "",
      zipCode: "",
    },
  });
  const { updateAddress } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    const addressFromCookies = getUserInfoFromCookies();
    reset(addressFromCookies);
    setDefaultCountry(addressFromCookies.country);
  }, [reset, getUserInfoFromCookies]);
  // useEffect(() => {
  //   reset(getUserInfoFromCookies());
  // }, [reset]);

  const onSubmitUserInfo = (data: FormData) => {
    updateAddress(data);

    router.push("/checkout/summary");
  };
  return (
    <ShopLayout
      title={"Direccion"}
      pageDescription={"Confirmar direccion del destino"}
    >
      <Typography variant="h1" component="h1">
        Direccion
      </Typography>
      <form onSubmit={handleSubmit(onSubmitUserInfo)}>
        <Grid container spacing={12} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion"
              variant="filled"
              fullWidth
              {...register("address1", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address1}
              helperText={errors.address1?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion 2 (opcional)"
              variant="filled"
              fullWidth
              {...register("address2")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Codigo Postal"
              variant="filled"
              fullWidth
              {...register("zipCode", {
                required: "Este campo es requerido",
              })}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cuidad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Este campo es requerido",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {!!defaultCountry && (
                <TextField
                  select
                  variant="filled"
                  fullWidth
                  label="País"
                  defaultValue={defaultCountry}
                  {...register("country", {
                    required: "El país es requerido",
                  })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefono"
              variant="filled"
              fullWidth
              {...register("phoneNumber", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              type="number"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <MuiButton
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar Pedido
          </MuiButton>
        </Box>
      </form>
    </ShopLayout>
  );
};

// Process by request time stress out server
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {

//     },
//   };
// };

export default AddressPage;
