<template>
  <view class="sort">
    <!-- <slot></slot> -->
    <view class="title">{{ serverNameTwo }}</view>
    <view class="form">
      <view
        class="sub"
        v-for="item in detailList"
        :key="item.serverNameThree"
        @click="handleToServiceDetail(item)"
      >
        <img
          :src="
            item.serverImageUrl.split(',').find((item) => item) ||
            require('../../static/images/new-user/default-user-avatar.png')
          "
          alt=""
          class="goods"
        />
        <view class="name">{{ item.serverNameThree }}</view>
      </view>
    </view>

    <tui-modal
      :show="$data._isShowTuiModel"
      title="提示"
      content="为了对您精准服务请先选择当前您的位置"
      @click="
        _handleClickTuiModel($event, () => {
          go('/pages/choose-location/choose-location');
        })
      "
    ></tui-modal>
  </view>
</template>

<script>
import { getUserId } from "../../utils";
import showModal from "mixin/showModal";
export default {
  name: "componts",
  mixins: [showModal()],
  props: {
    serverNameTwo: String,
    serverNameThree: String,
    serverImageUrl: String,
    // id: Number,
    detailList: Array,
    tips: Boolean,
    scrollTop: Number,
  },
  data() {
    return {
      name: "",
      id: "",
      userId: "",
      address: "",
    };
  },
  computed: {},

  // onPageScroll: function (e) {
  // 	console.log("滚动距离为：" + e.scrollTop);
  // },

  methods: {
    handleToServiceDetail(item) {
      console.log("服务详情", item);
      const name = item.serverNameThree;
      const id = item.id;
      this.userId = getUserId();

      uni.setStorage({
        key: "listTop",
        data: this.scrollTop,
      });

      if (!this.userId) {
        console.log("userId", this.userId);
        uni.showModal({
          title: "提示",
          content: "你还没登录,请登录",
          showCancel: true,
          // success: ({ confirm, cancel }) => {}
          success: function (res) {
            if (res.confirm) {
              console.log("确定");
              uni.navigateTo({
                url: `/pages/login/login`,
              });
            } else if (res.confirm) {
              console.log("取消");
            }
          },
        });
      } else if (this.$store.getters.currentCity === "定位失败") {
				this.$data._isShowTuiModel = true
      } else {
        uni.navigateTo({
          url: `/community-center/community-detail?id=${id}&serverNameThree=${name}&serverImageUrl=${item.serverImageUrl}`,
        });
      }
    },
  },

  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    setTimeout(() => {
      this.type = this.tips ? 1 : 2;
      console.log("type", this.type);
    }, 1000);
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.sort {
  padding: 56upx 20upx 0upx 20upx;

  // width: 100%;
  .title {
    font-size: 32upx;
    font-weight: bold;
    color: #3d3d3d;
  }

  .form {
    margin-top: 52upx;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .sub {
      width: 160upx;
      height: 206upx;
      margin-bottom: 70upx;
      margin-right: 16upx;

      .goods {
        width: 160upx;
        height: 160upx;
      }

      .name {
        font-size: 28upx;
        color: #3d3d3d;
        text-align: center;
        width: 160upx;
      }
    }
  }
}
</style>
