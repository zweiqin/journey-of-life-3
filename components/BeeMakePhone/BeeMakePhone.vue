<template>
  <view class="make-phone-container" @click="handleMackPhone">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    phone: {
      type: [Number, String],
    },
  },

  methods: {
    handleMackPhone() {
      if (!this.phone) {
        // TODO: 使用 `tui-toast`
        // TODO: app 使用是否需要权限 ？ 
        uni.showToast({
          title: '暂无联系方式',
          duration: 2000,
          icon: 'none',
        })
        return
      }

      uni.makePhoneCall({
        phoneNumber: this.phone,
      })
    },
  },
}
</script>
