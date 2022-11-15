<template>
  <view class="sort">
    <!-- <slot></slot> -->
    <view class="title">{{ serverNameTwo }}</view>
    <view class="form">
      <view
        class="sub"
        v-for="item in detailList"
        :key="item.serverNameThree"
        @click="handleToServiceDetail(item)"
      >
        <img
          :src="
            item.serverImageUrl ||
            'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/lgu5io706xc02zrlkezh.png'
          "
          alt=""
          class="goods"
        />

        <view class="name">{{ item.serverNameThree }}</view>
      </view>
    </view>
  </view>
</template>










<script>
import { number } from "echarts";
import { getUserId } from '../../utils';
export default {
  name: "componts",
  props: {
    serverNameTwo: String,
    serverNameThree: String,
    serverImageUrl: String,
    // id: Number,
    detailList: Array,
  },
  data() {
    return {
      name: "",
      id: "",
    };
  },
  computed: {},
  methods: {
    handleToServiceDetail(item) {
      console.log("服务详情", item);
      const name = item.serverNameThree;
      const id = item.id;
      // uni.navigateTo({ url: "../community-center/community-detail?id="+item });
      uni.navigateTo({
        url: `/community-center/community-detail?id=${id}&serverNameThree=${name}&serverImageUrl=${item.serverImageUrl}`,
        
      });

      // uni.showModal({
        
      //   title: '提示',
      //   content: '请登录',
      //   showCancel: true,
      //   // success: ({ confirm, cancel }) => {}
      //   success:function(res){
      //     if(res.confirm){
      //       uni.navigateTo({
      //         url:`/community-center/order`,
      //       });
      //     }
      //   }
      // })
      
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    // setTimeout(() => {
    //   console.log('草', this.detailList);
    // }, 1000);
  },
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
};
</script>






<style lang="less" scoped>
.sort {
  padding: 56upx 20upx 0upx 20upx;
  // width: 100%;
  .title {
    font-size: 32upx;
    font-weight: bold;
    color: #3d3d3d;
  }
  .form {
    padding-top: 52upx;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .sub {
      width: 160upx;
      height: 206upx;
      padding-bottom: 70upx;
      padding-right: 16upx;
      .goods {
        width: 160upx;
        height: 160upx;
      }
      .name {
        font-size: 28upx;
        color: #3d3d3d;
        text-align: center;
        width: 160upx;
      }
    }
  }
}
</style>



