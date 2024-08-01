<template>
  <view class="choose-words-container" ref="containerRef">
    <view class="header">
      <tui-icon name="arrowleft" color="#767676" :size="48" unit="rpx" @click="handleBack"></tui-icon>
      <h2>选择话术</h2>
    </view>

    <view class="main">
      <view class="list-title">话术列表</view>
      <view
        v-show="list.length"
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <view class="header">
          <text>追销话术</text>
          <text class="btn" @click="chooseWords(item)">选择该话术</text>
        </view>
        <view class="words">{{ item.say }}</view>
      </view>

				<view  v-show="!list.length">
					<tui-no-data :fixed="false" style="padding-top: 100rpx;">暂无数据</tui-no-data>
				</view>
    </view>

    <view class="set-my-words" @click="handleShowMyWords">我要自定义话术</view>

    <view class="my" ref="myPaneRef">
      <view class="my-header"> 自定义话术 </view>
      <textarea
        class="textarea"
        v-model="myWords"
        cols="30"
        rows="10"
        :style="{
          borderColor: showError ? 'red' : '',
        }"
      ></textarea>

      <view
        class="no-word"
        :style="{
          opacity: showError ? 1 : 0,
        }"
        >请输入话术</view
      >

      <button class="add-btn" @click="handleAddWords">确定添加</button>
    </view>
  </view>
</template>

<script>
import { addMyWordsApi, getWordsApi } from "../../api/user";

export default {
  data() {
    return {
      list: [],
      myWords: "",
      type: "",
      wordsType: "",
      showError: false,
      select: false,
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },

    handleShowMyWords() {
      this.$refs.myPaneRef.$el.style.transform = "scaleY(1)";
    },

    async getWords() {
      const res = await getWordsApi(this.type);
      this.list = res;
    },

    chooseWords(item) {
      if (this.select === "true") {
				// this.$store.dispatch('xxx')
        uni.navigateBack();
      } else {
        uni.setClipboardData({
          data: item.say,
          success: function () {
            uni.showToast({
              title: "话术复制成功",
            });
          },
        });
      }
    },

    async handleAddWords() {
      if (!this.myWords.trim()) {
        this.showError = true;
        return;
      }

      const res = await addMyWordsApi({
        say: this.myWords,
        type: this.type,
      });

      if (res.errno === 0) {
        uni.showToast({
          title: "新增成功",
          duration: 2000,
        });
        this.myWords = "";
        this.getWords();
      } else {
        uni.showToast({
          title: "添加失败",
          duration: 2000,
          icon: "none",
        });
      }
    },
  },

  onLoad(options) {
    this.type = options.type;
    this.select = options.select;
    this.wordsType = this.type === 2 ? "转化话术" : "追销话术";
    this.getWords();
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

page{
  overflow: scroll;
}

.choose-words-container {
  padding: 30rpx 40rpx;
  padding-bottom: 40px;
  overflow: scroll;

  .header {
    .flex();

    h2 {
      flex: 1;
      font-weight: normal;
      font-size: 32rpx;
      color: @c0;
      margin-left: 34rpx;
      flex-shrink: 0;
    }
  }

  .main {
    .list-title {
      margin: 20px 0;
    }
    .item {
      padding: 20rpx;
      box-sizing: border-box;
      margin: 20rpx 0;
      box-shadow: 0px 10rpx 26rpx #ccc;
      border-radius: 5px;

      .header {
        .flex();
        font-size: @f14;
        margin-bottom: 10px;

        .btn {
          color: #409eff;
        }
      }

      .words {
        font-size: @f12;
      }
    }
  }

  .set-my-words {
    text-align: right;
    color: #409eff;
    margin: 34rpx 0;
  }

  .my {
    margin-top: 20px;
    transform: scaleY(0);
    transition: all 350ms;
    transform-origin: center top;

    .textarea {
      width: 100%;
      border: 1rpx solid #ccc;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20rpx;
      margin-top: 20px;
      transition: all 350ms;
    }

    .add-btn {
      margin-top: 40rpx;
      background-color: #409eff;
      color: @cw;
    }
  }

  .no-word {
    color: red;
    margin-top: 10px;
    opacity: 0;
    transition: all 350ms;
  }
}
</style>