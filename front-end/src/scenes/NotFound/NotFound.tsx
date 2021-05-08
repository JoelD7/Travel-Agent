import { Grid } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CustomButton, Footer, Navbar, ServicesToolbar, Text } from "../../components";
import { Colors } from "../../styles";
import { Routes } from "../../utils";
import { notFoundStyles } from "./notFoundStyles";

export function NotFound() {
  const style = notFoundStyles();

  return (
    <div style={{ backgroundColor: Colors.BACKGROUND }}>
      <Helmet>
        <title>{`404 | Not found`}</title>
      </Helmet>

      <Navbar />
      <ServicesToolbar />

      <Grid container justify="center" alignItems="center" style={{ height: "81vh" }}>
        <div style={{ height: "250px" }}>
          <Text component="h1" bold color={Colors.BLUE}>
            Ups... Error 404
          </Text>

          <Text component="h4" color={Colors.GRAY_TEXT} style={{ maxWidth: "242px" }}>
            It seems like the page you requested doesn’t exists
          </Text>

          <Link to={Routes.HOME} style={{ textDecoration: "auto" }}>
            <CustomButton style={{ marginTop: "10px" }} backgroundColor={Colors.GREEN}>
              Go to Homepage
            </CustomButton>
          </Link>
        </div>

        <div className={style.imageContainer}>
          <img
            style={{
              height: "250px",
            }}
            src="/Travel-Agent/not-found.png"
            alt="not-found robot"
          />
        </div>
      </Grid>

      <Footer />
    </div>
  );
}
