import React from "react";
import { PaginationItem, Pagination as MUIPagination } from "@material-ui/lab";
import { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

interface Pagination {
  pageCount: number;
  page: number;
  className?: string;
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
}

export function Pagination({ pageCount, page, className, onChange }: Pagination) {
  const paginationStyles = makeStyles(() => ({
    paginationItemRoot: {
      fontFamily: Font.Family,
    },
    paginationItemPage: {
      "&.Mui-selected": {
        backgroundColor: Colors.BLUE,
        color: "white",
        "&:hover": {
          backgroundColor: Colors.BLUE_HOVER,
        },
      },
    },
  }));

  const style = paginationStyles();
  return (
    <MUIPagination
      page={page + 1}
      count={pageCount}
      className={className}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          classes={{
            root: style.paginationItemRoot,
            page: style.paginationItemPage,
          }}
        />
      )}
      shape="rounded"
      onChange={onChange}
    />
  );
}
