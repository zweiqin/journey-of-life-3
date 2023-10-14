<template>
  <view class="container">
    <view class="PageGHeader">
      <image @click="goBack" class="backBtn" src="@/static/images/entryOfMerchants/back.png"></image>
      <text class="PageText">选择服务</text>
    </view>

    <view class="serve-list-container">
      <view class="category-one">
        <scroll-view class="scroll-view-container" scroll-y>
          <view class="category-scroll-container">
            <view
              class="category-item"
              :class="{ active: currentLevelOneId === category.id }"
              :style="{
                'border-radius': currentLevelOneId === category.id && index === 0 ? '0 20upx 0 0' : ''
              }"
              @click="changeCategory(category)"
              v-for="(category, index) in servesList"
              :key="category.id"
            >
              <view class="name">{{ category.serverNameOne }}</view>
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="serve-wrapper">
        <view class="counter">共{{ totalServiceCount }}项服务</view>

        <SelectServePane :currentSelectServe="currentSelectServe" @choose="handleChooseServe" v-for="item in childrenServeData" :key="item.id" :serveData="item"></SelectServePane>
      </view>
    </view>

    <view class="choose-footer-container">
      <button @click="handleConfirm" :style="{ opacity: currentSelectServe.length ? '1' : '0.6' }" class="uni-btn">
        {{ currentSelectServe.length ? `已选${currentSelectServe.length}项服务` : '请选择服务' }}
      </button>

      <view class="select-all-wrapper" @click="handleChooseServe({ type: 'select-all' })">
        <tui-icon margin="0 0 5upx 0" :size="20" :color="currentSelectServe.length === allSkillsList.length ? '#E02208' : '#222229'" name="circle-selected"></tui-icon>
        <view class="text">{{ currentSelectServe.length === allSkillsList.length ? '取消全选' : '全选' }}</view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getSFSkillsListApi } from '../../../../api/community-center';
import SelectServePane from '../componrnts/SelectServePane.vue';
export default {
  name: 'Service',
  components: {
    SelectServePane
  },
  mounted() {
    this.getSFSkillsList();
  },

  props: {
    personalInformation: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      servesList: [],
      currentLevelOneId: null,
      childrenServeData: [],
      currentSelectServe: [],
      allSkillsList: []
    };
  },

  methods: {
    goBack() {
      this.personalInformation.current = 0;
    },

    async getSFSkillsList() {
      try {
        const res = await getSFSkillsListApi();
        this.servesList = res;
        this.currentLevelOneId = this.servesList[0].id;
        this.childrenServeData = this.servesList[0].children;
        this.getAllSkillsList();
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '服务列表获取失败'
        });
      }
    },

    // 切换标签
    changeCategory(categoryInfo) {
      this.currentLevelOneId = categoryInfo.id;
      this.childrenServeData = categoryInfo.children;
    },

    // 选择服务
    handleChooseServe({ data, type }) {
      switch (type) {
        case 'item':
          if (this.currentSelectServe.includes(data)) {
            this.currentSelectServe = this.currentSelectServe.filter((serveName) => serveName !== data);
          } else {
            this.currentSelectServe = [...new Set([...this.currentSelectServe, data])];
          }
          break;

        case 'add':
          this.currentSelectServe = [...new Set([...this.currentSelectServe, ...data])];
          break;

        case 'remove':
          this.currentSelectServe = [...new Set(...this.currentSelectServe.filter((serveName) => !data.includes(serveName)))];
          break;

        case 'select-all':
          if (this.currentSelectServe.length === this.allSkillsList.length) {
            this.currentSelectServe = [];
          } else {
            this.currentSelectServe = JSON.parse(JSON.stringify(this.allSkillsList));
          }
          break;
      }
    },

    // 获取所有服务
    getAllSkillsList() {
      this.allSkillsList = this.servesList
        .map((oneServeList) => {
          return oneServeList.children.map((twoServeList) => {
            return twoServeList.children.map((item) => item.serverNameThree);
          });
        })
        .flat(Infinity);
    },

    handleConfirm() {
      if (!this.currentSelectServe.length) {
        this.ttoast({
          type: 'info',
          title: '请选择服务'
        });

        return;
      }
      this.personalInformation.serviceInformation.scopeBusiness = this.currentSelectServe;
      this.goBack();
    }
  },

  computed: {
    totalServiceCount() {
      let counter = 0;
      if (!this.childrenServeData.length) return 0;
      this.childrenServeData.forEach((item) => {
        counter += item.children.length;
      });
      return counter;
    }
  }
};
</script>

<style lang="less" scoped>
@main-color: #08377f;

.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #f8fcff 0%, #edf3ff 60%, #e6e7fb 100%);
  .PageGHeader {
    position: relative;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 88rpx;
    background-color: #fff;
    .backBtn {
      margin-left: 40rpx;
      width: 20rpx;
      height: 32rpx;
    }
    .PageText {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: Source Han Sans CN;
      font-size: 32rpx;
      font-weight: 600;
      text-align: center;
      display: flex;
      align-items: center;
      letter-spacing: 0.32rpx;
      color: #222229;
    }
  }

  .serve-list-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(100vh - 88upx - 120upx);
    padding-top: 25upx;
    box-sizing: border-box;

    .category-one {
      width: 196upx;
      height: 100%;
      background-color: #fff;

      .scroll-view-container {
        height: calc(100vh - 88upx - 145upx);
      }

      .category-scroll-container {
        width: 181upx;
        border-radius: 0 20upx 0 0;
        box-shadow: 0px 0px 1px 0px #8db7f7, 0px 0px 20px 1px rgba(141, 183, 247, 0.2);

        .category-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 181upx;
          height: 82upx;

          &.active {
            background-color: #3982f1;

            &::after {
              content: '';
              position: absolute;
              right: -10upx;
              top: 50%;
              transform: translateY(-50%);
              width: 16upx;
              height: 33upx;
              background: url('../../../../static/images/new-business/in/active.png') no-repeat;
              background-size: cover;
            }

            .name {
              color: #fff;
            }
          }

          .icon {
            width: 38upx;
            height: 38upx;
          }

          .name {
            color: #08377f;
            font-size: 30upx;
          }
        }
      }
    }

    .serve-wrapper {
      width: 547upx;
      height: 100%;
      height: calc(100vh - 88upx - 145upx);
      overflow-y: auto;
      background-color: #fff;
      padding: 27upx 30upx;
      box-sizing: border-box;
      border-radius: 20px 0px 0px 0;
      box-shadow: 0px 0px 1px 0px #8db7f7, 0px 0px 20px 1px rgba(141, 183, 247, 0.2);

      .counter {
        color: @main-color;
        font-size: 28upx;
        margin-bottom: 28upx;
        text-align: right;
      }
    }
  }

  .choose-footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120upx;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 16upx 30upx;
    box-sizing: border-box;

    // &::before {
    //   content: '';
    //   position: absolute;
    //   width: 100%;
    //   height: 40upx;
    //   background: linear-gradient(to bottom, rgba(240, 240, 240, 0), rgba(240, 240, 240, 0.5));
    //   top: -40upx;
    //   left: 0;
    // }

    .uni-btn {
      flex: 1;
      border-radius: 16upx;
      background-color: #3982f1;
      height: 100%;
      margin-right: 40upx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 32upx;
    }

    .select-all-wrapper {
      min-width: 70upx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #222229;
      font-size: 24upx;
    }
  }
}
</style>
