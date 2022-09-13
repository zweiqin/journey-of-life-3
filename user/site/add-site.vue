<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-08 15:44:15
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-12 09:37:27
 * @FilePath: \tuan-uniapp\user\site\add-site.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="add-site">
    <view class="add-site-title">
      <img
        class="back"
        @click="handleBack"
        src="../../static/images/lqb/site/back.png"
      />
      <view class="add-site-text">添加新的地址 </view>
    </view>
    <view class="add-site-input">
      <view class="add-site-input-text">
        <view class="add-site-name">
          <view class="text1"> 收货人 </view>
          <input
            class="add-site-input-name"
            type="text"
            value=""
            name=""
            id=""
        /></view>
        <view class="add-site-phone">
          <view class="text2"> 手机号码</view>
          <input
            class="add-site-input-phone"
            type="number"
            value=""
            name=""
            id=""
        /></view>
        <view class="add-site-location">
          <view class="text2"> 所在地区 </view>
          <view class="add-site-chose">广东省 佛山市 顺德区 龙江镇</view>
          <view>
            <img
              @click="toucharea"
              class="add-site-choes-img-add-site"
              src="../../static/images/lqb/site/add-site.png"
              alt=""
            />
          </view>
        </view>
        <view class="add-site-location-detail">
          <view class="text2" style="flex-shrink: 0">详细地址</view>
          <view class="add-site-chose-detail"
            >广东省佛山市顺德区龙江镇亚洲国际家具材料交易城五座三楼团蜂科技有限公司
          </view>
          <view>
            <img
              @click="touchdetailed"
              class="add-site-choes-img-add-site-detail"
              src="../../static/images/lqb/site/add-site-detail.png"
              alt=""
            />
          </view>
        </view>
      </view>
    </view>

    <view class="add-site-default">
      <view class="add-site-default-text"> 设为默认地址 </view>
      <switch class="switch" color="#0256FF" checked="false" />
    </view>
    <view class="save-button"> 保存 </view>
    <!-- 所在地区弹窗 -->
    <view class="area" v-if="area == 1">
      <view class="area-text">请选择省、市、区/县、镇</view>
    </view>
    <!-- 详细地址弹窗 -->
    <view class="detailed-address" v-if="area == 3"> </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      area: 0,
    };
  },
  methods: {
       handleBack() {
      uni.navigateBack();
    },
    toucharea() {
      if (this.area == 1) {
        this.area = 2;
      } else {
        this.area = 1;
      }
    },
    touchdetailed() {
      if (this.area == 3) {
        this.area = 4;
      } else {
        this.area = 3;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.add-site {
  .save-button {
    margin: 0 auto;
    width: 380upx;
    height: 72upx;
    color: white;
    background-color: #ff8f1f;
    border-radius: 100upx;
    text-align: center;
    line-height: 72upx;
    margin-top: 70upx;
  }
  .area {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750upx;
    height: 764upx;
    border-radius: 40upx 40upx 0px 0px;
    background: #ffffff;
    box-shadow: 0px 8upx 20upx 0px rgba(0, 0, 0, 0.3);
    z-index: 200;

    .area-text {
      font-size: 28upx;
      font-weight: 500;
      text-align: center;
      margin-top: 28upx;
    }
  }
  .detailed-address {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750upx;
    height: 764upx;
    border-radius: 40upx 40upx 0px 0px;
    background: #ffffff;
    box-shadow: 0px 8upx 20upx 0px rgba(0, 0, 0, 0.3);
    z-index: 200;
  }
  .add-site-title {
    display: flex;
    margin-left: 48upx;
    margin-top: 72upx;
    align-items: center;
    justify-content: flex-start;
    .back {
      height: 28upx;
      width: 16upx;
      margin-right: 34upx;
    }
    .add-site-text {
      font-size: 36upx;
      font-weight: 500;
    }
  }
  .add-site-input {
    display: flex;

    .add-site-input-text {
      margin-left: 56upx;
      margin-top: 54upx;
      font-size: 24upx;
      .add-site-name {
        display: flex;
        margin-bottom: 54upx;
      }
      .add-site-phone {
        display: flex;
        margin-bottom: 54upx;
      }
      .add-site-location {
        display: flex;
        justify-content: space-between;
        margin-bottom: 54upx;
      }
      .add-site-location-detail {
        display: flex;
        margin-bottom: 54upx;
        justify-content: space-between;
      }
    }
    // .add-site-input-input {
    //   margin-top: 54upx;
    //   margin-left: 34upx;
    //   font-size: 24upx;
    //   font-weight: 350;
      .add-site-input-name::placeholder {
        margin-bottom: 40upx;
        font-size: 20upx;
      }
      .add-site-input-phone {
        margin-bottom: 40upx;

      }
    // }
  }
  .add-site-choes-img-add-site {
    width: 24upx;
    height: 12upx;
    padding-right: 100upx;
    padding-left: 10upx;
  }
  .add-site-choes-img-add-site-detail {
    width: 27upx;
    height: 32upx;
    padding-right: 100upx;
    padding-left: 10upx;
  }
  .text1 {
    padding-right: 44upx;
  }
  .text2 {
    padding-right: 20upx;
  }
  .add-site-chose {
    flex: 1;
  }
  .add-site-chose-detail {
    flex: 1;
  }
  .switch {
    transform: scale(0.5);
    margin-right: 50upx;
  }
  .add-site-default {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .add-site-default-text {
    font-size: 24upx;
    margin-left: 56upx;
  }
}
</style>