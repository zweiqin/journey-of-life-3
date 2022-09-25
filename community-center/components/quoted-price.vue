<template>
  <view class="quoted-price">
    <view class="preview" :style="prviewClsses">
      <view>
        <span class="total">总价：{{ data.sumPrice }} 元 </span>
        <span class="vip"
          >会员价 <span class="price">{{ data.vipPrice }}</span
          >元
        </span>
      </view>

      <span @click="isCollapse = !isCollapse">{{
        isCollapse ? "收起" : "展开"
      }}</span>
    </view>
    <view class="main" v-show="isCollapse">
      <view>
        <view>
          起步价：<span>{{ data.startPrice || 0 }}</span>
        </view>
        <view>
          超距费：<span>{{ data.exceedDistancePrice || 0 }}</span>
        </view>
      </view>
      <view>
        <view>
          超方费：<span>{{ data.exceedPartyPrice || 0 }}</span>
        </view>
        <view>
          上楼费：<span>{{ data.upstairsPrice || 0 }}</span>
        </view>
      </view>
      <view>
        <view>
          安装费：<span>{{ data.installAmount || 0 }}</span>
        </view>
        <view></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    prviewClsses() {
      return {
        "padding-bottom": this.isCollapse ? "10upx" : "",
        "border-bottom": this.isCollapse ? "1upx solid #ccc" : "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.quoted-price {
  margin-top: 20upx;
  padding: 40upx;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 30upx;

  .preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15upx;

    .total {
      margin-right: 10upx;
      text-decoration: line-through;
    }

    .vip {
      text-decoration: none;
      color: #ff0049;

      .price {
        font-size: 1.1em;
        font-weight: bold;
      }
    }
  }

  .main {
    view {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 0 0 50%;

      view {
        line-height: 1.5;

        span {
          color: #ff0049;
        }
      }
    }
  }
}
</style>
