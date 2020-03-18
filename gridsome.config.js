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
      use: "@gridsome/plugin-sitemap"
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
        apiKey: "AIzaSyAMBaBI_VtuVPtDH9CStL32TGV3_tZlClA",
        spreadsheets: [
          {
            spreadsheetId: "1QsdesVTD1qkkshGfZvw9UFiwNjiH_5Ii5XA_vudSwro",
            sheets: [
              {
                sheetName: "Sheet1",
                collectionName: "businesses"
              }
            ]
          }
        ]
      }
    }
  ]
};
