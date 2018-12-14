<template>
  <div>
    <gmap-map :center="{ lat: lat, lng: lng }" :zoom="15" style="width:100%;  height: 400px;">
      <gmap-marker :position="{ lat: lat, lng: lng }"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    lat: Number,
    lng: Number
  },
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null
    };
  }
};
</script>