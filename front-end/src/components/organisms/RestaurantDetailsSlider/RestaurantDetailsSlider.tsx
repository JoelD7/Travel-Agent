import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, CardActionArea, Dialog, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import Slider from "react-slick";
import { Colors } from "../../../styles";
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

  const imageSliderSettings = {
    className: style.imageSlider,
    nextArrow: <SliderArrow iconColor="white" variant="fullscreen" direction="right" />,
    prevArrow: <SliderArrow iconColor="white" variant="fullscreen" direction="left" />,
    slidesToShow: 1,
    initialSlide: initialImageSlide,
  };

  function openFullScreenImageSlider(initialSlide: number) {
    setInitialImageSlide(initialSlide);
    setViewerOpen(true);
  }

  function onFullScreenViewerClose() {
    setViewerOpen(false);
  }

  function onClose() {
    setViewerOpen(false);
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
        <IconButton onClick={() => onClose()} className={style.closeButton}>
          <FontAwesomeIcon size="xs" color={Colors.BLUE} icon={faTimes} />
        </IconButton>

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
