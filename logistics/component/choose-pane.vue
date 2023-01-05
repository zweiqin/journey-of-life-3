<template>
  <view class="choose-pane-container">
    <view class="mask" :style="maskStyle"></view>
    <view class="main-wrapper" :style="mainStyle">
      <view class="menu-info" v-if="chooseData">
        <image class="image" :src="chooseData.url" mode="" />
        <view class="menu-detail">
          <view class="name">
            <view>{{ chooseData.goodName }}</view>
            <image
              @click="close"
              class="close"
              src="../../static/images/wuliu/close.png"
              mode=""
            />
          </view>
          <view class="selected"> 已选择：{{ selectStr }} </view>
        </view>
      </view>

      <view class="bar-item" v-if="chooseData">
        <view class="title">套数</view>

        <Numbers
          @op="handleOpPackAmount('goodAmount', $event)"
          :number="chooseData.goodAmount"
        ></Numbers>
      </view>

      <view class="bar-item" v-if="chooseData">
        <view class="title">件数</view>
        <Numbers
          :number="chooseData.packAmount"
          @op="handleOpPackAmount('packAmount', $event)"
        ></Numbers>
      </view>

      <view class="bar-item" v-if="chooseData">
        <view class="title">体积</view>
        <view class="volumn">
          <input
            type="digit"
            v-model.number="chooseData.volume"
            placeholder="选填"
            placeholder-class="placeholder-text"
          />
          方
        </view>
      </view>

      <!-- <view
        class="bar-item colunm"
        v-for="item in chooseData.attributes"
        :key="item.name"
      >
        <view class="title">{{ item.name === "door" ? "规格" : "类型" }}</view>
        <view class="wrapper">
          <view class="item active" v-for="item1 in item.values" :key="item1"
            >{{ item1 }}{{ item.unit }}</view
          >
        </view>
      </view> -->

      <view
        class="bar-item colunm"
        v-if="
          isShowSpecifications &&
          chooseData &&
          chooseData.attributes &&
          chooseData.attributes['specifications']
        "
      >
        <view class="title">规格</view>
        <view class="wrapper">
          <view
            class="item"
            @click="
              handleClickChoose(
                'specifications',
                item,
                chooseData.attributes['specifications']
              )
            "
            :class="{
              active: chooseData.attributes['specifications'].isMulti
                ? chooseData['specifications'].includes(item)
                : chooseData['specifications'] === item,
            }"
            v-for="item in chooseData.attributes['specifications'].values"
            :key="item"
            >{{ item }}{{ chooseData.attributes["specifications"].unit }}
          </view>
        </view>
      </view>

      <view
        class="bar-item colunm"
        v-if="
          chooseData &&
          chooseData.attributes &&
          chooseData.attributes['pretendStyle']
        "
      >
        <view class="title">类型</view>
        <view class="wrapper">
          <view
            class="item"
            @click="handleClickChoose('pretendStyle', item)"
            :class="{
              active: chooseData['pretendStyle'] === item,
            }"
            v-for="item in chooseData.attributes['pretendStyle'].values"
            :key="item"
            >{{ item }}</view
          >
        </view>
      </view>

      <button class="uni-btn" @click="handleConfirm">确定</button>
    </view>
  </view>
</template>

<script>
import Numbers from "./numbers.vue";

