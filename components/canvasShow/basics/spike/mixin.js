import api from '../../config/api'
import { funMixin } from '../../config/mixin'

export const commonMixin = {
  name: 'spikeList',
  mixins: [funMixin],
  data() {
    return {
      productData: {
        products: [],
      },
      count: [],
      state: 0,
      timer: null,
    }
  },
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
  watch: {
    componentContent: {
      handler(newVal, oldVal) {
        this.getData()
      },
      deep: true,
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const _ = this
      if (_.componentContent.shopSeckillId) {
        if (this.typeId === 1) {
          const params = {
            method: 'GET',
            url: `${api.getPlatformSeckills}?ids=${_.componentContent.shopSeckillId}`,
          }
          this.sendReq(params, (res) => {
            if (res.data.length > 0) {
              _.productData = res.data[0]
              _.productData.products.map(function (value) {
                value.sliderVal = (
                  (value.stockNumber / value.total) *
                  100
                ).toFixed(2)
                return value
              })
              // 只有进行中和未开始活动, 用倒计时
              this.timer = setInterval(() => {
                _.getTime(_.productData)
              }, 1000)
            }
          })
        }
        if (this.typeId === 3) {
          const params = {
            method: 'GET',
            url: `${api.getSeckills}?shopId=${_.shopId}&ids=${_.componentContent.shopSeckillId}`,
          }
          this.sendReq(params, (res) => {
            if (res.data.length > 0) {
              _.productData = res.data[0]
              _.productData.products.map(function (value) {
                value.sliderVal = (
                  (value.stockNumber / value.total) *
                  100
                ).toFixed(2)
                return value
              })
              // 只有进行中和未开始活动, 用倒计时
              if (_.productData.state !== 2) {
                this.timer = setInterval(() => {
                  _.getTime(_.productData)
                }, 1000)
              }
            } else {
              _.productData = {
                products: [],
              }
            }
          })
        }
      } else {
        _.productData = {
          products: [],
        }
      }
    },
    getTime(info) {
      const date = new Date().getTime()
      let startTime = ''
      let endTime = ''
      if (this.typeId === 1) {
        startTime = new Date(info.startTime.replace(/-/g, '/')).getTime()
        endTime = new Date(info.endTime.replace(/-/g, '/')).getTime()
      } else {
        startTime = new Date(info.effectiveStart.replace(/-/g, '/')).getTime()
        endTime = new Date(info.effectiveEnd.replace(/-/g, '/')).getTime()
      }
      if (date > endTime) {
        this.state = 2
      } else if (startTime > date) {
        this.state = 0
        this.countDown(startTime - date) // 未开始
      } else {
        this.state = 1
        this.countDown(endTime - date) // 进行中
      }
    },

    countDown(time) {
      const fn = (v) => (v < 10 ? `0${v}` : v)
      const t = parseInt(time / 1000)
      const text = this.state == 0 ? '开始' : '结束'
      const hour = parseInt(t / 3600)
      const min = parseInt((t % 3600) / 60)
      const s = t % 60
      this.count = [text, fn(hour), fn(min), fn(s)]
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
