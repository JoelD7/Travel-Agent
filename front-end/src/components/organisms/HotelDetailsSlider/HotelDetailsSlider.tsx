import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  CardActionArea,
  Dialog,
  Grid,
  Grow,
  IconButton,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
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
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    closeButton: {
      marginLeft: "auto",
      marginBottom: "32px",
      width: 30,
      height: 30,
      position: "absolute",
      right: 0,
      zIndex: 4,
      backgroundColor: "white",

      "&:hover": {
        backgroundColor: "#e0e0e0",
      },

      [theme.breakpoints.down(790)]: {
        top: "5px",
      },
      [theme.breakpoints.down(570)]: {
        top: 30,
      },
      [theme.breakpoints.down(525)]: {
        top: 60,
      },
    },
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
      [theme.breakpoints.down(500)]: {
        width: "100vw",
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
      objectFit: "contain",
      maxWidth: "100%",
      height: "calc(100vh - 75px)",
      width: "auto",
      margin: "auto",
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

  const is500pxOrLess = useMediaQuery("(max-width:500px)");

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

  const imageSliderSettings = {
    className: style.imageSlider,
    nextArrow: <SliderArrow variant="fullscreen" direction="right" />,
    prevArrow: <SliderArrow variant="fullscreen" direction="left" />,
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

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Images slider */}
      <Slider {...sliderSettings} lazyLoad="ondemand">
        {hotelPhotos.map((photo, i) => (
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <CardActionArea
              key={photo}
              className={style.photoContainer}
              onClick={() => openFullScreenImageSlider(i)}
            >
              <img src={photo} alt="" className={style.photo} />
            </CardActionArea>
          </Grow>
        ))}
      </Slider>

      {/* Fullscreen images */}
      <Dialog
        open={viewerOpen}
        onClose={() => onFullScreenViewerClose()}
        BackdropComponent={Backdrop}
        fullScreen={is500pxOrLess}
        classes={{ paper: style.paperImage }}
        BackdropProps={{
          timeout: 500,
          classes: { root: style.backdrop },
        }}
      >
        <IconButton
          onClick={() => onFullScreenViewerClose()}
          className={style.closeButton}
        >
          <FontAwesomeIcon size="xs" color={Colors.BLUE} icon={faTimes} />
        </IconButton>

        <Slider {...imageSliderSettings} lazyLoad="ondemand">
          {hotelPhotos.map((photo) => (
            <Grow
              key={photo}
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              timeout={1000}
            >
              <Grid container justify="center" className={style.photoContainerImage}>
                <img src={`${photo}`} alt={`${photo}`} className={style.photoInSlider} />
              </Grid>
            </Grow>
          ))}
        </Slider>
      </Dialog>
    </div>
  );
}
