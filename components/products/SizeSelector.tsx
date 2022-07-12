import { Box, Button } from "@mui/material";
import React, { FC } from "react";
import { ISize } from "../../interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize)=> void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          size="small"
          key={size}
          color={selectedSize === size ? "primary" : "info"}
          sx={{m: 1}}
          onClick={()=>onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
