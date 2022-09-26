<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-08 15:44:15
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 17:49:59
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
            v-model="name"
            placeholder="请输入收货人姓名"
            name=""
            id=""
        /></view>
        <view class="add-site-phone">
          <view class="text2"> 手机号码</view>
          <input
            class="add-site-input-phone"
            v-model="number"
            type="number"
            placeholder="请输入手机号码"
            name=""
            id=""
        /></view>
        <view class="add-site-location">
          <view class="text2"> 所在地区 </view>
          <view class="add-site-chose">
            {{ this.provinceName }} {{ this.cityName }} {{ this.areaName }}
          </view>
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
            ><input
              type="text"
              class="input"
              v-model="detail"
              placeholder="请输入详细地址"
          /></view>
          <view> </view>
        </view>
      </view>
    </view>

    <view class="add-site-default">
      <view class="add-site-default-text"> 设为默认地址 </view>
      <switch @change="switchChange" class="switch" color="#0256FF" />
    </view>
    <view class="save-button" @click="getAddressSave"> 保存 </view>
    <!-- 所在地区弹窗 -->
    <view class="area" v-if="area == 1">
      <view class="area-text">请选择省、市、区/县、镇</view>
      <view class="ok" style="color: rgb(184, 184, 184)" v-if="type < 3"
        >确定
      </view>
      <view class="ok" v-if="type == 3" @click="toucharea">确定 </view>

      <view class="top">
        <view
          class="top-detail"
          v-for="(item, id) in selectRegionList"
          :key="id"
          :data-selectRegion="item"
          @click="selectDetail"
        >
          {{ item.name }}
        </view>
      </view>
      <view class="left">
        <view
          class="left-detail"
          v-for="(item1, id1) in resgionList"
          :key="id1"
          :data-regionListdetail="item1"
          @click="regiondetail"
        >
          <scroll-view scroll-y="true" class="item">
            {{ item1.name }}
          </scroll-view>
        </view>
      </view>
    </view>
    <!-- 详细地址弹窗
    <view class="detailed-address" v-if="area == 3"> </view> -->
  </view>
</template>

