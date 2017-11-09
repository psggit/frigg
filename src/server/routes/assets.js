/**
 * # Router - Assets
 * Express middleware for serving assets.
 */

const path = require("path");
const express = require("express");

const assets = function assets(app) {
  const env = process.env.NODE_ENV;

  // get static assets directories
  // const fontsDir = path.resolve(__dirname, "../../client/app/fonts")
  const imagesDir = path.resolve(__dirname, "../../client/app/images")

  // setup asset serving for Hipbar
  // app.use("/fonts", express.static(fontsDir))
  app.use("/images", express.static(imagesDir));

  // Set routes for build if running in staging/production environment
  if (env === "production" || env === "testing") {
    // build directory contains the webpack builds
    var buildDir = path.resolve(__dirname, "../../client/build")
    app.use("/cdn", express.static(buildDir))
  }
}

module.exports = assets;
