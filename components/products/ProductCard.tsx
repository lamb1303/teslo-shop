import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Link,
  Box,
  Chip,
} from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces";
import NextLink from "next/link";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageLoader, setImageLoader] = useState<boolean>(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `/products/${product.images[0]}`
        : `/products/${product.images[1]}`,
    [isHovered, product.images]
  );

  return (
    <Grid
      item
      xs={12}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="error"
                  sx={{
                    position: "absolute",
                    zIndex: 99,
                    top: '10px',
                    right: '10px'
                  }}
                  label="No hay productos"
                />
              )}
              <CardMedia
                className="fadeIn"
                component="img"
                alt={product.title}
                image={productImage}
                sx={{ filter: product.inStock === 0 ? "blur(2px)" : "none" }}
                onLoad={() => setImageLoader(true)}
              />
              <CardContent className="fadeIn" sx={{ height: "100px" }}>
                <Box
                  sx={{ mt: 1, display: imageLoader ? "block" : "none" }}
                  className="fadeIn"
                >
                  <Typography
                    fontWeight={400}
                    sx={{
                      xs: {
                        fontWeight: 100,
                      },
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography fontWeight={300}>
                    <strong>{`$${product.price}`}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
