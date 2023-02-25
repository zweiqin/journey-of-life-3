<template>
  <view class="brand-materials">
    <Search
      :scrollTop="scrollTop"
      @change="handleSwitchTab"
      :current="currentMenu"
    ></Search>

    <view class="product-list">
      <view class="product-item" v-for="item in brandList" :key="item.id">
        <Carousel :list="[item.goods.url]" :height="173"></Carousel>
        <view class="product-info">
          <view class="product-name">
            {{ item.goods.name }}
          </view>

          <view class="brand-info">
            <image class="brand-avatar" :src="item.picUrl" mode="" />
            <view class="wrapper">
              <view class="brand-name">{{ item.name }}</view>
              <view class="foot-info">
                <view class="tags">
                  <view class="tag">
                    <view class="img-wrapper">
                      <image
                        class="icon"
                        src="../../static/images/new-brand/index/shiming.png"
                        mode=""
                      />
                    </view>
                    <text>实名认证</text>
                  </view>

                  <view class="tag">
                    <view class="img-wrapper">
                      <image
                        class="icon"
                        src="../../static/images/new-brand/index/shiming.png"
                        mode=""
                      />
                    </view>
                    <text>品质保证</text>
                  </view>
                </view>

                <view class="rate-info">
                  <view class="collection-wrapper">
                    <image
                      class="icon"
                      src="../../static/images/new-brand/index/collection.png"
                      mode=""
                    />
                    <text>{{ getRandom(1000, 10000) }}</text>
                  </view>

                  <view class="collection-wrapper">
                    <image
                      class="icon"
                      src="../../static/images/new-brand/index/zan.png"
                      mode=""
                    />
                    <text>{{ getRandom(1000, 10000) }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Search from '../cpns/Search'
import Carousel from '../../components/carousel/index.vue'
import { getBrandListApi } from '../../api/brand'
import { getRandom } from '../../utils'
import { data } from '../brand-materials/templateDate'

export default {
  components: {
    Search,
    Carousel,
  },

  data() {
    return {
      currentMenu: 0,
      scrollTop: 0,
      brandList: [],
    }
  },

  methods: {
    handleSwitchTab(id) {
      this.currentMenu = id
    },

    getRandom,

    async getBrandList() {
      const res = await getBrandListApi({
        brandgenreId: '',
        page: this.page,
        size: 100,
      })
      // 佛山市奥丽思家具五金配件有限公司;
      // 大创家具材料店;
      // 成鑫木业有限公司;
      // 里翎皮革;
      this.brandList = res.data.brandList
      this.brandList = this.brandList.filter(
        item =>
          item.name == '佛山市奥丽思家具五金配件有限公司' ||
          item.name == '大创家具材料店' ||
          item.name == '成鑫木业有限公司' ||
          item.name == '里翎皮革' ||
          item.name == '佛山市南海金玮金属制品厂' ||
          item.name == '思应布艺'
      )

      this.brandList = this.brandList.map((item, index) => {
        item.goods = data[index]
        return item
      })
    },
  },

  onLoad() {
    this.getBrandList()
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
</script>

<style lang="less" scoped>
.brand-materials {
  width: 100vw;
  min-height: 100vh;
  background-color: #f1f1f0;

  /deep/ .banner {
    border-radius: 24upx 24upx 0 0 !important;
    margin-top: 0 !important;
  }

  /deep/ .uni-swiper-dot {
    width: 16upx !important;
    height: 16upx !important;
    border-radius: 50% !important;
    box-sizing: border-box !important;
    background-color: #f1f1f0 !important;
    border: 1upx solid #fff !important;
  }

  /deep/ .uni-swiper-dot-active {
    width: 48upx !important;
    border-radius: 100px !important;
    background-color: #ffc117 !important;
  }

  .product-list {
    padding: 20upx;
    box-sizing: border-box;

    .product-item {
      border-radius: 12upx;
      overflow: hidden;
      margin-bottom: 20upx;

      .product-info {
        padding: 24upx;
        box-sizing: border-box;
        background-color: #fff;

        .product-name {
          width: 662upx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 46upx;
        }

        .brand-info {
          display: flex;
          margin-top: 16upx;

          .brand-avatar {
            width: 80upx;
            height: 80upx;
            border-radius: 50%;
            margin-right: 12upx;
            flex-shrink: 0;
          }

          .wrapper {
            flex: 1;

            .brand-name {
              color: #605d52;
              line-height: 34upx;
              font-size: 24upx;
            }

            .tags {
              display: flex;
              align-items: center;

              .tag {
                display: flex;
                align-items: center;
                // overflow: hidden;
                box-sizing: border-box;

                .img-wrapper {
                  text-align: center;
                  line-height: 40upx;
                  width: 40upx;
                  height: 40upx;
                  border-radius: 8upx 0 0 8upx;
                }
                .icon {
                  width: 24upx;
                  height: 24upx;
                }

                text {
                  height: 40upx;
                  line-height: 38upx;
                  font-size: 22upx;
                  box-sizing: border-box;
                  padding: 0 6upx;
                  border-radius: 0 8upx 8upx 0;
                }

                &:nth-child(1) {
                  margin-right: 10upx;
                  .img-wrapper {
                    background-color: #ffc117;
                  }

                  text {
                    border: 2upx solid #ffc117;
                    color: #ffc117;
                  }
                }

                &:nth-child(2) {
                  .img-wrapper {
                    background-color: #81e19e;
                  }

                  text {
                    border: 2upx solid #81e19e;
                    color: #81e19e;
                  }
                }
              }
            }

            .rate-info {
              display: flex;
              align-items: center;

              .icon {
                width: 32upx;
                height: 32upx;
                flex-shrink: 0;
                margin-right: 4upx;
              }

              text {
                color: #b3b2ad;
                font-size: 24upx;
                line-height: 32upx;
              }

              .collection-wrapper {
                display: flex;

                &:nth-child(1) {
                  margin-right: 16upx;
                  padding-right: 16upx;
                  border-right: 1upx solid #f1f1f0;
                }
              }
            }
          }
        }
      }
    }
  }

  .foot-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8upx;
  }
}
</style>
