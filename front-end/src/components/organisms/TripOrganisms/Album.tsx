import { faExclamationTriangle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Grow,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";
import {
  AlbumPicture,
  backend,
  firebase,
  Routes,
  selectIsAuthenticated,
  TripAlbum,
  userTripRef,
} from "../../../utils";
import { TRIPS } from "../../../utils/Routes";
import { CustomButton, ProgressCircle, SliderArrow, Text } from "../../atoms";
import { Navbar } from "../../molecules";
import { DashDrawer } from "../DashDrawer/DashDrawer";
import { Footer } from "../Footer/Footer";

interface AlbumRouteParams {
  uuid?: string;
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
    paperDelete: {
      maxWidth: "94vw",
      width: "auto",
      backgroundColor: "white",
      borderRadius: 10,
      "&.MuiPaper-elevation24": {
        boxShadow: Shadow.TRANSPARENT,
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
      maxWidth: "100%",
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

  const { uuid } = useParams<AlbumRouteParams>();
  const [album, setAlbum] = useState<TripAlbum>();

  let pictureGroup: PictureGroup = {};
  const [pictureGroupArr, setPictureGroupArr] = useState<AlbumPicture[][]>([]);
  const [openFullImage, setOpenFullImage] = useState(false);
  const [openAlbumDeleteConfirm, setOpenAlbumDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDeleteSnack, setOpenDeleteSnack] = useState(false);
  const [initialImageSlide, setInitialImageSlide] = useState(0);

  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  const history = useHistory();

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlbum();
    }
  }, []);

  useEffect(() => {
    groupPicturesByDate();
  }, [album]);

  async function fetchAlbum() {
    let response = await backend.get(`/album/${uuid}`);
    setAlbum(response.data);
    setLoading(false);
  }

  function groupPicturesByDate() {
    if (album) {
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
  }

  function openFullScreenImageSlider(picture: AlbumPicture) {
    if (album) {
      let slideNo: number = album.pictures.indexOf(picture);
      setInitialImageSlide(slideNo);
      setOpenFullImage(true);
    }
  }

  async function deleteAlbum() {
    let response = await backend.delete(`/album/${uuid}`);
    setOpenAlbumDeleteConfirm(false);
    setOpenDeleteSnack(true);
    deleteFirebaseAlbumPictures();

    let url = window.location.href;
    let tripDetailUrlArr: string[] = url.substring(0, url.indexOf("/album/")).split("/");
    let tripDetailUuid: string = tripDetailUrlArr[tripDetailUrlArr.length - 1];

    setTimeout(() => {
      // http://localhost:3000/Travel-Agent/trips/f6f6c797-d2a4-11eb-bb75-54e1ad512f86
      history.push(`${Routes.TRIPS}/${tripDetailUuid}`);
    }, 1000);
  }

  function deleteFirebaseAlbumPictures() {
    if (album) {
      album.pictures.forEach((picture) => {
        let imageRef: firebase.storage.Reference = userTripRef.child(picture.name);

        imageRef
          .delete()
          .then(() => {
            console.log(`Picture ${picture.name} deleted.`);
          })
          .catch((error) => {
            console.log(`Couldn't delete ${picture.name} | Error: ${error}`);
          });
      });
    }
  }

  return (
    <div>
      <Helmet>
        <title>{album ? `Album | ${album.name}` : "Tripper"}</title>
      </Helmet>

      <Navbar className={style.navbar} variant="dashboard" position="sticky" />
      <DashDrawer />

      <Grid item className={style.pageContentGrid}>
        {loading && (
          <Grid container style={{ height: "85vh" }}>
            <ProgressCircle />
          </Grid>
        )}

        {album && (
          <>
            {/* Page title */}
            <Grid container style={{ marginTop: 20 }} alignItems="center">
              <Text component="h1" style={{ marginBottom: 0 }} color={Colors.BLUE}>
                {album.name}
              </Text>

              <IconButton
                style={{ marginLeft: 5 }}
                onClick={() => setOpenAlbumDeleteConfirm(true)}
              >
                <FontAwesomeIcon size="xs" icon={faTrash} />
              </IconButton>
            </Grid>

            {pictureGroupArr.map((group) => (
              <div key={group[0].idPicture} style={{ marginTop: 20 }}>
                <Text component="h3" color={Colors.BLUE}>
                  {format(parseISO(group[0].date), "MMM. dd, yyyy")}
                </Text>

                {/* Picture cards */}
                <Grid container>
                  {group.map((picture, i) => (
                    <Grow
                      key={picture.pictureUrl}
                      in={true}
                      style={{ transformOrigin: "0 0 0" }}
                      timeout={1000}
                    >
                      <CardActionArea
                        className={style.cardContainer}
                        onClick={() => openFullScreenImageSlider(picture)}
                      >
                        <img
                          src={picture.pictureUrl}
                          className={style.cardPicture}
                          alt=""
                        />
                      </CardActionArea>
                    </Grow>
                  ))}
                </Grid>
              </div>
            ))}
          </>
        )}
      </Grid>

      {album && (
        <div className={style.footerContainer}>
          <Footer />
        </div>
      )}

      {/* Delete confirmation */}
      <Dialog
        open={openAlbumDeleteConfirm}
        onClose={() => setOpenAlbumDeleteConfirm(false)}
        BackdropComponent={Backdrop}
        classes={{ paper: style.paperDelete }}
        BackdropProps={{
          timeout: 500,
          classes: { root: style.backdrop },
        }}
      >
        <DialogTitle>
          <Grid container alignItems="center">
            <FontAwesomeIcon
              style={{ width: 25, height: 25 }}
              icon={faExclamationTriangle}
              color="#002E43AB"
            />

            <Text style={{ marginLeft: 15 }} component="h2" color={Colors.BLUE}>
              Delete album
            </Text>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <Text>Are you sure you want to delete this album?</Text>
        </DialogContent>

        <DialogActions style={{ marginTop: 10 }}>
          <CustomButton
            size={14}
            style={{ fontWeight: "bold" }}
            onClick={() => setOpenAlbumDeleteConfirm(false)}
            backgroundColor={Colors.TRANSPARENT}
          >
            Cancel
          </CustomButton>

          <CustomButton
            size={14}
            onClick={() => deleteAlbum()}
            backgroundColor={Colors.RED}
          >
            Delete
          </CustomButton>
        </DialogActions>
      </Dialog>

      {/* Fullscreen image slider */}
      {album && (
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
      )}

      <Snackbar
        open={openDeleteSnack}
        autoHideDuration={6000}
        onClose={() => setOpenDeleteSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenDeleteSnack(false)}
          severity="success"
        >
          Album deleted
        </Alert>
      </Snackbar>
    </div>
  );
}
