import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";


const Women: NextPage = () => {
  const { products, isError, isLoading } = useProducts("/products?gender=women");
  return (
    <ShopLayout
      title={"Teslo-Shop-Women"}
      pageDescription={"Encuentra los mejores productos para mujeres"}
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Women;
