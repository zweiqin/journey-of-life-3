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
			<tui-no-data :fixed="false" style="padding-top: 100rpx;">还没有地址，快去添加吧~</tui-no-data>
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
  // padding-bottom: 120rpx;
  box-sizing: border-box;
  background-color: #f6f6f6;
  width: 100vw;
  min-height: 100vh;

  .site-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36rpx 36rpx 36rpx 40rpx;
    // margin-top: 74rpx;
    // margin-bottom: 18rpx;
  }

  .title-left-view {
    display: flex;
    align-items: center;
  }

  .site-mine {
    font-size: @f16;
  }

  .return {
    width: 24rpx;
    height: 48rpx;
  }

  .manage {
    font-size: @f16;
    // margin-right: 54rpx;
  }

  .back {
    width: @hw24;
    height: @hw24;
    margin-left: 48rpx;
    margin-right: 50rpx;
  }

  .site-detail-choseall {
  }

  .site-detail {
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;

    .site-detail-frame {
      // width: 95%;
      border-radius: 24rpx;
      background: #ffffff;
      box-sizing: border-box;
      border: 0.5px solid #ececec;
      margin: 0 auto;
      padding: 32rpx;
    }

    .site-default-img {
      width: 34rpx;
      height: 34rpx;
      margin-right: 18rpx;
    }

    .site-detail-fram-text {
    }

    .site-detail-top {
      display: flex;
      margin-bottom: 6rpx;
      align-items: center;
    }

    .site-detail-icon {
      width: 32rpx;
      height: 41rpx;
    }

    .site-detail-pca {
      display: flex;
      font-size: @f14;
      margin-bottom: 3rpx;
      justify-content: space-between;
    }

    .detail-site {
      // font-size: @f14;
      font-size: 28rpx;
      font-weight: 500;
      margin: 20rpx 0;
      color: #141000;
    }

    .site-detail-name {
      font-size: @f16;
      margin-left: 22rpx;
      margin-right: 14rpx;
      color: #141000;
    }

    .site-detail-phone {
      font-size: 32rpx;
      // font-weight: 350;
      color: #141000;
    }

    .default-site {
      margin-left: 42rpx;
      border-radius: 20rpx;
      box-sizing: border-box;
      border: 0.5px solid #ffcb05;
      padding: 0 20rpx;
      color: #ffcb05;
      font-size: 24rpx;
      font-weight: 350;
    }

    .compile {
      height: 32rpx;
      height: 32rpx;
    }

    .site-detail-pca1 {
      display: flex;
    }

    .province {
      margin-right: 10rpx;
    }

    .city {
      margin-right: 10rpx;
    }

    .area {
      margin-right: 10rpx;
    }
  }

  .site-bottom {
    // width: 95%;
    height: 88rpx;
    // margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100rpx;
    background: #ffcb05;
    color: white;
    font-size: 32rpx;
    font-weight: 500;
    margin: 0 32rpx 16rpx 32rpx;
  }

  .site-detail-boundary {
    margin-top: 14rpx;
    margin-bottom: 26rpx;
    border: 0.5px solid #d8d8d8;
  }

  .site-detail-chose-default {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 26rpx;

    .site-default-text {
      font-size: 20rpx;
    }

    .site-delete {
      width: 33rpx;
      height: 37rpx;
    }
  }

  .site-bottom-background-white {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 100rpx;
    // background-color: #fff;
    // padding-top: 10rpx;
    box-sizing: border-box;
  }

  .choose-address {
    color: #fc7037;
    padding: 10rpx 20rpx;
    color: #fff;
    border-radius: 100px;
    background-color: #fc7037;
  }
}
</style>
