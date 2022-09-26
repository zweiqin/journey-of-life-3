<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-07 10:29:03
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 18:01:02
 * @FilePath: \tuan-uniapp\user\site\site-manage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="site">
    <view class="site-title">
      <view class="title-left-view">
        <view>
          <img
            class="back"
            @click="handleBack"
            src="../../static/images/store/chevron-states.png"
          />
        </view>
        <view class="site-mine">我的地址</view>
      </view>
      <view class="title-right-view">
        <view class="manage" @click="manage" v-if="manageok == 1"> 管理 </view>
        <view class="manage" @click="manage" v-if="manageok == 2"> 完成 </view>
      </view>
    </view>

    <view class="site-detail" v-for="(item, id) in siteList" :key="id">
      <view class="site-detail-frame">
        <view class="site-detail-fram-text">
          <view class="site-detail-top">
            <img
              src="../../static/images/lqb/site/site-pitch.png"
              class="site-detail-icon"
              v-if="item.isDefault"
            />
            <img
              src="../../static/images/lqb/site/site-nopitch.png"
              class="site-detail-icon"
              v-else
            />
            <view class="site-detail-name">{{ item.name }}</view>
            <view class="site-detail-phone">{{ item.mobile }}</view>
            <view class="default-site" v-if="item.isDefault">默认</view>
          </view>
          <view class="site-detail-allsite">
            <view class="site-detail-pca">
              <view class="site-detail-pca1">
                <!-- <view class="province">广东省</view>
                <view class="city">佛山市</view>
                <view class="area">顺德区</view> -->
              </view>
              <img
                v-if="!isSelect"
                class="compile"
                src="../../static/images/lqb/site/compile.png"
                @click="addressAlter(item)"
              />

              <view v-else @click="handleChooseAddress(item)">选择该地址</view>
            </view>
            <view class="detail-site">{{ item.detailedAddress }} </view>
            <view v-if="manageok == 2">
              <view class="site-detail-boundary"> </view>
              <view class="site-detail-chose-default">
                <view class="site-default">
                  <view style="display: flex">
                    <!-- <img
                      class="site-default-img"
                      src="../../static/images/lqb/site/site-defaule.png"
                      alt=""
                      v-if="item.isDefault"
                    />
                    <img
                      class="site-default-img"
                      src="../../static/images/lqb/site/site-nodefaule.png"
                      alt=""
                      v-else
                    />
                    <view class="site-default-text">默认地址</view> -->
                  </view>
                </view>
                <view>
                  <img
                    class="site-delete"
                    src="../../static/images/lqb/site/delete.png"
                    alt=""
                    @click="addressDelete(item)"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view> </view>
    <view class="site-bottom-background-white" @click="addsite">
      <view class="site-bottom">添加新的地址</view>
    </view>
  </view>
</template>

<script>
import {
  getAddressListApi,
  getRegionListApi,
  getAddressDeleteApi,
} from "../../api/address";
import { getUserId } from "../../utils";
import { SELECT_ADDRESS } from "../../constant";

export default {
  data() {
    return {
      manageok: 1,
      sitedefault: 1,
      siteList: [],
      type: "",
      isSelect: false,
    };
  },
  methods: {
    async getAddressDelete() {
      const res = await getAddressDeleteApi({
        userId: getUserId(),
        id: this.id,
      });
      console.log(res);
      // this.siteList = res.data;
      this.getAddressList();
    },
    async getAddressList() {
      const res = await getAddressListApi({
        userId: getUserId(),
      });
      console.log(res);
      this.siteList = res.data;
    },
    async getRegionList() {
      const res = await getRegionListApi({
        pid: this.type,
      });
      console.log(res);
      this.siteList = res.data;
    },
    handleBack() {
      uni.navigateBack();
    },
    manage() {
      let manageok = this.manageok;
      if (manageok == 1) {
        this.manageok = 2;
      } else {
        this.manageok = 1;
      }
    },
    addsite() {
      uni.navigateTo({
        url: "/user/site/add-site",
      });
    },

    handleChooseAddress(item) {
      uni.setStorageSync(SELECT_ADDRESS, item);
      uni.navigateBack();
    },
  },
  onLoad(options) {
    this.getAddressList();
    this.isSelect = !!options.appoint;
  },

  onShow() {
    console.log("sb");
    this.getAddressList();
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";

.site {
  padding-bottom: 72upx;
  .site-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 74upx;
    margin-bottom: 18upx;
  }
  .title-left-view {
    display: flex;
    align-items: center;
  }
  .site-mine {
    font-size: @f16;
  }
  .manage {
    font-size: @f16;
    margin-right: 54upx;
  }
  .back {
    width: @hw24;
    height: @hw24;
    margin-left: 48upx;
    margin-right: 50upx;
  }
  .site-detail-choseall {
  }

  .site-detail {
    margin-bottom: 24upx;
    .site-detail-frame {
      width: 95%;
      border-radius: 10px;
      background: #ffffff;
      box-sizing: border-box;
      border: 0.5px solid #999999;
      margin: 0 auto;
      padding: 36upx 42upx 28upx 38upx;
    }
    .site-default-img {
      width: 34upx;
      height: 34upx;
      margin-right: 18upx;
    }
    .site-detail-fram-text {
    }
    .site-detail-top {
      display: flex;
      margin-bottom: 6upx;
    }
    .site-detail-icon {
      width: 32upx;
      height: 41upx;
    }
    .site-detail-pca {
      display: flex;
      font-size: @f14;
      margin-bottom: 3upx;
      justify-content: space-between;
    }
    .detail-site {
      font-size: @f14;
    }

    .site-detail-name {
      font-size: @f16;
      margin-left: 22upx;
      margin-right: 14upx;
    }
    .site-detail-phone {
      font-size: 24upx;
      font-weight: 350;
      color: #999999;
    }
    .default-site {
      margin-left: 42upx;
      border-radius: 20upx;
      box-sizing: border-box;
      border: 0.5px solid #ff8f1f;
      padding: 0 20upx;
      color: #ff8f1f;
      font-size: 24upx;
      font-weight: 350;
    }
    .compile {
      height: 32upx;
      height: 32upx;
    }
    .site-detail-pca1 {
      display: flex;
    }
    .province {
      margin-right: 10upx;
    }
    .city {
      margin-right: 10upx;
    }
    .area {
      margin-right: 10upx;
    }
  }
  .site-bottom {
    width: 95%;
    height: 72upx;
    border-radius: 100upx;
    display: flex;
    background: #ff8f1f;
    position: fixed;
    bottom: 20px;
    z-index: 999;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-size: 36upx;
    font-weight: 500;
    margin: 0 auto;
    transform: translateX(-50%);
    left: 50%;
    margin-bottom: 80upx;
  }
  .site-detail-boundary {
    margin-top: 14upx;
    margin-bottom: 26upx;
    border: 0.5px solid #d8d8d8;
  }
  .site-detail-chose-default {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 26upx;
    .site-default-text {
      font-size: 20upx;
    }
    .site-delete {
      width: 33upx;
      height: 37upx;
    }
  }
  .site-bottom-background-white {
    background-color: white;
    width: 750upx;
    height: 72upx;
  }
}
</style>

