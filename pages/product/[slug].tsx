import { Box, Chip, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from "../../components/products/SizeSelector";
import { MuiButton } from "../../components/shared";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { dbProducts } from "../../database";
import { useRouter } from "next/router";
import { CartContext } from "../../context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { push, query } = useRouter();
  const { addToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((prevState) => ({
      ...prevState,
      size,
    }));
  };

  const onUpdatedQuantity = (quantity: number) => {
    setTempCartProduct((prevState) => ({
      ...prevState,
      quantity,
    }));
  };

  const onAddtoCart = () => {
    if(!tempCartProduct.size) return;
    addToCart(tempCartProduct);
    push({
      pathname: "/cart",
    });
  };

  // Next recommend not use this form to get the data
  // const { query } = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${query.slug}`);

  return (
    <ShopLayout title={product.title} pageDescription={""}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                updatedQuantity={onUpdatedQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
                currentValue={tempCartProduct.quantity}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>
            {product.inStock > 0 ? (
              <MuiButton color="secondary" onClick={onAddtoCart}>
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </MuiButton>
            ) : (
              <Chip
                label="No hay productos disponibles"
                color="error"
                variant="outlined"
              />
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// Dont use this option SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const products = await dbProducts.getAllProductsBySlug();

  return {
    paths: products.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 1, // 60 * 60 * 24 = 24h = 86400
  };
};
export default ProductPage;
