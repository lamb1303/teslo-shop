import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { CartList, OrderSummary } from "../../../components/cart";
import { ShopLayout } from "../../../components/layouts";
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interfaces";

interface Props {
    order: IOrder;
  }

const OrdersPage:NextPage<Props> = ({order}) => {
    const { shippingAddress } = order;
    const summary = {
        numberOfItems: order.numberOfItems,
        subTotal: order.subTotal,
        tax: order.tax,
        total: order.total,
      };
  return (
    <ShopLayout title={"Orden"} pageDescription={"Administrar ordenes"}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: {
            xs: 18,
            sm: 32,
          },
        }}
      >
        Orden: {order._id}
      </Typography>
      {!order.isPaid ? (
        <Chip
          sx={{
            my: 2,
            sm: {
              fontSize: 10,
            },
          }}
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
          label="Pendiente de pago"
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
          label="Orden ya fue pagada"
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Resumen ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address1}{" "}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ""}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zipCode}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phoneNumber}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary summary={summary} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrdersPage;
