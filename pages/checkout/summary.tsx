import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { MuiButton } from "../../components/shared";
import NextLink from "next/link";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if(hasError){
      setIsPosting(false)
      setErrorMessage(message)
      return
    }

    router.replace(`/orders/${message}`)
  };

  if (!shippingAddress) {
    return <></>;
  }

  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    country,
    zipCode,
    phoneNumber,
  } = shippingAddress;
  return (
    <ShopLayout
      title={"Resumen de orden"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Resumen ({numberOfItems}{" "}
                {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>{firstName}</Typography>
              <Typography>
                {lastName}
                {address1 ? `, ${address1}` : `, ${address2}`}
              </Typography>
              <Typography>
                {city} {zipCode}
              </Typography>
              <Typography>
                {/* {
                  countries.find((c) => c.code === country)
                    ?.name
                } */}
                {country}
              </Typography>
              <Typography>{phoneNumber}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {/* <NextLink href={"/orders/123"} passHref>
                  <Link> */}
                <MuiButton
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirmar Orden
                </MuiButton>
                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
                />
                {/* </Link>
                </NextLink> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
