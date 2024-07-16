<template>
    <tui-alerts @close="currentInfo = null" v-if="currentInfo" closable @click="go('/user/sever/application/application?id=' + currentInfo.id)" type="info" title="诚邀您成为门店股东" desc="有社区门店邀请您成为股东啦！点击查看详情"></tui-alerts>
</template>

<script>
import { USER_INFO } from '../../../constant'
import { getInviteListApi } from '../../../api/community-center'
export default {
  data() {
    return {
      currentInfo: null
    }
  },
  mounted() {
    const userInfo = uni.getStorageSync(USER_INFO)
    this.getInviteList(userInfo)
  },

  methods: {
    async getInviteList(userInfo) {
      if (!userInfo.phone) {
        return
      }
      const res = await getInviteListApi({
        bizType: 2,
        inviteUserPhone: userInfo.phone, // 被邀请人手机号
        pageNo: 1,
        pageSize: 100
      })

      if (res.statusCode === 20000) {
        const canOP = res.data.records.find((item) => item.status <= 2)
        if (canOP) {
          this.currentInfo = canOP
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
