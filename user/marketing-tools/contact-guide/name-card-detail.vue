<template>
  <view class="name-card-detail">
    <view
      class="bg"
      :style="{
        background: nameCardDetail.bgColor,
      }"
    ></view>

    <view class="main">
      <view class="header">
        <JBack v-show="showEditBtn"></JBack>
        <h2>{{ showEditBtn ? "我的名片" : `${nameCardDetail.name}的名片` }}</h2>
      </view>
      <view class="top-card">
        <view class="top">
          <JAvatar
            v-if="nameCardDetail.headPic"
            :size="160"
            radius="20"
            :src="nameCardDetail.headPic"
          ></JAvatar>
          <view class="right">
            <view class="name"
              >{{ nameCardDetail.name }}
              <JIcon
                type="red-modal"
                style="vertical-align: sub; margin-left: 10upx"
                width="34"
                height="40"
              ></JIcon>
            </view>
            <view>
              <view class="position sub">{{ nameCardDetail.position }}</view>
              <view class="company sub">{{ nameCardDetail.business }}</view>
            </view>
          </view>
        </view>

        <view class="main-card-item">
          <JIcon width="30" height="30" type="phone"></JIcon
          >
					<BeeMakePhone :phone="nameCardDetail.phone"><view
            class="main-card-text"
            >{{ nameCardDetail.phone }}</view
          ></BeeMakePhone></view
        >

        <view class="main-card-item">
          <JIcon width="26" height="30" type="main-locale"></JIcon
          ><view class="main-card-text">{{
            nameCardDetail.address
          }}</view></view
        >

        <view class="icon">
          <JIcon
            style="margin-top: 10px"
            type="tuanfeng"
            width="124.5"
            height="42"
          ></JIcon>
        </view>
      </view>

      <view class="sub-name-card top-card">
        <view class="top">
          <JAvatar
            :size="160"
            radius="20"
            :src="nameCardDetail.headPic"
            v-if="nameCardDetail.headPic"
          ></JAvatar>

          <view class="right">
            <view class="name">{{ nameCardDetail.name }} </view>
            <view class="position sub">{{ nameCardDetail.position }}</view>
            <view class="company sub">{{ nameCardDetail.business }}</view>
          </view>

          <JIcon
            v-if="showEditBtn"
            @click="handleEditNameCard"
            type="edit"
            width="36"
            height="36"
          ></JIcon>
        </view>
      </view>

      <view class="pane">
        <view class="pane-title">联系方式</view>
        <view class="pane-cheat-item">
          <JIcon width="36" height="36" type="mobile"></JIcon>
          <view class="title">手机</view>
					<BeeMakePhone :phone="nameCardDetail.phone">
						<view class="value">{{
							nameCardDetail.phone
						}}</view>
					</BeeMakePhone>
        </view>

        <view class="pane-cheat-item">
          <JIcon width="36" height="36" type="weiXin"></JIcon>
          <view class="title">微信</view>
          <view class="value">{{ nameCardDetail.wechat }}</view>
        </view>

        <view class="pane-cheat-item">
          <JIcon width="36" height="36" type="gray-locale"></JIcon>
          <view class="title">地址</view>
          <view class="value">{{ nameCardDetail.address }}</view>
        </view>
      </view>

      <view class="pane" v-if="nameCardDetail.intro">
        <view class="pane-title">业务简介</view>
        <view
          class="content"
          v-html="nameCardDetail.intro.replaceAll('\n', '<br/>')"
        ></view>
      </view>

      <view class="pane" v-if="nameCardDetail.companyProfile">
        <view class="pane-title">公司简介</view>
        <view
          class="content"
          v-html="nameCardDetail.companyProfile.replaceAll('\n', '<br/>')"
        ></view>
      </view>

      <view
        class="pane"
        v-if="
          (nameCardDetail.imgs && nameCardDetail.imgs.length) ||
          nameCardDetail.video
        "
      >
        <view class="pane-title">图片/视频</view>
        <view
          class="img-wrapper"
          v-if="nameCardDetail.imgs && nameCardDetail.imgs.length"
        >
          <img
            v-for="(item, index) in nameCardDetail.imgs"
            :key="item"
            class="img"
            :src="item"
            alt=""
            @click="preview(index)"
          />
        </view>

        <view class="video-wrapper" v-if="nameCardDetail.video">
          <video :src="nameCardDetail.video"></video>
        </view>
      </view>
    </view>

    <view class="footer" v-if="showEditBtn">
      <button
        class="uni-btn"
        @click="go('/user/marketing-tools/contact-guide/create-namezcard')"
      >
        新建名片
      </button>
      <button class="uni-btn" @click="handleTo">
        <JIcon width="60" height="60" type="weixin-icon"></JIcon>
        分享名片
      </button>
    </view>
  </view>
