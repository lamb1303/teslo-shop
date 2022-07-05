import { Button, ButtonProps } from "@mui/material";
import React, { FC } from "react";

interface Props extends ButtonProps {}

export const MuiButton: FC<Props> = ({
  variant,
  color,
  children,
  size,
  disabled,
  fullWidth,
  className = "circular-btn",
  onClick
}) => {
  return (
    <Button
      sx={{
        ":hover": {
          backgroundColor: "#274494",
        },
      }}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      className={className}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
