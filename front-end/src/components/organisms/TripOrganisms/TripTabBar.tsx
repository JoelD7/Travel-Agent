import {
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";

interface TripTabBar {
  tabIndex: number;
  onTabIndexChange: (tabIndex: number) => void;
}

export function TripTabBar({ tabIndex, onTabIndexChange }: TripTabBar) {
  const tabBarStyles = makeStyles((theme: Theme) => ({
    menuItemChild: {
      fontFamily: Font.Family,
      borderBottom: `3px solid rgba(0,0,0,0)`,
      margin: "0px 5px",
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
    menuItemRoot: {
      fontFamily: Font.Family,
      fontWeight: "bold",
      borderBottom: `2px solid rgba(0,0,0,0)`,
      margin: "0px 5px",
      color: "white",
      "&.MuiListItem-root": {
        "&.Mui-selected": {
          backgroundColor: "rgba(0,0,0,0)",
          borderBottom: `2px solid white`,
        },
      },
    },
    moreMenuItem: {
      display: "none",
      [theme.breakpoints.down(1060)]: {
        display: "flex",
      },
    },
    toolbar: {
      display: "flex",
      minHeight: "20px",
      height: "40px",
      boxShadow: Shadow.LIGHT,
      margin: "20px 0px",
      borderRadius: "5px",
      justifyContent: "space-evenly",
      width: "750px",
      backgroundColor: Colors.GREEN,

      [theme.breakpoints.down(1116)]: {
        width: "94%",
      },
    },
  }));

  const style = tabBarStyles();

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const is1060OrLess = useMediaQuery("(max-width:1060px)");
  const is857OrLess = useMediaQuery("(max-width:857px)");
  const is620OrLess = useMediaQuery("(max-width:620px)");
  const is450OrLess = useMediaQuery("(max-width:450px)");

  const tabOptions = [
    "All",
    "Photos",
    "Flights",
    "Hotels",
    "Restaurants",
    "Things to do",
    "Car rental",
  ];

  const tabsToShow = getMenuItemsToShow();

  function getMenuItemsToShow(): number {
    if (is450OrLess) {
      return 3;
    } else if (is620OrLess) {
      return 4;
    } else if (is857OrLess) {
      return 5;
    } else if (is1060OrLess) {
      return 6;
    } else {
      return 7;
    }
  }

  function openTabsMenu(event: MouseEvent<HTMLElement>) {
    if (event.currentTarget !== anchorEl) {
      setAnchorEl(event.currentTarget);
      setOpenMenu(true);
    }
  }

  function closeTabMenu() {
    setOpenMenu(false);
    setAnchorEl(null);
  }

  return (
    <>
      <Toolbar className={style.toolbar}>
        {tabOptions.slice(0, tabsToShow).map((option, i) => (
          <MenuItem
            onClick={() => onTabIndexChange(i)}
            key={option}
            selected={tabIndex === i}
            classes={{ root: style.menuItemRoot }}
          >
            {option}
          </MenuItem>
        ))}

        <MenuItem
          className={style.moreMenuItem}
          onClick={(e) => openTabsMenu(e)}
          classes={{ root: style.menuItemRoot }}
        >
          More
        </MenuItem>
      </Toolbar>

      <Popper
        open={openMenu}
        anchorEl={anchorEl}
        role={undefined}
        transition
        style={{ zIndex: 2 }}
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => closeTabMenu()}>
                <MenuList autoFocusItem={openMenu} id="menu-list-grow">
                  {tabOptions.slice(tabsToShow).map((option, i) => (
                    <MenuItem
                      id={option}
                      onClick={() => onTabIndexChange(tabsToShow + i)}
                      classes={{ root: style.menuItemChild }}
                      key={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
