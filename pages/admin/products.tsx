import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import useSWR from "swr";
import NextLink from "next/link";
import { AdminLayout } from "../../components/layouts";
import { IProduct } from "../../interfaces";
import { MuiButton } from "../../components/shared";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            alt={row.title}
            component={"img"}
            className="fadeIn"
            image={`${row.img}`}
            sx={{ objectFit: "cover" }}
            height={150}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
    width: 250,
  },
  {
    field: "gender",
    headerName: "Genero",
  },
  {
    field: "type",
    headerName: "Tipo",
  },
  {
    field: "inStock",
    headerName: "No. Productos",
    width: 150,
    align: "center",
  },
  {
    field: "price",
    headerName: "Precio",
  },
  {
    field: "sizes",
    headerName: "Talla",
    width: 250,
  },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) {
    return <></>;
  }

  const rowFormatted = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));
  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subtitle={"Mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <Box display={"flex"} justifyContent="end" sx={{ mb: 2 }}>
        <MuiButton
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Crear Producto
        </MuiButton>
      </Box>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rowFormatted}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
