<template>
  <view class="share-name-card">
    <StyleOne :code="qrcode" :data="data" ref="namecardRef">
      <ayQrcode
        ref="qrcode"
        :modal="modal_qr"
        :url="url"
        @hideQrcode="hideQrcode"
        :height="122"
        :h_w_img="40"
        :width="122"
        themeColor="#183869"
      />
    </StyleOne>

    <button class="uni-btn" @click="shareNamecard">分享名片</button>
    <button class="uni-btn" @click="handleBack">返回我的名片</button>
  </view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import StyleOne from "./mould/style-one.vue";
import { getNameCardDetailApi } from "../../../api/user";
import { getConfigApi } from "../../../api/auth";
import ayQrcode from "../../../components/ay-qrcode/ay-qrcode.vue";

// #ifdef H5
import share from "../../../utils/wxshare";
// #endif

export default {
  components: {
    StyleOne,
    ayQrcode,
  },
  data() {
    return {
      data: {},
      qrcode: "",
      modal_qr: false,
      url: `${A_TF_MAIN}/#/user/marketing-tools/contact-guide/name-card-detail?id=`,
    };
  },

  onLoad(options) {
    uni.showLoading({
      title: "名片生成中",
    });
    this.nameCardId = options.id;
    this.getNameCardDetail();
    this.modal_qr = true;
    this.url = this.url + options.id;
    setTimeout(() => {
      // uni.hideLoading()
      this.$refs.qrcode.crtQrCode();
      uni.hideLoading();

      // #ifdef H5
      this.shareNamecard();
      // #endif
    }, 500);
  },

  methods: {
    getNameCardDetail() {
      const _this = this;
      getNameCardDetailApi({
        id: this.nameCardId,
      }).then(({ data }) => {
        _this.data = data.businessCard;
      });
    },

    hideQrcode() {
      this.modal_qr = false;
    },

    handleBack() {
      uni.redirectTo({
        url: "/user/marketing-tools/contact-guide/my-cards",
      });
    },

    // 分享名片
    shareNamecard() {
      console.log(this.data.position + '\n' + this.data.phone);
      // #ifdef H5
      const currentUrl = window.location.href.replace("#", "ericToken");
      const _this = this;

      getConfigApi({
        url: currentUrl
      }).then(({ data }) => {
        share.wxRegister(data, {
          title: this.data.name,
          desc: this.data.position + '\n' + this.data.phone,
          imgUrl: this.data.headPic,
          link:
            `${A_TF_MAIN}/#/user/marketing-tools/contact-guide/name-card-detail?id=` +
            _this.data.id,
        });
      });
      // #endif

      // #ifdef APP-PLUS
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 0,
        href:
          `${A_TF_MAIN}/#/user/marketing-tools/contact-guide/name-card-detail?id=` +
          this.data.id, // 分享跳转的链接
        title: this.data.name, // 分享标题
        summary: this.data.position + '\n' + this.data.phone, // 分享内容文字
        imageUrl: this.data.headPic, //分享封面图片
        success: function (res) {
          // 此处是调起微信分享成功的回调
          uni.showToast({
            title: "分享成功",
            duration: 2000,
          });
        },
        fail: function (err) {
          uni.showToast({
            title: "分享失败",
            icon: "none",
          });
        },
      });
      // #endif
    },
  },
};
</script>

<style lang="less" scoped>
.share-name-card {
  width: 100vw;
  height: 100vh;
  background-color: #183869;
  padding: 30upx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .uni-btn {
    width: 440upx;
    height: 72upx;
    border-radius: 100px;
    background-color: #3662ec;
    color: #fff;
    line-height: 72upx;

    &:nth-of-type(1) {
      margin-top: 64upx;
      font-size: 32upx;
    }

    &:nth-of-type(2) {
      margin-top: 32upx;
    }
  }
}

.img-avatr {
  border-radius: 20upx;
  width: 160upx;
  height: 160upx;
}

/deep/ .box-qrcode {
  margin-left: 20upx !important;
}
</style>
