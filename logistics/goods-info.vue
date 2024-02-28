<template>
  <view class="fast-input">
    <view class="header">
      <SearchPane
        @search="handleSearch"
        :searchValue="searchValue"
        v-model="showSearchPane"
      ></SearchPane>
			<tui-icon :size="48" unit="rpx" color="#000000" name="arrowleft" margin="0" @click="handleBack"></tui-icon>
			<TuanLocation>
				<text>{{ $store.getters.currentCity || '定位失败' }}</text>
			</TuanLocation>
      <view class="search-wrapper">
        <image
          class="search-icon"
          src="../static/images/index/search.png"
          mode=""
        />
        <input
          ref="inputRef"
          @focus="handleSeachInputFocus"
          @blur="handleSearchBlur"
          v-model="searchValue"
          confirm-type="search"
          placeholder="请输入您想要的产品"
          class="text"
          :adjust-position="false"
        />
        <image class="camera" src="../static/images/index/camera.png" mode="" />
      </view>
    </view>

    <view class="main">
      <view class="left">
        <scroll-view scroll-y="true" :style="{ height: scrollHeight + 'px' }">
          <view class="left-container">
            <view
              class="item"
              @click="handleSwitchMainType(item)"
              :class="{ active: item.name === currentMainType }"
              v-for="(item, index) in mainTypeMenus"
              :key="index"
            >
              {{ item.name }}
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="right">
        <scroll-view
          scroll-y="true"
          :style="{ height: scrollHeight + 'px' }"
          :scroll-into-view="currentChildId"
          scroll-with-anitem.nameimation
        >
          <view class="right-container">
            <view class="main-area" v-if="currentMainType !== '已选'">
              <view
                class="item"
                :class="{ 'current-item': currentChildId === 'item' + index }"
                v-for="(item, index) in categoryList"
                :key="index"
                :id="'item' + index"
              >
                <view class="detail-info" @click="handleChoose(item, true)">
                  <image
                    :src="
                      item.imageUrl ||
                      'https://img0.baidu.com/it/u=3623336039,4242912317&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300'
                    "
                    class="category-img"
                    mode=""
                  />
                  <text class="name">{{ item.name }}</text>
                  <view class="sps">
                    <text class="number">{{
                      (selectData[`${item.parentName},${item.name}`] &&
                        selectData[`${item.parentName},${item.name}`][
                          "goodAmount"
                        ]) ||
                      1
                    }}</text>
                    <text>套</text>
                    <text class="number">
                      {{
                        (selectData[`${item.parentName},${item.name}`] &&
                          selectData[`${item.parentName},${item.name}`][
                            "packAmount"
                          ]) ||
                        1
                      }}
                    </text>
                    <text>件</text>
                  </view>
                </view>
                <image
                  :src="
                    !selectList.includes(`${item.parentName},${item.name}`)
                      ? require('../static/images/wuliu/default.png')
                      : require('../static/images/wuliu/active.png')
                  "
                  class="select-img"
                  mode=""
                  @click="
                    handleChoose(
                      item,
                      !selectList.includes(`${item.parentName},${item.name}`)
                    )
                  "
                />
              </view>
            </view>
            <view class="main-area selected" v-else>
              <view v-if="Object.values(selectData).length">
                <Selected
                  @delete="handleDelete"
                  v-for="(item, index) in Object.values(selectData)"
                  :key="index"
                  :data="item"
                  @edit="handleEdit"
                  :class="{ 'current-item': currentChildId === 'item' + index }"
                  :id="'item' + index"
                ></Selected>
              </view>

              <view class="no-data" v-else> 暂无选择 </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <ChoosePane @confirm="handleConfirm" ref="choosePaneRef"></ChoosePane>

    <view class="footer">
      <view class="all"
        >已选择:<text style="color: #e95d20; margin: 0 5px">{{
          statisticsData.allGoodAmount
        }}</text
        >套 /
        <text style="color: #e95d20; margin: 0 5px">{{
          statisticsData.allPackAmount
        }}</text
        >件/
        <text style="color: #e95d20; margin: 0 5px">{{
          statisticsData.allVolume
        }}</text
        >方</view
      >
      <button :disabled="isFocus" class="uni-btn" @click="handleSubmit">
        确认
      </button>
    </view>
  </view>
