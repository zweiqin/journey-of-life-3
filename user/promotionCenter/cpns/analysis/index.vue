<template>
  <Pane style="border-radius: 40upx 40upx 0 0" type="analysis" text="情报分析">
    <Charts1></Charts1>
  </Pane>
</template>

<script>
import Pane from "../pane.vue";
import Charts1 from "./charts1.vue";

export default {
  components: {
    Pane,
    Charts1,
  },
};
</script>

<style lang="less" scoped>
</style>