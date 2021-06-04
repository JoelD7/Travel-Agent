import React, { Fragment, ReactNode, useEffect } from "react";
import { withRouter } from "react-router";
import { History } from "history";

interface ScrollToTopProps {
  history: History;
  children?: ReactNode;
}

function ScrollToTop({ history, children }: ScrollToTopProps) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
