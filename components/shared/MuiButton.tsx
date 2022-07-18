import { Button, ButtonProps } from "@mui/material";
import React, { FC } from "react";

interface Props extends ButtonProps {}

export const MuiButton: FC<Props> = ({
  type,
  variant,
  color,
  children,
  size,
  disabled,
  fullWidth,
  className = "circular-btn",
  sx,
  onClick,
}) => {
  return (
    <Button
      sx={
        sx
          ? sx
          : {
              ":hover": {
                backgroundColor: "#274494",
              },
            }
      }
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      className={className}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};
