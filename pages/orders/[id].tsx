import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { entriesApi } from "../../apis";
import { useRouter } from "next/router";

export type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};
interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const { shippingAddress } = order;
  const summary = {
    numberOfItems: order.numberOfItems,
    subTotal: order.subTotal,
    tax: order.tax,
    total: order.total,
  };

  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No hay pago en paypal");
    }
    setIsPaying(true);

    try {
      const { data } = await entriesApi.post(`orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      console.log(error);
      setIsPaying(false);
      alert("Error");
    }
  };

  return (
    <ShopLayout
      title={"Resumen de la orden"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>
      {!order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
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

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {
                  <Box
                    display="flex"
                    justifyContent="center"
                    className="fadeIn"
                    sx={{ display: isPaying ? "flex" : "none" }}
                  >
                    <CircularProgress />
                  </Box>
                }

                <Box sx={{ display: isPaying ? "none" : "flex", flex: 1 }} flexDirection='column'>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                      label="Orden pagada"
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.total.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions
                          .order!.capture()
                          .then((details: OrderResponseBody) => {
                            onOrderCompleted(details);
                          });
                      }}
                    />
                  )}
                </Box>
              </Box>
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
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
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

export default OrderPage;
