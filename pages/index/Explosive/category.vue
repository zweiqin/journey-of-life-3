<template>
  <view class="stuffGoods">
    <view class="head">
      <view class="search-bar">
        <view class="location">
          <img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png" alt="" class="return" @click="handleBack" />
          <text>爆品家具</text>
        </view>
        <view class="search-box">
          <view class="search">
            <img src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/2qpjht84e85rhmt6y1ce.png" alt="" class="img" />
          </view>
          <input type="text" class="content" placeholder="输入你想搜索的品类/单品/品牌" />
        </view>
      </view>
    </view>
    <view class="body" :style="{ height: scrollHeight + 'px' }">
      <view class="navbar" ref="nav-barRef">
        <view :class="{ active: item.classifyId == currentTab }"  
        v-for="item in navbar" 
        :key="item.classifyId" 
         @click="switchTab(item)"
        class="item">{{ item.classifyName }}</view>
      </view>

      <view class="main">
        <view class="mid">
          <sort :parentId="currentTab" v-for="item1 in renderListData" :key="item1.classifyId" :name="item1.classifyName" :id="item1.classifyId" :picUrl="item1.classifyImage"> </sort>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFirstClassifyApi } from '@/api/anotherTFInterface'
import  { hiddenSort } from "./hiddenSort"
import sort from './cpns/sort.vue';
// 1147
export default {
    name: 'blank',
    components: {
        sort
    },
    data() {
        return {
            scrollHeight: 667,
            navbar: [],
            sub: [],
            currentTab: '1148',
            picUrl: ''
        }
    },
	computed: {
		renderListData: {
			get() {
				let arr = []
				this.sub.forEach(item => {
					if(!hiddenSort.includes(`${item.classifyId}`)) {
						arr.push(item)
					}
				})
				return arr
			},
			set(value) {
				console.error(value + 'renderListData is Not change')
			}
		}
	},
    onLoad() {
        getFirstClassifyApi({
			classifyId: '1160'
		}).then(res => {
			console.log(res);
			this.navbar = res.data
            this.currentTab = this.navbar[0].classifyId
            this.getChildCategory()
			// this.sortData.unshift({classifyName: '全部',classifyId: '1124'})
		}).catch(err => console.log(err))
    },
    methods: {
        handleBack() {
            uni.navigateBack();
        },
        getChildCategory() {
            getFirstClassifyApi({
			    classifyId: this.currentTab
            }).then(res => {
                // console.log(res);
                this.sub = res.data
                // this.sortData.unshift({classifyName: '全部',classifyId: '1124'})
            }).catch(err => console.log(err))
        },
        switchTab(item) {
            this.currentTab = item.classifyId
            this.getChildCategory()
        }
    }
}
</script>

<style lang="less" scoped>
uni-page-body {
  overflow: hidden;
  height: auto;
}

.stuffGoods {
  .head {
    width: 100%;
    height: 120upx;
    line-height: 120upx;
    background: #ffffff;
    padding-left: 16upx;
    padding-right: 26upx;
    box-sizing: border-box;

    // position: fixed;
    .search-bar {
      width: 100%;
      // left: 3%;
      // top: 80upx;
      display: flex;
      align-items: center;

      .location {
        display: flex;
        align-items: center;
        // margin: 0 20upx;
        margin-right: 5px;

        .return {
          width: 48upx;
          height: 48upx;
        }

        .text {
          font-size: 32upx;
          font-weight: bold;
          color: #3d3d3d;
        }

        .show {
          width: 32upx;
          height: 32upx;
        }
      }

      .search-box {
        padding: 0upx 16upx;
        display: flex;
        flex: 1;
        align-items: center;
        width: 540upx;
        height: 74upx;
        border-radius: 100upx;
        background: #f1f2f6;

        .search {
          width: 48upx;
          height: 74upx;
          line-height: 74upx;
          display: flex;
          justify-content: center;
          align-items: center;

          .img {
            width: 30upx;
            height: 30upx;
          }
        }

        .content {
          padding-left: 14upx;
          flex: 1;
          font-size: 24upx;
          font-weight: 400;
          color: #3d3d3d;
          border-left: 2upx solid #d8d8d8;
        }
      }

      .example-body {
        background: #f1f2f6;
        border-radius: 100upx;
      }
    }
  }

  .body {
    display: flex;
    overflow: scroll;
    overflow: scroll;

    .navbar {
      // margin-top: 28upx;
      width: 22%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        width: 130upx;
        height: 52upx;
        border-radius: 10upx;
        font-size: 28upx;
        font-weight: 500;
        color: #3d3d3d;
        text-align: center;
        line-height: 52upx;
        margin-bottom: 62upx;
        transition: all 100ms;

        &.active {
          background: linear-gradient(270deg, #e95d20 0%, #faae63 99%);
          color: #ffffff;
        }
      }
    }

    .main {
      width: 80%;
      border-radius: 20upx 0upx 0upx 0upx;
      // background: #f1f2f6;
      overflow: scroll;
      border-top: 16upx solid #f1f2f6;
      border-left: 12upx solid #f1f2f6;

      &::-webkit-scrollbar {
        display: none;
      }

      // position: fixed;
      // right: 0upx;
      // top: 172upx;
      .mid {
        padding-left: 20upx;
        // margin: 18upx 0upx 0upx 12upx;
        border-radius: 10upx 0upx 0upx 0upx;
        background: #ffffff;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>