<template>
  <view>
    <view
      class="bluebackground"
      :style="{ 'background-color': choseThisColor }"
    >
      <view class="detail">
        <view class="back">
          <img
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1in88gqsd483f0yffcjb.png"
            alt=""
            class="backImg"
            @click="back"
          />
          <view class="backText">名片夹</view>
        </view>
        <view class="postcardNmuber">
          <view class="numberBackground">
            <view class="NumberText">总名片数</view>
            <view class="Number">1</view>
          </view>
        </view>
        <view class="replace" @click="openWindow">更换背景</view>
        <postCardDetail></postCardDetail>
      </view>
    </view>
    <TPopup v-model="windowType">
      <view class="colorChose">
        <view class="colorChoseBackground">
          <view class="colorChoseTitle">更换背景色</view>
          <view class="left">
            <view class="colorChoseText">当前</view>
            <view class="choseColor">
              <view
                class="color"
                :style="{ 'background-color': choseThisColor }"
              >
              </view>
            </view>
          </view>
          <view class="right">
            <view class="nowColor">
              <view class="colorChoseText1">选择</view>
              <view class="allcolor">
                <view v-for="item in color" :key="item.id">
                  <view
                    class="color"
                    :style="{ 'background-color': item.color }"
                    @click="choseNowColor(item.color)"
                  >
                    <img
                      v-if="item.color == choseColor"
                      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2fd79hq88nuonf2a57yr.png"
                      alt=""
                      class="choseType" /></view
                ></view>
              </view>
            </view>
          </view>
          <view class="bottom">
            <view class="cancle" @click="cancle">取消</view>
            <view class="chose" @click="chose">确定</view>
          </view>
        </view>
      </view>
    </TPopup>
  </view>
</template>
  
  <script>
import postCardDetail from "./components/postCardDetail";
import { color } from "./config";
import { getBusinessListApi } from "../../api/businessCard";
import { getUserId } from '../../utils';
export default {
  components: {
    postCardDetail,
  },
  data() {
    return {
      windowType: false,
      choseThisColor: "#183869",
      choseColor: "",
      color,
    };
  },
  methods: {
    openWindow() {
      this.windowType = true;
    },
    choseNowColor(color) {
      this.choseColor = color;
    },
    cancle() {
      this.windowType = false;
    },
    chose() {
      this.choseThisColor = this.choseColor;
      this.windowType = false;
    },
    async getBusinessList(){
      const res = await getBusinessList({
        userId : getUserId(),
        name:"",
        page:"",
        limit:"",
        sort:"",
        order:"",
      })
    }
  },
};
</script>
  
  <style lang="less" scoped>
.bluebackground {
  width: 100%;
  height: 390upx;
  transition: all 360ms;
  .detail {
    padding: 100upx 30upx 0;
    .back {
      display: flex;
      .backImg {
        width: 48upx;
        height: 48upx;
      }
      .backText {
        color: white;
        font-size: 32upx;
        margin-left: 28upx;
      }
    }
    .postcardNmuber {
      margin-top: 60upx;
      .numberBackground {
        background: #ffe5cc;
        border-radius: 20upx;
        width: 100%;
        height: 320upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
        .NumberText {
          font-size: 34upx;
          font-weight: 500;
          margin-bottom: 20upx;
          margin-top: 70upx;
        }
        .Number {
          font-size: 72upx;
          font-weight: 700;
          color: #804208;
        }
      }
    }
    .replace {
      color: #999999;
      font-size: 26upx;
      text-align: center;
      margin-top: 20upx;
    }
  }
}
.colorChose {
  .colorChoseBackground {
    background-color: white;
    width: 690upx;
    height: 560upx;
    border-radius: 20upx;
    padding: 24upx 22upx 24upx;
    .colorChoseTitle {
      text-align: center;
    }
    .left {
      display: flex;
      align-items: center;
      .colorChoseText {
        margin-top: 44upx;
        margin-bottom: 77upx;
        width: 90upx;
      }
      .choseColor {
        .color {
          width: 80upx;
          height: 80upx;
          margin: 10upx 20upx;
          border-radius: 4upx;
        }
      }
    }
    .right {
      .nowColor {
        display: flex;

        .colorChoseText1 {
          width: 160upx;
        }
        .allcolor {
          display: flex;
          flex-wrap: wrap;

          .color {
            width: 80upx;
            height: 80upx;
            margin: 10upx 20upx;
            border-radius: 4upx;
            position: relative;
            .choseType {
              width: 36upx;
              height: 36upx;
              position: absolute;
              bottom: 4upx;
              right: 4upx;
            }
          }
        }
      }
    }
    .bottom {
      margin-top: 80upx;
      display: flex;
      justify-content: space-around;
      .cancle {
        border: 0.5px solid #999999;
        height: 57upx;
        padding-top: 15upx;
        width: 220upx;
        text-align: center;
        align-items: center;
        border-radius: 1000upx;
        color: #999999;
      }
      .chose {
        border: 0.5px solid #999999;
        height: 57upx;
        padding-top: 15upx;
        width: 220upx;
        text-align: center;
        border-radius: 1000upx;
        color: white;
        background-color: #3662ec;
      }
    }
  }
}
</style>