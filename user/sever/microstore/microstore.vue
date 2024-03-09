<template>
  <view class="microstore-container">
    <view class="op-container">
      <!-- 搜索区域 -->
      <view class="search-container">
        <tui-icon
          @click="handleBack"
          margin="6upx 0 0 0"
          name="arrowleft"
        ></tui-icon>
        <view class="input-wrapper">
					<view class="search-icon">
						<tui-icon
							name="search" :size="32" unit="rpx"
							color="#b3b2ad"
							margin="0"
						></tui-icon>
					</view>
          <input v-model="searchValue" type="text" placeholder="搜索" />
        </view>
        <view
          @click="handleSearch"
          class="uni-btn search-btn"
          :style="{ background: searchValue ? '#ffc117' : '#ccc' }"
          >搜索</view
        >
      </view>

      <!-- 头部 menu -->

      <view class="header-nav-container" :class="{ fixed: scrollTop > 200 }">
        <view
          class="item"
          @click="handleSwichTab(index)"
          v-for="(item, index) in menus"
          :key="index"
          :class="{ active: currentMenu === index }"
          >{{ item }}</view
        >
      </view>
    </view>
    <view class="main">
      <!-- 列表 -->
      <ShopGoodsList
        @opGoods="handleOpDoods"
        v-show="currentMenu === 0"
        :data="myShopGoodsList"
      ></ShopGoodsList>

      <ShopGoodsList
        @opGoods="handleOpDoods"
        :type="1"
        v-show="currentMenu === 1"
        :data="platformGoodsList"
      ></ShopGoodsList>

      <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
    </view>
  </view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import {
  downGoodsApi,
  enterSHopApi,
  getMyshopGoodsListApi,
  upGoodsApi,
} from '../../../api/user'
import { getConfigApi } from '../../../api/auth'
import { getUserId } from '../../../utils'
import { USER_INFO } from '../../../constant'
import ShopGoodsList from './cpns/ShopGoodsList'
import { getGoodsByIdApi } from '../../../api/home'
// #ifdef H5
import share from '../../../utils/wxshare'
// #endif