</template>

<script>
import ChoosePane from "./component/choose-pane.vue";
import { JI_ORDER_GOODS_LIST } from "../constant";
import SearchPane from "./component/search-pane.vue";
import Selected from "./component/selected.vue";
import { getCategoryListApi } from "../api/logistics";

export default {
  data() {
    return {
      scrollHeight: 0,
      commoditySelect: [],
      currentMainType: "客厅",
      selectList: [],
      selectData: {},
      statisticsData: {
        allPackAmount: 0,
        allGoodAmount: 0,
        allVolume: 0,
      },
      subType: "",
      isFocus: false,
      searchValue: "",
      headerPosition: null,
      showSearchPane: false,
    };
  },
  components: {
    ChoosePane,
    SearchPane,
    Selected,
  },
  onLoad(params) {
    uni.setNavigationBarTitle({
      title: this.currentMainType,
    });
    if (params.goodType) {
      this.currentMainType = params.goodType.split(",")[0];
      this.subType = params.goodName;
    }
    uni.showLoading({
      mask: true,
    });
    const localData = uni.getStorageSync(JI_ORDER_GOODS_LIST) || [];
    for (const goodsInfo of localData) {
      this.selectData[goodsInfo.goodType] = goodsInfo;
      this.selectList.push(goodsInfo.goodType);
    }
    this.clacStatistics();
    uni.hideLoading();
    // uni.request({
    //   url: "http://192.168.0.27:8781laoa-huozhu/api/hz/order/third/productTypeListNew", //仅为示例，并非真实接口地址。
    //   method: "POST",
    //   success: (res) => {
    //     _this.commoditySelect = res.data.data;
    //   },
    // });
    getCategoryListApi().then(({ data }) => {
      this.commoditySelect = data;
    });
  },

  mounted() {
    this.initPosition();
  },

  methods: {
    // 切换一级类目
    handleSwitchMainType(item) {
      this.currentMainType = item.name;
      this.subType = null;
      uni.setNavigationBarTitle({
        title: this.currentMainType,
      });
    },

    handleSeachInputFocus(e) {
      this.isFocus = true;
      this.showSearchPane = true;
    },

    handleSearchBlur() {
      this.isFocus = false;
      setTimeout(() => {
        this.showSearchPane = false;
      }, 100);
    },
    initPosition() {
      const _this = this;
      const query = uni.createSelectorQuery().in(this);
      let footerPosition = 0;

      uni.getSystemInfo({
        success(res) {
          query
            .select(".header")
            .boundingClientRect((data) => {
              _this.headerPosition = data.height;
            })
            .exec();
          query
            .select(".footer")
            .boundingClientRect((data) => {
              footerPosition = data.height;
            })
            .exec();
          _this.scrollHeight =
            res.safeArea.height - footerPosition - _this.headerPosition;
        },
      });
    },

    handleBack() {
      uni.navigateBack();
    },

    handleDelete(info) {
      const index = this.selectList.indexOf(info.goodType);
      uni.showModal({
        title: "删除",
        content: `确定要删除<${info.name}>吗?`,
        success: ({ confirm }) => {
          if (confirm) {
            this.selectList.splice(index, 1);
            delete this.selectData[info.goodType];
            this.clacStatistics();
            this.$forceUpdate();
          }
        },
      });
    },

    handleEdit(info) {
      this.$refs.choosePaneRef.show(
        {
          ...this.selectData[info.goodType],
        },
        true
      );
    },

    handleChoose(item, isEdit) {
      const str = `${item.parentName},${item.name}`;
      if (isEdit && this.selectData[str]) {
        this.$refs.choosePaneRef.show(
          {
            ...this.selectData[str],
            attributes: item.attributes,
            url: item.url,
          },
          true
        );
        return;
      }

      const index = this.selectList.indexOf(str);
      if (index !== -1) {
        this.selectList.splice(index, 1);
        delete this.selectData[str];
        this.$forceUpdate();
      } else {
        this.selectList.push(str);
        const data = {
          ...item,
          goodType: str,
          goodAmount: 1,
          packAmount: 1,
          volume: 0,
        };
        this.selectData[str] = data;
        this.$refs.choosePaneRef.show({ ...data, url: item.url }, false);
      }

      this.clacStatistics();
    },

    handleConfirm(data) {
      uni.showLoading({
        mask: true,
      });
      this.$set(this.selectData, data.goodType, data);
      this.clacStatistics();
      this.$forceUpdate();
      uni.hideLoading();
    },

    clacStatistics() {
      let allPackAmount = 0; // 总套数
      let allGoodAmount = 0; // 总件数
      let allVolume = 0; // 总体积
      for (const item of Object.values(this.selectData)) {
        allGoodAmount += item.goodAmount * 1;
        allPackAmount += item.packAmount * 1;
        allVolume += item.volume * 1;
      }

      this.statisticsData = { allPackAmount, allGoodAmount, allVolume };
    },

    handleSubmit() {
      if (!this.statisticsData.allVolume) {
        uni.showToast({
          title: "商品总体积不能为0",
          icon: "none",
        });
        return;
      }
      const data = Object.values(JSON.parse(JSON.stringify(this.selectData)));
      uni.setStorageSync(JI_ORDER_GOODS_LIST, data);
      setTimeout(() => {
        uni.navigateBack();
      }, 500);
    },

    // 搜索
    // handleSearch(e) {
    //   uni.showLoading();
    //   const value = e.detail.value || this.searchValue;
    //   if (!value) {
    //     uni.showToast({
    //       title: "请输入搜索的内容",
    //       icon: "none",
    //     });

    //     return;
    //   }
    //   uni.hideKeyboard();

    //   const mainType = Object.keys(this.commoditySelect);
    //   const index = mainType.findIndex((item) => item.includes(value));
    //   if (index !== -1) {
    //     this.currentMainType = mainType[index];
    //   } else {
    //     const subType = Object.values(this.commoditySelect).flat(Infinity);
    //     const subIndex = subType.findIndex((item) =>
    //       item.name.includes(value)
    //     );
    //     uni.hideLoading();
    //     if (subIndex !== -1) {
    //       this.currentMainType = subType[subIndex].parentNode;
    //       this.subType = subType[subIndex].label;
    //     } else {
    //       uni.showToast({
    //         title: "未搜到",
    //         icon: "none",
    //       });
    //     }
    //   }
    // },

    handleSearch(item) {
      // this.searchValue = "";
      uni.hideKeyboard();
      this.currentMainType = item.parentNode;
      this.$nextTick(() => {
        this.subType = item.name;
      });
    },
  },

  computed: {
    categoryList() {
      if (this.currentMainType !== "已选") {
        const itemList = this.commoditySelect.find(
          (item) => item.name === this.currentMainType
        );

        return (itemList && itemList.itemList) || [];
      }
    },

    currentChildId() {
      if (this.categoryList && this.categoryList.length) {
        const index = this.categoryList.findIndex(
          (item) => item.name === this.subType
        );
        return "item" + index;
      } else {
        if (this.currentMainType === "已选" && Object.values(this.selectData)) {
          const index = Object.values(this.selectData).findIndex((item) => {
            return item.goodName === this.subType;
          });

          return index !== -1 ? "item" + index : "";
        } else {
          return "";
        }
      }
    },

    mainTypeMenus() {
      return [
        { name: "已选" },
        ...this.commoditySelect.filter((item) => item.itemList.length),
      ];
    },
  },
};
</script>

