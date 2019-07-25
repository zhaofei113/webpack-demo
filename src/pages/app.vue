
<template>
  <div>
    <p class="one">{{vue}}</p>
    <test v-if="show"></test>
  </div>
</template>
<script>
// import test from "./test.vue";
export default {
  data() {
    return {
      vue: "vue",
      show: false
    };
  },
  components: {
    test: () => import("./test.vue")
  },
  created() {
    window.$vm = this;
  }
};
</script>

<style lang="scss">
.one {
  color: red;
}
</style>
