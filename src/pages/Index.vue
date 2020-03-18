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
                backgroundColor: business.color ? business.color : '#222222'
              }"
              header-tag="header"
            >
              <div class="embed-responsive embed-responsive-21by9">
                <div class="embed-responsive-item d-flex align-items-center">
                  <b-img-lazy
                    class="w-100 h-auto"
                    src="https://placekitten.com/300/100"
                    :alt="business.name"
                  />
                </div>
              </div>
            </b-card-header>
            <b-card-body>
              <b-card-title>
                {{ business.name }}
              </b-card-title>
              <b-card-text>
                {{ business.description }}
              </b-card-text>
              <b-button block :href="business.pageUrl" variant="primary"
                >Purchase Giftcard</b-button
              >
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <a class="" href="https://www.helmux.com/work" target="_blank"
        >Built with &#x2665;</a
      >
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
        business_name,
        description,
        address,
        page_url,
        type,
        amounts,
        logo_url,
        color
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
          name: node.business_name,
          description: node.description,
          address: node.address,
          amounts: node.amounts ? JSON.parse(node.amounts) : null,
          type: node.type,
          logoUrl: node.logo_url,
          color: node.color,
          pageUrl: new RegExp("^https?://").test(node.page_url)
            ? node.page_url
            : "http://" + node.page_url
        };
      });
    }
  }
};
</script>
