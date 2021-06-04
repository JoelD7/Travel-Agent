import {
  Backdrop,
  CardActionArea,
  Dialog,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import Slider from "react-slick";
import { Colors, Shadow } from "../../../styles";
import { TripAlbum, tripAlbumPlaceholder, AlbumPicture, backend } from "../../../utils";
import { SliderArrow, Text } from "../../atoms";
import { Navbar } from "../../molecules";
import { DashDrawer } from "../DashDrawer/DashDrawer";
import { Footer } from "../Footer/Footer";

interface AlbumRouteParams {
  id?: string;
}

interface AlbumProps {}

interface PictureGroup {
  [index: string]: AlbumPicture[];
}

export function Album({}: AlbumProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    card: {
      borderRadius: 10,
      margin: 10,
      boxShadow: Shadow.LIGHT3D,
      maxHeight: 250,
    },
    cardContainer: {
      maxWidth: "25%",
      width: "auto",
      display: "flex",
      maxHeight: "250px",
      height: "fit-content",
      margin: 5,
      borderRadius: 10,

      [theme.breakpoints.down(1410)]: {
        maxWidth: "33%",
      },
      [theme.breakpoints.down(1135)]: {
        maxWidth: "48%",
      },
      [theme.breakpoints.down(635)]: {
        maxWidth: "100%",
      },
    },
    cardButton: {
      height: "250px",
    },
    cardPicture: {
      objectFit: "contain",
      maxWidth: "100%",
      maxHeight: 250,
      borderRadius: 10,
      boxShadow: Shadow.LIGHT3D,
    },
    footerContainer: {
      position: "relative",
      zIndex: 3,
      width: "90%",
      marginLeft: "auto",
      marginTop: "250px",

      [theme.breakpoints.down(1000)]: {
        width: "100%",
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
        width: "90vw",
      },
      [theme.breakpoints.down(805)]: {
        width: "89vw",
      },
      [theme.breakpoints.down(755)]: {
        width: "88vw",
      },
      [theme.breakpoints.down(690)]: {
        width: "89vw",
      },
      [theme.breakpoints.down(580)]: {
        width: "87vw",
      },
      [theme.breakpoints.down(450)]: {
        width: "85vw",
      },
      [theme.breakpoints.down(420)]: {
        width: "83vw",
      },
      [theme.breakpoints.down(380)]: {
        width: "81vw",
      },
    },
    navbar: {
      width: "calc(100% - 251px)",
      marginLeft: "auto",
      [theme.breakpoints.down(960)]: {
        width: "100%",
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
    pageContentGrid: {
      marginLeft: "265px",
      width: "calc(100% - 300px)",
      [theme.breakpoints.down(960)]: {
        margin: "auto",
        width: "90%",
      },
    },
    photoContainerImage: {
      maxWidth: "1004px",
    },
    photoInSlider: {
      maxHeight: 687,
      objectFit: "cover",
      height: "auto",
      width: "auto",
      margin: "auto",
      borderRadius: "10px",
      [theme.breakpoints.down(755)]: {
        width: "77%",
      },
      [theme.breakpoints.down(630)]: {
        width: "93%",
      },
      [theme.breakpoints.down(500)]: {
        width: "98%",
      },
    },
  }));

  const style = stylesFunction();

  const { id } = useParams<AlbumRouteParams>();
  const [album, setAlbum] = useState<TripAlbum>(tripAlbumPlaceholder);

  let pictureGroup: PictureGroup = {};
  const [pictureGroupArr, setPictureGroupArr] = useState<AlbumPicture[][]>([]);

  const [openFullImage, setOpenFullImage] = useState(false);

  const sliderArrowStyles: CSSProperties = {
    backgroundColor: "#00000075",
    "&:hover": {
      backgroundColor: "#000000b5",
    },
  };

  const [initialImageSlide, setInitialImageSlide] = useState(0);

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

  useEffect(() => {
    fetchAlbum();
  }, []);

  useEffect(() => {
    groupPicturesByDate();
  }, [album]);

  async function fetchAlbum() {
    let response = await backend.get(`/album/${id}`);
    setAlbum(response.data);
  }

  function groupPicturesByDate() {
    //   Group pictures
    album.pictures.forEach((picture) => {
      let dateAsString: string = picture.date;

      if (pictureGroup.hasOwnProperty(dateAsString)) {
        let curPicturesInGroup: AlbumPicture[] = pictureGroup[dateAsString];
        pictureGroup = {
          ...pictureGroup,
          [dateAsString]: [...curPicturesInGroup, picture],
        };
      } else {
        pictureGroup = {
          ...pictureGroup,
          [dateAsString]: [picture],
        };
      }
    });

    // Add groups to array
    let buffer: AlbumPicture[][] = [];
    for (const key in pictureGroup) {
      if (Object.prototype.hasOwnProperty.call(pictureGroup, key)) {
        const pictures = pictureGroup[key];
        buffer.push(pictures);
      }
    }

    setPictureGroupArr(buffer);
  }

  function openFullScreenImageSlider(initialSlide: number) {
    setInitialImageSlide(initialSlide);
    setOpenFullImage(true);
  }

  return (
    <div>
      <Helmet>
        <title>{`Album | ${album.name}`}</title>
      </Helmet>

      <Navbar className={style.navbar} dashboard position="sticky" />
      <DashDrawer />

      <Grid item className={style.pageContentGrid}>
        {/* Page title */}
        <Text component="h1" style={{ marginBottom: 20 }} color={Colors.BLUE}>
          {album.name}
        </Text>

        {pictureGroupArr.map((group) => (
          <div key={group[0].idPicture}>
            <Text component="h2" color={Colors.BLUE}>
              {format(parseISO(group[0].date), "MMM. dd, yyyy")}
            </Text>

            {/* Picture cards */}
            <Grid container>
              {group.map((picture, i) => (
                <CardActionArea
                  key={picture.pictureUrl}
                  className={style.cardContainer}
                  onClick={() => openFullScreenImageSlider(i)}
                >
                  <img src={picture.pictureUrl} className={style.cardPicture} alt="" />
                </CardActionArea>
              ))}
            </Grid>
          </div>
        ))}
      </Grid>

      <div className={style.footerContainer}>
        <Footer />
      </div>

      <Dialog
        open={openFullImage}
        onClose={() => setOpenFullImage(false)}
        BackdropComponent={Backdrop}
        classes={{ paper: style.paperImage }}
        BackdropProps={{
          timeout: 500,
          classes: { root: style.backdrop },
        }}
      >
        <Slider {...imageSliderSettings} lazyLoad="progressive">
          {album.pictures.map((picture) => (
            <Grid
              container
              justify="center"
              key={picture.pictureUrl}
              className={style.photoContainerImage}
            >
              <img
                src={`${picture.pictureUrl}`}
                alt={`${picture.pictureUrl}`}
                className={style.photoInSlider}
              />
            </Grid>
          ))}
        </Slider>
      </Dialog>
    </div>
  );
}
