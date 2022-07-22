import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

export const FullScreenLoading = () => {
  return (
    <Box
      width={"100%"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      flexDirection={"column"}
      height="calc(100vh - 200px)"
    >
      <Typography variant="h1" component={"h1"} height={50} fontWeight={100}>
        Cargando...
      </Typography>
      <LinearProgress sx={{ width: 300 }} />
    </Box>
  );
};
