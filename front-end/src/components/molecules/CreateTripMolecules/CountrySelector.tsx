import {
  Chip,
  FormControl,
  Input,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

interface CountrySelector {
  selectedCountries: string[];
  updateState: (values: string[]) => void;
}

export function CountrySelector({ selectedCountries, updateState }: CountrySelector) {
  const countrySelectorStyles = makeStyles((theme: Theme) => ({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
      color: "white",
      backgroundColor: Colors.GREEN,
      borderRadius: 20,
      fontSize: 14,
      fontWeight: "bold",
      fontFamily: Font.Family,
    },
    formControl: {
      width: "98%",
      backgroundColor: Colors.TF_BACKGROUND,

      "& .MuiOutlinedInput-root": {
        height: 46,
        borderRadius: 10,

        "&:hover fieldset": {
          borderColor: Colors.GRAY_BORDER_HOVER,
        },
        "&.Mui-focused fieldset": {
          borderColor: Colors.GREEN,
        },
      },
    },
    menuList: {
      "& .MuiMenuItem-root": {
        fontFamily: Font.Family,
        color: "black",
      },
    },
    menuPaper: {
      maxHeight: "calc(100% - 400px)",
      borderRadius: "10px",
    },
    selectOutlined: {
      padding: 5,
    },
  }));

  const countryOptions: string[] = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Federated States of Micronesia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Libyan Arab Jamahiriya",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St. Helena",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks And Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Wallis and Futuna Islands",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const [countries, setCountries] = useState<string[]>(selectedCountries);

  const style = countrySelectorStyles();

  function onChange(event: React.ChangeEvent<{ value: unknown }>) {
    setCountries(event.target.value as string[]);
  }

  return (
    <FormControl className={style.formControl}>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        variant="outlined"
        classes={{ outlined: style.selectOutlined }}
        multiple
        onClose={() => updateState(countries)}
        value={countries}
        onChange={onChange}
        renderValue={(selected) => (
          <div className={style.chips}>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={value} className={style.chip} />
            ))}
          </div>
        )}
        MenuProps={{
          classes: { list: style.menuList, paper: style.menuPaper },
        }}
      >
        {countryOptions.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
