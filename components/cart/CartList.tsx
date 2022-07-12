import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC, useContext } from "react";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeProductInCart } =
    useContext(CartContext);
  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1, p: 3 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column" sx={{ p: 1 }}>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla : <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  updatedQuantity={(value) =>
                    updateCartQuantity(product, value)
                  }
                  maxValue={10}
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "products" : "producto"}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeProductInCart(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
