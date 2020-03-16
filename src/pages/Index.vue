<template>
  <Layout>
    <div class="container-fluid vh-100">
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <g-link class="navbar-brand" href="/">Buffalo Gift Card Database</g-link>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <g-link class="nav-link btn btn-primary small" to="/about"
              >Add Your Local Business</g-link
            >
          </li>
        </ul>
      </nav>
        
        <div>
          <b-card
            title="point.company"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
                point.description
            </b-card-text>

            <b-button href="#" variant="primary">Purchase Giftcard</b-button>
          </b-card>
        </div>        

    </div>
    <a class="linkfixed" href="https://www.helmux.com/work" target="_blank"
      >Built with &#x2665;</a
    >
  </Layout>
</template>

<page-query>
query {
  places: allPlaces {
    edges {
      node {
        id,
        email,
        company,
        description,
        address,
        lng,
        lat,
        stage,
        category,
        website
      }
    }
  }
}
</page-query>

<script>
let Vue2Leaflet = {};

if (process.isClient) {
  Vue2Leaflet = require("vue2-leaflet");
}

import "leaflet/dist/leaflet.css";

export default {
  metaInfo: {
    title: "Home",
    titleTemplate: "Buffalo Gift Card Database"
  },
  components: {
    LMap: Vue2Leaflet.LMap,
    LTileLayer: Vue2Leaflet.LTileLayer,
    LCircleMarker: Vue2Leaflet.LCircleMarker,
    LPopup: Vue2Leaflet.LPopup,
    LFeatureGroup: Vue2Leaflet.LFeatureGroup
  },
  methods: {
    markerClick(info) {
      this.$gtm.trackEvent({
        event: "mapPointClick",
        companyName: info.company
      });
      this.popup = info;
      this.filteredPoints = this.points.filter(point => {
        return point.lng == info.lng && point.lat == info.lat;
      });
      this.$refs.features.mapObject.openPopup([info.lat, info.lng]);
    }
  },
  computed: {
    points() {
      return this.$page.places.edges.map(place => {
        var node = place.node;
        return {
          description: node.description,
          lat: parseFloat(node.lat),
          lng: parseFloat(node.lng),
          company: node.company,
          category: node.category,
          stage: node.stage,
          address: JSON.parse(node.address),
          website: new RegExp("^https?://").test(node.website)
            ? node.website
            : "http://" + node.website
        };
      });
    }
  }
};
</script>
