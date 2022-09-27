<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-25 19:35:59
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-26 16:48:38
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\stuff\brand\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <view class="background">
      <view class="title">品牌</view>
      <img
        src="../../../static/images/stuff/家具材料排行榜.png"
        alt=""
        class="title-img"
      />
      <img
        src="../../../static/images/stuff/lasttitle.png"
        alt=""
        class="title-lastimg"
      />
      <view class="second-background">
        <view class="second-title">
          <view
            @click="changeTab(1)"
            :class="{ active: currentTab === 1 }"
            class="item"
            >品牌</view
          >
          <view
            @click="changeTab(2)"
            :class="{ active: currentTab === 2 }"
            class="item"
            >店铺</view
          >
          <view
            @click="changeTab(3)"
            :class="{ active: currentTab === 3 }"
            class="item"
            >销量
          </view>
          <view
            @click="changeTab(4)"
            :class="{ active: currentTab === 4 }"
            class="item"
            >最热
          </view>
          <view
            @click="changeTab(5)"
            :class="{ active: currentTab === 5 }"
            class="item"
            >材料
          </view>
        </view>
        <view class="second-detail"> </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameList: [
        {
          id: 1,
          name: "品牌",
        },
        {
          id: 2,
          name: "店铺",
        },
        {
          id: 3,
          name: "销量",
        },
        {
          id: 4,
          name: "最热",
        },
        {
          id: 5,
          name: "材料",
        },
      ],
      shopList: [
        {
          id: 1,
          name: "智阁",
          picUrl: "../../../static/images/stuff/智阁.png",
        },
        {
          id: 1,
          name: "壮象",
          picUrl: "../../../static/images/stuff/壮象.png",
        },
        {
          id: 1,
          name: "伟业",
          picUrl: "../../../static/images/stuff/伟业.png",
        },
        {
          id: 1,
          name: "鹏鸿",
          picUrl: "../../../static/images/stuff/鹏鸿.png",
        },

        {
          id: 1,
          name: "韩氏",
          picUrl: "../../../static/images/stuff/韩氏.png",
        },
        {
          id: 1,
          name: "好太太",
          picUrl: "../../../static/images/stuff/好太太.png",
        },
        {
          id: 1,
          name: "圣鹿国际",
          picUrl: "../../../static/images/stuff/圣鹿国际.png",
        },
        {
          id: 1,
          name: "福湘",
          picUrl: "../../../static/images/stuff/福湘.png",
        },
        {
          id: 1,
          name: "万象",
          picUrl: "../../../static/images/stuff/万象.png",
        },
        {
          id: 1,
          name: "平安树",
          picUrl: "../../../static/images/stuff/平安树.png",
        },
      ],
      currentTab: 1,
    };
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style lang="less" scoped>
.background {
  background-color: #3662ec;

  .title {
    padding-top: 74upx;
    color: white;
    font-size: 32upx;
    font-weight: 500;
  }
  .title-img {
    margin-top: 37upx;
    margin-left: 146upx;
    width: 460upx;
    height: 60upx;
  }
  .title-lastimg {
    margin-left: 146upx;
    width: 440upx;
    height: 220upx;
  }
  .second-background {
    background-color: white;
    border-radius: 20upx;
    width: 700upx;
    height: 10000upx;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-around;
    .second-title {
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      width: 700upx;
      height: 35upx;

      .item {
        margin: 0 auto;
        font-size: 24upx;

        &.active {
          font-weight: bold;
          color: #3662ec;
          border-bottom: 2px solid #3662ec;
        }
      }
    }

    top: -52upx;
    .thistitle {
    }
  }
}
</style>