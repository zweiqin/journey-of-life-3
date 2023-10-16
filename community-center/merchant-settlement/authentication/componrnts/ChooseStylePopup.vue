<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="chooseLabelsVisible" @close="chooseLabelsVisible = false">
    <view class="choose-labels-contaonter">
      <scroll-view scroll-y>
        <view class="list">
          <view class="item" v-for="item in shopStyleList" @click="handleChooseLabels(item)">
            <view class="image-wrapper">
              <image class="icon" :src="item.labelUrl"></image>
              <view class="choose" v-if="item.labelName">
                <tui-icon v-show="currentSelectLabels.includes(item.id)" :size="16" color="#EF530E" name="check"></tui-icon>
              </view>
            </view>

            <view class="style-name">{{ item.labelName }}</view>
          </view>
        </view>
      </scroll-view>

      <view class="btn-wrapper">
        <button class="uni-btn" @click="handleConfirm">确定</button>
      </view>
    </view>
  </tui-bottom-popup>
</template>

<script>
export default {
  data() {
    return {
      chooseLabelsVisible: false,
      shopStyleList: [],
      currentSelectLabels: []
    };
  },

  methods: {
    show(selectData, allLabels) {
      this.chooseLabelsVisible = true;
      this.shopStyleList = allLabels;
      this.currentSelectLabels = selectData.map((item) => item * 1);
    },

    handleChooseLabels(selectLabels) {
      const { id } = selectLabels;
      console.log(id);
      if (this.currentSelectLabels.includes(id)) {
        this.currentSelectLabels = this.currentSelectLabels.filter((selectId) => selectId !== id);
      } else {
        this.currentSelectLabels.push(id);
      }
    },

    handleConfirm() {
      this.$emit('confirm', this.currentSelectLabels);
      this.chooseLabelsVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.choose-labels-contaonter {
  position: relative;
  height: 900upx;
  background-color: #fff;
  padding-bottom: 140upx;
  box-sizing: border-box;
  overflow: scroll;

  .btn-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120upx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88upx;
      background-color: #5677fc;
      width: 690upx;
      color: #fff;
      font-size: 32upx;
      letter-spacing: 0.5em;
    }
  }
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 55upx;
  padding: 0 30upx;
  box-sizing: border-box;

  .item {
    margin-right: 36upx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30upx;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  .image-wrapper {
    position: relative;
    width: 80upx;
    height: 80upx;
    position: relative;
    margin-bottom: 20upx;

    .choose {
      position: absolute;
      top: -16upx;
      right: -22upx;
      width: 34upx;
      height: 34upx;
      border-radius: 50%;
      border: 1upx solid #222229;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: 100%;
      height: 100%;
      border-radius: 10upx;
    }
  }

  .style-name {
    font-size: 24upx;
    color: #222229;
    width: 80upx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
