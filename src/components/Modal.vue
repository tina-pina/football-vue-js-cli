<template>
  <!-- this is the landing page -->
  <div>
    <button v-on:click="showModal = !showModal" class="buy btn btn-lg btn-primary m-2">more info</button>
    <div class="modal field-inside d-flex justify-content-between flex-column" v-if="showModal">
      <div class="modal-content">
        <div>
          <div class="pl-1">wow</div>
        </div>
        <button
          v-if="showModal"
          id="close"
          v-on:click="showModal =! showModal"
          class="btn btn-lg btn-primary m-2"
        >Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {},
  data() {
    return {
      showModal: false
    };
  }
};
</script>


<style scoped>
.modal {
  /* position: fixed; */
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 500%;
  height: 500%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 9999;
}

.modal-content {
  width: 500%;
  height: 500%;
}

.field-inside {
  height: 100px;
  width: 100px;
}

button.btn {
  width: 70%;
  height: 70%;
}
</style>
