<template>
  <view
    class="goods-panel"
    :style="{
      'padding-bottom': isCollapse ? '80upx' : '',
    }"
  >
    <view class="header item" ref="goodsPanelHeaderRef">
      <view class="title">商品 {{ Number(index) + 1 }}</view>
      <view class="op">
        <view class="delete-btn" @click="deleteGoodsItem">删除</view>
        <img
          :class="isCollapse ? '' : 'rotate'"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/si4ybdp20q18bp7v6kn0.png"
          alt=""
          @click="isCollapse = !isCollapse"
        />
      </view>
    </view>

    <view v-show="isCollapse">
      <Field
        class="item"
        v-for="item in goodsPanelInfo"
        :data="item"
        :key="item.label"
        v-model="goodsItem[item.field]"
      >
        <template v-if="item.field === 'goodsUrl'" v-slot:row>
          <img
            @click="previewImg(index)"
            v-for="(item, index) in goodsItem['goodsUrl']"
            :key="item"
            :src="item"
            class="upload-img"
          />
          <Upload
            class="upload-icon"
            @after-read="afterRead"
            max-count="3"
            :deletable="false"
          />
        </template>

        <template v-if="item.field === 'goodsType'">
          <picker
            mode="multiSelector"
            range-key="name"
            :value="commodityTypeIndex"
            :range="commodityTypeInitRange"
            @columnchange="typeColumnChange"
            @change="typeChange"
          >
            <view
              :style="{ color: goodsItem.goodsType ? '#000' : '' }"
              class="goodsType"
            >
              {{ goodsItem.goodsType || "请选择商品类型" }}
            </view>
          </picker>
        </template>
      </Field>
    </view>
  </view>
</template>

<script>
import Field from "./field.vue";
import { getOrderSetting } from "../config";
import { goodsPanelInfo } from "../config";
import Upload from "../../wxcomponents/vant/dist/uploader/index.vue";

export default {
  components: {
    Field,
    Upload,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCollapse: true,
      goodsPanelInfo,
      goodsItem: {},
      commodityTypeInitRange: [], // 类型列表
      commodityTypes: [], // 不知是嘛
      commodityTypeList: [],
      commodityTypeParent: [],
      commodityTypeRange: [],
      commodityTypeIndex: [0, 0],
    };
  },
  methods: {
    // 上传图片
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

    // 点击删除当前的goods
    deleteGoodsItem() {
      this.$emit("deleteItem", this.index);
    },

    initCommodityTypeList(obj) {
      this.commodityTypeList = obj;
      var array1 = [];
      for (let item of this.commodityTypeList) {
        array1.push(item);
      }
      this.localText1 = 0;
      var array2 = this.commodityTypeList[this.localText1].itemList;
      this.commodityTypeParent = array1;
      this.commodityTypeRange = [array1, array2];
      return [array1, array2];
    },

    // 数据初始化
    async init() {
      this.commodityTypes = await getOrderSetting("commodityType");
      this.commodityTypeInitRange = this.initCommodityTypeList(
        this.commodityTypes
      );
    },

    typeColumnChange(e) {
      const _this = this;
      var detail = e.detail;
      this.commodityTypeIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0: //拖动第1列
          var array = this.commodityTypeList[detail.value];
          _this.commodityTypeInitRange[1] = array.itemList;
          _this.commodityTypeIndex.splice(1, 1, 0);
          break;
      }
      this.$forceUpdate();
    },

    typeChange(e) {
      var value = e.detail.value;
      const selectedItem = this.commodityTypeParent[value[0]];
      const type = selectedItem.name;
      const name = selectedItem.itemList[value[1]].name;
      this.localText1 = value[0];
      this.goodsItem.goodsType = type + "," + name;
      this.goodsItem.categoryName = name;
    },

    /**
     * @description 预览图片
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
    value: {
      handler(newValue) {
        this.goodsItem = newValue;
      },

      immediate: true,
      deep: true,
    },

    goodsItem: {
      handler(newGoodsItem) {
        this.$emit("input", newGoodsItem);
      },

      immediate: true,
      deep: true,
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-uploader__upload {
  width: 120upx;
  height: 120upx;
}

.goods-panel {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20upx;

  .item {
    &:last-child {
      border: none;
    }
    border-bottom: 1upx solid rgb(235, 230, 230);

    .goodsType {
      font-size: 34upx;
      color: gray;
    }
  }

  .upload-img {
    margin: 0 20upx;
    width: 120upx;
    height: 120upx;
    border-radius: 20upx;
  }

  .upload-icon {
    height: 120upx;
    width: 120upx;
  }

  .goods-panel-body {
    transition: transform 100ms;
    transform-origin: center top;
    &.rotate {
      transform: scaleY(0);
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10upx 34upx;

    .title {
      padding: 20upx 0;
      color: #000;
      font-size: 34upx;
    }

    .op {
      display: flex;
      align-items: center;

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
  }
}
</style>
