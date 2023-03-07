<template>
  <view class="brand-detail-container" v-if="brandDetail">
    <BrandHeader
      @search="handleSearch"
      :scrollTop="scrollTop"
      :brand="brandDetail"
    ></BrandHeader>

    <view class="iamge-wrapper" v-if="brandDetail">
      <image
        class="advan-img"
        :src="
          brandDetail.logoUrl || '/static/bda77ab102ee8a0283c84462386a674.png'
        "
        mode="widthfix"
      />
    </view>

    <view class="main">
      <view class="menus">
        <view class="goods-menu">
          <view
            class="item"
            :class="{ active: currentMenu === 1 }"
            @click="handleSwitchTab(1)"
            >简介</view
          >
          <view
            class="item"
            :class="{ active: currentMenu === 0 }"
            @click="handleSwitchTab(0)"
            >全部商品</view
          >
        </view>

        <view
          class="filter-btn"
          v-show="currentMenu === 0"
          @click="handleFilter"
        >
          <text>筛选</text>
          <image
            class="filter-icon"
            src="../../static/images/new-brand/detail/filter.png"
            mode=""
          />
        </view>

        <view
          class="filter-btn"
          v-show="currentMenu === 1"
          @click="handleShare"
        >
          <text>分享海报</text>
          <image
            class="filter-icon"
            src="../../static/images/new-brand/detail/share.png"
            mode=""
          />
        </view>
      </view>

      <view v-show="currentMenu === 0">
        <view class="goods-list">
          <BrandGoods
            v-for="goods in goodsList"
            :data="goods"
            :key="goods.id"
          ></BrandGoods>
          <LoadingMore
            v-show="status !== 'none'"
            :status="status"
          ></LoadingMore>
        </view>

        <view class="no-data" v-if="!goodsList.length && status === 'none'">
          <tui-icon color="#ffc117" :size="40" name="bag-fill"></tui-icon>
          <text>暂无商品</text>
        </view>
      </view>

      <view class="desc" v-show="currentMenu === 1">
        <image
          class="left"
          src="../../static/images/new-brand/detail/left.png"
          mode=""
        />
        <text>{{ brandDetail.desc }}</text>
        <image
          class="right"
          src="../../static/images/new-brand/detail/right.png"
          mode=""
        />
      </view>
    </view>

    <BrandOpBar @navigate="handleNavigate" @call="handleContact"></BrandOpBar>
    <FilterPane
      @change="handleConfirm"
      :catalogList="catalogList"
      v-model="filterVisible"
    ></FilterPane>

    <!-- 分享海报 -->
    <PosterPopup
      :logo="brandDetail.picUrl"
      :desc="brandDetail.desc"
      ref="posterPopupRef"
    ></PosterPopup>

    <!-- 生成二维码 -->
    <uqrcode
      class="generate-code-container"
      @complete="handleCompleteCode"
      ref="uqrcode"
      canvas-id="qrcode"
      :value="qrcodeUrl + brandDetail.id"
    ></uqrcode>
  </view>
</template>

<script>
import { getBrandDetailApi, getCatalogIdByBrandApi } from '../../api/brand'
import { goodsListApi } from '../../api/goods'
import BrandHeader from './cpns/BrandHeader.vue'
import BrandGoods from './cpns/BrandGoods.vue'
import BrandOpBar from './cpns/BrandOpBar.vue'
import FilterPane from './cpns/FilterPane.vue'
import PosterPopup from './cpns/PosterPopup.vue'
import { getLngLatByAddress, navigationAddress } from '../../utils/localtion'

