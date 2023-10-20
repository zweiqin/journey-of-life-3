<template>
	<view class="appraise-pane-container">
		<view class="header">
			<view class="left">
				<text>大家怎么说(0)</text>
				<text class="recommend"> <text>100%</text>推荐 </text>
			</view>

			<button class="bee-btn more">
				查看全部
				<BeeIcon
					:src="require('../../../static/brand/detail/to.png')"
					:size="14"
				></BeeIcon>
			</button>
		</view>

		<!-- <view class="appraise-item" v-for="item in 10" :key="item">
			<view class="user-info">
			<BeeAvatar :size="40"></BeeAvatar>
			<view class="info">
			<view class="name-time">
			<text>吗哈哈</text>
			<text>19小时前</text>
			</view>
			<view class="recommend-wrapper">
			<BeeIcon
			:src="require('../../../../static/brand/detail/zan.png')"
			:size="13"
			></BeeIcon>
			<BeeAvatar
			:radius="0"
			:width="57"
			:height="14"
			:src="require('../../../../static/brand/detail/tag.png')"
			></BeeAvatar>
			</view>
			</view>
			</view>

			<view class="appraise-desc">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
			necessitatibus quos facere dicta ducimus odio illo? Nulla quaerat,
			dolorem porro quod ipsa laborum placeat voluptatem maxime possimus,
			eveniet earum explicabo?
			</view>

			<scroll-view scroll-x="y">
			<view class="appraise-images">
			<BeeAvatar radius="10rpx" v-for="item in 10" :key="item"></BeeAvatar>
			</view>
			</scroll-view>
			</view> -->

		<view class="no-data"> 暂无评价 </view>
	</view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.appraise-pane-container {
  background-color: #fff;
  margin-top: 20upx;
  padding: 20upx 46upx;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      .recommend {
        padding-left: 20upx;
        margin-left: 20upx;
        border-left: 1upx solid #d8d8d8;
        color: #3d3d3d;

        text {
          color: #fa5151;
        }
      }
    }

    .more {
      color: #777777;
      display: flex;
      align-items: center;
    }
  }

  .appraise-item {
    margin-top: 30upx;
    .user-info {
      display: flex;
      align-items: center;

      .info {
        flex: 1;
        margin-left: 12upx;

        .name-time {
          display: flex;
          align-items: center;
          justify-content: space-between;

          text {
            font-size: 24upx;

            &:nth-child(1) {
              color: #000;
            }

            &:nth-child(2) {
              color: #777;
            }
          }
        }

        .recommend-wrapper {
          display: flex;
          align-items: center;

          /deep/ .image-wrapper {
            margin-left: 4upx;
            margin-top: 8upx;
            background-color: transparent !important;
          }
        }
      }
    }

    .appraise-desc {
      margin: 20upx 0;
    }

    .appraise-images {
      white-space: nowrap;

      /deep/ .image-wrapper {
        margin-right: 30upx;
      }
    }
  }

  .no-data{
    width: 100%;
    height: 200upx;
    color: #ccc;
    text-align: center;
    line-height: 200upx;
  }
}
</style>
