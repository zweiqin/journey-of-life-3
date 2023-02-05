<template>
  <Pane name="analysis" title="情报分析">
    <Charts1 :data="data"></Charts1>
  </Pane>
</template>

<script>
import Pane from '../pane.vue'
import Charts1 from './charts1.vue'

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: {
    Pane,
    Charts1,
  },
}
</script>
