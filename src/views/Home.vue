<template>
  <!-- this is the landing page -->
  <div class="home">
    <h1 class="m-5 font-weight-bold">NEWS</h1>
    <div class="container">
      <div class="row">
        <!-- start collapse -->
        <div
          class="d-flex justify-content-between border-light border-bottom pt-3 pd-2 w-100"
          role="tablist"
          v-for="(article, index) in articles"
          @click="toggleItem(index)"
          :class="{active: isActive === index}"
        >
          <p class="col-3 p-1">
            <font-awesome-icon icon="table"/>
            {{ article.publishedAt | formatDate }}
          </p>
          <h3 class="col-4">{{ article.title }}</h3>

          <b-card
            no-body
            class="mb-1 d-flex justify-content-center col-5"
            :style="{'backgroundColor': 'rgba(255,255,255,0)', 'border-style': 'none'}"
          >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn
                class="readMore"
                block
                href="#"
                v-b-toggle.active
                variant="info"
                @click="showCollapse = !showCollapse"
                :class="showCollapse ? 'collapsed' : null"
                aria-controls="collapse4"
                :aria-expanded="showCollapse ? 'true' : 'false'"
              >Read more</b-btn>
            </b-card-header>
            <b-collapse
              id="active"
              visible
              accordion="my-accordion"
              role="tabpanel"
              v-model="showCollapse"
            >
              <b-card-body v-if="isActive === index" class="item-active">
                <h5 class="card-text">{{ article.description | filterDesc }}</h5>
                <p class="card-text">
                  <a target="_blank" v-bind:href="article.url">More Info</a>
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <!-- end collapse -->
      </div>
    </div>

    <footer>
      <p id="external">
        <a v-bind:href="'https://newsapi.org/'">Powered by NewsAPI</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      articles: [],
      showCollapse: true,
      isActive: null
    };
  },
  methods: {
    toggleItem(index) {
      this.isActive = index;
    }
  },
  filters: {
    formatDate: function(dateString) {
      let date = new Date(dateString);
      let str = date
        .toLocaleString()
        .split(" ")
        .slice(0, 1)
        .join(" ");
      let newStr = str
        .split("")
        .slice(0, 10)
        .join("");
      return newStr;
    },
    filterDesc: function(desc) {
      let endRes = desc
        .split(" ")
        .slice(0, 15)
        .join(" ");
      let newStr = endRes + "...";
      return newStr;
    }
  },
  created() {
    let url =
      "https://newsapi.org/v2/everything?q=UEFA&from=2018-12-03&language=en&apiKey=7ed7ffcbddb3444289980ffe3c583305";
    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log("Request succeeded: " + response.statusText);
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        let sortedArticles = json.articles.sort(function(a, b) {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });

        this.articles = sortedArticles;
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
      });
  }
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

h1 {
  color: firebrick;
  font-size: 60px;
}

h3 {
  font-size: 16px;
  display: inline-block;
}

h5.card-text {
  font-size: 16px;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);
  color: darkblue;
}

.card {
  background-color: rgba(255, 255, 255, 0.7);
}

.container p {
  color: black;
  font-weight: bold;
}

footer #external a {
  color: black;
  font-weight: bold;
}

footer p {
  margin: 0;
  padding: 2rem;
}
</style>
