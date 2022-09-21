<template>
  <view class="choose-words-container" ref="containerRef">
    <view class="header">
      <img
        class="back"
        @click="handleBack"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        alt=""
      />
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

      <NoData v-show="!list.length"></NoData>
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
import NoData from "../../components/no-data";
import { SELECT_WORDS } from "../../constant";

export default {
  components: {
    NoData,
  },
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
        uni.setStorageSync(SELECT_WORDS, item.say);
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

      if (res === "新增成功") {
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

.choose-words-container {
  padding: 30upx 40upx;
  padding-bottom: 40px;
  overflow: scroll;

  .header {
    .flex();

    .back {
      width: 48upx;
    }

    h2 {
      flex: 1;
      font-weight: normal;
      font-size: 32upx;
      color: @c0;
      margin-left: 34upx;
      flex-shrink: 0;
    }
  }

  .main {
    .list-title {
      margin: 20px 0;
    }
    .item {
      padding: 20upx;
      box-sizing: border-box;
      margin: 20upx 0;
      box-shadow: 0px 10upx 26upx #ccc;
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
    margin: 34upx 0;
  }

  .my {
    margin-top: 20px;
    transform: scaleY(0);
    transition: all 350ms;
    transform-origin: center top;

    .textarea {
      width: 100%;
      border: 1upx solid #ccc;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20upx;
      margin-top: 20px;
      transition: all 350ms;
    }

    .add-btn {
      margin-top: 40upx;
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