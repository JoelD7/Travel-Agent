import { Backdrop, CardActionArea, Dialog } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import Slider from "react-slick";
import { SliderArrow } from "../../atoms";
import { restaurantDetailSliderStyles } from "./restaurantDetailSliderStyles";

interface RestaurantDetailsSlider {
  photos: string[];
}

export function RestaurantDetailsSlider({ photos }: RestaurantDetailsSlider) {
  const style = restaurantDetailSliderStyles();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialImageSlide, setInitialImageSlide] = useState(0);

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 1,
  };

  const sliderArrowStyles: CSSProperties = {
    backgroundColor: "#00000075",
    "&:hover": {
      backgroundColor: "#000000b5",
    },
  };

  const imageSliderSettings = {
    className: style.imageSlider,
    nextArrow: (
      <SliderArrow style={sliderArrowStyles} iconColor="#b6b6b6" direction="right" />
    ),
    prevArrow: (
      <SliderArrow style={sliderArrowStyles} iconColor="#b6b6b6" direction="left" />
    ),
    slidesToShow: 1,
    initialSlide: initialImageSlide,
  };

  function openFullScreenImageSlider(initialSlide: number) {
    setInitialImageSlide(initialSlide);
    setViewerOpen(true);
  }

  return (
    <div>
      {/* Images slider */}
      <Slider {...sliderSettings} dots lazyLoad="ondemand">
        {photos.map((photo, i) => (
          <CardActionArea
            key={photo}
            className={style.photoContainer}
            onClick={() => openFullScreenImageSlider(i)}
          >
            <img src={`${photo}`} alt={`${photo}`} className={style.photo} />
          </CardActionArea>
        ))}
      </Slider>

      {/* Fullscreen images */}
      <Dialog
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        BackdropComponent={Backdrop}
        classes={{ paper: style.paperImage, paperScrollPaper: style.paperScrollPaper }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slider {...imageSliderSettings} lazyLoad="ondemand">
          {photos.map((photo) => (
            <div key={photo} className={style.photoContainerImage}>
              <img src={`${photo}`} alt={`${photo}`} className={style.photoInSlider} />
            </div>
          ))}
        </Slider>
      </Dialog>
    </div>
  );
}
