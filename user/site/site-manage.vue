<template>
  <view class="site">
    <view class="site-title">
      <view class="title-left-view">
				<tui-icon
					name="arrowleft" :size="48" unit="rpx"
					color="#000000"
					margin="0" @click="handleBack"
				></tui-icon>
        <!-- <view class="site-mine">我的地址</view> -->
      </view>
      <view class="title-right-view">
        <view class="manage" @click="manage" v-if="manageok == 1"> 管理 </view>
        <view class="manage" @click="manage" v-if="manageok == 2"> 完成 </view>
      </view>
    </view>

		<view v-if="!siteList.length">
			<tui-no-data :fixed="false" style="margin-top: 100upx;">还没有地址，快去添加吧~</tui-no-data>
		</view>
    <view v-else class="site-detail" v-for="(item, id) in siteList" :key="id">
      <view class="site-detail-frame">
        <view class="site-detail-fram-text">
          <view class="site-detail-top">
						<tui-icon
									v-if="item.isDefault"
							name="label-fill" :size="42" unit="rpx"
							color="#fe8129"
							margin="0"
						></tui-icon>
						<tui-icon
									v-else
							name="label-fill" :size="42" unit="rpx"
							color="#efefef"
							margin="0"
						></tui-icon>
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
							<tui-icon
                v-if="!isSelect"
								name="evaluate" :size="32" unit="rpx"
								color="#767676"
								margin="0" @click="editAddress(item)"
							></tui-icon>
              <view
                class="choose-address"
                v-else
                @click="handleChooseAddress(item)"
                >选择该地址</view
              >
            </view>
            <view class="detail-site">{{ item.detailedAddress }} </view>
            <view v-if="manageok == 2">
              <view class="site-detail-boundary"> </view>
              <view class="site-detail-chose-default">
                <view class="site-default">
                  <view style="display: flex"> </view>
                </view>
                <view>
									<tui-icon
										name="delete" :size="38" unit="rpx"
										color="#767676"
										margin="0" @click="addressDelete(item)"
									></tui-icon>
									<tui-icon
                    v-if="isSelect"
										name="evaluate" :size="32" unit="rpx"
										color="#767676"
										margin="0" @click="editAddress(item)"
									></tui-icon>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="site-bottom-background-white" @click="addsite">
      <view class="site-bottom">＋添加地址</view>
    </view>
  </view>
</template>

<script>
import {
  getAddressListApi,
  getRegionListApi,
  deleteAddressApi,
} from "../../api/address";
import { getUserId } from "../../utils";
import { T_SELECT_ADDRESS } from "../../constant";

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
    addressDelete(item) {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "确定要删除当前地址？",
        success: function (res) {
          if (res.confirm) {
            deleteAddressApi({
              id: item.id,
            }).then((res) => {
              _this.$showToast("删除成功", "success");
              _this.getAddressList();
            });
          }
        },
      });
    },
    async getAddressList() {
      const res = await getAddressListApi({
        userId: getUserId(),
      });
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
      if (manageok === 1 && !this.siteList.length) {
        return;
      }
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

    editAddress(item) {
      uni.showModal({
        title: "提示",
        content: "确定要修改当前地址信息吗",
        success: function (res) {
          if (res.confirm) {
            uni.navigateTo({
              url: `/user/site/add-site?addressInfo=${JSON.stringify(item)}`,
            });
          }
        },
      });
    },

    handleChooseAddress(item) {
      uni.setStorageSync(T_SELECT_ADDRESS, item);
      uni.navigateBack();
    },
  },
  onLoad(options) {
    this.getAddressList();
    this.isSelect = !!options.appoint;
  },

  onShow() {
    // console.log("sb");
    this.getAddressList();
  },

  computed: {
    backUrl() {
      return this.isSelect ? "" : "/pages/user/user";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";

.site {
  // padding-bottom: 120upx;
  box-sizing: border-box;
  background-color: #f6f6f6;
  width: 100vw;
  min-height: 100vh;

  .site-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36upx 36upx 36upx 40upx;
    // margin-top: 74upx;
    // margin-bottom: 18upx;
  }

  .title-left-view {
    display: flex;
    align-items: center;
  }

  .site-mine {
    font-size: @f16;
  }

  .return {
    width: 24upx;
    height: 48upx;
  }

  .manage {
    font-size: @f16;
    // margin-right: 54upx;
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
    margin-left: 20upx;
    margin-right: 20upx;
    margin-bottom: 20upx;

    .site-detail-frame {
      // width: 95%;
      border-radius: 24upx;
      background: #ffffff;
      box-sizing: border-box;
      border: 0.5px solid #ececec;
      margin: 0 auto;
      padding: 32upx;
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
      align-items: center;
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
      // font-size: @f14;
      font-size: 28upx;
      font-weight: 500;
      margin: 20upx 0;
      color: #141000;
    }

    .site-detail-name {
      font-size: @f16;
      margin-left: 22upx;
      margin-right: 14upx;
      color: #141000;
    }

    .site-detail-phone {
      font-size: 32upx;
      // font-weight: 350;
      color: #141000;
    }

    .default-site {
      margin-left: 42upx;
      border-radius: 20upx;
      box-sizing: border-box;
      border: 0.5px solid #ffcb05;
      padding: 0 20upx;
      color: #ffcb05;
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
    // width: 95%;
    height: 88upx;
    // margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100upx;
    background: #ffcb05;
    color: white;
    font-size: 32upx;
    font-weight: 500;
    margin: 0 32upx 16upx 32upx;
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
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 100upx;
    // background-color: #fff;
    // padding-top: 10upx;
    box-sizing: border-box;
  }

  .choose-address {
    color: #fc7037;
    padding: 10upx 20upx;
    color: #fff;
    border-radius: 100px;
    background-color: #fc7037;
  }
}
</style>
