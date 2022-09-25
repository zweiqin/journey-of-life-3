<template>
  <view class="d-remarks">
    <view class="title" v-if="!isDistinguish">{{ title }}</view>
    <view class="remarks">
      <view class="content">
        <textarea
          v-if="!desc"
          v-model="info"
          :placeholder="isDistinguish ? distinguish : remark"
        ></textarea>
        <textarea v-else v-model="info" :placeholder="desc"></textarea>
        <button
          class="distinguishBtn"
          v-if="isDistinguish"
          @click="handleDistinguish"
        >
          识别
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { addressIntelligentRecogApi } from "../../api/logistics";

export default {
  props: {
    value: String,
    // 是否是智能识别
    isDistinguish: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
    },
    title: {
      type: String,
      default: "特殊要求",
    },
  },
  data() {
    return {
      remark:
        "填写特别注意事项 \n1.此处可以填写安装或图片内容的详细解释 \n2.不能填写需要师傅额外付出时间、劳动成本等内容，如增加数量和型号，否则师傅可以增加费用",
      distinguish:
        "粘贴地址信息，自动拆分物流公司、电话和地址\n例如：助力通，135467****，广东省佛山市顺德区xxxxx",
      info: "",
    };
  },

  methods: {
    async handleDistinguish() {
      // if (!this.info) {
      //   uni.showToast({
      //     title: "请输入地址相关信息",
      //     icon: "none",
      //   });

      //   return;
      // }
      try {
        // const res = await request.laoa_huozhu_post_promise(
        //   "/api/common/addressAnalyze",
        //   {
        //     address: this.info,
        //   }
        // );

        const res = await addressIntelligentRecogApi(this.info);
        if (res.statusCode == 20000) {
          this.$emit("distinguish", res.data);
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: "识别失败",
          icon: "none",
        });
      }
    },
  },

  watch: {
    info(val) {
      this.$emit("input", val);
    },

    value: {
      handler(val) {
        this.info = val;
      },

      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.d-remarks {
  width: 100%;

  .title {
    color: #888;
    margin: 47upx auto 12upx 30upx;
    font-size: 26upx;
  }
  .remarks {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300upx;
    padding: 20upx 0;
    background-color: #fff;

    .content {
      position: relative;
      width: 100%;
      margin: 20upx;
      height: 260upx;
      padding: 20upx;
      border: 1upx solid #dcdcdc;

      .uni-textarea-placeholder {
        color: #ababab;
        line-height: 1.5;
      }

      textarea {
        width: 100%;
        height: 100%;
      }

      .distinguishBtn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110upx;
        height: 36upx;
        color: #fff;
        bottom: 20upx;
        right: 20upx;
        background-color: #ec6401;
        border-radius: 18upx;
        font-size: 24upx;

        &:active {
          box-shadow: 0px 0px 4px #f40;
        }
      }
    }
  }
}
</style>
