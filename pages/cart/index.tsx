import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { MuiButton } from "../../components/shared";
import NextLink from "next/link";
import { CartContext } from "../../context";
import { useRouter } from "next/router";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if(!isLoaded || cart.length === 0){
    return <></>
  }

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
                <NextLink href={"/checkout/address"} passHref>
                  <Link>
                    <MuiButton
                      color="secondary"
                      className="circular-btn"
                      fullWidth
                    >
                      Checkout
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
