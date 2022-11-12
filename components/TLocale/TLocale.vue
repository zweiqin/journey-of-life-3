<template>
  <view class="local-wrapper" @click.stop="handleClick">
    <JIcon type="locale" width="34" height="40"></JIcon><text
      class="locale"
      >{{ address }}</text
    ></view
  >
</template>
  
  <script>
import { getAdressDetailByLngLat } from "../../utils/DWHutils";
export default {
  mounted() {
    this.getLocation();
  },

  data() {
    return {
      address: "位置",
    };
  },

  methods: {
    getLocation() {
      this.address = "定位中...";
      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === 0) {
                const result = res.result.address_component;
                _this.address = result.district ? result.district : result.city;
              }
            })
            .catch(() => {
              _this.address = "定位失败";
            });
        },
      });
    },

    handleClick() {
      const _this = this;
      if (this.address === "定位失败" || this.address === "定位中...") {
        uni.showModal({
          title: "提示",
          confirmText: "我已打开定位",
          content: "请确认您已开启了定位",
          success: function (res) {
            if (res.confirm) {
              _this.getLocation();
            }
          },
        });
      }
    },
  },
};
</script>
  
  <style lang="less" scoped>
.local-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .locale {
    padding: 0 10upx;
    border-right: 1px solid #ccc;
  }
}
</style>