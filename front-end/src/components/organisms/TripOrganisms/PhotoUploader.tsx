import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import { Trip } from "../../../utils";
import { CustomButton, Text } from "../../atoms";
import { ImageUploader } from "../../molecules";

interface PhotoUploaderProps {
  trip: Trip;
  open: boolean;
  onClose: () => void;
}

export const PhotoUploader = React.memo(function PhotoUploader({
  trip,
  open,
  onClose,
}: PhotoUploaderProps) {
  const stylesFunction = makeStyles((theme: Theme) => ({
    albumPane: {
      width: "50%",
    },
    closeButton: {
      marginLeft: "auto",
      width: "45px",
      top: 12,
      height: "45px",
      position: "absolute",
      left: "92%",
      [theme.breakpoints.down(500)]: {
        left: "89%",
      },
      [theme.breakpoints.down(420)]: {
        left: "84%",
      },
    },
    menuItemSelect: {
      borderBottom: `3px solid rgba(0,0,0,0)`,
      margin: "0px 5px",

      "&.MuiMenuItem-root": {
        fontFamily: Font.Family,
      },

      "&.MuiListItem-root": {
        "&.Mui-selected": {
          backgroundColor: "rgba(0,0,0,0)",
          borderBottom: `3px solid ${Colors.GREEN}`,
        },
      },
      "&.MuiListItem-button": {
        "&:hover": {
          borderBottom: `3px solid ${Colors.GREEN}`,
        },
      },
    },
    paper: {
      maxWidth: 715,
      padding: 20,
    },
    selectPhotosPane: {
      width: "50%",
    },

    select: {
      "& .MuiOutlinedInput-input": {
        padding: "10px 25px 10px 15px",
        borderRadius: "10px",
        margin: "0px 5px",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
      },

      "& .MuiSelect-selectMenu": {
        fontFamily: Font.Family,
      },
    },
    selectIcon: {
      color: Colors.BLUE,
    },
    sortFormControl: {
      borderRadius: "5px",
      width: "270px",
      boxShadow: "2px 2px 6px rgb(116 116 116 / 50%)",

      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: `#cecece !important`,
        },
        "&.Mui-focused fieldset": {
          borderColor: `#cecece !important`,
        },
      },
    },
    textfield: {
      backgroundColor: Colors.TF_BACKGROUND,
      borderRadius: 10,

      "& .MuiInputBase-root": {
        fontSize: 16,
        borderRadius: 5,
        fontFamily: Font.Family,
      },

      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: Colors.GRAY_BORDER_HOVER,
        },
        "&.Mui-focused fieldset": {
          borderColor: Colors.GREEN,
        },
      },

      "& .MuiOutlinedInput-input": {
        padding: 10,
      },
    },
  }));

  const style = stylesFunction();

  const [newAlbumName, setNewAlbumName] = useState<string>("");
  const [images, setImages] = useState<string[]>([""]);

  const [albumCover, setAlbumCover] = useState<string>("");

  const albumOptions: string[] = [
    "Journey Through the Alps",
    "Andes Walk",
    "Europe in the Snow",
  ];
  const [album, setAlbum] = useState<string>("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      classes={{ paper: style.paper }}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Grid container>
        {/* Title */}
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Text component="h1" color={Colors.BLUE}>
            Upload photos
          </Text>
          <Text color={Colors.GRAY_TEXT}>
            <b>For trip: </b>
            {trip.name}
          </Text>

          {/* Close dialog button */}
          <IconButton className={style.closeButton} onClick={() => onClose()}>
            <FontAwesomeIcon icon={faTimes} color={Colors.BLUE} />
          </IconButton>
        </Grid>

        {/* Album pane */}
        <Grid item className={style.albumPane}>
          {/* Album selector */}
          <>
            <Text component="h2" color={Colors.BLUE}>
              Album
            </Text>
            <Text component="h5" color={Colors.BLUE}>
              Select an album
            </Text>

            <FormControl className={style.sortFormControl}>
              <Select
                value={album}
                variant="outlined"
                classes={{ icon: style.selectIcon }}
                className={style.select}
                onChange={(e) => setAlbum(e.target.value as string)}
              >
                {albumOptions.map((option, i) => (
                  <MenuItem
                    key={i}
                    classes={{ root: style.menuItemSelect }}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>

          {/* Create new album */}
          <>
            <Text component="h5" style={{ marginTop: 20 }} color={Colors.BLUE}>
              Or create a new one
            </Text>

            <TextField
              value={newAlbumName}
              variant="outlined"
              className={style.textfield}
              onChange={(e) => setNewAlbumName(e.target.value)}
              placeholder="Album name"
            />

            <ImageUploader
              images={[albumCover]}
              updateState={(values) => setAlbumCover(values[0])}
            />
          </>
        </Grid>

        {/* Select photos pane */}
        <Grid item className={style.selectPhotosPane}></Grid>
      </Grid>
    </Dialog>
  );
});