export default {
  components: {
    BrandHeader,
    BrandGoods,
    BrandOpBar,
    FilterPane,
    PosterPopup,
  },

  data() {
    return {
      currentMenu: 1,
      brandDetail: null,
      timer: null,
      brandId: null,
      query: {
        page: 1,
        size: 20,
        keyword: '',
      },
      totalPages: 0,
      status: 'none',
      goodsList: [],
      scrollTop: 0,
      filterVisible: false,
      catalogList: [],
      posterPopupVisible: false,
      qrcodeUrl:
        'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/stuff/brand-detail/brand-detail?brandId=',
      shareCode: '',
    }
  },

  onLoad(params) {
    this.getBrandDetail(params.brandId)
    this.brandId = params.brandId
    this.getGoodsList()
    this.getCategoryList()
  },

  methods: {
    // 切换tab
    handleSwitchTab(tag) {
      this.currentMenu = tag
    },

    // 获取门店详情
    async getBrandDetail(id) {
      try {
        const { data } = await getBrandDetailApi({ id })
        this.brandDetail = data.brand
      } catch (error) {
        console.log(error)
        uni.showToast({
          title: '该店铺不存在',
          duration: 2000,
          icon: 'none',
        })

        this.timer = setTimeout(() => {
          uni.switchTab({ url: '/pages/stuff/stuff' })
        }, 1000)
      }
    },

    // 获取门店商品
    async getGoodsList(isLoadMore) {
      this.status = 'loading'
      const { data } = await goodsListApi({
        ...this.query,
        brandId: this.brandId,
      })

      this.status = 'none'

      this.totalPages = data.totalPages
      if (isLoadMore) {
        this.goodsList.push(...data.goodsList)
      } else {
        this.goodsList = data.goodsList
      }
    },

    // 联系商家
    handleContact() {
      if (this.brandDetail.phone.includes('*')) {
        uni.showToast({
          title: '商家没有留下联系方式',
          duration: 2000,
          icon: 'none',
        })
        return
      }
      uni.makePhoneCall({
        phoneNumber: this.brandDetail.phone,
      })
    },

    // 开始导航
    handleNavigate() {
      if (!this.brandDetail.address) {
        uni.showToast({
          title: '商家地址有误，导航失败',
          icon: 'none',
        })
        return
      }
      getLngLatByAddress(this.brandDetail.address)
        .then(res => {
          navigationAddress(res.geocodes[0].location)
        })
        .catch(err => {
          console.log(err)
          uni.showToast({
            title: '导航失败',
            icon: 'none',
          })
        })
    },

    handleSearch(searchKey) {
      this.query.keyword = searchKey
      this.currentMenu = 0
      this.getGoodsList()
    },

    // 点击筛选
    handleFilter() {
      this.filterVisible = true
    },

    // 获取门店分类
    async getCategoryList() {
      const { data } = await getCatalogIdByBrandApi({
        brandId: this.brandId,
      })

      this.catalogList = data.catalogList
    },

    // 开始筛选
    handleConfirm(query) {
      this.query = { ...this.query, ...query }
      this.getGoodsList()
    },

    // 点击分享海报
    handleShare() {
      uni.showLoading({
        title: '海报生成中...',
      })
      const _this = this
      this.$refs.uqrcode.make({
        success: () => {
          uni.hideLoading()
          _this.$refs.posterPopupRef.show({
            shareCode: this.shareCode,
            logo: this.brandDetail.picUrl,
            desc: this.brandDetail.desc,
          })
        },
      })
    },

    // 完成
    handleCompleteCode(e) {
      const _this = this
      if (e.success) {
        this.$refs.uqrcode.toTempFilePath({
          success: res => {
            if (!_this.shareCode) {
              _this.shareCode = res.tempFilePath
            }
          },
        })
      }
    },
  },

  onReachBottom() {
    if (this.query.size > this.goodsList.length) {
      this.status = 'none'
      return
    }

    if (this.query.page >= this.totalPages) {
      this.status = 'no-more'
      return
    }

    this.query.page++
    this.getGoodsList(true)
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
</script>

<style lang="less" scoped>
.brand-detail-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f0;
  padding-bottom: 140upx;

  .main {
    padding: 0 20upx;
    box-sizing: border-box;

    .menus {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20upx;
      margin-bottom: 38upx;

      .goods-menu {
        display: flex;
        align-items: center;
        font-size: 28upx;
        color: #8f8d85;

        .item {
          position: relative;
          margin-right: 48upx;

          &::after {
            content: '';
            display: block;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            bottom: -12upx;
            width: 0;
            height: 8upx;
            border-radius: 100px;
            background-color: #ffc117;
            transition: all 350ms;
          }

          &.active {
            color: #141000;
            font-size: 34upx;
            font-weight: bold;

            &::after {
              width: 40upx;
            }
          }
        }
      }
    }

    .goods-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  .no-data {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500upx;
    flex-direction: column;
    color: #ccc;
    font-size: 28upx;
  }

  .desc {
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 24upx;
    padding: 0 152upx;

    image {
      position: absolute;
      width: 120upx;
      height: 120upx;
      flex-shrink: 0;

      &.left {
        top: 32upx;
        left: 32upx;
      }

      &.right {
        bottom: 32upx;
        right: 32upx;
      }
    }

    text {
      margin: 88upx 0;
      color: #141000;
      font-size: 28upx;
    }
  }

  .filter-btn {
    display: flex;
    align-items: center;

    font-size: 26upx;
    color: #605d52;
    .filter-icon {
      width: 32upx;
      height: 32upx;
      margin-left: 6upx;
    }
  }
}

.iamge-wrapper {
  padding: 0 20upx;
  margin-top: 40upx;
  box-sizing: border-box;
}

.advan-img {
  width: 100%;
  height: 862upx;
  border-radius: 24upx;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
}

.generate-code-container {
  position: absolute;
  top: -10000upx;
}
</style>
