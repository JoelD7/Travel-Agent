import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { checkboxSelectorDialog } from "../checkboxSelectorDialog-styles";
import { Amenity } from "../../../utils/HotelAmenities";
import { CustomButton } from "../CustomButton";
import { Colors } from "../../../styles";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HotelAmenitiesSelectorProps {
  values: Amenity[];
  updateState: (selectedAmenities: Amenity[]) => void;
  buttonColor?: string;
}

export function HotelAmenitiesSelector({
  values,
  updateState,
  buttonColor = "black",
}: HotelAmenitiesSelectorProps) {
  const style = checkboxSelectorDialog();

  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(values);

  const [openDialog, setOpenDialog] = useState(false);

  function onSelectedAmenitiesChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedAmenities = selectedAmenities.map((amenity) => {
      if (amenity.key === changedCheck) {
        return { ...amenity, checked: event.target.checked };
      } else {
        return { ...amenity };
      }
    });

    setSelectedAmenities(newSelectedAmenities);
  }

  function closeDialog() {
    setOpenDialog(false);
    updateState(selectedAmenities);
  }

  return (
    <div
      onMouseLeave={() => {
        updateState(selectedAmenities);
      }}
    >
      <div style={{ marginLeft: "10px" }}>
        {selectedAmenities
          .filter((amenity) => amenity.checked)
          .map((amenity, i) => (
            <ul style={{ color: Colors.PURPLE, marginBottom: "2px" }} key={i}>
              <li style={{ fontSize: "14px" }}>
                <p style={{ color: "black" }}>{amenity.value}</p>
              </li>
            </ul>
          ))}
      </div>

      <Button
        style={{ textTransform: "capitalize", color: buttonColor }}
        classes={{ root: style.button }}
        onClick={() => setOpenDialog(true)}
      >
        Select amenities
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => closeDialog()}
        classes={{ paper: style.paper }}
      >
        <DialogTitle classes={{ root: style.dialogTitle }}>Select amenities</DialogTitle>
        <Divider />

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={4}>
            <FormGroup>
              {selectedAmenities.slice(0, 13).map((amenity, i) => (
                <FormControlLabel
                  key={i}
                  label={amenity.value}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={amenity.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onSelectedAmenitiesChange}
                      name={amenity.key}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={4}>
            <FormGroup>
              {selectedAmenities.slice(13, 25).map((amenity, i) => (
                <FormControlLabel
                  key={i}
                  label={amenity.value}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={amenity.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onSelectedAmenitiesChange}
                      name={amenity.key}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={4}>
            <FormGroup>
              {selectedAmenities.slice(25).map((amenity, i) => (
                <FormControlLabel
                  key={i}
                  label={amenity.value}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={amenity.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onSelectedAmenitiesChange}
                      name={amenity.key}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <CustomButton
              style={{ width: "50%" }}
              label="Ok"
              rounded
              onClick={() => closeDialog()}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
