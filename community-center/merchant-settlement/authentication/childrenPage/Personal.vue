<template>
  <view class="container">
      <view class="PageGHeader">
        <image @click="goBack" class="backBtn" src="@/static/images/entryOfMerchants/back.png"></image>
        <!-- <text class="PageText">{{ formIndex == 0?'身份认证':'信息认证' }}</text> -->
        <text class="PageText">信息认证</text>
      </view>
      <view class="FormSteps">
        <view class="FormStepsItem" v-for="(item, index) in StepsStatic" :key="index">
          <view class="StateBox isActive" v-if="item.active && !item.isOver">
            <view class="isActiveBox">
            </view>
          </view>
          <view class="StateBox isOver" v-else-if="item.isOver">
            <image class="overImg" src="@/static/images/entryOfMerchants/great.png"></image>
          </view>
          <view class="StateBox" v-else>
            {{ index+1 }}
          </view>
          <image class="StepStateImg" v-if="index < StepsStatic.length-1" :src="returnStateImg(item,index)"></image>
          <text class="ItemName">{{ item.name }}</text>
        </view>
      </view>
      <keep-alive>
        <component
          :is="currentTabComponent[formIndex]"
          class="tab"
          :personalImg="personalInformation.personalImg"
          :basicInformationForm="personalInformation.basicInformationForm"
          :businessInformationForm="personalInformation.businessInformationForm"
          :personalInformation="personalInformation"
          @nextSteps="nextSteps"
        ></component>
      </keep-alive>
  </view>
</template>

<script>
  import PersonalImg from '../componrnts/PersonalImg.vue'
  import BasicInformation from '../componrnts/BasicInformation.vue'
  import BusinessInformation from '../componrnts/BusinessInformation.vue'
  import StoreBusiness from '../componrnts/StoreBusiness.vue'

// currentTabComponent: ['PersonalImg','BasicInformation','BusinessInformation','StoreBusiness'], // !人脸识别暂时不适用，隐藏
// {
//   name: '身份认证',
//   active: true,
//   isOver: false,
//   statImg: require('@/static/images/entryOfMerchants/change.png')
// },
  export default {
    name: 'Personal',
    props: {
      personalInformation: {
        type: Object,
        default: {}
      }
    },
    components: {
      PersonalImg,
      BasicInformation,
      BusinessInformation,
      StoreBusiness
    },
    data() {
      return {
        formIndex: 2,
        currentTabComponent: ['BasicInformation','BusinessInformation','StoreBusiness'],
        StepsStatic: [{
          name: '认证资料',
          active: true,
          isOver: false,
          statImg: require('@/static/images/entryOfMerchants/noOver.png')
        },{
          name: '经营信息',
          active: false,
          isOver: false,
          statImg: require('@/static/images/entryOfMerchants/noOver.png')
        },{
          name: '完成',
          active: false,
          isOver: false,
          statImg: require('@/static/images/entryOfMerchants/noOver.png')
        }]
      }
    },
    created() {
      
    },
    methods: {
      goBack() {
        uni.navigateBack();
      },
      nextSteps(Index) {
        if (Index > 0) {
          this.StepsStatic[Index - 1].isOver = true
        }
        this.StepsStatic[Index].active = true
        this.formIndex = Index
      },
      returnStateImg(item,index) { // 玩nm，直接堆屎山
        let arr = [require('@/static/images/entryOfMerchants/noOver.png'),
            require('@/static/images/entryOfMerchants/change.png'),
            require('@/static/images/entryOfMerchants/over.png')]
        if(item.active && !item.isOver) {
          return arr[1]
        }else if(item.isOver) {
          if (this.StepsStatic[index+1].isOver) {
            return arr[0]
          }else {
            return arr[2]
          }
        }else {
          return arr[0]
        }
      }
    },
    computed: {
      
    }
  }
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding-top: 268rpx;
  background: linear-gradient(180deg, #F8FCFF 0%, #EDF3FF 60%, #E6E7FB 100%);
  overflow-y: auto;
  .PageGHeader {
    z-index: 12;
    position: fixed;
    top: 0;
    left: 0;
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
      font-size: 32rpx;
      font-weight: 600;
      letter-spacing: 0.32rpx;
      color: #222229;
    }
  }
  .FormSteps {
    z-index: 12;
    position: fixed;
    top: 88rpx;
    left: 0;
    width: 100vw;
    height: 180rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #F8FCFF;
    .FormStepsItem {
      position: relative;
      width: 100rpx;
      height: 100rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .StateBox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        color: #E2E7EC;
        background: #526787;
      }
      .isActive {
        background: #BED8FF;
        .isActiveBox {
          width: 37rpx;
          height: 37rpx;
          border-radius: 50%;
          background: #3982F1;
        }
      }
      .isOver {
        background: #08377F;
        .overImg {
          width: 32rpx;
          height: 22rpx;
        }
      }
      .ItemName {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 32rpx;
        color: #08377F;
      }
      .StepStateImg {
        width: 50rpx;
        height: 5rpx;
        position: absolute;
        right: -55rpx;
        top: 20rpx;
      }
    }
  }
}
</style>