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

interface RestaurantEstablishments {
  values: RestaurantFeature[];
  updateState: (selectedEstablishments: RestaurantFeature[]) => void;
}

export function RestaurantEstablishments({
  values,
  updateState,
}: RestaurantEstablishments) {
  const style = checkboxSelectorDialog();

  const [openDialog, setOpenDialog] = useState(false);

  const [establishments, setEstablishments] = useState<RestaurantFeature[]>(values);

  const size = establishments.length;

  function onEstablishmentsChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedEstablishments = establishments.map((establishment) => {
      if (establishment.name === changedCheck) {
        return { ...establishment, checked: event.target.checked };
      } else {
        return { ...establishment };
      }
    });

    setEstablishments(newSelectedEstablishments);
  }

  function closeDialog() {
    setOpenDialog(false);
    updateState(establishments);
  }

  return (
    <div
      onMouseLeave={() => {
        updateState(establishments);
      }}
    >
      <FormGroup>
        {establishments.slice(0, 4).map((establishment, i) => (
          <FormControlLabel
            key={i}
            label={establishment.name}
            classes={{ label: style.formLabel }}
            control={
              <Checkbox
                checked={establishment.checked}
                classes={{ colorSecondary: style.colorSecondary }}
                icon={<FontAwesomeIcon icon={faCircle} />}
                checkedIcon={
                  <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                }
                onChange={onEstablishmentsChange}
                name={establishment.name}
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
        <DialogTitle classes={{ root: style.dialogTitle }}>
          Establishment type
        </DialogTitle>
        <Divider />

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <FormGroup>
              {establishments.slice(0, size / 2 + 1).map((establishment, i) => (
                <FormControlLabel
                  key={i}
                  label={establishment.name}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={establishment.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onEstablishmentsChange}
                      name={establishment.name}
                    />
                  }
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={6}>
            <FormGroup>
              {establishments.slice(size / 2 + 1).map((establishment, i) => (
                <FormControlLabel
                  key={i}
                  label={establishment.name}
                  classes={{ label: style.formLabel }}
                  control={
                    <Checkbox
                      checked={establishment.checked}
                      classes={{ colorSecondary: style.colorSecondary }}
                      icon={<FontAwesomeIcon icon={faCircle} />}
                      checkedIcon={
                        <FontAwesomeIcon icon={faCheckCircle} color={Colors.PURPLE} />
                      }
                      onChange={onEstablishmentsChange}
                      name={establishment.name}
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
              rounded
              onClick={() => closeDialog()}
            >
              Ok
            </CustomButton>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