<style lang="less" scoped>
.fast-input {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 28upx;

  .header {
    position: relative;
    width: 100%;
    height: 134upx;
    background-color: rgb(255, 255, 255);
    padding: 26upx 26upx;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .uni-btn {
      font-size: 28upx;
      color: #e95d20;
    }

    .back {
      width: 48upx;
      height: 48upx;
      // margin-top: 10upx;
    }

    .local-wrapper {
      position: relative;
      margin-right: 20upx;
      &::after {
        content: "";
        border: 8upx solid #000000;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        position: absolute;
        top: 50%;
        right: -10px;
      }
      /deep/ .locale {
        color: #000;
        font-size: 36upx;
        font-weight: 500;
      }
    }

    .chat {
      width: 33.2upx;
      height: 30upx;
      object-fit: cover;
    }

    .search-wrapper {
      flex: 1;

      background-color: #f1f2f6;
      height: 74upx;
      margin: 0 20upx;
      border-radius: 100px;
      padding: 0 26upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-icon {
        width: 26.6upx;
        height: 26.6upx;
      }

      .text {
        font-size: 24upx;
        color: #999999;
        margin-left: 20upx;
        padding-left: 20upx;
        border-left: 1upx solid #d8d8d8;
        flex: 1;
      }

      .camera {
        width: 33.2upx;
        height: 30upx;
        object-fit: cover;
      }
    }
  }

  .main {
    flex: 1;
    display: flex;

    .left {
      width: 168upx;
      background-color: #fff;

      .left-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 20upx;

        .item {
          position: relative;
          width: 130upx;
          height: 52upx;
          text-align: center;
          line-height: 52upx;
          color: #000;
          margin-bottom: 40upx;
          border-radius: 10upx;
          transition: background-color 350ms;

          &.active {
            background: linear-gradient(90deg, #e95d20 0%, #faae63 100%);
            color: #fff;

            .mark {
              background-color: #e95d20;
              color: #fff;
            }
          }
        }
      }
    }

    .right {
      flex: 1;
      background-color: #f1f2f6;
      border-radius: 10upx 0 0 0;

      .right-container {
        min-height: 100%;
        width: 100%;
        padding: 18upx 0 0 18upx;
        box-sizing: border-box;

        .main-area {
          width: 100%;
          height: 100%;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 26upx 26upx 0 50upx;
          box-sizing: border-box;

          &.selected {
            padding: 20upx;
            box-sizing: border-box;

            .current-item {
              background-color: #ebebeb;
            }

            .selected-container {
              &:last-child {
                border-bottom: none;
              }
            }
          }

          .item {
            display: flex;
            width: 224upx;
            margin-bottom: 24upx;
            transition: transform 350ms;
            &.current-item {
              animation: ani 1s;
            }

            @keyframes ani {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.2);
              }
              100% {
                transform: scale(1);
              }
            }

            .name {
              margin: 10upx 0;
              text-align: center;
            }

            .sps {
              font-size: 24upx;

              .number {
                color: #e95d20;
                margin: 0 6upx;
              }
            }

            &:nth-child(2n-1) {
              position: relative;

              &::after {
                position: absolute;
                content: "";
                display: block;

                width: 1upx;
                height: 100upx;
                top: 40upx;
                right: 0;
                background-color: #d8d8d8;
              }
            }

            .detail-info {
              display: flex;
              flex-direction: column;
              align-items: center;

              .category-img {
                width: 160upx;
                height: 160upx;
                border-radius: 10upx;
                object-fit: cover;
              }
            }

            .select-img {
              width: 34upx;
              height: 34upx;
              object-fit: cover;
              margin-left: 20upx;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 180upx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .all {
      margin-bottom: 20upx;
    }

    .uni-btn {
      height: 80upx;
      width: 628upx;
      color: #fff;
      text-align: center;
      line-height: 80upx;
      border-radius: 100px;
      background: linear-gradient(90deg, #e95d20 0%, #ff8f1f 100%);
    }
  }
}

.no-data {
  height: 400upx;
  width: 100%;
  text-align: center;
  line-height: 400upx;
  color: #999999;
}
</style>