</template>

<script>
import { getNameCardDetailApi } from "../../../api/user";
import { USER_ID } from "../../../constant";

export default {
  data() {
    return {
      nameCardId: null,
      nameCardDetail: {},
    };
  },
  onLoad(options) {
    this.nameCardId = options.id;
    this.getNameCardDetail();
  },
  computed: {
    showEditBtn() {
      const userId = uni.getStorageSync(USER_ID);
      if (!userId) return false;
      return userId === this.nameCardDetail.userId;
    },
  },
  methods: {
    getNameCardDetail() {
      const _this = this;
      getNameCardDetailApi({
        id: this.nameCardId,
      }).then(({ data }) => {
        _this.nameCardDetail = data.businessCard;
      });
    },

    // 编辑名片
    handleEditNameCard() {
      uni.navigateTo({
        url:
          "/user/marketing-tools/contact-guide/create-namezcard?edit=" +
          this.nameCardId,
      });
    },

    // 预览图
    preview(index) {
      const _this = this;
      uni.previewImage({
        urls: _this.nameCardDetail.imgs,
        current: index,
      });
    },

    handleTo() {
      uni.redirectTo({
        url:
          "/user/marketing-tools/contact-guide/share-card?id=" +
          this.nameCardId,
      });
    },

  },
};
</script>

<style lang="less" scoped>
.name-card-detail {
  position: relative;
  font-size: 28upx;

  .bg {
    width: 100%;
    height: 400upx;
    background-color: #183869;
    transition: all 350ms;
  }

  .main {
    position: absolute;
    top: 30upx;
    width: 100%;
    padding: 30upx;
    box-sizing: border-box;
    padding-bottom: 116upx;

    .header {
      display: flex;
      align-items: center;

      h2 {
        font-size: 30upx;
        color: #fff;
        font-weight: normal;
        margin-left: 30upx;
        margin-top: -2upx;
      }
    }

    .top-card {
      width: 100%;
      padding: 48upx 24upx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20upx;
      margin-top: 40upx;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);

      .main-card-item {
        display: flex;
        align-items: center;
        margin-top: 28upx;

        .main-card-text {
          margin-left: 10upx;
        }
      }

      .top {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 30upx;

        .right {
          margin-left: 26upx;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          padding: 10upx 0;
          box-sizing: border-box;

          .name {
            font-size: 32upx;
            font-weight: bold;
          }

          .sub {
            color: #999999;

            &:nth-child(2) {
              margin-top: 16upx;
            }
          }
        }
      }

      .icon {
        text-align: right;
      }
    }

    .sub-name-card {
      box-shadow: none;
      padding-left: 0;
      padding-right: 0;

      .right {
        margin-left: 10upx;
        font-size: 28upx;
        flex: 1;
      }

      .sub {
        font-size: 24upx;
        margin-top: 0 !important;
      }
    }
  }

  .pane {
    margin-bottom: 60upx;
    .pane-title {
      font-size: 32upx;
      font-weight: bold;
      margin-bottom: 30upx;
      white-space: nowrap;
    }

    .pane-cheat-item {
      display: flex;
      align-items: flex-start;
      font-size: 24upx;
      margin-bottom: 40upx;

      .title {
        margin: 0 28upx 0 10upx;
        white-space: nowrap;
      }
    }

    .content {
      font-size: 24upx;
      color: #3d3d3d;
      line-height: 2;
      font-size: 28upx;
    }

    .img-wrapper {
      display: flex;
      flex-direction: column;

      .img {
        width: 100%;
        object-fit: cover;
        margin-bottom: 20upx;
        border-radius: 20upx;
      }
    }
  }

  .video-wrapper {
    width: 100%;
    border-radius: 20upx;
    overflow: hidden;

    video {
      width: 100%;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 116upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10000;
    padding: 0 30upx;
    box-sizing: border-box;

    .uni-btn {
      height: 72upx;
      border-radius: 100px;
      padding: 20upx 50upx;
      font-size: 32upx;

      &:first-child {
        color: #999;
        border: 1upx solid #999;
        flex: 1;
        margin-right: 20upx;
      }

      &:last-child {
        color: #fff;
        background-color: #3662ec;
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;

        /deep/ .j-icon {
          margin-right: 10upx;
        }
      }
    }
  }
}
</style>