import React, { Fragment, ReactNode, useEffect } from "react";
import { withRouter } from "react-router";
import { History } from "history";
import { Routes } from "../../utils";

interface ScrollToTopProps {
  history: History;
  children?: ReactNode;
}

function ScrollToTop({ history, children }: ScrollToTopProps) {
  useEffect(() => {
    // To scroll to top on refresh
    window.onload = (event: any) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      window.scrollTo(0, 0);

      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };

    const unlisten = history.listen(() => {
      //To prevent scroll to top on page change
      if (history.location.pathname !== Routes.FLIGHT_LIST) {
        window.scrollTo(0, 0);
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
