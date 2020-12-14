import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createMuiTheme,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { Navbar, ServicesToolbar, SliderArrow, Title } from "../../components";
import { Colors } from "../../styles";
import { thingsToDoStyles } from "./thingsToDo-styles";
import { POICategories, POICategoryParent } from "../../utils/POICategory";
import { Font } from "../../assets";
import Slider from "react-slick";

export function ThingsToDo() {
  const style = thingsToDoStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          borderBottom: `2px solid rgba(0,0,0,0)`,
          "&.Mui-selected": {
            backgroundColor: "rgba(0,0,0,0)",
            borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
          },
        },

        button: {
          "&:hover": {
            borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
          },
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
        },
      },
    },
  });

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    slidesToShow: 4,
    slidesToScroll: 4,
    // responsive: [
    //   {
    //     breakpoint: 990,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       infinite: true,
    //     },
    //   },
    //   {
    //     breakpoint: 740,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: true,
    //     },
    //   },
    // ],
  };

  const parentCategories = [
    POICategoryParent.ArtsEntertainment,
    POICategoryParent.Nightlife,
    POICategoryParent.OutdoorsRec,
    POICategoryParent.ShopService,
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const onMenuOpen = (event: MouseEvent<HTMLElement>) => {
    if (event.currentTarget !== anchorEl) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      <Title style={{ textAlign: "center" }} component="h1">
        Things to in Dubai
      </Title>

      <ThemeProvider key="categories parent menu" theme={theme}>
        <Toolbar className={style.parentCategoryBar}>
          {parentCategories.map((parentCategory, i) => (
            <MenuItem
              id={parentCategory}
              onClick={onMenuOpen}
              classes={{ root: style.menuItemRoot }}
              key={i}
            >
              {parentCategory}
            </MenuItem>
          ))}
        </Toolbar>

        <Menu
          open={open}
          onClose={() => {
            setOpen(false);
            setAnchorEl(null);
          }}
          anchorEl={anchorEl}
        >
          {POICategories.filter((category) => category.parent === anchorEl?.id).map(
            (category, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setOpen(false);
                  setAnchorEl(null);
                }}
              >
                {category.name}
              </MenuItem>
            )
          )}
        </Menu>
      </ThemeProvider>

      <div className={style.pageContentContainer}>
        <Title component="h2">Browse by category</Title>
        <Slider {...sliderSettings}>
          {POICategories.map((category, i) => (
            <div key={i}>
              <Card
                className={
                  selectedCategory === category.name ? style.cardSelected : style.card
                }
              >
                <CardActionArea onClick={() => setSelectedCategory(category.name)}>
                  <CardMedia component="img" height="150" image={category.image} />
                </CardActionArea>

                <CardContent>
                  <div style={{ color: "white", fontWeight: "bold" }}>
                    {category.name}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