<script>
import { getRegionListApi, getAddressSaveApi } from "../../api/address";
import icons from "../../uni_modules/uni-icons/components/uni-icons/icons";
import { getUserId } from "../../utils";
export default {
  data() {
    return {
      area: 0,
      number: "",
      detail: "",
      name: "",
      selectRegionList: [
        {
          id: 0,
          name: "省份",
          pid: 0,
          type: 1,
        },
        {
          id: 0,
          name: "城市",
          pid: 0,
          type: 2,
        },
        {
          id: 0,
          name: "区县",
          pid: 0,
          type: 3,
        },
      ],
      resgionList: [],
      type: 1,
      pid: 0,
      address: "",
      areaId: "",
      areaName: "",
      cityId: "",
      cityName: "",
      id: "",
      isDefault: "",
      mobile: "",
      name: "",
      provinceId: 0,
      provinceName: "",
    };
  },

  methods: {
    switchChange: function (e) {
      if (e.detail.value) {
        this.isDefault = 1;
      } else {
        this.isDefault = 0;
      }
      console.log(this.isDefault);
    },
    detailInput(e) {
      console.log(e.detail.value);
      this.detail = e.detail.value;
    },
    numberInput(e) {
      console.log(e.detail.value);
      this.number = e.detail.value;
    },
    nameInput(e) {
      console.log(e.detail.value);
      this.name = e.detail.value;
    },

    regiondetail: function (e) {
      console.log(e.currentTarget.dataset.regionlistdetail);
      this.pid = e.currentTarget.dataset.regionlistdetail.id;
      if (this.type == 1) {
        this.selectRegionList[0].name =
          e.currentTarget.dataset.regionlistdetail.name;
        this.selectRegionList[0].pid = 0;
        this.provinceId = e.currentTarget.dataset.regionlistdetail.id;
        this.provinceName = e.currentTarget.dataset.regionlistdetail.name;
        this.type = this.type + 1;
        this.getRegionList();
      } else if (this.type == 2) {
        if (this.selectRegionList[0].name == "省份") {
          this.selectRegionList[0].name =
            e.currentTarget.dataset.regionlistdetail.name;
          this.selectRegionList[0].pid =
            e.currentTarget.dataset.regionlistdetail.pid;
          this.type = 2;
          this.getRegionList();
        } else {
          this.selectRegionList[1].name =
            e.currentTarget.dataset.regionlistdetail.name;
          this.selectRegionList[1].pid =
            e.currentTarget.dataset.regionlistdetail.pid;
          this.type = this.type + 1;
          this.cityId = e.currentTarget.dataset.regionlistdetail.id;
          this.cityName = e.currentTarget.dataset.regionlistdetail.name;

          this.getRegionList();
        }
      } else if (this.type == 3) {
        if (
          this.selectRegionList[0].name == "省份" ||
          this.selectRegionList[1].name == "城市"
        ) {
          this.selectRegionList[0].name =
            e.currentTarget.dataset.regionlistdetail.name;
          this.selectRegionList[0].pid =
            e.currentTarget.dataset.regionlistdetail.pid;
          this.type = 2;
          this.getRegionList();
        } else {
          this.selectRegionList[2].name =
            e.currentTarget.dataset.regionlistdetail.name;
          this.selectRegionList[2].pid =
            e.currentTarget.dataset.regionlistdetail.pid;
          this.areaId = e.currentTarget.dataset.regionlistdetail.id;
          this.areaName = e.currentTarget.dataset.regionlistdetail.name;
          this.area = 2;
          this.getRegionList();
        }
      }
    },
    selectDetail: function (e) {
      console.log(e.currentTarget.dataset.selectregion);
      let thistype = e.currentTarget.dataset.selectregion.type;

      if (this.type > thistype && thistype == 1) {
        this.selectRegionList = [
          {
            id: 0,
            name: "省份",
            pid: 0,
            type: 1,
          },
          {
            id: 0,
            name: "城市",
            pid: 0,
            type: 2,
          },
          {
            id: 0,
            name: "区县",
            pid: 0,
            type: 3,
          },
        ];
      } else if (this.type > thistype && thistype == 2) {
        this.selectRegionList[1].name = "城市";
        this.selectRegionList[1].pid = 0;
        this.selectRegionList[1].id = 0;
        this.selectRegionList[2].name = "区县";
        this.selectRegionList[2].pid = 0;
        this.selectRegionList[2].id = 0;
      }
      this.type = e.currentTarget.dataset.selectregion.type;
      this.pid = e.currentTarget.dataset.selectregion.pid;
      this.getRegionList();
    },
    async getRegionList() {
      const res = await getRegionListApi({
        pid: this.pid,
      });
      // console.log(res);
      // console.log(res.data);
      this.resgionList = res.data;
    },
    async getAddressSave() {
      const res = await getAddressSaveApi(
        {
          id: this.id,
          name: this.name,
          userId: getUserId(),
          provinceId: this.provinceId,
          cityId: this.cityId,
          areaId: this.areaId,
          address: this.detail,
          mobile: this.number,
          isDefault: this.isDefault,
        }
        // {
        //   name: "222",
        //   userId: 222,
        //   provinceId: 1,
        //   cityId: 1,
        //   areaId: 1,
        //   address: "123",
        //   mobile: "18779571111",
        //   isDefault: 1,
        // }
      );
      console.log(res);
      // console.log(res.data);
      // this.resgionList = res.data;
      if (res.erron == 0 || res.errmsg == "成功") {
        // console.log(傻逼);
        uni.showToast({
          title: "添加成功",
          duration: 2000,
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      } else if (this.id) {
        uni.showToast({
          title: "修改成功",
          duration: 2000,
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      } else {
        uni.showToast({
          title: "添加失败",
          duration: 2000,
          icon: "none",
        });
      }
    },
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
  onLoad: function (option) {
    this.number = option.mobile;
    this.detail = option.detailedAddress;
    this.name = option.name;
    this.isDefault = option.isDefault;
    this.id = option.id;
  },
  onShow() {
    this.getRegionList();
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
    overflow: scroll;
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
    .ok {
      position: absolute;
      right: 50upx;
    }
    .top {
      display: flex;
      margin-top: 20upx;
      .top-detail {
        padding-left: 30upx;
        margin: 0 20upx;
      }
    }
    .left {
      margin-top: 20upx;
      .left-detail {
        padding-left: 10upx;
        margin: 10upx 20upx;
      }
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
      font-size: 27upx;
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
    .input {
      width: 600upx;
    }
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