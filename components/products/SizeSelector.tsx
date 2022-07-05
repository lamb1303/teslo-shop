import { Box, Button } from "@mui/material";
import React, { FC } from "react";
import { ISize } from "../../interfaces";

interface Props {
  selectedSize: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          size="small"
          key={size}
          color={selectedSize === size ? "primary" : "info"}
          sx={{m: 1}}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
