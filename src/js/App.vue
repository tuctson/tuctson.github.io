<template>
  <div id="pbd">
    this is APP
    <p>hahha {{ message }}</p>
  </div>
</template>
<script>
import "../style/test.css";
export default {
  name: "App",
  data() {
    return {
      message: "你好呀",
    };
  },
};
</script>
<style lang="stylus"  scoped>
@import '../style/index.styl';

#pbd 
  transform: translate(500px, 500px)
 p 
  color: $red

</style>
