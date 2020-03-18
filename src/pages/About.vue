<template>
  <Layout>
    <b-navbar class="navbar navbar-expand-sm navbar-light bg-light px-0">
      <b-container>
        <g-link class="navbar-brand" to="/">Buffalo Gift Card Database</g-link>
        <g-link class="nav-link btn btn-secondary" to="/">Cancel</g-link>
      </b-container>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col class="col-md-10 offset-md-1">
          <b-row class="mt-5">
            <b-col class="pb-4">
              <h1>Add a local business</h1>
              <p>
                Enter the local business to add them on the list!
              </p>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="col-md-4 position-relative">
              <div class="sticky-top pt-5 mt-n5">
                <b-card no-body class="mb-2">
                  <b-card-header
                    :style="{
                      backgroundColor: form.color ? form.color : '#222222'
                    }"
                    header-tag="header"
                  >
                    <div class="embed-responsive embed-responsive-21by9">
                      <div
                        class="embed-responsive-item d-flex align-items-center"
                      >
                        <b-img-lazy
                          class="w-100 h-auto"
                          src="https://placekitten.com/300/100"
                          :alt="form.name ? form.name : 'Add a business name'"
                        />
                      </div>
                    </div>
                  </b-card-header>
                  <b-card-body>
                    <b-card-title>
                      {{ form.name ? form.name : "Add a business name" }}
                    </b-card-title>
                    <b-card-text>
                      {{
                        form.description
                          ? form.description
                          : "Write a description"
                      }}
                    </b-card-text>
                    <b-button
                      block
                      :href="form.pageUrl ? form.pageUrl : '#'"
                      variant="primary"
                      >Purchase Giftcard</b-button
                    >
                  </b-card-body>
                </b-card>
              </div>
            </b-col>

            <b-col class="col-md-7 offset-md-1">
              <b-form @submit.stop.prevent="sendFormData" autocomplete="off">
                <b-form-group label="Company Name" label-for="company">
                  <b-form-input
                    id="company"
                    v-model="form.name"
                    required
                    placeholder="Local business name... "
                    autofocus
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Upload a logo" label-for="file-default">
                  <b-form-file id="file-default"></b-form-file>
                </b-form-group>

                <b-form-group label="Select a color" label-for="color">
                  <b-row>
                    <b-col cols="auto">
                      <input type="color" id="color" v-model="form.color" />
                    </b-col>
                    <b-col>
                      <input
                        class="form-control"
                        type="text"
                        :placeholder="form.color"
                        readonly
                      />
                    </b-col>
                  </b-row>
                </b-form-group>

                <b-form-group label="Gift Card Amounts" label-for="amount">
                  <small class="form-text text-muted"
                    >Or simply write "Any amount".</small
                  >
                  <b-input-group
                    class="mb-2"
                    v-for="(amount, idx) in form.amounts.length"
                    :key="idx"
                  >
                    <b-form-input
                      id="amount"
                      v-model="form.amounts[idx]"
                      required
                      placeholder="$5.00"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        v-if="form.amounts.length > 1"
                        variant="info"
                        @click="removeAmount(idx)"
                        >Remove</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-button variant="primary" @click="addAmount()">
                  Add Amount
                </b-button>
                <b-form-group
                  label="Add a link to the gift card page"
                  label-for="pageUrl"
                >
                  <b-form-input
                    id="pageUrl"
                    v-model="form.pageUrl"
                    required
                    placeholder="https://www.giftcard.com/"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="description">
                  <b-form-textarea
                    id="description"
                    v-model="form.description"
                    required
                    placeholder="Briefly describe the form..."
                    rows="3"
                    no-resize
                  ></b-form-textarea>
                </b-form-group>
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
              </b-form>
            </b-col>
          </b-row>
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
      validation: null,
      url:
        "https://script.google.com/macros/s/AKfycbwlb0OuUE_0_1xUtIAsUgJk5gKdHCbvQRMVcx10W6BhroY8i1lP/exec",
      form: {
        email: "",
        name: "",
        description: "",
        address: "",
        amounts: [""],
        type: "",
        pageUrl: "",
        logo: "",
        color: "#222222"
      },
      saving: false
    };
  },
  methods: {
    addAmount() {
      this.form.amounts.push("");
    },
    removeAmount(idx) {
      this.form.amounts.splice(idx, 1);
    },
    gtmTrackFormSubmit() {
      this.$gtm.trackEvent({
        event: "formSubmit",
        companyName: this.form.company,
        date: new Date()
      });
    },
    sendFormData() {
      this.gtmTrackFormSubmit();
      if (!Object.keys(this.form.address).length) {
        this.$refs.address.focus();
        // this.validation = false;
        return;
      }
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
