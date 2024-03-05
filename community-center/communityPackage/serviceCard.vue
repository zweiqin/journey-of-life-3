<template>
  <view class="mainBox">
    <TuanPageHead title="社区套餐" style="background: #fff">
      <image
        slot="left"
        src="@/static/images/con-center/goBack.png"
        class="backIcon"
        @click="goBack"
        mode=""
      >
      </image>
    </TuanPageHead>
    <GradationBackground></GradationBackground>
    <!-- 选择tab栏 -->
    <scroll-view :scroll-x="true" class="tabNavsContainer">
      <view class="selectClassBox">
        <view
          class="tabs-item"
          :class="{ isActive: index == tabCurrenIndex }"
          v-for="(item, index) in tabNavs"
          :key="index"
          @click="tapSelect(item, index)"
        >
          {{ item.serverName }}
        </view>
      </view>
    </scroll-view>

    <scroll-view :scroll-x="true" class="tabNavsContainer2">
      <view class="selectClassBox">
        <view
          class="tabs-item"
          :class="{ isActive: index == childsCurrenIndex }"
          v-for="(item, index) in childsTabNavs"
          :key="index"
          @click="tapChildsSelect(item, index)"
        >
          {{ item.serverName }}
        </view>
      </view>
    </scroll-view>

    <view style="width: 100vw; display: flex; align-items: center">
      <image class="servePages" :src="renderData.picUrl" mode="" />
      <!-- <image class="servePages" src="@/static/images/con-center/communityPackage/servePagesImage.png" mode="" /> -->
    </view>

    <view class="priceNumber">
      ￥<text>{{ renderData.serverPrice }}</text>
    </view>

    <view class="moreTitles">
      <view class="title1">{{ renderData.serverName }}</view>
      <view class="title2">{{ renderData.remarks }}</view>
      <view class="tagBox">
        <text class="tags" type="success">提升效能</text>
        <text class="tags" type="default">去除异味</text>
      </view>
      <view class="Share">
        <image
          src="@/static/images/con-center/communityPackage/fenxiang.png"
          mode=""
        />
      </view>
    </view>

    <view class="SelectiveConfiguration">
      <view class="title1">
        服务清单
        <!-- 服务清单 <text>(2项)</text> -->
      </view>
      <block v-for="(item, index) in serverData" :key="item.serverTypeId">
        <view class="selectItem">
          <view class="line"></view>
          <!-- item.everySelectNumber -->
          <view class="selectNumbers"
            >{{ item.serverTypeName
            }}<text style="margin-left: 3rpx">{{
              isAllowSelectNumber[index]
            }}</text
            >/{{ item.maxSelCnt }}</view
          >
          <view class="line"></view>
        </view>
        <view class="ServiceSelection">
          <view
            class="serverItems"
            @click="selectServes(ChildsItem, ChildsIndex, item, index)"
            :class="{ isActive: ChildsItem.isChecked }"
            v-for="(ChildsItem, ChildsIndex) in item.children"
            :key="ChildsItem.id"
          >
            <!-- <image class="images" src="@/static/images/con-center/communityPackage/kongtiao.png" mode="" /> -->
            <view class="activeIcon" v-show="ChildsItem.isChecked">
              √
              <!-- <iamge class="greatIcon" src="@/static/images/con-center/communityPackage/great.png"></iamge> -->
            </view>
            <image class="images" :src="ChildsItem.serverInfoUrl" mode="" />
            <view class="serverName">{{ ChildsItem.serverTypeName }}</view>
            <view class="prices"
              >￥<text>{{ ChildsItem.serverPrice }}</text></view
            >
          </view>
        </view>
      </block>
    </view>
    <!-- <uParse style="margin-top: 10rpx;" :content="renderData.serverContent || ''"/> -->

    <view class="buyNow">
      <view class="titles">
        <view class="prices">支付金额 ￥{{ renderData.serverPrice }}</view>
        <view class="everyServe"
          >共计服务项目：(<text style="color: #ef530e">{{
            arraySum(isAllowSelectNumber)
          }}</text
          >/{{ selectNumber }})项</view
        >
      </view>
      <button class="goBuy" @click="goBuy">立即购买</button>
    </view>
    <tui-drawer
      mode="bottom"
      :visible="showForm"
      @close="
        () => {
          showForm = false;
        }
      "
    >
      <view class="formTitle"> 请输入你的信息 </view>
      <tui-form ref="form" labelWidth="180rpx">
        <tui-form-item label="姓名">
          <tui-input
            padding="0"
            :borderBottom="false"
            v-model="formData.consigneeName"
            placeholder="请输入姓名"
          ></tui-input>
        </tui-form-item>
        <tui-form-item label="电话号码">
          <tui-input
            padding="0"
            :borderBottom="false"
            v-model="formData.consigneeMobile"
            placeholder="请输入电话号码"
          ></tui-input>
        </tui-form-item>
        <tui-form-item label="地址" style="position: relative">
          <view
            @click="$refs.TuanCityRef && $refs.TuanCityRef.show()"
            style="
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            "
          >
          </view>
          <tui-input
            padding="0"
            style="position: relative; z-index: 1"
            :borderBottom="false"
            disabled
            v-model="formData.consigneeAddress"
            placeholder="请选择你的地址"
          ></tui-input>
        </tui-form-item>
        <tui-form-item label="详细地址">
          <tui-textarea
            padding="0"
            :borderBottom="false"
            v-model="formData.consigneeAddressDetail"
            placeholder="请输入详细地址"
          ></tui-textarea>
        </tui-form-item>
        <tui-form-item label="服务网点" style="position: relative">
          <view
            @click="handleChooseSite"
            style="
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            "
          >
          </view>
          <tui-input
            padding="0"
            style="position: relative; z-index: 1"
            :borderBottom="false"
            disabled
            v-model="currentChooseShopInfo.shopNameSimple"
            placeholder="请选择服务时间"
          ></tui-input>
        </tui-form-item>
        <tui-form-item label="服务时间" style="position: relative">
          <view
            @click="chooseTimeVisible = true"
            style="
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            "
          >
          </view>
          <tui-input
            padding="0"
            style="position: relative; z-index: 1"
            :borderBottom="false"
            disabled
            v-model="formData.installDate"
            placeholder="请选择服务时间"
          ></tui-input>
        </tui-form-item>
        <tui-form-item label="其他需求">
          <tui-input
            padding="0"
            :borderBottom="false"
            v-model="formData.remarks"
            placeholder=""
          ></tui-input>
        </tui-form-item>
      </tui-form>
      <view class="formSubmit">
        <button
          style="background: #5677fc; color: #fff"
          @click="goToOrderPy"
          :loading="isCreateOrder"
        >
          提交订单
        </button>
      </view>
    </tui-drawer>
    <!-- 地址选择 -->
    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
    <!-- 选择期望上门时间 -->
    <ChooseTime
      style="z-index: 1000"
      @choose="handleChooseInstallTime"
      v-model="chooseTimeVisible"
    ></ChooseTime>
    <!-- 选择网点 -->
    <ChooseShopSite
      @confirm="handleConfirmChooseSite"
      ref="chooseShopSiteRef"
    ></ChooseShopSite>
  </view>
