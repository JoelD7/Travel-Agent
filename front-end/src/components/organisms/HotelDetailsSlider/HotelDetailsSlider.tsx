import { Backdrop, CardActionArea, Dialog, makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { useState } from "react";
import Slider from "react-slick";
import { Colors, Shadow } from "../../../styles";
import { getHotelImages, HotelBooking } from "../../../utils";
import { SliderArrow } from "../../atoms";

interface HotelDetailsSlider {
  hotel: HotelBooking;
}

export function HotelDetailsSlider({ hotel }: HotelDetailsSlider) {
  const hotelDetailsSliderStyles = makeStyles((theme: Theme) => ({
    imageSlider: {
      width: "68vw",
      display: "flex",
      alignItems: "center",
      height: "100%",
      margin: "auto",

      [theme.breakpoints.down(1600)]: {
        width: "64vw",
      },
      [theme.breakpoints.down(1445)]: {
        width: "70vw",
      },
      [theme.breakpoints.down(1312)]: {
        width: "77vw",
      },
      [theme.breakpoints.down(1155)]: {
        width: "88vw",
      },
      [theme.breakpoints.down(837)]: {
        width: "92vw",
      },
      [theme.breakpoints.down(793)]: {
        width: "90vw",
      },
      [theme.breakpoints.down(635)]: {
        width: "88vw",
      },
      [theme.breakpoints.down(530)]: {
        width: "86vw",
      },
      [theme.breakpoints.down(450)]: {
        width: "94vw",
      },
    },
    paperImage: {
      maxWidth: "94vw",
      width: "auto",
      backgroundColor: Colors.TRANSPARENT,
      "&.MuiPaper-elevation24": {
        boxShadow: Shadow.TRANSPARENT,
      },
    },
    photoContainer: {
      height: "400px",
      margin: "50px 0px",
      [theme.breakpoints.down(1140)]: {
        height: "46vw",
      },
    },
    photoContainerImage: {
      maxWidth: "1004px",
    },
    photo: {
      objectFit: "cover",
      height: "100%",
      borderRadius: "10px",
      width: "97%",
      margin: "auto 5px",

      [theme.breakpoints.down(1140)]: {
        width: "auto",
        margin: "auto",
      },
    },
    photoInSlider: {
      objectFit: "cover",
      height: "100%",
      width: "100%",
      borderRadius: "10px",
    },
    slider: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  }));

  const style = hotelDetailsSliderStyles();

  const hotelPhotos = getHotelImages(hotel);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialImageSlide, setInitialImageSlide] = useState(0);

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1374,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <div style={{ marginBottom: "20px" }}>
      {/* Images slider */}
      <Slider {...sliderSettings} dots lazyLoad="ondemand">
        {hotelPhotos.map((photo, i) => (
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
        classes={{ paper: style.paperImage }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slider {...imageSliderSettings} lazyLoad="ondemand">
          {hotelPhotos.map((photo) => (
            <div key={photo} className={style.photoContainerImage}>
              <img src={`${photo}`} alt={`${photo}`} className={style.photoInSlider} />
            </div>
          ))}
        </Slider>
      </Dialog>
    </div>
  );
}
