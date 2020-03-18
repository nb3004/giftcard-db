<template>
  <Layout>
    <b-navbar class="navbar navbar-expand-sm navbar-light bg-light px-0">
      <b-container>
        <g-link class="navbar-brand" to="/">Buffalo Gift Card Database</g-link>
        <g-link class="nav-link btn btn-secondary tealGreen" to="/"
          >Cancel</g-link
        >
      </b-container>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col class="col-md-6 offset-md-3 mt-5 pt-5 pb-4">
          <h1 class="mt-5">Add your local business</h1>
          <p>
            List your local business and add a link to purchase gift cards or
            order take-out.
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-md-6 offset-md-3">
          <b-form @submit.stop.prevent="sendFormData" autocomplete="off">
            <b-form-group label="Company Name" label-for="company">
              <b-form-input
                id="company"
                v-model="form.company"
                required
                placeholder="Local business name... "
                autofocus
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Business Type" label-for="type">
              <b-form-select
                id="type"
                v-model="form.type"
                :options="types"
                required
              >
                <template v-slot:first>
                  <b-select-option :value="null" disabled
                    >-- Select a Type --</b-select-option
                  >
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group label="Gift Cards" label-for="website">
              <b-form-input
                id="website"
                v-model="form.website"
                required
                placeholder="Gift Card Link... "
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Take Out" label-for="website">
              <b-form-input
                id="takeOut"
                v-model="form.website"
                required
                placeholder="Take Out / Delivery Link... "
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Description" label-for="description">
              <b-form-textarea
                id="description"
                v-model="form.description"
                required
                placeholder="Explain how people can help your business during this difficult time..."
                rows="3"
                no-resize
              ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Your Email" label-for="email">
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Best email for verification..."
              ></b-form-input>
            </b-form-group>
            <div class="text-center mb-5">
              <b-button
                type="submit"
                variant="primary"
                class="mt-3 mb-5"
                :disabled="saving"
              >
                <span v-if="saving">
                  <b-spinner small></b-spinner>
                  Saving...
                </span>
                <span v-else>Submit</span>
              </b-button>
              <p class="lightgrey">
                By clicking Submit you agree that the information listed above
                is true to the best of your knowledge. You're also saying it's
                cool if we email you. We won't spam you so don't worry, we just
                want to help local businesses.
              </p>
              <br />
              <a
                class="lightgrey"
                href="https://www.helmux.com/work"
                target="_blank"
              >
                Built with &#x2665; by Helm Experience &amp; Design
              </a>
              <br />
              <br />
              <br />
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScA9hirfSieN7Wii81gPZGP3_zvJAzg9K4Ye51MTT9M8-Ybmg/viewform?usp=sf_link"
                target="_blank"
              >
                Feedback?
              </a>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "About"
  },
  data() {
    return {
      url:
        "https://script.google.com/macros/s/AKfycbwlb0OuUE_0_1xUtIAsUgJk5gKdHCbvQRMVcx10W6BhroY8i1lP/exec",
      form: {
        email: "",
        business_name: "",
        description: "",
        address: "",
        amounts: "",
        type: null,
        page_url: "",
        logo: "",
        color: ""
      },
      types: [
        "Restaurant",
        "Arts & Entertainment",
        "Retail",
        "I don't see an appropriate type here"
      ],
      saving: false
    };
  },
  methods: {
    gtmTrackFormSubmit() {
      this.$gtm.trackEvent({
        event: "formSubmit",
        companyName: this.form.company,
        date: new Date()
      });
    },
    sendFormData() {
      this.loading = true;
      fetch(this.url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.dataToArray)
      }).then(() => {
        this.$router.push({
          path: "/thanks"
        });
      });
    }
  }
};
</script>