</template>

<script>
import ChooseShopSite from "../enterprise-orders/components/ChooseShopSite.vue";
import ChooseTime from "../componts/choose-time.vue";
// import { getUserId } from "../../utils";
import uParse from "@/components/u-parse/u-parse.vue";
import { getNextLevelPage, getServersByAddr,} from "@/api/community-center/communityPackage";
import GradationBackground from "./components/gradationBackground3";

import {
  getBAuthInfoApi,
  getOrderQuotationApi,
  getShopSiteListApi,
  createRepairOrderApi,
  getServiceOrderPayApi,
  payOrderForBeeStewadAPPApi,
  orderPayH5PabUseBlanceApi,
} from "@/api/community-center";

import { communityPayment } from '@/utils/communityPayment'

import { USER_INFO, ENTERPRISE_ORDERS_NO } from '../../constant'
import { getUserId, throttle, isH5InWebview } from '@/utils';
// import PageHead from 'pages/business-district/components/PageHead.vue'
export default {
  name: "serviceCard",
  components: {
    // PageHead
    GradationBackground,
    uParse,
    ChooseTime,
    ChooseShopSite,
  },
  async created() {
    await this.getServeTabData();
    this.getServeCardData();
  },
  onShow() {
    this.getShopSiteList();
  },
  computed: {
    selectNumber() {
      //! 可供选择的服务项目数量
      let number = 0;
      this.serverData.forEach((item) => {
        number += item.maxSelCnt;
      });
      return number;
    },
    //! 用于判断是否允许继续选择的计算属性
    isAllowSelect: {
      get() {
        let isAllowSelect = this.serverData.map((item, index) => {
          let InitialValue = 0;
          item.children.forEach((item) => {
            if (item.isChecked) {
              InitialValue += item.selectNumber;
            }
          });
          return InitialValue >= item.maxSelCnt;
        });
        console.log(isAllowSelect);
        return isAllowSelect;
      },
      set(val) {
        console.log(val);
      },
    },
    //! 用于展示每一列已选择服务数量的计算属性
    isAllowSelectNumber: {
      get() {
        let isAllowSelectNumber = this.serverData.map((item, index) => {
          let InitialValue = 0;
          item.children.forEach((item) => {
            if (item.isChecked) {
              InitialValue += item.selectNumber;
            }
          });
          return InitialValue;
        });
        return isAllowSelectNumber;
      },
      set(val) {
        console.log(val);
      },
    },
  },
  data() {
    return {
      addres: uni.getStorageSync("T_SELECTED_ADDRESS").data,
      tabNavs: [],
      tabCurrenIndex: 0,
      childsTabNavs: [],
      childsCurrenIndex: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      renderData: {}, //! 获取过来的初始渲染数据
      serverData: [], //! 经过梳理后用于渲染和书写交互逻辑使用的数据
      showForm: false, //! 是否显示表单
      chooseTimeVisible: false, //! 是否显示时间选择器
      isCreateOrder: false,
      currentChooseShopInfo: {
        shopNameSimple: "",
      },
      shopSiteList: [],
      formData: {
        userId: getUserId(),
        consigneeName: "", // 姓名
        consigneeMobile: "", // 手机号码
        consigneeAddress: "", // 地址
        consigneeAddressDetail: "", // 详细地址
        installDate: "", // 服务时间
        remarks: "", // 备注
        bizType: 5, // 业务类型 套餐固定为5
        dictName: "服务套餐",
        deliveryType: 4,
        orderType: 1, // 订单类型 (1常规 2加急)
        paymentMethod: 1, // 支付方式 (1现付 2到付)
        pricingType: 1, // 定价类型 1=系统计价 2=个人报价
        pullIn: 1, // 是否拉新订单 1=否 2=是
        spotOrder: 0, // 是否现场接单  0=不是 1=是
        price: "", // 订单费用
        actualPrice: "", // 实际费用
        serverTypeId: "",
        shopId: "",
        extraInfo: "",
      },
    };
  },
  methods: {
    goBack() {
            uni.navigateBack();
    },
    async getServeTabData() { //! 获取tab栏数据
      let address =
        this.$store.getters.detailAddress || "广东省佛山市顺德区龙江镇";
      // if (!address) {
      //   uni.navigateTo({ url: "/pages/choose-location/choose-location" });
      // }
      this.tabNavs = (
        await getServersByAddr({
          pageNo: 1,
          pageSize: 10,
          pid: 0,
          srvTypeEnum: "5",
          address,
        })
      ).records;
      // console.log('tabNavs', this.tabNavs);
    },
    async getServeCardData() { //! 初始化渲染数据的方法，为其添加控制选择效果的属性
      this.childsTabNavs = (
        await getNextLevelPage({
          ...this.query,
          pid: this.tabNavs[this.tabCurrenIndex].id,
        })
      ).records;
      this.renderData = this.childsTabNavs[0];
      this.serverData = JSON.parse(this.renderData.extraInfo).selectServetree;
      this.serverData.forEach((item, index) => {
        item.everySelectNumber = 0;
        // console.log(item);
        item.children.forEach((childItem, childIndex) => {
          childItem.isChecked = false;
          childItem.selectNumber = 1;
        });
      });
      console.log(this.serverData);
      // console.log(this.renderData);
      console.log("extraInfo的JSON数据", JSON.parse(this.renderData.extraInfo));
      // console.log(this.childsTabNavs);
    },
    tapSelect(res, index) { //! 控制tab栏选择效果的方法
      this.tabCurrenIndex = index;
      this.childsCurrenIndex = 0;
      this.getServeCardData();
    },
    tapChildsSelect(res, index) { //! 控制子tab栏选择效果的方法
      this.childsCurrenIndex = index;
      this.renderData = res;
      this.serverData = JSON.parse(this.renderData.extraInfo).selectServetree;
      this.serverData.forEach((item, index) => {
        item.everySelectNumber = 0;
        // console.log(item);
        item.children.forEach((childItem, childIndex) => {
          childItem.isChecked = false;
          childItem.selectNumber = 1;
        });
      });
    },
    selectServes(ChildRes, Childindex, FaderRes, FaderIndex) { //! 选择服务的逻辑处理
      if (this.isAllowSelect[FaderIndex] && !ChildRes.isChecked) {
        return uni.showToast({
          title: "该服务选择数已达上限",
          icon: "none",
        });
      } else {
        ChildRes.isChecked = !ChildRes.isChecked;
      }
      this.$set(this.serverData, FaderIndex, FaderRes); //! 由于该数组不好响应式改变，所以手动修改数据
      console.log("ChildRes", ChildRes);
      console.log("FaderRes / serverData", FaderRes);
    },
    arraySum(array) { //! 计算总共选择了多少个服务
      return array.reduce(function (prev, curr, index, arr) {
        return prev + curr;
      }, 0);
    },
    goBuy() { //! 立即购买
      for (let index = 0; index < this.isAllowSelect.length; index++) {
        if (!this.isAllowSelect[index]) {
          return uni.showToast({
            title: "请正确的选择服务",
            icon: "none",
          });
        }
      }
      this.showForm = true;
    },
    handleConfirmAddress(selectAddressInfo) { //! 地址选择
      this.formData.consigneeAddress = selectAddressInfo.formatAddress4;
      // console.log(this.formData);
    },
    handleChooseInstallTime(time) { //! 时间选择
      this.formData.installDate = time;
    },
    chooseSite(siteInfo) { //! 选择网点
      if (this.formData.shopId === siteInfo.id) {
        return;
      }
      console.log(siteInfo);
      this.currentChooseShopInfo = siteInfo;
      this.formData.shopId = siteInfo.id;
      console.log(this.formData);
    },
    handleConfirmChooseSite(id) {
      if (!id) {
        this.currentChooseShopInfo = null;
        this.formData.shopId = "";
      } else {
        const currentSiteInfo = this.shopSiteList.find(
          (itme) => itme.id === id
        );
        if (currentSiteInfo) {
          this.chooseSite(currentSiteInfo);
        }
      }
    },
    async getShopSiteList() { //! 获取网点信息
      const address = this.$store.getters.detailAddress || "广东省佛山市顺德区龙江镇";
      // if (!address) {
      //   uni.navigateTo({ url: "/pages/choose-location/choose-location" });
      //   return;
      // }

      const res = await getShopSiteListApi({
        address: address,
      });

      if (res.statusCode === 20000) {
        this.shopSiteList = res.data;
        if (this.shopSiteList.length) {
          this.chooseSite(this.shopSiteList[0]);
        }
      } else {
        this.ttoast({
          type: "fail",
          title: "获取门店列表失败",
        });
      }
    },
    handleChooseSite() {
      if (this.shopSiteList.length) {
        this.$refs.chooseShopSiteRef.show(
          this.shopSiteList,
          this.formData.shopId
        );
      } else {
        this.ttoast({
          type: "info",
          title: "您所在的区域暂无服务网点~",
        });
      }
    },
    async goToOrderPy() {
      if (this.isCreateOrder) {
        this.ttoast({
          type: "info",
          title: "订单提交中...",
          content: "请勿重复提交",
        });
        return;
      }
      let extraInfoData = this.serverData.map((item, index) => {
                        let id = "";
                        let number = "";
                        item.children.forEach((items) => {
                            if (items.isChecked) {
                                id = items.id;
                                number = items.selectNumber;
                            }
                        });
                        return {
                            id,
                            cnt: number,
                        };
                    });

      let params = {
        //! 拼接参数
        ...this.formData,
        serverId: this.renderData.id,
        price: this.renderData.serverPrice,
        actualPrice: this.renderData.serverPrice,
        extraInfo: JSON.stringify({
          serverCombSrvs: {
            servers: extraInfoData,
          },
        }),
      };

      try {
        this.isCreateOrder = true
        const res = await createRepairOrderApi(params);
        console.log(res);
        if (res.statusCode === 20000) {
          communityPayment(res)
        } else {
          if (res.statusMsg.includes("余额不足")) {
            this.isShowRechargeModal = true;
          } else {
            this.ttoast({
              type: "fail",
              title: res.statusMsg,
            });
            setTimeout(() => {
              if (this.orderForm.extraInfo.payType === 1) {
                uni.switchTab({
                  url: "/pages/order/order",
                });
              }
            }, 2000);
          }
        }
      } catch (error) {
        console.log("企业下单报错", error);
      } finally {
        this.isCreateOrder = false;
      }
      console.log(params);
    },
  },
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
.mainBox {
  position: relative;
  width: 100vw;
  min-height: 00vh;
  padding-bottom: 180rpx;
  /* height: 3812rpx; */
  background-color: #f5f5f5;
  /* display: flex;
    flex-direction: column;
    align-items: center; */
  .backIcon {
    margin-left: 20rpx;
    width: 34.08rpx;
    height: 30rpx;
  }
  .tabNavsContainer {
    /* width: 100vw; */
    height: 90rpx;
    box-sizing: border-box;
    padding: 0 32rpx;
    white-space: nowrap;
    .selectClassBox {
      position: relative;
      width: auto;
      display: flex;
      gap: 42rpx;
      height: 100%;
      .tabs-item {
        position: relative;
        width: auto;
        height: 100%;
        font-size: 30rpx;
        font-weight: normal;
        line-height: 80rpx;
        color: #888889;
        /* .activeIocn {
                    
                } */
      }
      .isActive {
        font-size: 32rpx;
        line-height: 80rpx;
        font-weight: 500;
        color: #222229;
      }
      .isActive::before {
        content: "";
        width: 50rpx;
        height: 1rpx;
        border: 6rpx solid #222229;
        background-color: #222229;
        border-radius: 50rpx;
        position: absolute;
        bottom: 10rpx;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .tabNavsContainer2 {
    white-space: nowrap;
    min-height: 72rpx;
    box-sizing: border-box;
    padding: 10rpx 32rpx;
    .selectClassBox {
      display: flex;
      gap: 20rpx;
      .tabs-item {
        color: #888889;
        /* width: 182px; */
        box-sizing: border-box;
        height: 52rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        border-radius: 24prx;
        padding: 10rpx 24rpx;
        background: #d2e0ea;
        border-radius: 24rpx;
      }
      .isActive {
        color: #222229;
        background: #ffffff;
      }
    }
  }
  .servePages {
    margin: 0 auto;
    margin-top: 55rpx;
    width: 686rpx;
    height: 258rpx;
    border-radius: 24rpx 24rpx 0px 0px;
  }
  .priceNumber {
    position: relative;
    width: 750rpx;
    height: 104rpx;
    box-sizing: border-box;
    padding: 32rpx;
    font-size: 28rpx;
    color: #ef530e;
    border-radius: 24rpx 24rpx 0px 0px;
    background-color: #ffffff;
    > text {
      font-size: 52rpx;
    }
  }
  .moreTitles {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    .title1 {
      font-size: 36rpx;
      font-weight: 550;
      line-height: 40rpx;
      color: #222229;
    }
    .title2 {
      font-size: 24rpx;
      font-weight: normal;
      line-height: 32rpx;
      color: #888889;
    }
    .tagBox {
      display: flex;
      gap: 20rpx;
      .tags {
        /* width: 104rpx; */
        height: 36rpx;
        border-radius: 8rpx;
        padding: 4rpx 12rpx;
        box-sizing: border-box;
        font-size: 20rpx;
        font-weight: normal;
        line-height: 28rpx;
      }
      .tags[type="default"] {
        color: #fe2f29;
        border: 1rpx solid #fe2f29;
      }
      .tags[type="success"] {
        color: #00c980;
        border: 1px solid #00c980;
      }
    }
    .Share {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 140rpx;
      height: 64rpx;
      > image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .SelectiveConfiguration {
    position: relative;
    margin-top: 12rpx;
    box-sizing: border-box;
    padding: 32rpx;
    background-color: #fff;
    .title1 {
      font-size: 36rpx;
      font-weight: 500;
      line-height: 40rpx;
      color: #222229;
      > text {
        margin-left: 20rpx;
        font-size: 28rpx;
      }
    }
    .selectItem {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 28rpx;
      height: 68rpx;
      .selectNumbers {
        font-size: 26rpx;
        line-height: 40rpx;
        color: #888889;
        letter-spacing: 2rpx;
        > text {
          color: #ef530e;
        }
      }
      .line {
        width: 73rpx;
        height: 0rpx;
        opacity: 1;
        border: 1rpx solid #d8d8d8;
      }
    }
    .ServiceSelection {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .serverItems {
        position: relative;
        width: 33.3333%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .activeIcon {
          z-index: 2;
          position: absolute;
          right: 21rpx;
          top: 154rpx;
          width: 38rpx;
          height: 28rpx;
          border-radius: 18rpx 0px 16rpx 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 5rpx 10rpx;
          background: #ef530e;
          color: #fff;
        }
        .images {
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          padding: 1rpx;
          width: 192rpx;
          height: 192rpx;
          border-radius: 16rpx;
          border: 2rpx solid #ffffff00;
        }
        .serverName {
          margin-top: 6rpx;
          font-size: 24rpx;
          font-weight: normal;
          /* line-height: 32px; */
          text-align: center;
          letter-spacing: 0px;
        }
        .prices {
          color: #ef530e;
          font-size: 24rpx;
          font-weight: normal;
          line-height: 32px;
          text-align: center;
          letter-spacing: 0px;
          > text {
            font-size: 32rpx;
          }
        }
      }
      .isActive {
        .images {
          border: 2rpx solid #ef530e;
        }
      }
    }
  }
  .buyNow {
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    padding: 40rpx 24rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .titles {
      .prices {
        margin-top: 10rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: #222229;
      }
      .everyServe {
        font-family: Source Han Sans;
        font-size: 22rpx;
        font-weight: normal;
        line-height: 40rpx;
        color: #888889;
      }
    }
    .goBuy {
      margin: 0;
      width: 248rpx;
      height: 88rpx;
      border-radius: 50rpx;
      background: #ef530e;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 80rpx;
      color: #ffffff;
    }
  }
}
</style>
