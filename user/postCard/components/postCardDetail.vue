<template>
  <view class="postcardDetail">
    <view class="time">{{ "2022-10月" || time }}</view>
    <view class="border">
      <view class="detail">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.gpbctv.com%2Fuploads%2F20210424%2Fzip_1619246266UkP6CL.jpg&refer=http%3A%2F%2Fwww.gpbctv.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669429029&t=b6ce2f095df9c91c800c4389e8a24e7f"
          alt=""
          class="leftImg"
        />
        <view class="rightText">
          <view class="top">
            <view class="topLeft">{{ "莎士比亚·代斯基二世" || name }}</view>
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/76brxks9dvmy40qho2fl.png"
              alt=""
              class="topRight"
          /></view>
          <view class="middle">{{ "营销策划师" || identity }}</view>
          <view class="bottom">{{ "广东团蜂科技有限公司" || address }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.postcardDetail {
    margin: 30upx 0;
  .time {
    color: #999999;
    font-size: 28upx;
    font-weight: 500;
    margin-bottom: 10upx;
  }
  .border {
    width: 100%;
    height: 220upx;
    border-radius: 20upx;
    background: white;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    .detail {
      padding: 50upx 30upx;
      display: flex;
      .leftImg {
        width: 120upx;
        height: 120upx;
        margin-right: 26upx;
      }
      .rightText {
        .top {
          display: flex;
          width: 100%;
          .topLeft {
            font-size: 32upx;
            font-weight: 600;
          }
          .topRight {
            width: 36upx;
            height: 36upx;
            position: relative;
            right: -130upx;
            bottom: -10px;
          }
        }
        .middle {
          font-size: 26upx;
          font-weight: 500;
          margin: 5upx 0;
        }
        .bottom {
          font-size: 26upx;
          font-weight: 500;
        }
      }
    }
  }
}
</style>