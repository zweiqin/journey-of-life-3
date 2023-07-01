<template>
  <view class="choose-time">
    <view
      class="mask"
      :style="{ display: value ? 'block' : 'none' }"
      @click="close"
    ></view>
    <view
      class="container"
      :style="{ transform: value ? 'translateY(0)' : 'translateY(100%)' }"
    >
      <view class="header">
        <view class="title">
          选择期望上门时间 <JIcon @click="close" type="close"></JIcon>
        </view>
        <view class="notice">师傅接单后电话与您确认最终上门时间</view>
      </view>

      <view class="main">
        <view class="left">
          <ul>
            <li
              @click="handleCooseTime(item)"
              v-for="item in leftData"
              :key="item.value"
              :class="{ active: current === item.value }"
            >
              {{ item.date }}
            </li>
          </ul>
        </view>
        <view class="right">
          <view
            class="time"
            @click="finalChooseDate(item)"
            v-for="item in timeSlot"
            :key="item"
            >{{ item }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDayList, getTimeSlot } from "./utile";
export default {
  data() {
    return {
      leftData: [],
      timeSlot: [],
      current: 0,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.leftData = getDayList();
      this.timeSlot = getTimeSlot(true);
    });
  },

  methods: {
    handleCooseTime(item) {
      this.current = item.value;
      if (this.current === 0) {
        this.timeSlot = getTimeSlot(true);
      } else {
        this.timeSlot = getTimeSlot();
      }
    },

    finalChooseDate(item) {
      const year = new Date().getFullYear();
      let str = this.leftData[this.current].date + " " + item;
      str = str.replace("今天", "").replace("明天", "").replace("后天", "").replace("下月", "").replace("周一", "").replace("周二", "").replace("周三", "").replace("周四", "").replace("周五", "").replace("周六", "").replace("周日", "");

      if (str.includes("明年")) {
        this.$emit("choose", year + 1 + " " + str.trim());
        this.close()
        return
      }

      this.$emit("choose", year + "-" + str.trim());
      this.close()

    },

    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="less" scoped>
.choose-time {
  position: fixed;
  top: 0;
  left: 0;
}
.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100000000000;
}

.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 390px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #fff;
  border-radius: 40upx 40upx 0 0;
  transform: translateY(100%);
  transition: all 350ms;
  z-index: 100;

  .main {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      height: 320px;
      overflow: scroll;
    }

    .left {
      width: 250upx;
      // background-color: rgb(255, 0, 0);

      ul {
        height: 100%;
        padding: 0;
        // height: 350px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        li {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28upx;
          text-align: center;
          padding-left: 10px;
          background-color: #f6f6f6;
          transition: all 350ms;

          &.active {
            background-color: #fff;
            &::before {
              content: "";
              position: absolute;
              display: block;
              height: 20px;
              width: 2px;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              background-color: #dd8a42;
            }
          }
        }
      }
    }

    .right {
      flex: 1;
      background-color: rgb(255, 255, 255);
      box-sizing: border-box;
      padding: 0 20upx;
      font-size: 28upx;
      padding-left: 20px;

      .time {
        line-height: 2;
        margin: 20upx 0;
        margin-bottom: 30upx;
      }
    }
  }
}

.header {
  .title {
    position: relative;
    font-size: 32upx;
    text-align: center;
    height: 100upx;
    line-height: 100upx;

    .j-icon {
      width: 40upx;
      height: 40upx;
      position: absolute;
      top: 50%;
      right: 20upx;
      transform: translateY(-50%);
    }
  }

  .notice {
    width: 100%;
    font-size: 24upx;
    height: 50upx;
    line-height: 50upx;
    text-align: center;
    color: #dd8a42;
    background-color: #fef7ef;
  }
}
</style>