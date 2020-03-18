<template>
  <Layout>
    <b-navbar class="navbar navbar-expand-sm navbar-light bg-light px-0">
      <b-container>
        <g-link class="nav-link btn btn-primary" to="/about"
          >Add Your Local Business</g-link
        >
      </b-container>
    </b-navbar>

    <b-container>
      <b-row class="my-5 py-5">
        <b-col cols="12" class="text-center my-5">
          <h1 class="text-green">Buffalo Gift Card Database</h1>
          <p>Lorem Ipsum</p>
        </b-col>
      </b-row>
      <b-form-row class="my-5 py-5">
        <b-col cols="6">
          <b-form-input
            v-model="filter.search"
            placeholder="Search..."
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <div class="border rounded p-3">
            <b-form-group class="mb-0" label="Filter types">
              <b-form-checkbox-group
                v-model="filter.types"
                :options="types"
                name="type"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </div>
        </b-col>
        <b-col cols="3">
          <div class="border rounded p-3">
            <b-form-group class="mb-0" label="Filter types">
              <b-form-checkbox-group
                v-model="filter.actions"
                :options="actions"
                name="type"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </div>
        </b-col>
      </b-form-row>
    </b-container>

    <b-container class="my-5">
      <b-row>
        <b-col
          cols="4"
          v-for="(business, idx) in filteredBusinessList"
          :key="idx"
        >
          <b-card no-body class="mb-2">
            <b-card-header
              :style="{
                backgroundColor: '#069A78'
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
              <b-button
                v-if="business.giftUrl"
                block
                :href="business.giftUrl"
                variant="primary"
                >Gift Cards</b-button
              >
              <b-button
                v-if="business.takeoutUrl"
                block
                :href="business.takeoutUrl"
                variant="primary"
                >Takeout / Delivery</b-button
              >
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <a class="text-center" href="https://www.helmux.com/work" target="_blank"
        >Built with &#x2665; by Helm Experience &amp; Design</a
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
  data() {
    return {
      filter: {
        types: [],
        actions: [],
        search: ""
      },
      types: [],
      actions: [
        { text: "Gift Cards", value: "giftUrl" },
        { text: "Take Out", value: "takeoutUrl" }
      ],
      businessList: []
    };
  },
  methods: {
    initBusinessList() {
      this.businessList = this.$page.businesses.edges.map(business => {
        var node = business.node;
        return {
          name: node.name,
          description: node.description,
          address: node.address,
          type: node.type,
          giftUrl: new RegExp("^https?://").test(node.gift_url)
            ? node.gift_url
            : "http://" + node.gift_url,
          takeoutUrl: new RegExp("^https?://").test(node.takeout_url)
            ? node.takeout_url
            : "http://" + node.takeout_url
        };
      });
    },
    initFilters() {
      this.businessList.forEach(business => {
        if (!this.filter.types.includes(business.type) && business.type)
          this.filter.types.push(business.type);
      });
      // this.filter.types = this.types.map(type => {
      //   return type;
      // });
      this.filter.actions = this.actions.map(action => {
        return action.value;
      });
    }
  },
  mounted() {
    this.initBusinessList();
    this.initFilters();
  },
  computed: {
    filteredBusinessList() {
      let arr = [];
      let self = this;
      arr = this.businessList.filter(business => {
        var search = self.filter.search.toLowerCase();
        var name = business.name.toLowerCase();
        return name.includes(search);
      });

      if (self.filter.types.length) {
        arr = arr.filter(business => {
          return self.filter.types.includes(business.type);
        });
      }

      if (self.filter.actions.length) {
        arr = arr.filter(business => {
          return self.filter.actions.every(action => {
            return business[action];
          });
        });
      }
      return arr;
    }
  }
};
</script>
