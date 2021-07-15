import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  Backdrop,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";
import {
  backend,
  CarRsv,
  EventTypes,
  HotelReservation,
  mapHotelDTOToDomainType,
  Person,
  selectIsAuthenticated,
  Routes,
  selectCarRsv,
  selectHotelReservations,
  selectHotelRsv,
  selectPerson,
  setHotelReservations,
  setHotelRsv,
  setLoginReferrer,
} from "../../utils";
import { CustomButton, Text } from "../atoms";
import { IncludeInTripPopover } from "./IncludeInTripPopover/IncludeInTripPopover";

interface ConfirmRsvDialogProps {
  open: boolean;
  type: "Hotel" | "Car_rental";
  onClose: () => void;
}

export function ConfirmRsvDialog({ onClose, open, type }: ConfirmRsvDialogProps) {
  const dialogStyles = makeStyles((theme: Theme) => ({
    backdrop: {
      backdropFilter: "blur(4px)",
    },
    closeButton: {
      marginLeft: "auto",
      width: "45px",
      top: 12,
      height: "45px",
      position: "absolute",
      left: "88%",
      [theme.breakpoints.down(500)]: {
        left: "89%",
      },
      [theme.breakpoints.down(420)]: {
        left: "84%",
      },
    },
    paper: {
      maxWidth: 715,
      padding: 20,
      minWidth: 420,
    },
    tooltip: {
      fontSize: 13,
      fontFamily: Font.Family,
    },
  }));

  const style = dialogStyles();

  const is363OrLess = useMediaQuery("(max-width:363px)");
  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  const hotelRsv: HotelReservation = useSelector(selectHotelRsv);
  const hotelReservations: HotelReservation[] = useSelector(selectHotelReservations);
  const carRsv: CarRsv = useSelector(selectCarRsv);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const person: Person | undefined = useSelector(selectPerson);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  function onIncludeInTripOpen(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
  }

  function makeBooking() {
    if (type === "Hotel" && person) {
      backend
        .post(`/hotel/book?personUuid=${person.uuid}`, hotelRsv)
        .then((res) => {
          setOpenSuccessSnack(true);

          let newHotelRsv: HotelReservation = mapHotelDTOToDomainType(res.data);
          dispatch(setHotelRsv(newHotelRsv));
          dispatch(setHotelReservations([...hotelReservations, newHotelRsv]));

          history.push(`${Routes.RESERVATIONS}`);
        })
        .catch((err) => console.log(err));
    } else if (person) {
      backend
        .post(`/car-rental/book?personUuid=${person.uuid}`, carRsv)
        .then((res) => {
          setOpenSuccessSnack(true);

          history.push(`${Routes.RESERVATIONS}`);
        })
        .catch((err) => console.log(err));
    }
  }

  function onLoginClicked() {
    dispatch(setLoginReferrer(location.pathname + location.search));
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      fullScreen={is363OrLess}
      classes={{ paper: style.paper }}
      BackdropProps={{
        timeout: 500,
        classes: { root: style.backdrop },
      }}
    >
      <Text component="h1" color={Colors.BLUE} style={{ marginRight: 20 }}>
        Include in trip
      </Text>
      <IconButton className={style.closeButton} onClick={() => onClose()}>
        <FontAwesomeIcon icon={faTimes} color={Colors.BLUE} />
      </IconButton>

      <Text>Wish to include this reservation in a trip?</Text>

      {/* Buttons */}
      <Grid container style={{ marginTop: 20 }}>
        {isAuthenticated ? (
          <>
            <CustomButton
              size={14}
              style={{ boxShadow: Shadow.LIGHT3D }}
              backgroundColor={Colors.GREEN}
              onClick={(e) => onIncludeInTripOpen(e)}
            >
              Include in trip
            </CustomButton>

            <CustomButton
              size={14}
              style={{ marginLeft: "auto", boxShadow: Shadow.LIGHT3D }}
              backgroundColor={Colors.PURPLE}
              onClick={() => makeBooking()}
            >
              No, proceed with reservation
            </CustomButton>
          </>
        ) : (
          <Text color={Colors.BLUE} style={{ fontStyle: "italic" }}>
            <Link
              to={Routes.LOGIN}
              onClick={() => onLoginClicked()}
              style={{ color: Colors.BLUE, fontWeight: "bold" }}
            >
              Login
            </Link>
            {" to proceed with this reservation"}
          </Text>
        )}
      </Grid>

      <IncludeInTripPopover
        place={type === "Hotel" ? hotelRsv : carRsv}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        eventType={type === "Hotel" ? EventTypes.HOTEL : EventTypes.CAR_RENTAL}
        tripAnchor={tripAnchor}
        setTripAnchor={setTripAnchor}
      />

      <Snackbar
        open={openSuccessSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSuccessSnack(false)}
          severity="success"
        >
          {type === "Hotel" ? "Hotel booked." : "Car rental booked."}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
