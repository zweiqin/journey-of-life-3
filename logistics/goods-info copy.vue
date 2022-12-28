<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">货物信息</view>
    </view>

    <view class="main">
      <view class="item">
        <view class="title required">货物类型</view>
        <view class="value">
          <picker
            @columnchange="handleChooseTypeColumnChange"
            @change="handleTypeChange"
            mode="multiSelector"
            :range="goodsType"
          >
            <view v-if="!orderInfo.goodType" class="placeholder"
              >请选择物品类型</view
            >
            <view v-else>{{ orderInfo.goodType }}</view>
          </picker>
        </view>
        <img src="../static/images/common/chevron-states.png" alt="" />
      </view>

      <view class="item">
        <view class="title required">物品名称</view>
        <view class="value">
          <input
            type="text"
            v-model="orderInfo.goodName"
            placeholder="请输入物品名称"
          />
        </view>
      </view>

      <view class="item">
        <view class="title">物品包装</view>
        <view class="value">
          <picker
            mode="selector"
            @change="handleSelectPickType"
            :range="pickTypeList"
          >
            <view v-if="!orderInfo.packType" class="placeholder"
              >请选择物品包装</view
            >
            <view v-else>{{ orderInfo.packType }}</view>
          </picker>
        </view>
        <img src="../static/images/common/chevron-states.png" alt="" />
      </view>

      <view class="item">
        <view class="title required">商品套数</view>
        <view class="value">
          <input
            type="text"
            v-model.number="orderInfo.goodAmount"
            placeholder="请输入商品套数"
          />
        </view>
      </view>

      <view class="item">
        <view class="title required">包装件数</view>
        <view class="value">
          <input
            type="number"
            v-model.number="orderInfo.packAmount"
            placeholder="请输入包装件数"
          />
        </view>
      </view>

      <view class="item">
        <view class="title required">包装体积</view>
        <view class="value">
          <input
            v-model="orderInfo.volume"
            type="number"
            placeholder="请输入包装体积"
          />
        </view>
      </view>

      <view class="item">
        <view class="title">物品重量</view>
        <view class="value">
          <input
            type="number"
            v-model.number="orderInfo.weight"
            placeholder="请输入物品重量"
          />
        </view>
      </view>

      <view class="item">
        <view class="title">物品保价</view>
        <view class="value">
          <input
            type="number"
            v-model.number="orderInfo.insuredPrice"
            placeholder="请输入物品保价"
          />
        </view>
      </view>

      <view class="item">
        <view class="title">物品规格</view>
        <view class="value">
          <input
            type="text"
            v-model="orderInfo.goodSpecification"
            placeholder="请输入物品规格"
          />
        </view>
      </view>
    </view>

    <button class="btn" @click="save">
      {{ isEdit ? "保存修改" : "保存" }}
    </button>
  </view>
</template>

<script>
import { goodsType, commoditySelect, pickTypeList } from "./config";

export default {
  data() {
    return {
      goodsType,
      pickTypeList,
      serveForm: {},
      typeSelecterInfo: {
        left: 0,
        right: 0,
      },
      orderInfo: {
        goodType: "", // 类型
        goodName: "", // 品名
        packType: "", // 包装类型
        weight: "", // 重量
        volume: "", // 体积
        goodSpecification: "", // 规格
        goodAmount: "", // 套数
        packAmount: "", // 件数
        insuredPrice: "", // 保价
      },
      isEdit: false,
      editIndex: null,
    };
  },

  onLoad(options) {
    if (options.edit) {
      this.isEdit = true;
      this.editIndex = +options.edit;
      const goodsList = uni.getStorageSync("JI_ORDER_GOODS_LIST");
      Object.assign(this.orderInfo, goodsList[+options.edit]);
    }
  },

  methods: {
    back() {
      uni.navigateBack();
    },

    /**
     * 类型picker切换了
     */
    handleChooseTypeColumnChange(e) {
      const { column, value } = e.detail;
      if (column === 0) {
        this.$set(goodsType, 1, commoditySelect[goodsType[0][value]]);
      }
    },

    /**
     * 类型框发生变化，即点击了确认按钮
     */
    handleTypeChange(e) {
      const valueIndexs = e.detail.value;
      this.typeSelecterInfo.left = valueIndexs[0];
      this.typeSelecterInfo.right = valueIndexs[1];
      const mainType = this.goodsType[0][valueIndexs[0]];
      this.orderInfo.goodName = this.goodsType[1][valueIndexs[1]];
      this.orderInfo.goodType = mainType + "," + this.orderInfo.goodName;
    },

    /**
     * @description 点击确定选择包装
     */
    handleSelectPickType(e) {
      const index = e.detail.value;
      this.orderInfo.packType = this.pickTypeList[index];
    },

    /**
     * @description 保存按钮
     */
    save() {
      const goodsList = uni.getStorageSync("JI_ORDER_GOODS_LIST") || [];
      if (this.isEdit) {
        goodsList[this.editIndex] = this.orderInfo;
      } else {
        goodsList.push({ ...this.orderInfo, id: new Date().getTime() });
      }
      uni.setStorageSync("JI_ORDER_GOODS_LIST", goodsList);
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .uni-popup__wrapper {
  background-color: #fff;
}

.placeholder {
  color: gray;
}
.value-added-services {
  padding: 60upx 24upx;
  background: linear-gradient(180deg, #3662ec, rgba(205, 225, 253, 0));

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .main {
    background-color: #fff;
    width: 99%;
    margin: 34upx auto 0;
    border-radius: 20upx;
    padding: 44upx;
    box-sizing: border-box;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28upx 0;
      border-bottom: 1upx solid #d8d8d8;

      &:last-child {
        border: none;
      }

      .title {
        position: relative;
        color: #3d3d3d;
        font-size: 32upx;
        font-weight: bold;
        margin-right: 40upx;
        &.required {
          &::before {
            position: absolute;
            content: "*";
            color: red;
            display: block;
            left: -10px;
          }
        }
      }

      .value {
        flex: 1;
      }
    }
  }

  .btn {
    margin: 120upx auto 20upx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260upx;
    height: 72upx;
    background-color: #3662ec;
    border-radius: 10upx;
    color: #fff;
    font-size: 36upx;
  }
}
</style>