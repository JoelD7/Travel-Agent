import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Grid,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { Colors } from "../../../styles";
import {
  carBrandPlaceholder,
  CarCheckbox,
  carRentalFeatures,
  selectCarSearchBrands,
  selectCarSearchFeatures,
  selectCarSearchTransmission,
  setCarSearchBrands,
  setCarSearchFeatures,
  setCarSearchTransmission,
} from "../../../utils";
import { CustomButton, Text } from "../../atoms";
import { carFiltersStyles } from "./carFilters-styles";

interface CarFilters {}

export function CarFilters({}: CarFilters) {
  const style = carFiltersStyles();

  const [brands, setBrands] = useState<CarCheckbox[]>(useSelector(selectCarSearchBrands));
  const [features, setFeatures] = useState<CarCheckbox[]>(
    useSelector(selectCarSearchFeatures)
  );
  const [transmission, setTransmission] = useState<string>(
    useSelector(selectCarSearchTransmission)
  );

  const dispatch = useDispatch();

  const transmissions: { value: string; label: string }[] = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
    { value: "all", label: "All" },
  ];

  function onBrandChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedBrands: CarCheckbox[] = brands.map((brand) => {
      if (brand.name === changedCheck) {
        return { ...brand, checked: event.target.checked };
      } else {
        return { ...brand };
      }
    });

    setBrands(newSelectedBrands);
  }

  function onFeatureChange(event: ChangeEvent<HTMLInputElement>) {
    let changedCheck = event.target.name;

    let newSelectedFeatures: CarCheckbox[] = features.map((feature) => {
      if (feature.name === changedCheck) {
        return { ...feature, checked: event.target.checked };
      } else {
        return { ...feature };
      }
    });

    setFeatures(newSelectedFeatures);
  }

  function onTransmissionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTransmission((event.target as HTMLInputElement).value);
  }

  function updateState() {
    dispatch(
      batchActions([
        setCarSearchBrands(brands),
        setCarSearchFeatures(features),
        setCarSearchTransmission(transmission),
      ])
    );
  }

  return (
    <div>
      {/* Brands */}
      <div>
        <Text component="h3" color={Colors.BLUE}>
          Brands
        </Text>
        <FormGroup style={{ marginLeft: "10px" }}>
          {brands.map((brand, i) => (
            <FormControlLabel
              key={i}
              label={brand.name}
              classes={{ label: style.formLabel }}
              control={
                <Checkbox
                  checked={brand.checked}
                  classes={{ colorSecondary: style.colorSecondary }}
                  icon={<FontAwesomeIcon icon={faSquare} />}
                  checkedIcon={
                    <FontAwesomeIcon icon={faCheckSquare} color={Colors.PURPLE} />
                  }
                  onChange={onBrandChange}
                  name={brand.name}
                />
              }
            />
          ))}
        </FormGroup>
      </div>

      {/* Transmission */}
      <div style={{ marginTop: "20px" }}>
        <Text component="h3" color={Colors.BLUE}>
          Transmission
        </Text>
        <RadioGroup
          style={{ marginLeft: "10px" }}
          value={transmission}
          onChange={onTransmissionChange}
        >
          {transmissions.slice(0, 4).map((transmission, i) => (
            <FormControlLabel
              key={i}
              label={transmission.label}
              value={transmission.value}
              classes={{ label: style.formLabel }}
              control={<Radio classes={{ colorSecondary: style.colorSecondary }} />}
            />
          ))}
        </RadioGroup>
      </div>

      {/* Features */}
      <div style={{ marginTop: "20px" }}>
        <Text component="h3" color={Colors.BLUE}>
          Features
        </Text>
        <FormGroup style={{ marginLeft: "10px" }}>
          {features.map((feature, i) => (
            <FormControlLabel
              key={i}
              label={feature.name}
              classes={{ label: style.formLabel }}
              control={
                <Checkbox
                  checked={feature.checked}
                  classes={{ colorSecondary: style.colorSecondary }}
                  icon={<FontAwesomeIcon icon={faSquare} />}
                  checkedIcon={
                    <FontAwesomeIcon icon={faCheckSquare} color={Colors.PURPLE} />
                  }
                  onChange={onFeatureChange}
                  name={feature.name}
                />
              }
            />
          ))}
        </FormGroup>
      </div>

      <Grid container justify="flex-end" style={{ width: "100%", marginTop: "20px" }}>
        <CustomButton backgroundColor={Colors.GREEN} onClick={() => updateState()}>
          Search
        </CustomButton>
      </Grid>
    </div>
  );
}
