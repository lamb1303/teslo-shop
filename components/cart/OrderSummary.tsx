import React, { FC, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "../../context";
import { currency } from "../../utils";

interface Summary{
  numberOfItems: number;
  tax: number;
  total: number;
  subTotal: number;
}

interface Props {
  summary?: Summary
}

export const OrderSummary:FC<Props> = ({summary}) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);
  const summaryValues = summary ? summary : { numberOfItems, subTotal, tax, total }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'productos':'producto'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos: {Number(process.env.NEXT_PUBLIC_TAX_RATE )* 100}%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total: </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
      </Grid>
    </Grid>
  );
};
