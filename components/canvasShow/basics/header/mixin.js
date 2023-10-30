import api from '../../config/api'
import { funMixin } from '../../config/mixin'

export const commonMixin = {
  name: 'headerComponent',
  mixins: [funMixin],
  props: {
    terminal: {
      type: Number,
      default: 4,
    },
    typeId: {
      type: Number,
      default: 1,
    },
    shopId: {
      type: Number,
      default: 0,
    },
    componentContent: {
      type: Object,
    },
  },
  data() {
    return {
      classifyData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const _ = this
      _.sendReq(
        {
          url: `${api.getClassify}?page=1&pageSize=20`,
          method: 'GET',
        },
        (res) => {
          _.classifyData = res.data
        },
        (err) => {}
      )
    },
  },
}
