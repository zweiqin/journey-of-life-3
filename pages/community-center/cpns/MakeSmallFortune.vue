<template>
  <view class="serve-shop-container">
    <view class="bar">
      <image class="bar-img" :src="common.seamingImgUrl('1716520279093-wdnmdBanner.png')"></image>
    </view>

    <view class="shop-list">
      <view class="content">
        <view class="nomore" v-if="renderData.length <= 0">
          暂时没有人发布文章~
        </view>
        <Articles v-for="(item, index) in renderData" :key="index" :datas="item"></Articles>
        <button class="Release" @click="go('/community-center/makeSmallFortune/release')">
          发布
        </button>
        <view class="more" @click="go('/community-center/makeSmallFortune/index')">
          <button class="uni-btn">
            查看更多
            <tui-icon :size="18" name="arrowright"></tui-icon>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// [ // 假数据 参考作用
//           {
//             title: '',
//             timer: '',
//             isOver: true,
//             readerAvata: [],
//             maxPrice: '99',
//             isReadNumber: '666',
//             coverSheet: ''
//           }
//         ]
import { getPostList } from '@/api/community-center/makeSmallFortune'
import Articles from './Articles.vue'
export default {
  name: "MakeSmallFortune",
  components: {
    Articles
  },
  props: {},
  data() {
    return {
        renderData: []
    }
  },
  created() {
  },
  computed: {},
  methods: {
		getPostList() {
			let region
			try{
				region = this.$store.state.location.locationInfo.district
        // console.log(region)
			}catch {
				region = '顺德区'
        // console.log(region)
			}
			getPostList({
				userId: "",
				page: "1",
				size: "7",
				examineType:"3",
				region
			}).then(res => {
				// res.data.talentList
        // let data = res.data.talentList.filter(item => )
				let data = res.data.talentList.filter((item, index) => {
					return item.remainingPacket <= 0
 				})
        this.renderData = [...res.data.talentList.filter((item, index) => {
					return item.remainingPacket > 0
 				}), ...data]
			})
		}
	},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.serve-shop-container {
  width: 100%;

  .bar {
    height: 257upx;
    background-color: #fffbf4;

    .bar-img {
      width: 100%;
      height: 100%;
    }
  }
    .shop-list {
      margin-top: -114upx;
      padding: 38upx 30upx;
      box-sizing: border-box;

      .content {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 20upx;
        background-color: #fff;
        padding: 38upx 0;
        box-sizing: border-box;
        box-shadow: 0rpx 4rpx 4rpx 0rpx #ccc;
        z-index: 10;
        .nomore {
          font-size: 28upx;
          color: #999;
          text-align: center;
          margin: 30upx 0rpx;
        }
      }
      .Release {
        width: 646rpx;
        height: 77rpx;
        line-height: 77rpx;
        border-radius: 50rpx;
        color: #fff;
        background: #EF530E;
      }
      .Release:active {
        background: #c64711;
      }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24upx;

    .uni-btn {
      display: flex;
      align-items: center;
      font-size: 24upx;
      color: #9e9e9e;
    }
  }
}
</style>