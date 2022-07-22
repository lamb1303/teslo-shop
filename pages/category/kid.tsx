import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const Kid = () => {
  const { products, isError, isLoading } = useProducts("/products?gender=kid");
  return (
    <ShopLayout
      title={"Teslo-Shop-Kid"}
      pageDescription={"Encuentra los mejores productos para niños"}
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Kid;
