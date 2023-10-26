<template>
    <view class="MakeSmallFortuneList">
          <Articles v-for="(item, index) in renderData" :key="index" :datas="item"></Articles>
    </view>
</template>

<script>
import Articles from './Articles.vue'
import { getRedStatistics, getPostList } from '@/api/community-center/makeSmallFortune'
import { getUserId } from '@/utils';
export default {
  name: "MakeSmallFortuneList",
  components: {
    Articles
  },
  props: {},
  data() {
    return {
      renderData: [],
      querList: {
        page: 1,
        size: 10,
      },
      region: '顺德区',
      isGetMore: true
    }
  },
  created() {
      try{
        this.region = uni.getStorageSync('ADDRES_REGION')
      }catch {
        this.region = '顺德区'
      }
      this.getPostList()
  },
  computed: {},
  methods: {
    getPostList() {
        getPostList({
          userId: "",
          page: this.querList.page,
          size: this.querList.size,
          examineType:"3",
          region: this.region
        }).then(res => {
          if (res.data.talentList.length == this.renderData.length) {
              this.isGetMore = false
              this.$emit('isLoading', false)
              return uni.showToast({
                title: '没有更多数据了',
                icon: 'none'
              });
          }

          let data = res.data.talentList.filter((item, index) => {
            if (item.remainingPacket > 0) {
              this.renderData.push(item)
            }
					  return item.remainingPacket <= 0
          })
          this.renderData = [...this.renderData, ...data]

          this.$emit('isLoading', false)

          })
    },
    getMoewPostList() {
      if (!this.isGetMore) {
        this.$emit('isLoading', false)
        return uni.showToast({
          title: '没有更多数据了',
          icon: 'none'
        });
      }else {
        this.querList.size = this.querList.size + 10
        this.getPostList()
      }
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
}
</script>

<style lang="scss" scoped>
@keyframes fade {
  0% {
    opacity: 0.4;
    transform: translateX(-100vw);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.MakeSmallFortuneList {
  /* overflow-y: auto; */
  .ArticlesItem {
    -webkit-animation: fade 450ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 450ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(1) {
    -webkit-animation: fade 350ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 350ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(2) {
    -webkit-animation: fade 400ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 400ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(3) {
    -webkit-animation: fade 450ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade  450ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(4) {
    -webkit-animation: fade 500ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 500ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(5) {
    -webkit-animation: fade 550ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 550ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(6) {
    -webkit-animation: fade 600ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 600ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(7) {
    -webkit-animation: fade 650ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 650ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
}
</style>