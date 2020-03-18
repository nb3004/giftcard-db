<template>
  <Layout>
    <b-navbar class="navbar navbar-expand-sm navbar-light bg-light px-0">
      <b-container>
        <g-link class="navbar-brand" to="/">Buffalo Gift Card Database</g-link>
        <g-link class="nav-link btn btn-primary" to="/about"
          >Add Your Local Business</g-link
        >
      </b-container>
    </b-navbar>

    <b-container class="vh-100">
      <b-row>
        <b-col cols="4" v-for="(business, idx) in businesses" :key="idx">
          <b-card no-body class="mb-2">
            <b-card-header
              :style="{
                backgroundColor: business.color ? business.color : '#069A78'
              }"
              header-tag="header"
            >
            </b-card-header>
            <b-card-body>
              <b-card-title>
                {{ business.name }}
              </b-card-title>
              <b-card-text>
                {{ business.description }}
              </b-card-text>
                <b-button block :href="business.pageUrl" variant="primary">Gift Cards</b-button>
                <b-button block :href="business.pageUrl" variant="primary">Takeout / Delivery</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
            <a class="text-center" href="https://www.helmux.com/work" target="_blank">Built with &#x2665; by Helm Experience &amp; Design</a>
    </b-container>
  </Layout>
</template>

<page-query>
query {
  businesses: allBusinesses {
    edges {
      node {
        id,
        email,
        name,
        description,
        address,
        gift_url,
        takeout_url
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Home",
    titleTemplate: "Buffalo Gift Card Database"
  },
  computed: {
    businesses() {
      return this.$page.businesses.edges.map(business => {
        var node = business.node;
        return {
          name: node.name,
          description: node.description,
          address: node.address,
          amounts: node.amounts ? JSON.parse(node.amounts) : null,
          type: node.type,
          gift_url: new RegExp("^https?://").test(node.gift_url)
            ? node.gift_url
            : "http://" + node.gift_url,
          takeout_url: new RegExp("^https?://").test(node.takeout_url)
            ? node.takeout_url
            : "http://" + node.takeout_url,
        };
      });
    }
  }
};
</script>
