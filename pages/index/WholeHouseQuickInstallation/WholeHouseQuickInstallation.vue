<template>
  <view class="whole-house-quick-installation-container">
    <view class="backHeader">
			<tui-icon
				name="arrowleft" :size="60" unit="rpx"
				color="#000000"
				margin="0" @click="goBack"
			></tui-icon>
      <text class="pageTitle">全屋快装</text>
    </view>
    <view class="banner-wrapper">
      <image class="banner-img" src="@/static/images/new-index/kuaizhuang/kuaizhuang-banner.png"></image>
    </view>

    <view class="main">
      <!-- 四个单项 -->
      <view class="menu-pane">
        <view class="menu-list">
          <view class="menu-item">
            <view class="menu-name">客厅翻新</view>
            <image src="@/static/images/new-index/kuaizhuang/ketingfanxin.png" class="menu-img"></image>
          </view>
          <view class="menu-item">
            <view class="menu-name">卧室翻新</view>
            <image src="@/static/images/new-index/kuaizhuang/woshifanxin.png" class="menu-img"></image>
          </view>
          <view class="menu-item">
            <view class="menu-name">餐厅翻新</view>
            <image src="@/static/images/new-index/kuaizhuang/cantingfanxin.png" class="menu-img"></image>
          </view>
          <view class="menu-item">
            <view class="menu-name">全屋整装</view>
            <image src="@/static/images/new-index/kuaizhuang/quanwuzhengzhuang.png" class="menu-img"></image>
          </view>
        </view>

        <button class="uni-btn" v-on:click="formShow = true">咨询预约</button>
        <tui-drawer mode="bottom" :visible="formShow" @close="closeDrawer">
          <view class="formTitle">
            请输入你的信息
          </view>
          <tui-form ref="form" labelWidth="180rpx">
            <tui-form-item label="姓名">
              <tui-input padding="0" :borderBottom="false" v-model="formData.name" placeholder="请输入姓名"></tui-input>
            </tui-form-item>
            <tui-form-item label="电话号码">
              <tui-input padding="0" :borderBottom="false" v-model="formData.phone" placeholder="请输入电话号码"></tui-input>
            </tui-form-item>
            <tui-form-item label="地址">
              <tui-input padding="0" :borderBottom="false" v-model="formData.addres" placeholder="请选择你的地址"></tui-input>
            </tui-form-item>
            <tui-form-item label="详细地址">
              <tui-input padding="0" :borderBottom="false" v-model="formData.addres" placeholder="请输入详细地址"></tui-input>
            </tui-form-item> 
            <tui-form-item label="户型">
              <tui-input padding="0" :borderBottom="false" v-model="formData.homeType" placeholder="请输入您的户型"></tui-input>
            </tui-form-item>
            <tui-form-item label="其他需求">
              <tui-textarea padding="0" :borderBottom="false" v-model="formData.moreRequirement" placeholder=""></tui-textarea>
            </tui-form-item>
          </tui-form>
          <view class="formSubmit">
              <tui-button @click="formShow = false">提交信息</tui-button>
          </view>
        </tui-drawer>

        <view class="tip">
          <image src="../../../static/logo.png" class="user-avatar"></image>
          戴* 179****4891 刚刚咨询预约
        </view>
      </view>

      <!-- 活动优惠 -->
      <view class="active-preferential">
        <view class="title-wrapper">
          <view class="left-bar"></view>
          <view class="title-text">活动优惠</view>
          <view class="right-bar"></view>
        </view>

        <view class="active-pane-list">
          <view class="item">
            <image class="active-iamge" src="../../../static/images/new-index/kuaizhuang/a-1.png"></image>
            <view class="active-title"><text style="color: #ef530e">免费</text>上门量房</view>
          </view>
          <view class="item">
            <image class="active-iamge" src="../../../static/images/new-index/kuaizhuang/a-2.png"></image>
            <view class="active-title"><text style="color: #ef530e">免费</text>老房诊断</view>
          </view>
          <view class="item">
            <image class="active-iamge" src="../../../static/images/new-index/kuaizhuang/a-3.png"></image>
            <view class="active-title"><text style="color: #ef530e">免费</text>门型规划</view>
          </view>
        </view>
      </view>

      <!-- 精选案例 -->
      <view class="SelectedCases" hover-class="none" :hover-stop-propagation="false">
        <view class="title-wrapper">
          <view class="left-bar"></view>
          <view class="title-text">精选案例</view>
          <view class="right-bar"></view>
        </view>
        <view class="tabNavs">
          <view class="tabsItem" :class="{isActice:index == 0}" v-for="(item, index) in tabNavsData" :key="item">
            {{ item }}
          </view>
        </view>
        <view class="CasePresentation">
          <view class="PresentationBox">
            <view class="teps tpsL">
              改造前
            </view>
            <view class="teps tpsR">
              改造后
            </view>
            <view class="imgBox left">
            <!-- <view class="imgBox left" :class="{isLeft:isLeft,isRight:!isLeft}" @click="isOne=true;isLeft = !isLeft"> -->
              <image class="PresentationImage leftImg" :class="{isLeftSm:isLeft,isRightSm:!isLeft}" :src="common.seamingImgUrl('1712372041183-qian.png')"></image>
              <view class="mask msleft">

              </view>
              <view class="PK leftPK">
                V
              </view>
            </view>
            <view class="imgBox right">
            <!-- <view class="imgBox right" @click="isOne=true;isLeft = !isLeft" :class="{issRight:isLeft,issLeft:!isLeft}"> -->
              <image class="PresentationImage rightImg" :class="{issRightSm:isLeft,issLeftSm:!isLeft}" :src="common.seamingImgUrl('1712372044880-hou.png')"></image>
              <view class="mask msright">

              </view>
              <view class="PK rightPK">
                S
              </view>
            </view>
          </view>
          <view class="titles">
            <text class="titlesName">田林路厨房改造</text><text class="addres">佛山顺德</text>
          </view>
          <view class="titles2">
            <text class="textItem">地址：佛山市顺德区团蜂科技</text>
            <text class="textItem">面积：50平方米</text>
            <text class="textItem">工期：25天</text>
            <text class="textItem">价格：28000元</text>
          </view>
        </view>
      </view>

      <!-- 服务内容 -->
      <view class="ServiceContent">
        <view class="title-wrapper">
          <view class="left-bar"></view>
          <view class="title-text">服务内容</view>
          <view class="right-bar"></view>
        </view>
        <view class="Service_Content_Item">
          <image class="Service_Content_Image" src="@/static/images/new-index/kuaizhuang/quanwukuaihzuang.png"></image>
          <view class="conrtentText">
            <text class="conrtentTitle">客厅配置</text>
            <view class="conrtentTextBox">
              <text class="contets">1.集成吊顶 </text>
              <text class="contets">2.集成照明</text>
              <text class="contets">3.整体橱柜</text>
              <text class="contets">4.橱柜出台</text>
              <text class="contets">5.油烟机</text>
              <text class="contets">6.水龙头</text>
            </view>
          </view>
        </view>
        <view class="Service_Content_Item">
          <image class="Service_Content_Image" src="@/static/images/new-index/kuaizhuang/quanwukuaihzuang2.png"></image>
          <view class="conrtentText">
            <text class="conrtentTitle">客厅配置</text>
            <view class="conrtentTextBox">
              <text class="contets">1.集成吊顶 </text>
              <text class="contets">2.集成照明</text>
              <text class="contets">3.整体橱柜</text>
              <text class="contets">4.橱柜出台</text>
              <text class="contets">5.油烟机</text>
              <text class="contets">6.水龙头</text>
            </view>
          </view>
        </view>
        <view class="Service_Content_Item">
          <image class="Service_Content_Image" src="@/static/images/new-index/kuaizhuang/quanwukuaihzuang3.png"></image>
          <view class="conrtentText">
            <text class="conrtentTitle">客厅配置</text>
            <view class="conrtentTextBox">
              <text class="contets">1.集成吊顶 </text>
              <text class="contets">2.集成照明</text>
              <text class="contets">3.整体橱柜</text>
              <text class="contets">4.橱柜出台</text>
              <text class="contets">5.油烟机</text>
              <text class="contets">6.水龙头</text>
            </view>
          </view>
        </view>
        <view class="Service_Content_Item">
          <image class="Service_Content_Image" src="@/static/images/new-index/kuaizhuang/quanwukuaihzuang4.png"></image>
          <view class="conrtentText">
            <text class="conrtentTitle">客厅配置</text>
            <view class="conrtentTextBox">
              <text class="contets">1.集成吊顶 </text>
              <text class="contets">2.集成照明</text>
              <text class="contets">3.整体橱柜</text>
              <text class="contets">4.橱柜出台</text>
              <text class="contets">5.油烟机</text>
              <text class="contets">6.水龙头</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 服务流程 -->
      <view class="ServiceProcess">
        <view class="title-wrapper">
          <view class="left-bar"></view>
          <view class="title-text">服务内容</view>
          <view class="right-bar"></view>
        </view>
        <image class="ServiceProcessImg" src="@/static/images/new-index/kuaizhuang/ServiceProcess.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Starboy',
  data() {
    return {
      tabNavsData: ['客厅翻新','卧室翻新','餐厅翻新','全屋整装'],
      isLeft: false,
      isOne: false,
      formShow: false,
      formData: {
        name: '',
        phone: '',
        addres: '',
        homeType: '',
        moreRequirement: ''
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    consultFn() {
      console.log("表单提交");
    },
    closeDrawer() {
      this.formShow = false;
    }
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
/deep/ .tui-drawer-container {
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
}
/deep/ .tui-form__item-wrap {
  align-items: flex-start;
}
.formSubmit {
  box-sizing: border-box;
  padding: 30rpx 40rpx;
}
.formTitle {
  width: 100vw;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38rpx;
  font-weight: 550;
}
@keyframes gotoRight {
  0% {
    left: -304rpx;
  }

  100% {
    left: -64rpx;
  }
}
@keyframes gotoLeft {
  0% {
    left: -64rpx;
  }

  100% {
    left: -304rpx;
  }
}
@keyframes gotoRightsm {
  0% {
    right: -140rpx;
  }

  100% {
    right: -60rpx;
  }
}
@keyframes gotoLeftsm {
  0% {
    right: -60rpx;
  }

  100% {
    right: -140rpx;
  }
}
.isRight {
  animation: gotoLeft 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
}
.isLeft {
  animation: gotoRight 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
  /* left: -64rpx !important; */
}
.isLeftSm {
  animation: gotoRightsm 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
}
.isRightSm {
  animation: gotoLeftsm 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
}

@keyframes showtoRight {
  0% {
    right: -304rpx;
  }

  100% {
    right: -64rpx;
  }
}
@keyframes showtoLeft {
  0% {
    right: -64rpx;
  }

  100% {
    right: -304rpx;
  }
}
@keyframes showtoRightsm {
  0% {
    left: -140rpx;
  }

  100% {
    left: -60rpx;
  }
}
@keyframes showtoLeftsm {
  0% {
    left: -60rpx;
  }

  100% {
    left: -140rpx;
  }
}
.issRight {
  animation: showtoLeft 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
}
.issLeft {
  animation: showtoRight 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
  /* left: -64rpx !important; */
}
.issLeftSm {
  animation: showtoRightsm 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
}
.issRightSm {
  animation: showtoLeftsm 450ms cubic-bezier(0.67, 0.02, 0.58, 1) forwards;
}
/* @border-bolor: #d8d8d8; */
/* @main-color: #222229; */

.whole-house-quick-installation-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fcff 0%, #edf3ff 20%, #f6f6f8 72%);
  box-sizing: border-box;
  padding-bottom: 40rpx;
  .backHeader {
    position: relative;
    width: 750rpx;
    height: 88rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    .backIcon {
      width: 60rpx;
      height: 60rpx;
    }
    .pageTitle {
      font-family: 思源黑体;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 44rpx;
      letter-spacing: 0.32rpx;
      color: #222229;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .banner-wrapper {
    width: 100%;
    height: 499upx;

    .banner-img {
      width: 100%;
      height: 100%;
    }
  }

  .main {
    position: relative;
    z-index: 1;
    width: 100%;
    margin-top: -100upx;
    padding: 0 30upx;
    box-sizing: border-box;
    .menu-pane {
      background-color: #fff;
      padding: 30upx 26upx;
      box-sizing: border-box;
      border-radius: 20upx;

      .menu-list {
        position: relative;
        width: 638upx;
        height: 363upx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        background-color: #f6f6f8;
        padding: 35upx 29upx;
        box-sizing: border-box;

        &::after {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: '';
          display: block;
          width: 1upx;
          height: 294upx;
          background-color: #d8d8d8;
        }

        &::before {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: '';
          display: block;
          width: 579.5upx;
          height: 1upx;
          background-color: #d8d8d8;
        }

        .menu-item {
          width: 50%;
          height: 50%;
          display: flex;
          align-items: center;

          &:nth-child(2n) {
            justify-content: center;
          }

          color: #222229;
          font-size: 32upx;
          font-weight: 500;

          .menu-img {
            width: 84upx;
            height: 84upx;
            margin-left: 30upx;
          }
        }
      }

      .uni-btn {
        width: 100%;
        height: 88upx;
        border-radius: 100px;
        color: #fff;
        background-color: #ef530e;
        font-size: 32upx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 44upx 0 24upx 0;
      }
    }

    .tip {
      display: flex;
      align-items: center;
      width: 543upx;
      height: 65upx;
      background-color: #edf3ff;
      margin: 0 auto;
      border-radius: 100px;
      padding-left: 48upx;
      font-size: 28upx;
      color: #222229;

      .user-avatar {
        width: 43upx;
        height: 43upx;
        border-radius: 50%;
        margin-right: 20upx;
      }
    }

    .active-preferential {

      .active-pane-list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          width: 215upx;
          height: 228upx;
          border-radius: 20upx;
          background-color: #fff;

          .active-iamge {
            height: 164upx;
            width: 100%;
          }

          .active-title {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26upx;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.SelectedCases {
  width: 100%;
  height: auto;
  .tabNavs {
    width: 100%;
    height: 52rpx;
    display: flex;
    flex-direction: row;
    gap: 81rpx;
    .tabsItem {
      position: relative;
      width: 112rpx;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 48rpx;
      text-align: center;
      display: flex;
      align-items: center;
      font-feature-settings: "kern" on;
    }
    .isActice {
      font-weight: 600;
      color: #EF530E;
    }
    .isActice::before {
      position: absolute;
      content: '';
      width: 46px;
      height: 4px;
      background-color: #EF530E;
      bottom: -6rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .CasePresentation {
    box-sizing: border-box;
    padding: 45rpx 26rpx;
    margin-top: 40rpx;
    width: 100%;
    height: 682rpx;
    border-radius: 20rpx;
    background: #FFFFFF;
    .PresentationBox {
      position: relative;
      width: 100%;
      height: 389rpx;
      overflow: hidden;
      border-radius: 20rpx;
      .teps {
        position: absolute;
        width: 120rpx;
        height: 48rpx;
        padding: 0px 18rpx;
        z-index: 5;
        text-align: center;
        font-size: 28rpx;
        font-weight: normal;
        line-height: 48rpx;
        font-feature-settings: "kern" on;
        color: #FFFFFF;
      }
      .tpsL {
        border-radius: 20rpx 0px 20rpx 0px;
        background: #222229c4;
        top: 0;
        left: 0;
      }
      .tpsR {
        border-radius: 0rpx 20rpx 0rpx 20rpx;
        background: #ef530ed1;
        top: 0;
        right: 0;
      }
      .imgBox {
        position: absolute;
        width: 100%;
        height: 389rpx;
        overflow: hidden;
        transform: skewX(165deg);
        background-color: #fff;
        .PK {
          position: absolute;
          top: 50%;
          width: 56rpx;
          height: 56rpx;
          border-radius: 50%;
          font-size: 32rpx;
          font-weight: normal;
          line-height: 56rpx;
          text-align: center;
          color: #FFFFFF;
          z-index: 6;
          transform: skewX(-165deg) translateY(-50%);
        }
        .leftPK {
          right: 26rpx;
          background: rgba(34, 34, 41, 0.8);
        }
        .rightPK {
          left: 26rpx;
          background: rgba(239, 83, 14, 0.7);
        }
        .PresentationImage {
          position: absolute;
          top: 0;
          transform: skewX(-165deg);
          width: 100%;
          height: 389rpx;
        }
        .mask {
          position: absolute;
          top: 0;
          width: 20rpx;
          height: 398rpx;
          background-color: #fff;
          transform: skewX(180deg);
        }
        .msleft {
          right: 0;
        }
        .msright {
          left: 0;
        }
        .leftImg {
          right: -140rpx;
        }
        .rightImg {
          left: -140rpx;
        }
      }
      .left {
        top: 0;
        left: -304rpx;
        z-index: 1;
      }
      .right {
        top: 0;
        right: -304rpx;
        z-index: 2;
      }
    }
  }
  .titles {
    margin-top: 30rpx;
    width: 100%;
    .titlesName {
      font-size: 34rpx;
      font-weight: 600;
      line-height: 48rpx;
      text-align: center;
      color: #222229;
    }
    .addres {
      width: 131rpx;
      height: 48rpx;
      border-radius: 8rpx;
      box-sizing: border-box;
      padding: 0rpx 10rpx;
      border: 1px solid #EF530E;
      margin-left: 20rpx;
      font-family: 思源黑体;
      font-size: 28rpx;
      font-weight: normal;
      line-height: 48rpx;
      text-align: center;
      color: #EF530E;
    }
  }
  .titles2 {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .textItem {
      margin: 10rpx;
      min-width: 40%;
      max-width: 48%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 28rpx;
      font-weight: normal;
      line-height: 32rpx;
      color: #888889;
    }
  }
}

.ServiceContent {
  width: 100%;
  .Service_Content_Item {
    box-sizing: border-box;
    padding: 15rpx;
    margin: 40rpx 0rpx;
    width: 690rpx;
    height: 299rpx;
    border-radius: 20rpx;
    background: #FFFFFF;
    display: flex;
    .Service_Content_Image {
      width: 250rpx;
      height: 255rpx;
      border-radius: 10rpx;
    }
    .conrtentText {
      margin-left: 30rpx;
      width: auto;
      display: flex;
      flex-direction: column;
      .conrtentTitle {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 42rpx;
        color: #222229;
      }
      .conrtentTextBox {
        margin-top: 10rpx;
          width: 300rpx;
          font-family: 思源黑体;
          font-size: 28rpx;
          font-weight: normal;
          line-height: 42rpx;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          font-feature-settings: "kern" on;
          color: #9E9E9E;
          .contets {
            white-space: nowrap;
            width: 45%;
            margin: 5rpx;
          }
      }
    }

  }
}

.ServiceProcess {
  width: 100%;
  .ServiceProcessImg {
    width: 100%;
    height: 163rpx;
    border-radius: 20rpx;
  }
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40upx 0;

  .left-bar {
    width: 94upx;
    height: 4upx;
    background-color: #ef530e;
    background: linear-gradient(to right, #fff, #0e1e37);
  }

  .title-text {
    color: #08377f;
    font-size: 37upx;
    font-weight: bold;
    margin: 0 29upx;
  }

  .right-bar {
    width: 94upx;
    height: 4upx;
    background-color: #ef530e;
    background: linear-gradient(to right, #0e1e37, #fff);
  }
}
</style>
