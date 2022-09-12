<template>
  <view class="union-container">
    <div class="header">
      <img
        @click="back"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png"
        class="icon"
        alt=""
      />
      <h2>附近联盟商家</h2>
    </div>

    <view class="select"> 区域 佛山 </view>

    <view class="main">
      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <img
          src="https://img2.baidu.com/it/u=53740863,2368229552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=634"
          alt=""
          class="avatar"
        />

        <view class="info">
          <view class="title">
            <view>团蜂家居维保店</view>
            <view class="tag">最近</view>
          </view>

          <view class="rate">
            <view class="rate-tag">体验评分</view>
            <Rate :rate="4"></Rate>
          </view>

          <view class="distance">
            <view>距离1.5km</view>
            <view class="navigation">
              <text>到这里去</text>
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Rate from "../../components/rate";
export default {
  components: {
    Rate,
  },

  methods: {
    back() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.union-container {
  padding: 40upx;
  box-sizing: border-box;

  .header {
    .flex(center, flex-start);
    background-color: @cw;

    h2 {
      font-size: @f16;
      color: @c3d;
    }

    .icon {
      .img(48upx);
      margin-right: 200upx;
    }
  }

  .select {
    font-size: @f12;
    color: @c0;
    .margin(34upx, 12upx);
  }

  .main {
    background-color: #f7f7f7;
    margin: 0 -40upx;

    .item {
      background-color: @cw;
      margin-top: 10upx;
      display: flex;
      padding: 20upx 40upx;
      box-sizing: border-box;

      .avatar {
        .img(160upx, 10upx);
      }

      .info {
        margin-left: 46upx;
        flex: 1;

        .title {
          display: flex;
          margin-right: 20upx;
          color: @c0;
          font-size: @f16;

          .tag {
            margin-left: 20upx;
            padding: 8upx 22upx;
            background-color: #07b9b9;
            border-radius: @r5;
            color: @cw;
            font-size: @f10;
          }
        }

        .rate {
          display: flex;
          .margin(10upx, 10upx);

          .rate-tag {
            padding: 4upx 20upx;
            border-radius: @r5;
            background-color: #3662ec;
            color: @cw;
            font-size: @f10;
            margin-right: 10upx;
          }
        }

        .distance {
          color: @c0;
          font-size: @f10;

          .flex();
          .navigation {
            color: #3662ec;
            .icon {
              .img(32upx);
              vertical-align: bottom;
            }
          }
        }
      }
    }
  }
}
</style>