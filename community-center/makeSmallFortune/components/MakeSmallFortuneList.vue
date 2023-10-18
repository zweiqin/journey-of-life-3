<template>
  <view class="MakeSmallFortuneList" @click="pushsss">
    <Articles v-for="(item, index) in renderData" :key="index" :datas="item"></Articles>
  </view>
</template>

<script>
import Articles from './Articles.vue'
import { getRedStatistics } from '@/api/community-center/makeSmallFortune'
import { getUserId } from '@/utils';
export default {
  name: "MakeSmallFortuneList",
  components: {
    Articles
  },
  props: {},
  data() {
    return {
      renderData: [
          {
            title: '',
            timer: '',
            isOver: false,
            readerAvata: [
              require('@/static/images/new-community/home/avatar1.png'),
              require('@/static/images/new-community/home/avatar2.png'),
              require('@/static/images/new-community/home/avatar3.png')
            ],
            maxPrice: '99',
            isReadNumber: '666',
            coverSheet: require('@/static/images/new-community/home/CoverSheet.png')
          },
          {
            title: '',
            timer: '',
            isOver: true,
            readerAvata: [
              require('@/static/images/new-community/home/avatar1.png'),
              require('@/static/images/new-community/home/avatar2.png'),
              require('@/static/images/new-community/home/avatar3.png')
            ],
            maxPrice: '99',
            isReadNumber: '666',
            coverSheet: require('@/static/images/new-community/home/CoverSheet.png')
          }
        ]
    }
  },
  created() {
    getRedStatistics({
      userId: getUserId()
    }).then(res => {
      console.log(res)
    })
  },
  computed: {},
  methods: {
    
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
  overflow-y: auto;
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