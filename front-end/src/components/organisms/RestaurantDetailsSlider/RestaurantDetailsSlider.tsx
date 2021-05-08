import { Backdrop, CardActionArea, Dialog } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { setBlurredScreen } from "../../../utils";
import { SliderArrow } from "../../atoms";
import { restaurantDetailSliderStyles } from "./restaurantDetailSliderStyles";

interface RestaurantDetailsSlider {
  photos: string[];
}

export function RestaurantDetailsSlider({ photos }: RestaurantDetailsSlider) {
  const style = restaurantDetailSliderStyles();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialImageSlide, setInitialImageSlide] = useState(0);

  const dispatch = useDispatch();

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
    dispatch(setBlurredScreen(true));
    setInitialImageSlide(initialSlide);
    setViewerOpen(true);
  }

  function onFullScreenViewerClose() {
    setViewerOpen(false);
    dispatch(setBlurredScreen(false));
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
        onClose={() => onFullScreenViewerClose()}
        BackdropComponent={Backdrop}
        classes={{ paper: style.paperImage, paperScrollPaper: style.paperScrollPaper }}
        BackdropProps={{
          timeout: 500,
          classes: { root: style.backdrop },
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
