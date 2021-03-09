import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import { capitalizeString, currencyFormatter } from "../../../utils";
import { HotelRoomRate, HotelRooms } from "../../../utils/types/hotel-types";
import { Text, IconText, CustomButton } from "../../atoms";
import { selectRoomAccordionExpanded } from "../../../utils";
import { setRoomAccordionExpanded } from "../../../utils/store/hotel-slice";

interface RoomAccordion {
  room: HotelRooms;
}

export function RoomAccordion({ room }: RoomAccordion) {
  const accordionStyles = makeStyles(() => ({
    accordionRoot: {
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM3D,
      marginBottom: "10px",

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
    <Accordion
      key={room.code}
      onChange={(e, isExpanded) => onAccordionChange(isExpanded)}
      expanded={expanded}
      classes={{ root: style.accordionRoot, rounded: style.accordionRounded }}
    >
      <AccordionSummary expandIcon={<IconText icon={faChevronDown}></IconText>}>
        <Text component="h3" color="white" bold>
          {capitalizeString(room.name, "full sentence")}
        </Text>
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
                    {currencyFormatter(Number(rate.net))}
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
  );
}
