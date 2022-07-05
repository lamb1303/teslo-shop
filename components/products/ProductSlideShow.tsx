import React, { FC } from "react";
import Carousel from "react-material-ui-carousel";
import styles from "./ProductSildeShow.module.css";

interface Props {
  images: string[];
}

export const ProductSlideShow: FC<Props> = ({ images }) => {
  return (
    <Carousel height={600}>
      {images.map((img) => {
        const url = `/products/${img}`;
        return (
          <div className={styles["each-slide"]} key={img}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                borderRadius: 3
              }}
            ></div>
          </div>
        );
      })}
    </Carousel>
  );
};
