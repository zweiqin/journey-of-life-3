<template>
  <view class="choose-pane-container">
    <view class="mask" :style="maskStyle"></view>
    <view class="main-wrapper" :style="mainStyle">
      <view class="menu-info" v-if="chooseData">
        <image class="image" :src="chooseData.imageUrl" mode="" />
        <view class="menu-detail">
          <view class="name">
            <view>{{ chooseData.name }}</view>
            <image
              @click="close"
              class="close"
              src="../../static/images/wuliu/close.png"
              mode=""
            />
          </view>
          <view class="selected"> 已选择：{{ selectStr() }} </view>
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

      <view v-if="chooseData && !chooseData.installAmount">
        <view
          class="bar-item colunm"
          v-if="
            isShowSpecifications &&
            chooseData &&
            chooseData['specificationList'] &&
            chooseData['specificationList'].length
          "
        >
          <view class="title">规格</view>
          <view class="wrapper">
            <view
              class="item"
              @click="handleClickChoose('specificationData', item, chooseData)"
              :class="{
                active: chooseData.isMultipleChoice
                  ? chooseData['specificationData'].includes(
                      Object.keys(item)[0]
                    )
                  : chooseData['specificationData'] == Object.keys(item)[0],
              }"
              :id="Object.keys(item)[0]"
              v-for="(item, index) in chooseData['specificationList']"
              :key="index"
              >{{ Object.keys(item)[0] }}{{ chooseData.unit }}
            </view>
          </view>
        </view>

        <view
          class="bar-item colunm"
          v-if="
            chooseData &&
            chooseData['typeList'] &&
            chooseData['typeList'].length
          "
        >
          <view class="title">类型</view>
          <view class="wrapper">
            <view
              class="item"
              @click="handleClickChoose('typeData', item)"
              :class="{
                active: chooseData['typeData'] == Object.keys(item)[0],
              }"
              v-for="(item, index) in chooseData['typeList']"
              :key="index"
              >{{ Object.keys(item)[0] }}</view
            >
          </view>
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
      if (data.typeList && data.typeList.length) {
        const currentSps = this.chooseData.typeData;
        for (const item of data.typeList) {
          const res = Object.entries(item)[0];
          this.isShowSpecifications = res[0] === currentSps && !res[1];
        }
      }
      this.$nextTick(() => {
        this.visiable = true;
      });
    },

    close() {
      this.visiable = false;
      this.isShowSpecifications = true;
      this.$emit("confirm", this.chooseData);
    },

    // 件数
    handleOpPackAmount(key, number) {
      const afterNumber = this.chooseData[key] + number;
      if (afterNumber >= 0) {
        this.chooseData[key] = afterNumber;
      }
    },

    handleClickChoose(key, value) {
      const selectValue = Object.keys(value)[0];
      if (this.chooseData.isMultipleChoice && selectValue !== "（四件套内）") {
        if (!Array.isArray(this.chooseData.specificationData)) {
          this.chooseData.specificationData = [selectValue];
        } else {
          const index = this.chooseData.specificationData.findIndex(
            (item) => item === selectValue
          );

          if (index !== -1 && this.chooseData.specificationData.length > 1) {
            if (this.chooseData.specificationData.length === 1) {
              uni.showToast({
                title: "最少选择一个规格",
                icon: "none",
                duration: 1000,
              });
            } else {
              this.chooseData.specificationData.splice(index, 1);
            }
          } else if (this.chooseData.specificationData.length === 4) {
            uni.showToast({
              title: "最多选择四个规格",
              icon: "none",
              duration: 1000,
            });
          } else {
            this.chooseData.specificationData.push(selectValue);
          }
        }
      } else {
        this.chooseData[key] = selectValue;
      }

      if (key === "typeData") {
        this.chooseData[key] = selectValue;
        this.isShowSpecifications = !(
          key === "typeData" && Object.values(value)[0]
        );

        if (!this.isShowSpecifications && key === "typeData") {
          this.chooseData.specificationData = "";
        } else if (key === "typeData") {
          this.chooseData.specificationData = Object.keys(
            this.chooseData.specificationList[0]
          )[0];
        }
      }

      console.log(this.chooseData.specificationData);

      this.$forceUpdate();
      this.selectStr();
    },

    // 添加其他参数
    addParams() {
      console.log(this.chooseData);
      if (this.chooseData.typeList) {
        this.chooseData["typeData"] = Object.keys(
          this.chooseData.typeList[0]
        )[0];
        this.isShowSpecifications = !Object.values(
          this.chooseData.typeList[0]
        )[0];

        if (!this.isShowSpecifications) {
          this.chooseData.specificationData = "";
        } else if (this.chooseData.specificationList) {
          this.chooseData.specificationData = Object.keys(
            this.chooseData.specificationList[0]
          )[0];
        }
        console.log(1);
      } else if (
        this.chooseData.specificationList &&
        this.chooseData.specificationList.length &&
        this.chooseData.isMultipleChoice
      ) {
        this.chooseData.specificationData = [
          Object.keys(this.chooseData.specificationList[0])[0],
        ];
      } else if (
        this.chooseData.specificationList &&
        this.chooseData.specificationList.length
      ) {
        this.chooseData.specificationData = Object.keys(
          this.chooseData.specificationList[0]
        )[0];
      }

      this.selectStr();
    },

    // 点击确定
    handleConfirm() {
      this.close();
    },

    // 检查体积是否输入正确
    handleCheckVolume() {},

    selectStr() {
      let baseStr = `${this.chooseData.name}/${this.chooseData.goodAmount}套/${
        this.chooseData.packAmount
      }件/${this.chooseData.volume || 0}方`;

      if (this.chooseData.specificationData) {
        if (
          Array.isArray(this.chooseData.specificationData) &&
          this.chooseData.specificationData.length > 1
        ) {
          baseStr += "/" + "（四件套内）";
        } else {
          baseStr +=
            "/" +
            this.chooseData.specificationData +
            (this.chooseData.unit ? this.chooseData.uni : "");
        }
      }

      if (this.chooseData.typeData) {
        baseStr += "/" + this.chooseData.typeData;
      }

      return baseStr;
    },
  },

  watch: {
    "chooseData.volume"(value) {
      if (value && !Number(value)) {
        uni.showToast({
          title: "体积输入不合法",
          duration: 2000,
        });

        this.chooseData.volumn = 0;
      }

      this.selectStr();
    },
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
          line-height: 2.5;
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