<template>
  <view class="repair-good-item">
    <view class="header">
      <view class="count">商品 {{ index + 1 }}</view>
      <view style="display: flex; align-items: center">
        <view class="delete-btn" @click="handleDeleteItem">删除</view>
        <img
          :class="isCollapse ? '' : 'rotate'"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/si4ybdp20q18bp7v6kn0.png"
          alt=""
          @click="isCollapse = !isCollapse"
        />
      </view>
    </view>
    <view class="item" v-if="isCollapse">
      <view class="item-tab">
        <view class="sub-title"><span>*</span>商品品名</view>
        <input
          v-model="goodsItem.categoryName"
          type=""
          placeholder="请输入商品品名"
        />
      </view>
      <view
        class="item-tab"
        style="flex-direction: column; align-items: flex-start"
      >
        <view class="sub-title"><span>*</span>商品图片</view>
        <view class="img-wrapper">
          <img
            @click="previewImg(index)"
            class="img"
            v-for="(img, index) in goodsItem.goodsUrl"
            :key="img"
            :src="img"
            alt=""
          />
          <Update
            class="img"
            @after-read="afterRead"
            max-count="3"
            :deletable="false"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Update from "../../wxcomponents/vant/dist/uploader/index.vue";

export default {
  props: {
    value: Object,
    index: Number,
  },
  components: {
    Update,
  },
  data() {
    return {
      isCollapse: true,
      goodsItem: {
        categoryName: "", // 品名
        goodsUrl: [],
        id: "",
      },
    };
  },
  methods: {
    /**
     * @description 点击删除
     */
    handleDeleteItem() {
      this.$emit("delete", this.index);
    },

    // 图片上传
    afterRead(event) {
      if (this.goodsItem.goodsUrl.length === 3) {
        uni.showToast({
          title: "最多上传三张",
          icon: "none",
        });
        return;
      }
      const { file } = event.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let that = this;
      const token = uni.getStorageSync("authToken");
      uni.uploadFile({
        url: "https://www.zhult.com/laoa-huozhu/api/hz/order/third/upload/ordinary",
        filePath: file.path,
        name: "pictureFile",
        header: {
          authorization: "bearer " + token,
        },
        formData: {
          photoType: "商品",
        },
        success(res) {
          const data = JSON.parse(res.data);
          that.goodsItem.goodsUrl.push(data.data);
        },
        fail() {
          uni.showToast({
            title: "图片上传失败",
            icon: "none",
          });
        },
      });
    },

    /**
     * @description 预览图片
     * @param index 点击的图片的index
     */
    previewImg(index) {
      const _this = this;
      uni.previewImage({
        current: index,
        urls: _this.goodsItem.goodsUrl,
        success: function () {
          _this.$emit("preview", true);
        },
      });
    },
  },
  watch: {
    goodsItem: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true,
    },

    value: {
      handler(val) {
        this.goodsItem = val;
        if (!this.goodsItem.goodsUrl) {
          this.goodsItem.goodsUrl = [];
        }
      },

      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-uploader__upload {
  width: 120upx;
  height: 120upx;
}

.repair-good-item {
  margin-bottom: 30upx;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 18upx 20upx;

    .count {
      color: #111;
      font-size: 34upx;
    }

    .delete-btn {
      width: 90upx;
      height: 32upx;
      text-align: center;
      line-height: 32upx;
      background-color: #ee0904;
      padding: 2px 0;
      color: #fff;
      font-size: 22upx;
      border-radius: 20upx;
    }

    img {
      width: 25upx;
      height: 16upx;
      margin-left: 30upx;
      transition: all 350ms;

      &.rotate {
        transform: rotate(180deg);
      }
    }
  }

  .item {
    background-color: #fff;

    .item-tab {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .sub-title {
        color: #111;
        font-size: 34upx;
        padding: 25upx;

        span {
          color: red;
          padding-right: 10upx;
        }

        .upload-icon {
          margin-left: 10upx;
        }
      }

      .img-wrapper {
        display: flex;
        align-items: center;
        padding-bottom: 40upx;

        .img {
          width: 120upx;
          height: 120upx;
          margin: 0 20upx;
          border-radius: 10upx;
        }
      }

      input {
        flex: 1;
      }
    }
  }
}
</style>