export default {
  components: {
    ShopGoodsList,
  },
  data() {
    return {
      menus: Object.freeze(['上架商品', '平台商品']),
      currentMenu: 0,
      searchValue: '',
      scrollTop: 0,
      brandInfo: {},
      queryInfo: {
        page: 1,
        size: 20,
        keywords: '',
      },

      platformQuery: {
        page: 1,
        size: 20,
        keywords: '',
      },

      myShopGoodsList: {},
      myShopGoodsTotalPages: 0,
      platformGoodsList: {},
      platformGoodsTotalPage: 0,
      status: 'none',
    }
  },

  onLoad() {
    this.enterShop()
  },

  methods: {
    // 切换 nav
    handleSwichTab(index) {
      this.currentMenu = index
      if (index === 1) {
        this.queryInfo.keywords = ''
        this.queryInfo.page = 1
        this.getPlatformGoods()
      } else {
        this.platformQuery.keywords = ''
        this.platformQuery.page = 1
        this.getGoodsList(this.brandInfo.id)
      }
    },

    // 返回
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },

    // 进入微店
    async enterShop() {
      const userInfo = uni.getStorageSync(USER_INFO)
      const { data } = await enterSHopApi({ userId: getUserId() + '' })
      this.brandInfo = data
      this.setWexinShare({
        title: '我的微店',
        imgUrl: userInfo.avatarUrl,
        desc: '快来我的微店逛逛吧',
        link:
          `${A_TF_MAIN}/#/user/sever/microstore/m-microstore?shopId=` +
          this.brandInfo.id,
      })
      this.getGoodsList(data.id)
    },

    // 获取门店商品
    async getGoodsList(id, isLoadMore) {
      this.status = 'loading'
      const res = await getMyshopGoodsListApi({
        shopId: id,
        ...this.queryInfo,
      })

      if (isLoadMore) {
        this.myShopGoodsList.goodsList.push(...res.data.goodsList)
      } else {
        this.myShopGoodsList = res.data
      }

      this.myShopGoodsTotalPages = res.data.totalPages
      this.status = 'none'
    },

    // 获取平台商品
    async getPlatformGoods(isLoadMore) {
      this.status = 'loading'
      const { data } = await getGoodsByIdApi(this.platformQuery)
      if (isLoadMore) {
        this.platformGoodsList.goodsList.push(...data.goodsList)
      } else {
        this.platformGoodsList = data
      }
      this.platformGoodsTotalPage = data.totalPages
      this.status = 'none'
    },

    // 操作商品
    async handleOpDoods(info) {
      const { goodsInfo } = info
      switch (info.type) {
        case 'on':
          try {
            await upGoodsApi({
              userId: getUserId(),
              shopId: this.brandInfo.id,
              productId: goodsInfo.id,
            })

            uni.showToast({
              title: '上架成功',
              duration: 2000,
            })
          } catch (error) {
            uni.showToast({
              title: '上架失败',
              duration: 2000,
              icon: 'none',
            })
          }
          break

        case 'off':
          try {
            await downGoodsApi({
              userId: getUserId(),
              shopId: this.brandInfo.id,
              productId: goodsInfo.id,
            })

            uni.showToast({
              title: '下架成功',
              duration: 2000,
            })

            this.getGoodsList(this.brandInfo.id)
          } catch (error) {
            uni.showToast({
              title: '下架失败',
              icon: 'none',
            })
          }
          break

        case 'share':
          this.setWexinShare(
            {
              title: goodsInfo.name,
              imgUrl: goodsInfo.picUrl,
              desc: '快来我的微店看看吧！',
              link: `${A_TF_MAIN}/#/pages/prod/prod?goodsId=${goodsInfo.id}`,
            },
            () => {
              uni.showToast({
                title: '请点击右上角三点分享',
                duration: 2000,
                icon: 'none',
              })
            }
          )
          break
      }
    },

    // 搜索商品
    handleSearch() {
      if (!this.searchValue.trim()) {
        uni.showToast({
          title: '请输入搜索内容',
          duration: 2000,
          icon: 'none',
        })

        return
      }

      if (this.currentMenu === 0) {
        this.queryInfo.keywords = this.searchValue
        this.queryInfo.page = 1
        this.myShopGoodsList = {}
        this.getGoodsList(this.brandInfo.id)
      } else {
        this.platformQuery.page = 1
        this.platformQuery.keywords = this.searchValue
        this.platformGoodsList = {}
        this.getPlatformGoods()
      }
    },

    // 配置微信分享配置
    async setWexinShare(shareData, cb) {
      const currentUrl = window.location.href.replace('#', 'ericToken')
      const { data } = await getConfigApi({
        url: currentUrl
      })

      share.wxRegister(data, shareData)
      cb && typeof cb === 'function' && cb()
    },
  },

  computed: {
    scrollBarLeft() {
      return 20 + this.currentMenu * 236
    },
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },

  onReachBottom() {
    if (this.currentMenu === 0) {
      if (this.queryInfo.size > this.myShopGoodsList.goodsList.length) {
        this.status = 'none'
        return
      }

      if (this.queryInfo.page >= this.myShopGoodsTotalPages) {
        this.status = 'no-more'
        return
      }
      this.queryInfo.page++
      this.getGoodsList(this.brandInfo.id, true)
    } else {
      if (this.platformQuery.size > this.platformGoodsList.goodsList.length) {
        this.status = 'none'
        return
      }

      if (this.platformQuery.page >= this.platformGoodsTotalPage) {
        this.status = 'no-more'
        return
      }
      this.platformQuery.page++
      this.getPlatformGoods(true)
    }
  },

  watch: {
    searchValue(value) {
      if (!value) {
        this.queryInfo.keywords = ''
        this.platformQuery.keywords = ''
        if (this.currentMenu === 0) {
          this.queryInfo.page = 1
          this.getGoodsList(this.brandInfo.id)
        } else {
          this.platformQuery.page = 1
          this.getPlatformGoods()
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
@main-color: #ffc117;
.microstore-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;

  .op-container {
    padding: 24upx 20upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 48upx 48upx;
  }

  .header-nav-container {
    position: relative;
    width: 100%;
    height: 98upx;
    background-color: #fff;
    padding: 24upx 0 0 0;
    box-sizing: border-box;
    font-size: 0;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .item {
      position: relative;
      display: inline-block;
      width: 50%;
      font-size: 32upx;
      height: 100%;
      text-align: center;
      line-height: 70upx;
      border-radius: 24upx;
      color: #8f8d85;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 8upx;
        border-radius: 10upx;
        background-color: @main-color;
        transition: all 350ms ease-in;
      }

      &.active {
        &::after {
          width: 40upx;
        }
      }
    }
  }

  // 搜索区
  .search-container {
    background-color: #fff;
    display: flex;
    .input-wrapper {
      flex: 1;
      display: flex;
      padding: 16upx 24upx;
      box-sizing: border-box;
      align-items: center;
      background: #fbfbfb;
      border-radius: 100px;
      border: 1px solid #f1f1f0;

      .search-icon {
        width: 32upx;
        height: 32upx;
        line-height: 32upx;
        padding-right: 16upx;
        margin-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        flex: 1;
        font-size: 28upx;
      }
    }

    .search-btn {
      flex-shrink: 0;
      margin-left: 24upx;
      width: 148upx;
      height: 72upx;
      border-radius: 100px;
      background-color: @main-color;
      font-size: 26upx;
      text-align: center;
      line-height: 72upx;
      color: #fff;
      transition: all 200ms ease-in-out;
    }
  }

  .main {
    padding: 20upx;
    box-sizing: border-box;
  }
}
</style>
