import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const Men = () => {
  const { products, isError, isLoading } = useProducts("/products?gender=Men");
  return (
    <ShopLayout
      title={"Teslo-Shop-Men"}
      pageDescription={"Encuentra los mejores productos para niños"}
    >
      <Typography variant="h1" component="h1">
        Hombre
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Men;
