import {
  ClickAwayListener,
  createMuiTheme,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import React, { MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import { Font } from "../../../assets";
import { thingsToDoStyles } from "../../../scenes/ThingsToDo/thingsToDo-styles";
import { POICategory } from "../../../utils";
import {
  POICategories,
  POICategoryParent,
  POICategorySearch,
} from "../../../utils/POICategory";

interface ParentCategoryToolbar {
  itemsToShow: number;
  selectedCategory: POICategorySearch;
  updateSelectedCategory: (category: any) => void;
}

export function ParentCategoryToolbar({
  itemsToShow,
  selectedCategory,
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

  const [open, setOpen] = useState(false);
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const [width] = useWindowSize();

  useEffect(() => {
    if (betweenRange(862, 955, width)) {
      setMenusToShow(4);
    } else if (betweenRange(670, 862, width)) {
      setMenusToShow(3);
    } else if (width < 670) {
      setMenusToShow(2);
    } else {
      setMenusToShow(5);
    }
  }, [width]);

  /**
   * Indicated whether <value> is between <start>(inclusive) and <end>(exclusive)
   * @param start
   * @param end
   * @param value
   */
  function betweenRange(start: number, end: number, value: number): boolean {
    return value >= start && value <= end;
  }

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

  function onMenuOpen(event: MouseEvent<HTMLElement>, menuType: "primary" | "secondary") {
    if (event.currentTarget !== anchorEl && menuType === "primary") {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }

    if (event.currentTarget !== anchorEl2 && menuType === "secondary") {
      setAnchorEl2(event.currentTarget);
      setOpenSecondMenu(true);
    }
  }

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
    setAnchorEl2(null);
  }

  return (
    <Grid item xs={12}>
      <ThemeProvider key="categories parent menu" theme={theme}>
        {/* Toolbar menu */}
        <Toolbar className={style.parentCategoryBar}>
          {parentCategories.slice(0, menusToShow).map((parentCategory, i) => (
            <MenuItem
              id={parentCategory}
              onClick={(e) => onMenuOpen(e, "primary")}
              onMouseEnter={() => closePrimaryMenu()}
              classes={{ root: style.menuItemRoot }}
              key={parentCategory}
            >
              {parentCategory}
            </MenuItem>
          ))}

          {menusToShow >= 5 && (
            <MenuItem
              id={"Tours & activities"}
              onClick={() => updateSelectedCategory(POICategory.TOUR)}
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
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
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
                                classes={{ root: style.menuItemChild }}
                                key={parentCategory}
                              >
                                {parentCategory}
                              </MenuItem>
                            ))}
                          <MenuItem
                            id={"Tours & activities"}
                            onClick={() => updateSelectedCategory(POICategory.TOURS)}
                            classes={{ root: style.menuItemChild }}
                          >
                            Tours & activities
                          </MenuItem>
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
          style={{ zIndex: 2 }}
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
                        key={category.id}
                        selected={category.name === selectedCategory.name}
                        classes={{ root: style.menuItemChild }}
                        onClick={() => {
                          setOpen(false);
                          updateSelectedCategory(category);
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
