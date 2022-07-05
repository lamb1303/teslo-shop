import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { initialData } from "../../database/products";
import NextLink from "next/link";
import { ItemCounter } from "../ui";

const productsInCart = [initialData.products[0], initialData.products[1]];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable=false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container key={product.slug}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column" sx={{p: 1}}>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla : <strong>M</strong>
              </Typography>

              {editable ? <ItemCounter /> : <Typography variant='h5'>2 items</Typography>}
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
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
