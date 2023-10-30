// import router from '@/router'
import api from '../api'
import {sendReq} from './sendReqMixin'
import { mapMutations } from 'vuex'
import canvasConfig from '../config'
/*
 * 公共方法的 mixin
 */
export const tool = {
  mixins: [sendReq],
  props: {
    isNoData: {
      type: Boolean,
      default: false
    },
    comType: {
      type: String,
      default: ''
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      setCurrentPro: 'SET_CURRENTPRO'
    }),
    // 判断url
    jumpLink (linkObj) {
      var link = ''
      if(linkObj && linkObj.typeText && linkObj.data){
        switch (linkObj.typeText) {
          case '类别':
            this.jumpCategory(linkObj.data)
            break
          case '店辅':
            this.jumpStore(linkObj.data)
            break
          case '商品':
            this.jumpProductDetail(linkObj.data)
            break
          case '自定义':
            // router.push("/category");
          case '公告':
            this.jumpNoticeDetail(linkObj.data)
            break
        }
      } else if(linkObj.selsectValue==='/index'){
        uni.navigateTo({
          url: `/pages/index/index`
        })
      }
      return link
    },
    // 跳转到类别主页
    jumpCategory(item){
      uni.navigateTo({
        url: `/pages_category_page1/goodsModule/goodsList?category3Id=${item.id}`
      })
    },
    // 跳转到产品列表
    jumpProList(item){
      if(item.sourceType === '1'){
        uni.navigateTo({
          url: `/pages_category_page1/goodsModule/canvasGoods?sourceType=${item.sourceType}&ids=${item.productIdList}`
        })
      } else if(item.sourceType === '2'){
        uni.navigateTo({
          url: `/pages_category_page1/goodsModule/canvasGoods?sourceType=${item.sourceType}&classifyId=${item.categoryId}`
        })
      }
    },
    // 跳转到店铺主页
    jumpStore(item){
      uni.navigateTo({
        url: `/pages_category_page1/store/index?storeId=${item.shopId}`
      })
    },
    // 跳转到商品详情
    jumpProductDetail(item){
      uni.navigateTo({
        url: '/pages_category_page1/goodsModule/goodsDetails?shopId=' + item.shopId + '&productId=' + item.productId + '&skuId=' + item
            .skuId
      })
    },
    // 跳转到秒杀专区
    jumpSeckills(item){
      if(item.shopId){
        uni.navigateTo({
          url: '/pages_category_page1/discount/spikeList?shopId=' + item.shopId + '&shopSeckillId=' + item.shopSeckillId
        })
      } else {
        uni.navigateTo({
          url: '/pages_category_page1/discount/spikeList'
        })
      }
    },
    // 跳转到拼团专区
    jumpGroupWorks(item){
      if(item.shopId){
        uni.navigateTo({
          url: '/pages_category_page1/discount/groupBuy?shopId=' + item.shopId + '&shopGroupWorkId=' + item.shopGroupWorkId
        })
      } else {
        uni.navigateTo({
          url: '/pages_category_page1/discount/groupBuy?'
        })
      }
    },
    // 跳转到折扣专区
    jumpDiscount(item){
      if(item.shopId){
        if (item.shopDiscountId) {
          uni.navigateTo({
            url: '/pages_category_page1/discount/discount?shopId=' + item.shopId + '&shopDiscountId=' + item.shopDiscountId
          })
        } else {
          uni.showToast({
            title: '暂无活动',
            icon: "none"
          });
        }
      } else {
        if (item.discountId) {
          uni.navigateTo({
            url: '/pages_category_page1/discount/platformDiscount?discountId=' + item.discountId
          })
        } else {
          uni.showToast({
            title: '暂无活动',
            icon: "none"
          });
        }
      }
    },
    // 跳转到会员专区
    jumpVip(){
      uni.navigateTo({
        url: '/pages_category_page1/memberCenter/activityList',
        success: res => {},fail: () => {},complete: () => {}
      })
    },
    // 跳转组合支付
    jumpCombination(item){
      if (item.priceId) {
        uni.navigateTo({
          url: '/pages_category_page1/goodsModule/combination?priceId=' + item.priceId
        })
      } else {
        uni.showToast({
          title: '暂无活动',
          icon: "none"
        });
      }
    },
    // 跳转到公告详情
    jumpNoticeDetail(item){
      uni.navigateTo({
        url: '/pages_category_page2/userModule/messageDetail?noticeId=' + item.noticeId
      })
    },
    // 跳转到直播列表
    jumpLive(){
      uni.navigateTo({
        url: '/pages_category_page2/livePage/index'
      })
    },
    // 领取优惠券
    // receiveCoupon(item) {
    //   var key = canvasConfig.getToken()
    //   if (key) {
    //     var paramsData = {}
    //     if(this.typeId === 1){
    //       paramsData.couponId = item.couponId
    //     } else if(this.typeId === 3) {
    //       paramsData.shopCouponId = item.shopCouponId
    //       paramsData.shopId = this.shopId
    //     }
    //     let params = {
    //       url: api.takeCoupon,
    //       method: 'POST',
    //       data: paramsData
    //     }
    //     this.sendReq(params, (res) => {
    //       this.$message({
    //         message: '领取成功！',
    //         type: 'success'
    //       })
    //       this.getData()
    //     })
    //   } else {
    //     this.$message({
    //       message: '请先登录'
    //     })
    //     this.$router.push({path: '/login'})
    //   }
    // },
    // 加入购物车
    addCart(id){
    }
  }
}
