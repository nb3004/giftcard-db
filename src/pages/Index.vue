<template>
  <Layout>
    <div class="container-fluid vh-100">
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <g-link class="navbar-brand" href="/"
          >Buffalo Gift Card Database</g-link
        >
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

<script>
export default {
  metaInfo: {
    title: "Home",
    titleTemplate: "Buffalo Gift Card Database"
  }
};
</script>
