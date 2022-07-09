import React, { useContext, useState } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import { UiContext } from "../../context/ui";
import { ClearOutlined } from "@mui/icons-material";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [term, setTerm] = useState("");
  const [isSearchVisible, setisSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (term.trim().length === 0) return null;
    push(`/search/${term}`);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </Link>
          </NextLink>
          <Box flex={1} />
          <Box
            className="fadeIn"
            sx={{
              display: isSearchVisible
                ? "none"
                : {
                    xs: "none",
                    sm: "block",
                    margin: 9,
                  },
            }}
          >
            <NextLink
              href={{
                pathname: `/category/men`,
              }}
              passHref
            >
              <Link>
                <Button color={asPath === "/category/men" ? "primary" : "info"}>
                  Hombres
                </Button>
              </Link>
            </NextLink>
            <NextLink
              href={{
                pathname: `/category/women`,
              }}
              passHref
            >
              <Link>
                <Button
                  color={asPath === "/category/women" ? "primary" : "info"}
                >
                  Mujeres
                </Button>
              </Link>
            </NextLink>
            <NextLink
              href={{
                pathname: `/category/kid`,
              }}
              passHref
            >
              <Link>
                <Button color={asPath === "/category/kid" ? "primary" : "info"}>
                  Niños
                </Button>
              </Link>
            </NextLink>
          </Box>
          <Box flex={1} />
          {isSearchVisible ? (
            <Input
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
              className="fadeIn"
              autoFocus={true}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setisSearchVisible(false)}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              className="fadeIn"
              onClick={() => setisSearchVisible(true)}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              <SearchOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
            }}
            onClick={toggleSideMenu}
          >
            <SearchOutlinedIcon />
          </IconButton>
          <NextLink href="/cart" passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>
          <Button onClick={toggleSideMenu}>Menu</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
