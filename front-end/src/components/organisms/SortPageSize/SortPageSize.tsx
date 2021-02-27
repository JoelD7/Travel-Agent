import {
  Grid,
  ThemeProvider,
  FormControl,
  Select,
  MenuItem,
  Divider,
  createMuiTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";
import { Text } from "../../atoms";

interface SortPageSize {
  onPageSizeChange?: (value: number) => void;
  onSortOptionChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  sortOption?: string;
  sortOptions?: string[];
  pageSize?: number;
  pageSizeOptions?: number[];
  includeSort?: boolean;
  className?: string;
  includePaging?: boolean;
}

export function SortPageSize({
  onPageSizeChange,
  onSortOptionChange,
  sortOption,
  sortOptions = [],className,
  includeSort = true,
  includePaging = true,
  pageSize,
  pageSizeOptions = [],
}: SortPageSize) {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Font.Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Font.Family,
          color: Colors.BLUE,
        },
      },
      //@ts-ignore

      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: `"#cecece"`,
          },
        },
      },

      MuiInput: {
        underline: {
          "&:hover": {
            "&:not(.Mui-disabled)": {
              "&::before": {
                borderBottom: `2px solid ${Colors.GREEN}`,
              },
            },
          },
          "&::after": {
            borderBottom: `2px solid ${Colors.PURPLE}`,
          },
        },
      },
    },
  });
  const sortPageStyles = makeStyles(() => ({
    sortContainer: {
      padding: "10px",
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM,
      borderRadius: "10px",
      marginLeft: "auto",
      width: "max-content",
      [theme.breakpoints.down(600)]: {
        marginLeft: "0px",
        marginRight: "auto",
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
    select: {
      "& .MuiOutlinedInput-input": {
        padding: "10px 25px 10px 15px",
        borderRadius: "10px",
        margin: "0px 5px",
      },

      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: "#cecece",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#cecece",
        },
      },

      "& .MuiMenuItem-root": {
        fontFamily: Font.Family,
      },
    },
    selectIcon: {
      color: Colors.BLUE,
    },
    sortFormControl: {
      backgroundColor: "white",
      marginLeft: "15px",
      borderRadius: "5px",
    },
  }));

  const style = sortPageStyles();

  return (
    <Grid container className={`${style.sortContainer} ${className}`} alignItems="center">
      {/* Sort grid */}
      {includeSort && (
        <Grid item xs={8}>
          <Grid container>
            <Text bold style={{ alignSelf: "end", margin: "auto" }} color={"white"}>
              Sort by
            </Text>

            <ThemeProvider theme={theme}>
              <FormControl className={style.sortFormControl} style={{ width: "145px" }}>
                <Select
                  value={sortOption}
                  variant="outlined"
                  classes={{ icon: style.selectIcon }}
                  className={style.select}
                  onChange={onSortOptionChange}
                >
                  {sortOptions.map((option, i) => (
                    <MenuItem
                      classes={{ root: style.menuItemSelect }}
                      key={i}
                      value={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider
                orientation="vertical"
                style={{ background: "white", margin: "0px 10px" }}
              />
            </ThemeProvider>
          </Grid>
        </Grid>
      )}

      {/* Paging grid */}
      {includePaging && (
        <Grid item xs={includeSort ? 4 : 12}>
          <Grid container>
            <Text
              bold
              style={{ alignSelf: "end", margin: "auto 0px auto 5px" }}
              color={"white"}
            >
              See
            </Text>

            <FormControl className={style.sortFormControl} style={{ width: "70px" }}>
              <Select
                value={pageSize}
                variant="outlined"
                classes={{ icon: style.selectIcon }}
                className={style.select}
                onChange={(e, value) =>
                  onPageSizeChange ? onPageSizeChange(e.target.value as number) : {}
                }
              >
                {pageSizeOptions.map((option, i) => (
                  <MenuItem
                    classes={{ root: style.menuItemSelect }}
                    key={i}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