export default {
  components: { Numbers },
  data() {
    return {
      visiable: false,
      chooseData: null,
      isShowSpecifications: true,
    };
  },

  methods: {
    show(data, isEdit) {
      this.chooseData = data;
      !isEdit && this.addParams();
      this.$nextTick(() => {
        this.visiable = true;
      });
    },

    close() {
      this.visiable = false;
      this.$emit("confirm", this.chooseData);
    },

    // 件数
    handleOpPackAmount(key, number) {
      const afterNumber = this.chooseData[key] + number;
      if (afterNumber >= 0) {
        this.chooseData[key] = afterNumber;
      }
    },

    handleClickChoose(key, value, config) {
      console.log("我们的爱", key, value, config);
      if (config && config.isMulti) {
        const index = this.chooseData[key].indexOf(value);
        if (index !== -1) {
          this.chooseData[key].splice(index, 1);
        } else {
          this.chooseData[key].push(value);
        }
      } else {
        this.chooseData[key] = value;
      }
      this.changeSpVisiable();
      this.$forceUpdate();
    },

    // 添加其他参数
    addParams() {
      for (const key in this.chooseData.attributes) {
        if (this.chooseData.attributes[key].isMulti) {
          this.chooseData[key] = [this.chooseData.attributes[key].values[0]];
        } else {
          this.chooseData[key] = this.chooseData.attributes[key].values[0];
        }
        this.changeSpVisiable();
      }
    },

    //
    changeSpVisiable() {
      if (
        this.chooseData &&
        this.chooseData.attributes &&
        this.chooseData.attributes.specifications
      ) {
        const apponit = this.chooseData.attributes.specifications.apponit;
        if (apponit) {
          this.isShowSpecifications = this.chooseData.pretendStyle === apponit;
        } else {
          this.isShowSpecifications = true;
        }
      }
    },

    // 点击确定
    handleConfirm() {
      this.close();
    },

    // 检查体积是否输入正确
    handleCheckVolume() {},
  },

  computed: {
    maskStyle() {
      return {
        opacity: this.visiable ? 1 : 0,
        zIndex: this.visiable ? 12 : -1,
      };
    },

    mainStyle() {
      return {
        transform: this.visiable ? "translateY(0)" : "translateY(1000px)",
      };
    },

    selectStr() {
      let baseStr = `${this.chooseData.goodName}/${
        this.chooseData.goodAmount
      }套/${this.chooseData.packAmount}件/${this.chooseData.volumn || 0}方`;
      if (this.chooseData.specifications) {
        baseStr +=
          "/" +
            this.chooseData.specifications +
            this.chooseData.attributes.specifications.unit || "";
      }

      if (this.chooseData.pretendStyle) {
        baseStr += "/" + this.chooseData.pretendStyle;
      }

      return baseStr;
    },
  },
};
</script>

<style lang="less" scoped>
.choose-pane-container {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    font-size: 28upx;
    background-color: rgba(228, 228, 228, 0.413);
    transition: all 350ms;
  }

  .main-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    border-radius: 40upx 40upx 0 0;
    padding: 40upx 50upx;
    padding-bottom: 0;
    box-sizing: border-box;
    transition: transform 350ms;
    z-index: 100;

    .menu-info {
      display: flex;

      .image {
        width: 160upx;
        height: 160upx;
        border-radius: 20upx;
        flex-shrink: 0;
      }

      .menu-detail {
        flex: 1;
        margin-left: 30upx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 32upx;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .close {
            width: 30upx;
            height: 30upx;
          }
        }
        .selected {
          width: 100%;
          min-height: 86upx;
          padding: 0 20upx;
          line-height: 86upx;
          background-color: #f9f9f9;
          font-size: 24upx;
          // white-space: nowrap;
        }
      }
    }

    .bar-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 26upx 0;
      border-bottom: 1upx solid #efefef;

      &.colunm {
        display: block;
      }

      .volumn {
        display: flex;
        align-items: center;

        input {
          text-align: center;
          width: 128upx;
          height: 42upx;
          border: 1upx solid #dfdfdf;
          margin-right: 20upx;
          font-size: 28upx;
        }

        .placeholder-text {
          font-size: 24upx;
        }
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;

        .item {
          min-width: 44upx;
          height: 42upx;
          border: 1upx solid transparent;
          margin-right: 24upx;
          border-radius: 10upx;
          text-align: center;
          line-height: 42upx;
          margin-top: 30upx;
          padding: 0 20upx;
          white-space: nowrap;

          &.active {
            border-color: #e95d20;
            color: #e95d20;
          }
        }
      }
    }
  }

  .uni-btn {
    width: 100%;
    height: 80upx;
    border-radius: 100px;
    background: linear-gradient(90deg, #e95d20 0%, #ff8f1f 100%);
    font-size: 32upx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40upx;
    margin-bottom: 20upx;
  }
}
</style>