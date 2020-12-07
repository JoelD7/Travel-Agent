import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { Colors } from "../../../styles";
import { CustomButton } from "../../atoms";
import { checkboxSelectorDialog } from "../../atoms/checkboxSelectorDialog-styles";

interface RestaurantFeature {
  values: RestaurantFilter[];
  updateState: (selectedCuisines: RestaurantFilter[]) => void;
}

export function RestaurantFeature({
  values,
  updateState,
}: RestaurantFeature) {
  const style = checkboxSelectorDialog();

  const [openDialog, setOpenDialog] = useState(false);

  const [feature, setCuisines] = useState<RestaurantFilter[]>(values);

  const size = feature.length;

  function onFeatureChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedCuisines = feature.map((feature) => {
      if (feature.name === changedCheck) {
        return { ...feature, checked: event.target.checked };
      } else {
        return { ...feature };
      }
    });

    setCuisines(newSelectedCuisines);
  }

  function closeDialog() {
    setOpenDialog(false);
    updateState(feature);
  }

  return (
    <div
      onMouseLeave={() => {
        updateState(feature);
      }}
    >
      <FormGroup>
        {feature.slice(0, 4).map((feature, i) => (
          <FormControlLabel
            key={i}
            label={feature.name}
            classes={{ label: style.formLabel }}
            control={
              <Checkbox
                checked={feature.checked}
                classes={{ colorSecondary: style.colorSecondary }}
                icon={<FontAwesomeIcon icon={faCircle} />}
                checkedIcon={
                  <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                }
                onChange={onFeatureChange}
                name={feature.name}
              />
            }
          />
        ))}
      </FormGroup>

      <Button
        style={{ textTransform: "capitalize" }}
        classes={{ root: style.button }}
        onClick={() => setOpenDialog(true)}
      >
        Show all
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => closeDialog()}
        classes={{ paper: style.paper }}
      >
        <DialogTitle classes={{ root: style.dialogTitle }}>Restaurant features</DialogTitle>
        <Divider />

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <FormGroup>
              {feature.slice(0, size / 2 + 1).map((feature, i) => (
                <FormControlLabel
                  key={i}
                  label={feature.name}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={feature.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onFeatureChange}
                      name={feature.name}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={6}>
            <FormGroup>
              {feature.slice(size / 2 + 1).map((feature, i) => (
                <FormControlLabel
                  key={i}
                  label={feature.name}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={feature.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onFeatureChange}
                      name={feature.name}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <CustomButton
              style={{ width: "50%" }}
              backgroundColor={Colors.PURPLE}
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
