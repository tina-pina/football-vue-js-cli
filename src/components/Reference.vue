<template>
  <div class="reference">
    <button class="btn p-6 m-4" v-on:click="toggleReference($event)">References</button>
    <div v-if="show">
      <div id="icons" class="d-flex flex-column">
        Icons made by
        <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >CC 3.0 BY</a>
        <p class="p-0">
          &
          <a href="http://logomakr.com">made by Logomakr</a>Vector Illustration by
          <a href="https://www.vecteezy.com">Vecteezy!</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reference",
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggleReference() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
a {
  color: white;
}
.reference {
  color: white;
}
</style>
