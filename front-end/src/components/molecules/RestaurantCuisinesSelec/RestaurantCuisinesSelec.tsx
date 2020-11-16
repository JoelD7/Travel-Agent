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
import { RestaurantFilter } from "../../../utils/types/Establishment";
import { CustomButton } from "../../atoms";
import { checkboxSelectorDialog } from "../../atoms/checkboxSelectorDialog-styles";

interface RestaurantCuisinesSelec {
  values: RestaurantFilter[];
  updateState: (selectedCuisines: RestaurantFilter[]) => void;
}

export function RestaurantCuisinesSelec({
  values,
  updateState,
}: RestaurantCuisinesSelec) {
  const style = checkboxSelectorDialog();

  const [openDialog, setOpenDialog] = useState(false);

  const [cuisines, setCuisines] = useState<RestaurantFilter[]>(values);

  const size = cuisines.length;

  function onCuisineChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedCuisines = cuisines.map((cuisine) => {
      if (cuisine.name === changedCheck) {
        return { ...cuisine, checked: event.target.checked };
      } else {
        return { ...cuisine };
      }
    });

    setCuisines(newSelectedCuisines);
  }

  function closeDialog() {
    setOpenDialog(false);
    updateState(cuisines);
  }

  return (
    <div
      onMouseLeave={() => {
        updateState(cuisines);
      }}
    >
      <FormGroup>
        {cuisines.slice(0, 4).map((cuisine, i) => (
          <FormControlLabel
            key={i}
            label={cuisine.name}
            classes={{ label: style.formLabel }}
            control={
              <Checkbox
                checked={cuisine.checked}
                classes={{ colorSecondary: style.colorSecondary }}
                icon={<FontAwesomeIcon icon={faCircle} />}
                checkedIcon={
                  <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                }
                onChange={onCuisineChange}
                name={cuisine.name}
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
        <DialogTitle classes={{ root: style.dialogTitle }}>Cuisine</DialogTitle>
        <Divider />

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <FormGroup>
              {cuisines.slice(0, size / 2 + 1).map((cuisine, i) => (
                <FormControlLabel
                  key={i}
                  label={cuisine.name}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={cuisine.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onCuisineChange}
                      name={cuisine.name}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={6}>
            <FormGroup>
              {cuisines.slice(size / 2 + 1).map((cuisine, i) => (
                <FormControlLabel
                  key={i}
                  label={cuisine.name}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={cuisine.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onCuisineChange}
                      name={cuisine.name}
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
