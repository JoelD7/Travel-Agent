import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Grow,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import {
  areAllRoomsToBookBooked,
  capitalizeString,
  convertToUserCurrency,
  formatAsCurrency,
  getRoomTotalPrice,
  HotelBooking,
  HotelReservation,
  HotelRoom,
  HotelRoomRate,
  selectHotelRsv,
  selectRoomAccordionExpanded,
} from "../../../utils";
import { setRoomAccordionExpanded } from "../../../utils/store/hotel-slice";
import { IconTP, Text } from "../../atoms";
import { RoomAccordionTitle } from "../RoomAccordionTitle/RoomAccordionTitle";

interface RoomAccordion {
  hotel: HotelBooking;
  room: HotelRoom;
}

export const RoomAccordion = React.memo(function Component({
  hotel,
  room,
}: RoomAccordion) {
  const accordionStyles = makeStyles(() => ({
    accordionRoot: {
      backgroundColor: "white",
      boxShadow: Shadow.LIGHT3D,
      marginBottom: "10px",

      "&:before": {
        backgroundColor: Colors.TRANSPARENT,
      },

      "&.Mui-expanded:last-child": {
        marginBottom: "40px",
        borderRadius: "10px",
      },
    },
    accordionRounded: {
      borderRadius: "10px",
      "&:last-child": {
        borderRadius: "10px",
      },
    },
    colorSecondary: {
      "&:hover": {
        backgroundColor: "rgba(149, 46, 228, 0.2)",
      },
      "&.Mui-checked": {
        color: Colors.PURPLE,

        "&:hover": {
          backgroundColor: "rgba(149, 46, 228, 0.2)",
        },
      },
    },
  }));

  const style = accordionStyles();
  const dispatch = useDispatch();
  const allRoomAccordionsExpanded = useSelector(selectRoomAccordionExpanded);
  const [expanded, setExpanded] = useState<boolean>(allRoomAccordionsExpanded);

  const [uniqueRates, setUniqueRates] = useState<HotelRoomRate[]>([]);

  const hotelRsv: HotelReservation = useSelector(selectHotelRsv);

  const [selectedRateKey, setSelectedRateKey] = useState<string>("");

  const [totalRoomCost, setTotalRoomCost] = useState<number>(0);

  useEffect(() => {
    if (allRoomAccordionsExpanded) {
      setExpanded(true);
    }
  }, [allRoomAccordionsExpanded]);

  useEffect(() => {
    let rates: HotelRoomRate[] = getUniqueRates();

    setSelectedRateKey(rates[0].rateKey);
    setTotalRoomCost(getRoomTotalPrice(rates[0]));
    setUniqueRates(rates);
  }, []);

  function onAccordionChange(isExpanded: boolean) {
    setExpanded(isExpanded);
    if (!isExpanded) {
      dispatch(setRoomAccordionExpanded(false));
    }
  }

  function getUniqueRates(): HotelRoomRate[] {
    let rateIds: string[] = [];
    let uniqueRates: HotelRoomRate[] = [];

    room.rates.forEach((rate) => {
      let rateId = rate.boardName + rate.net;

      if (!rateIds.includes(rateId)) {
        uniqueRates.push(rate);
        rateIds.push(rateId);
      }
    });

    return uniqueRates;
  }

  function isRoomBooked(): boolean {
    return hotelRsv.rooms.filter((r) => r.code === room.code).length > 0;
  }

  function onBoardChange(event: ChangeEvent<HTMLInputElement>, rate: HotelRoomRate) {
    setSelectedRateKey(event.target.value);
    setTotalRoomCost(getRoomTotalPrice(rate));
  }

  return (
    <>
      {hotel && (
        <Grow
          key={room.code}
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          timeout={1000}
        >
          <Accordion
            onChange={(e, isExpanded) => onAccordionChange(isExpanded)}
            expanded={expanded}
            classes={{ root: style.accordionRoot, rounded: style.accordionRounded }}
          >
            <AccordionSummary
              style={{ display: "flex" }}
              expandIcon={
                <IconTP icon={faChevronDown} backgroundColor={Colors.GREEN} size={28} />
              }
            >
              <RoomAccordionTitle totalRoomCost={totalRoomCost} room={room} />
            </AccordionSummary>

            <AccordionDetails style={{ background: "white" }}>
              <Grid container>
                {uniqueRates.map((rate, i) => (
                  <>
                    <Grid item xs={12}>
                      <Grid container alignItems="center">
                        <Text style={{ marginLeft: "3px" }}>
                          {capitalizeString(rate.boardName, "each word")}
                        </Text>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container alignItems="center">
                        <Text bold>Total: </Text>
                        <Text style={{ marginLeft: "3px" }}>
                          {formatAsCurrency(
                            convertToUserCurrency(getRoomTotalPrice(rate), "USD")
                          )}
                        </Text>

                        <Radio
                          style={{ marginLeft: "auto" }}
                          checked={selectedRateKey === rate.rateKey}
                          onChange={(e) => onBoardChange(e, rate)}
                          disabled={isRoomBooked() || areAllRoomsToBookBooked()}
                          value={rate.rateKey}
                          classes={{ colorSecondary: style.colorSecondary }}
                        />
                      </Grid>
                    </Grid>

                    {i < uniqueRates.length - 1 && (
                      <Grid item xs={12} style={{ margin: "15px" }}>
                        <Divider style={{ backgroundColor: "#cecece" }} />
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grow>
      )}
    </>
  );
});
