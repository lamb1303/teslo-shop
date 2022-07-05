import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { MuiButton } from "../../components/shared";
import NextLink from 'next/link';

const CartPage = () => {
  return (
    <ShopLayout title={"Carrito"} pageDescription={"Carrito de compras"}>
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Orden
              </Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
               <NextLink href={'/checkout/summary'} passHref>
                <Link>
                <MuiButton color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </MuiButton>
                </Link>
               </NextLink>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;