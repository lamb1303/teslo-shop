import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces";
import NextLink from "next/link";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `products/${product.images[0]}`
        : `products/${product.images[1]}`,
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
        <NextLink href="/product/slug" passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <CardMedia
                className="fadeIn"
                component="img"
                alt={product.title}
                image={productImage}
              />
              <CardContent className="fadeIn" sx={{ height: "100px" }}>
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
                <Typography fontWeight={300}>{`$${product.price}`}</Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
