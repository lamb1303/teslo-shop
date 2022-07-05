import React from "react";
import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>2 items</Typography>
      </Grid>
      <Grid item xs={6} >
      <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
      <Typography>$155.55</Typography>
      </Grid>
      <Grid item xs={6} >
      <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
      <Typography>$45.55</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt: 1}} >
      <Typography variant='subtitle1'>Total: </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
      <Typography variant='subtitle1'>$200.55</Typography>
      </Grid>
    </Grid>
  );
};
