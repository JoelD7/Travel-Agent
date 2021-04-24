import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import {
  capitalizeString,
  convertCurrency,
  getRoomTotalPrice,
  HotelBooking,
  HotelRoomRate,
  HotelRooms,
  selectRoomAccordionExpanded,
  ExchangeRate,
  selectExchangeRate,
  selectEndCurrency,
} from "../../../utils";
import { setRoomAccordionExpanded } from "../../../utils/store/hotel-slice";
import { CustomButton, IconTP, Text } from "../../atoms";
import { RoomAccordionTitle } from "../RoomAccordionTitle/RoomAccordionTitle";

interface RoomAccordion {
  hotel: HotelBooking;
  room: HotelRooms;
}

export const RoomAccordion = React.memo(function Component({
  hotel,
  room,
}: RoomAccordion) {
  const accordionStyles = makeStyles(() => ({
    accordionRoot: {
      backgroundColor: "white",
      boxShadow: Shadow.MEDIUM3D,
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
  }));

  const style = accordionStyles();
  const dispatch = useDispatch();
  const allRoomAccordionsExpanded = useSelector(selectRoomAccordionExpanded);
  const [expanded, setExpanded] = useState<boolean>(allRoomAccordionsExpanded);

  const [uniqueRates, setUniqueRates] = useState<HotelRoomRate[]>([]);

  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);
  const baseCurrency: string = useSelector(selectEndCurrency);

  useEffect(() => {
    if (allRoomAccordionsExpanded) {
      setExpanded(true);
    }
  }, [allRoomAccordionsExpanded]);

  useEffect(() => {
    setUniqueRates(getUniqueRates());
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

  return (
    <>
      {hotel && (
        <Accordion
          key={room.code}
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
            <RoomAccordionTitle room={room} />
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
                        {convertCurrency(
                          getRoomTotalPrice(rate),
                          "USD",
                          baseCurrency,
                          exchangeRate
                        )}
                      </Text>

                      <CustomButton
                        style={{ marginLeft: "auto" }}
                        backgroundColor={Colors.PURPLE}
                      >
                        Book room
                      </CustomButton>
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
      )}
    </>
  );
});
