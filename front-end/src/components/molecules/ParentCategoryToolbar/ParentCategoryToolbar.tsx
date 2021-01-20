import {
  Grid,
  ThemeProvider,
  Toolbar,
  MenuItem,
  Menu,
  createMuiTheme,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from "@material-ui/core";
import React, { MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import { Font } from "../../../assets";
import { thingsToDoStyles } from "../../../scenes/ThingsToDo/thingsToDo-styles";
import { POICategory } from "../../../utils";
import { POICategories, POICategoryParent } from "../../../utils/POICategory";

interface ParentCategoryToolbar {
  itemsToShow: number;
  updateSelectedCategory: (category: any) => void;
}

export function ParentCategoryToolbar({
  itemsToShow,
  updateSelectedCategory,
}: ParentCategoryToolbar) {
  const style = thingsToDoStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
        },
      },
      MuiMenu: {
        paper: {
          left: "388px",
        },
      },
    },
  });

  const parentCategories = [
    POICategoryParent.ArtsEntertainment,
    POICategoryParent.Nightlife,
    POICategoryParent.OutdoorsRec,
    POICategoryParent.ShopService,
  ];

  const [menusToShow, setMenusToShow] = useState<number>(5);

  const initialCategory = POICategory.Museum.pluralName;

  const [open, setOpen] = useState(false);
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width <= 738) {
      setMenusToShow(3);
    }
  }, []);

  /**
   * Returns the current width and height of the window whenever those
   * values change in the DOM.
   */
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const onMenuOpen = (
    event: MouseEvent<HTMLElement>,
    menuType: "primary" | "secondary"
  ) => {
    if (event.currentTarget !== anchorEl) {
      if (menuType === "primary") {
        setAnchorEl(event.currentTarget);
        setOpen(true);
      } else {
        setAnchorEl2(event.currentTarget);
        setOpenSecondMenu(true);
      }
    }
  };

  function openPrimaryFromSecondary(event: MouseEvent<HTMLElement>) {
    if (event.currentTarget !== anchorEl) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function closePrimaryMenu() {
    setOpen(false);
    setAnchorEl(null);
  }

  function closeSecondaryMenu() {
    setOpenSecondMenu(false);
    setAnchorEl(null);
  }

  return (
    <Grid item xs={12}>
      <ThemeProvider key="categories parent menu" theme={theme}>
        <Toolbar className={style.parentCategoryBar}>
          {parentCategories.slice(0, menusToShow).map((parentCategory, i) => (
            <MenuItem
              id={parentCategory}
              onClick={(e) => onMenuOpen(e, "primary")}
              classes={{ root: style.menuItemRoot }}
              key={i}
            >
              {parentCategory}
            </MenuItem>
          ))}

          {menusToShow >= 5 && (
            <MenuItem
              id={"Tours & activities"}
              onClick={() => updateSelectedCategory(POICategory.TOURS)}
              classes={{ root: style.menuItemRoot }}
            >
              Tours & activities
            </MenuItem>
          )}

          {menusToShow < 5 && (
            <div>
              <MenuItem
                onClick={(e) => onMenuOpen(e, "secondary")}
                classes={{ root: style.menuItemRoot }}
              >
                More
              </MenuItem>

              {/* Secondary menu */}
              <Popper
                open={openSecondMenu}
                anchorEl={anchorEl2}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: "left center",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={() => closeSecondaryMenu()}>
                        <MenuList autoFocusItem={openSecondMenu} id="menu-list-grow">
                          {parentCategories
                            .slice(menusToShow)
                            .map((parentCategory, i) => (
                              <MenuItem
                                id={parentCategory}
                                onClick={(e) => openPrimaryFromSecondary(e)}
                                key={i}
                              >
                                {parentCategory}
                              </MenuItem>
                            ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
        </Toolbar>

        {/* Primary menu */}
        <Popper
          open={open}
          anchorEl={anchorEl}
          role={undefined}
          transition
          disablePortal
          placement="left-start"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => closePrimaryMenu()}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    {POICategories.filter(
                      (category) => category.parent === anchorEl?.id
                    ).map((category, i) => (
                      <MenuItem
                        key={i}
                        onClick={() => {
                          setOpen(false);
                          updateSelectedCategory(category.name);
                          setAnchorEl(null);
                        }}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ThemeProvider>
    </Grid>
  );
}
