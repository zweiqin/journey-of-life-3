<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-25 19:35:59
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-28 17:02:35
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\stuff\brand\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <view class="background">
      <view class="title">品牌</view>
      <img
        src="../../../static/images/stuff/jiajucailpaihangbang.png"
        alt=""
        class="title-img"
      />
      <img
        src="../../../static/images/stuff/lasttitle.png"
        alt=""
        class="title-lastimg"
      />
      <view class="second-background">
        <view class="second-chose">
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
        <view class="second-title"
          >《家具材料/家具五金/家具皮革十大排行榜》</view
        >
        <view class="second-detail-title">
          <view class="no">序号</view>
          <view class="brand">品牌</view>
          <view class="name">名称</view>
          <view class="grade">评分</view>
        </view>
        <view class="border"></view>

        <view class="second-detail" v-for="(item, id) in shopList" :key="id">
          <view class="no-detail">{{ item.id }}</view>
          <img :src="item.picUrl" alt="" class="brand-detail" />
          <view class="name-detail">{{ item.name }}</view>
          <view
            ><Rate :rate="5" :size="10" :space="1" class="grade-detail"></Rate>
          </view>
          <view class="border"></view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import Rate from "../../../components/rate";
export default {
  components: {
    Rate,
  },
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
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/fcxgk282gr1zjyyv7o39.png",
        },
        {
          id: 2,
          name: "壮象",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/i05x90mb9kdf1gizcv7u.jpg",
        },
        {
          id: 3,
          name: "伟业",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/i05x90mb9kdf1gizcv7u.jpg",
        },
        {
          id: 4,
          name: "鹏鸿",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/7g6augliyepi45wzc6j9.jpg",
        },

        {
          id: 5,
          name: "韩氏",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xgq7q5obobjj6pl9po52.jpg",
        },
        {
          id: 6,
          name: "好太太",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xgq7q5obobjj6pl9po52.jpg",
        },
        {
          id: 7,
          name: "圣鹿国际",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xgq7q5obobjj6pl9po52.jpg",
        },
        {
          id: 8,
          name: "福湘",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xgq7q5obobjj6pl9po52.jpg",
        },
        {
          id: 9,
          name: "万象",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xgq7q5obobjj6pl9po52.jpg",
        },
        {
          id: 10,
          name: "平安树",
          picUrl:
            "https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xgq7q5obobjj6pl9po52.jpg",
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
    top: -52upx;
    justify-content: space-around;
    .second-chose {
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

    .second-title {
      text-align: center;
      font-size: 24upx;
      font-weight: 700;
      padding-top: 29upx;
    }
    .second-detail-title {
      font-size: 24upx;
      font-weight: 350;
      display: flex;
      .no {
        padding-left: 55upx;
      }
      .brand {
        padding-left: 69upx;
      }
      .name {
        padding-left: 155upx;
      }
      .grade {
        padding-left: 128upx;
      }
    }
    .second-detail {
      font-size: 24upx;
      font-weight: 350;
      display: flex;
      flex-flow: wrap;
      height: 77upx;
      line-height: 77upx;
      padding: 10upx 0;
      .no-detail {
        margin-left: 55upx;
        text-align: center;
        width: 48upx;
      }
      .brand-detail {
        margin-left: 32upx;
        margin-right: 84upx;
        width: 130upx;
        height: 72upx;
      }
      .name-detail {
        width: 96upx;
        text-align: center;
        margin-right: 80upx;
      }
      .grade-detail {
      }
      .border {
        border: 0.5px solid #d8d8d8;
        width: 90%;
        margin: 0 auto;
      }
    }
  }
}
</style>