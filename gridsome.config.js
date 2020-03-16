// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Buffalo Gift Card Database",
  siteUrl: "https://helmux.com",
  siteDescription:
    "Buffalo Gift Card Database is a directory where people can find and support local businesses through the purchase of gift cards.",
  titleTemplate: "%s - Buffalo Gift Card Database",
  plugins: [
    {
      use: '@gridsome/plugin-sitemap',
    },
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: "GTM-XXXXXXX",
        enabled: process.env.NODE_ENV === "production",
        debug: false
      }
    },
    {
      use: "gridsome-source-google-sheets",
      options: {
        apiKey: "AIzaSyC2tSkbaL8SIQsSQGlIsQZXn-wHBD3z-Rs",
        spreadsheets: [
          {
            spreadsheetId: "1wRHZFMaWjRbL2G2SwwMHrAXhCcUraNeutrT6OpOM8BQ",
            sheets: [
              {
                sheetName: "Sheet1",
                collectionName: "places"
              }
            ]
          }
        ]
      }
    }
  ]
};
