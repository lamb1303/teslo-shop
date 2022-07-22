import React, { FC } from "react";
import Head from "next/head";
import { Navbar, SideMenu } from "../ui";
import { Box } from "@mui/material";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: React.ReactNode;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <Box
        sx={{
          margin: {
            sm: "80px",
            xs: "80px 15px",
          },
          maxWidth: 1740,
          padding: "0px 18px",
        }}
      >
        {children}
      </Box>
      <footer></footer>
    </>
  );
};
