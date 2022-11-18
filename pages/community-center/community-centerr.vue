<template>
  <view class="community-centerr">
    <view class="head">
      <view class="search-bar">
        <view class="location">
          <view class="text">龙江镇</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9ujhwq408rlpm9vsxn8w.png"
            alt=""
            class="show"
          />
        </view>
        <view class="search-box">
          <view class="search">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/2qpjht84e85rhmt6y1ce.png"
              alt=""
              class="img"
            />
          </view>
          <input
            type="text"
            class="content"
            placeholder="搜索社区服务，一站式解决家居问题"
          />
        </view>
      </view>
    </view>
    <view class="middle">
      <view class="i">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/6h3jdhfhznou12monzux.png"
          alt=""
          class="img"
        />
      </view>
      <view class="service-list">
        <view class="item">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xtxkffzia8a6wwh35gle.png"
            alt=""
            class="img"
          />

          <text class="name">安装</text>
        </view>
        <view class="item">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/rchg5haomu72rzup1kzp.png"
            alt=""
            class="img"
          />

          <text class="name">清洁</text>
        </view>
        <view class="item">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/pge9ru6x87p3ep6o8mtn.png"
            alt=""
            class="img"
          />

          <text class="name">保养</text>
        </view>
        <view class="item">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/yiqi09molj4xr1du0vje.png"
            alt=""
            class="img"
          />

          <text class="name">维修</text>
        </view>

        <view class="item">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/gbcrduo4m2xyahmxnqj5.png"
            alt=""
            class="img"
          />

          <text class="name">翻新</text>
        </view>
      </view>
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/hnv7o8n1c4gqs4h3kym8.png"
        alt=""
        class="girl"
      />
      <view class="w">
        <view class="w1">
          <view class="list">
            <view class="item">
              <view class="number">100+</view>
              <view class="text">服务内容</view>
            </view>
            <view class="item">
              <view class="number">1000+</view>
              <view class="text">实体门店</view>
            </view>
            <view class="item">
              <view class="number">120万+</view>
              <view class="text">服务家庭</view>
            </view>
          </view>
        </view>
        <view class="w2" >
          <view class="title">
            <text>专业性强</text>
            <text>及时服务</text>
          </view>
          <view class="img-list">
            <view class="people" @click="handleToServiceList">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/0mhljyhmui9piidsmx0e.png"
                alt=""
                class="a"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/597ywg7uu1zf41obem1o.png"
                alt=""
                class="round"
              />
              <view class="name">{{text ||"维修"}}</view>
            </view>

            <view class="people" @click="handleToServiceList">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qc6esnbg4xjwfzmoe0d7.png"
                alt=""
                class="a"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/clt44rg47v4gwwg3tbub.png"
                alt=""
                class="round"
              />
              <view class="name">安装</view>
            </view>

            <view class="people" @click="handleToServiceList">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xuja4se2vvmvwtistt7s.png"
                alt=""
                class="a"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/kgqq2ciwp09an1eq9678.png"
                alt=""
                class="round"
              />
              <view class="name">清洁</view>
            </view>
          </view>
          <view class="s-list">
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/lrvrci3gyy66tej890o9.png"
                alt=""
                class="img"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/1zouc764aorxikm72g6u.png"
                alt=""
                class="shadow"
              />
              <view class="text">家具服务</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/o6irnsfyi7f10ovghtuv.png"
                alt=""
                class="img"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/1zouc764aorxikm72g6u.png"
                alt=""
                class="shadow"
              />
              <view class="text">家电服务</view>
            </view>
            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/deqz5xyrtqgwn4l0qk38.png"
                alt=""
                class="img"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/1zouc764aorxikm72g6u.png"
                alt=""
                class="shadow"
              />
              <view class="text">水电灯具</view>
            </view>

            <view class="item">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/j8jhv2ojm02xr1tc4owk.png"
                alt=""
                class="img"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/1zouc764aorxikm72g6u.png"
                alt=""
                class="shadow"
              />
              <view class="text">清洗保洁</view>
            </view>
          </view>
          <view class="more" @click="handleToServiceListHome">
            <view class="text">更多服务</view>
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/nsez71tgcrlgpeu93h2s.png"
              alt=""
              class="img"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="main">
      <view class="jx" @click="go('/community-center/vip-center/vip-detail')">
        <view class="left">
          <view class="red">积分商城</view>
          <view class="title-list">
            <view class="title">下单有礼</view>
            <view class="title">领取积分</view>
          </view>
          <view class="abc">
            <view class="order">立即下单</view>
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ntinwdyxdtbh3b2lekfw.png"
              alt=""
              class="hand"
            />
            <!-- <view class="money">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/d5ad6kxqovvkzzdlnfi8.png"
                alt=""
                class="m1"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/gayph4tuo3bnkhwf2o4v.png"
                alt=""
                class="m2"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/mjhuqr4l210srac6vm35.png"
                alt=""
                class="m3"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/up91fnjb0wd5ld1xyy9z.png"
                alt=""
                class="m4"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zr4kgghb0oa8id241v05.png"
                alt=""
                class="m5"
              />
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9m6kin074ltnf8h9du9p.png"
                alt=""
                class="m6"
              />
            </view> -->
          </view>
        </view>
        <view class="right">
          <view class="member">
            <view class="l">
              <view class="orange">会员套餐</view>
              <view class="title">
                <view class="text">开通会员</view>
                <view class="text">送会员套餐</view>
              </view>
            </view>
            <view class="r">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/b7ynx502um1iti0p6lks.png"
                alt=""
                class="img"
              />
              <view class="open">去开通</view>
            </view>
          </view>
          <view class="collate">
            <view class="l">
              <view class="blue">拼单专属</view>
              <view class="title">
                <view class="text">一起拼单</view>
                <view class="text">低价实惠</view>
              </view>
            </view>
            <view class="r">
              <view class="coin"></view>
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ud84evf8g3nhzwfadvbe.png"
                alt=""
                class="img"
              />
              <view class="coll">去拼单</view>
            </view>
          </view>
        </view>
      </view>
      <view class="station">
        <view class="ju">
          <view class="top">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9ratwba3sflknwehslmf.png"
              alt=""
              class="title"
            />
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/5jubpkvccdhm5nl74duo.png"
              alt=""
              class="more"
            />
          </view>
          <view class="service">一站式服务</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/31rvmppaw0mnbct5c2kv.png"
            alt=""
            class="img"
          />
        </view>
      </view>
      <view class="nearby">附近服务站</view>
      <community></community>
      <community></community>
      <community></community>
      <community></community>

      <view class="supermarket">
        <view class="mid">
          <view class="name-list">
            <view class="name">普材超市</view>
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/5jubpkvccdhm5nl74duo.png"
              alt=""
              class="more"
            />
          </view>
          <view class="goods-list">
            <view class="goods">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/m0m8sn88q7d4s394s89t.png"
                alt=""
                class="good"
              />
              <view class="good-name">贴瓷砖</view>
              <view class="service-number">
                <view class="already">已服务</view>
                <view class="number">15022</view>
                <view class="fate">次</view>
              </view>
            </view>
            <view class="goods">
              <img
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/98fet22rieuiwrp7bb1w.png"
                alt=""
                class="good"
              />
              <view class="good-name">打地平</view>
              <view class="service-number">
                <view class="already">已服务</view>
                <view class="number">15022</view>
                <view class="fate">次</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="share">
        <view class="item">
          <view class="text">居家经验</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/br1hzb4kjqpfypgmkp65.png"
            alt=""
            class="img"
          />
        </view>
        <view class="item">
          <view class="text">家居分享</view>
          <img src="" alt="" class="img" />
        </view>
      </view>
      <view class="fx">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/frg0jw8khhgytqcp4pxs.png"
          alt=""
          class="img"
        />
        <view class="midd">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/sj8pr4z00tz2ghkcbr23.png"
            alt=""
            class="tip"
          />
        </view>
        <view class="white">
          <view class="z">
            <view class="w3">
              <view class="brief">
                <view class="text"
                  >洗衣机细菌超标高达 81.3%。教你一招，不必请...</view
                >
              </view>
              <view class="m">
                <img
                  src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zk4j89krat0mkjwlep01.png"
                  alt=""
                  class="image"
                />
                <view class="mid">洗衣机清洗</view>
              </view>
            </view>
            <view class="w3">
              <view class="brief">
                <view class="text"
                  >洗衣机细菌超标高达 81.3%。教你一招，不必请...</view
                >
              </view>
              <view class="m">
                <img
                  src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zk4j89krat0mkjwlep01.png"
                  alt=""
                  class="image"
                />
                <view class="mid">洗衣机清洗</view>
              </view>
            </view>
            <view class="w3">
              <view class="brief">
                <view class="text"
                  >洗衣机细菌超标高达 81.3%。教你一招，不必请...</view
                >
              </view>
              <view class="m">
                <img
                  src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zk4j89krat0mkjwlep01.png"
                  alt=""
                  class="image"
                />
                <view class="mid">洗衣机清洗</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <DiscountPopup v-model="showPopup"></DiscountPopup>
  </view>
</template>

<script>
import community from "./components/community";
import DiscountPopup from "./components/discount.vue";

export default {
  name: "Community-centerr",
  components: {
    community,
    DiscountPopup,
  },
  data() {
    return {
      showPopup: false,
    };
  },

  onLoad(){
    this.showPopup = true
  },
  methods: {
    handleToServiceListHome() {
      console.log("服务分类列表");
      uni.navigateTo({ url: "../../community-center/service-sort" });
    },

    handleToServiceList(){
      console.log("维修服务分类列表");
      uni.navigateTo({ url: "../../community-center/service-sort" });
    },

  },
  created() {},
};
</script>

<style lang="less" scoped>
.community-centerr {
  .head {
    width: 100%;
    height: 130upx;
    background: #e95d20;
    .search-bar {
      position: absolute;
      width: 93%;
      left: 30upx;
      top: 30upx;
      display: flex;
      align-items: center;
      .location {
        display: flex;
        align-items: center;
        .text {
          font-size: 36upx;
          font-weight: 500;
          color: #ffffff;
        }
        .show {
          width: 32upx;
          height: 32upx;
        }
      }
      .search-box {
        padding: 0upx 24upx;
        display: flex;
        flex: 1;
        align-items: center;
        width: 540upx;
        height: 74upx;
        border-radius: 100upx;
        background: #ffffff;
        .search {
          width: 48upx;
          height: 32upx;
          border-right: 2upx solid #d8d8d8;
          .img {
            width: 32upx;
            height: 32upx;
          }
        }
        .content {
          padding-left: 14upx;
          flex: 1;
          font-size: 24upx;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }
  .middle {
    width: 100%;
    height: 938upx;
    background: linear-gradient(180deg, #e95d20 0%, #ff8f1f 56%, #f1f2f6 100%);
    .i {
      // padding: 60upx 196upx 0upx 66upx;
      position: relative;
      left: 66upx;
      top: 56upx;
      width: 70%;
      height: 50upx;
      .img {
        // width: 520upx;
        width: 100%;
        height: 100%;
        // height: 50upx;
      }
    }
    .service-list {
      padding: 100upx 226upx 0upx 56upx;
      display: flex;
      width: 100%;
      justify-content: space-between;
      box-sizing: border-box;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 84upx;
        height: 108upx;
        &:last-child {
          .name {
            border: none;
          }
        }

        .img {
          width: 60upx;
          height: 60upx;
          // padding-bottom: 10upx;
        }

        .name {
          font-size: 28upx;
          color: #ffffff;
          border-right: 1px solid #ffffff;
          width: 82upx;
          height: 38upx;
          text-align: center;
        }
      }
    }
    .girl {
      width: 198upx;
      height: 298upx;
      position: absolute;
      top: 140upx;
      right: 12upx;
    }
    .w {
      margin: 40upx 34upx 0upx 34upx;
      .w1 {
        position: relative;
        // top: 154upx;
        width: 100%;
        height: 720upx;
        border-radius: 20upx;
        background: linear-gradient(180deg, #ffe5cc 59%, #ffffff 86%);
        box-shadow: inset 0upx 8upx 20upx 0upx #ffffff;
        .list {
          padding-top: 600upx;
          display: flex;
          justify-content: space-around;
          .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .number {
              font-size: 44upx;
              font-weight: bold;
              color: #e95d20;
            }
            .text {
              font-size: 28upx;
              color: #999999;
            }
          }
        }
      }
      .w2 {
        position: relative;
        top: -720upx;
        width: 100%;
        height: 572upx;
        border-radius: 20upx;
        background: #ffffff;
        box-shadow: 0upx 10upx 20upx 0upx #ffe5cc;
        .title {
          padding: 30upx 188upx 0upx 188upx;
          display: flex;
          justify-content: space-between;
          font-size: 36upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .img-list {
          display: flex;
          justify-content: space-between;
          padding: 22upx 42upx 22upx 42upx;

          .people {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .a {
              width: 184upx;
              height: 214upx;
            }
            .round {
              width: 152upx;
              height: 22upx;
            }
            .name {
              font-size: 32upx;
              font-weight: bold;
              color: #ffffff;
              position: absolute;
              bottom: 26upx;
            }
          }
        }
        .s-list {
          padding: 0upx 46upx 0upx 52upx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            .img {
              width: 80upx;
              height: 80upx;
            }
            .shadow {
              width: 60upx;
              height: 14upx;
              // position: relative;
              // top: -10upx;
            }
            .text {
              font-size: 28upx;
              font-weight: 500;
              color: #3d3d3d;
              // position: relative;
              // top: -20upx;
            }
          }
        }
        .more {
          display: flex;
          justify-content: center;
          margin-top: 16upx;
          .text {
            font-size: 28upx;
            color: #999999;
          }
          .img {
            width: 40upx;
            height: 40upx;
          }
        }
      }
    }
  }
  .main {
    width: 100%;
    // height: 200upx;
    background: #f1f2f6;
    padding: 140upx 30upx 200upx 30upx;
    box-sizing: border-box;
    .jx {
      display: flex;
      justify-content: space-between;
      .left {
        position: relative;
        width: 50%;
        // width: 346upx;
        height: 380upx;
        border-radius: 20upx;
        background: linear-gradient(214deg, #f9dfe3 24%, #cde1fd 87%);
        .red {
          width: 130upx;
          height: 40upx;
          border-radius: 20upx 0upx 20upx 0upx;
          background: #fa3445;
          font-size: 24upx;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          line-height: 40upx;
        }

        .title-list {
          display: flex;
          justify-content: space-between;
          padding: 16upx 80upx 10upx 16upx;
          .title {
            font-size: 28upx;
            font-weight: 500;
            // color: #3d3d3d;
          }
        }
        .abc {
          padding: 0upx 20upx 12upx 14upx;
          .order {
            width: 140upx;
            height: 40upx;
            font-size: 24upx;
            font-weight: 500;
            color: #fa3445;
            border-radius: 100upx;
            border: 1upx solid #fa3445;
            text-align: center;
            line-height: 40upx;
          }
          .hand {
            width: 100%;
            // width: 310upx;
            height: 264upx;
            position: relative;
            top: -44upx;
          }
          .money {
            display: flex;
            flex-direction: column;
            height: 160upx;
            // width: 0upx;
            justify-content: space-evenly;
            position: absolute;
            top: 120upx;
            right: 0upx;
            .m1 {
              width: 44upx;
              height: 24upx;
            }
            .m2 {
              width: 12upx;
              height: 10upx;
            }
            .m3 {
              width: 12upx;
              height: 10upx;
            }
            .m4 {
              width: 40upx;
              height: 24upx;
            }
            .m5 {
              width: 12upx;
              height: 10upx;
            }
            .m6 {
              width: 56upx;
              height: 56upx;
            }
          }
        }
      }
      .right {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .member {
          width: 100%;
          // width: 320upx;
          height: 170upx;
          border-radius: 20upx;
          background: #ffe5cc;
          display: flex;
          justify-content: space-between;
          position: relative;
          .l {
            width: 156upx;
            // height: 0upx;
            .orange {
              width: 130upx;
              height: 40upx;
              border-radius: 20upx 0upx 20upx 0upx;
              background: #fe753f;
              font-size: 24upx;
              font-weight: 500;
              color: #ffffff;
              text-align: center;
              line-height: 40upx;
            }
            .title {
              padding-top: 10upx;
              padding-left: 12upx;
              .text {
                font-size: 28upx;
                font-weight: 500;
                // color: #3D3D3D;
              }
            }
          }
          .r {
            width: 50%;
            .img {
              // width: 100%;
              width: 142upx;
              height: 166upx;
            }
            .open {
              width: 140upx;
              height: 40upx;
              font-size: 24upx;
              font-weight: 500;
              color: #fa3445;
              border-radius: 100upx;
              border: 1upx solid #fa3445;
              text-align: center;
              line-height: 40upx;
              position: absolute;
              bottom: 12upx;
            }
          }
        }
        .collate {
          width: 100%;
          // width: 320upx;
          height: 170upx;
          border-radius: 20upx;
          background: #dff8fd;
          display: flex;
          justify-content: space-between;
          position: relative;
          .l {
            width: 156upx;
            // height: 0upx;
            .blue {
              width: 130upx;
              height: 40upx;
              border-radius: 20upx 0upx 20upx 0upx;
              background: #1b90fb;
              font-size: 24upx;
              font-weight: 500;
              color: #ffffff;
              text-align: center;
              line-height: 40upx;
            }
            .title {
              padding-top: 10upx;
              padding-left: 12upx;
              .text {
                font-size: 28upx;
                font-weight: 500;
                // color: #3D3D3D;
              }
            }
          }
          .r {
            width: 50%;
            display: flex;
            justify-content: space-around;
            .img {
              // width: 100%;
              width: 98upx;
              height: 104upx;
            }
            .coll {
              width: 140upx;
              height: 40upx;
              font-size: 24upx;
              font-weight: 500;
              color: #fa3445;
              border-radius: 100upx;
              border: 1upx solid #fa3445;
              text-align: center;
              line-height: 40upx;
              position: absolute;
              bottom: 12upx;
            }
          }
        }
      }
    }
    .station {
      width: 100%;
      height: 464upx;
      border-radius: 20upx;
      background: linear-gradient(180deg, #fef4ea -12%, #ffffff 120%);
      margin-top: 52upx;

      .ju {
        padding: 18upx 16upx 0upx 16upx;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            width: 364upx;
            height: 34upx;
          }
          .more {
            width: 40upx;
            height: 40upx;
          }
        }
        .service {
          font-size: 28upx;
          color: #999999;
          padding-top: 6upx;
          padding-bottom: 18upx;
        }
        .img {
          width: 100%;
          height: 316upx;
        }
      }
    }
    .share {
      margin: 40upx 320upx 28upx 18upx;
      display: flex;
      justify-content: space-between;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text {
          font-size: 36upx;
          color: #3d3d3d;
        }
        .img {
          width: 84upx;
          height: 12upx;
        }
      }
    }
    .fx {
      position: relative;
      .img {
        width: 100%;
        height: 260upx;
        position: relative;
        top: 10upx;
      }
      .midd {
        width: 70%;
        left: 15%;
        position: absolute;
        top: 20upx;
        .tip {
          width: 239.75px;
          height: 108.61px;
        }
      }
      .white {
        width: 100%;
        height: 608upx;
        background: #ffffff;
        .z {
          padding: 0upx 26upx;
          .w3 {
            width: 100%;
            height: 200upx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1upx solid #d8d8d8;

            &:last-child {
              border: none;
            }

            .brief {
              width: 410upx;
              height: 92upx;
              .text {
                font-size: 32upx;
                font-weight: 500;
                color: #3d3d3d;
              }
            }
            .m {
              width: 200upx;
              height: 120upx;
              .image {
                width: 100%;
                height: 120upx;
              }
              .mid {
                width: 200upx;
                height: 56upx;
                background: rgba(0, 0, 0, 0.5);
                font-size: 36upx;
                color: #ffffff;
                text-align: center;
                font-weight: bold;
                position: relative;
                top: -96upx;
              }
            }
          }
        }
      }
    }
    .nearby {
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
      margin: 52upx 0upx 22upx 24upx;
    }
    .supermarket {
      width: 100%;
      height: 436upx;
      margin-top: 36upx;
      border-radius: 20upx;
      background: linear-gradient(181deg, #ffe7d0 0%, #ffffff 99%);
      .mid {
        padding: 26upx 14upx 16upx 30upx;
        .name-list {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            font-size: 36upx;
            font-weight: bold;
            color: #3d3d3d;
          }
          .more {
            width: 40upx;
            height: 40upx;
          }
        }
        .goods-list {
          width: 98%;
          display: flex;
          justify-content: space-between;
          .goods {
            padding-top: 12upx;
            width: 300upx;

            .good {
              width: 300upx;
              height: 220upx;
            }
            .good-name {
              margin-top: 6upx;
              font-size: 36upx;
              font-weight: 500;
              color: #3d3d3d;
            }
            .service-number {
              display: flex;
              font-size: 14px;
              font-weight: 400;
              margin-top: 6upx;
              .already {
                color: #999999;
              }
              .number {
                color: #3d3d3d;
              }
              .fate {
                color: #999999;
              }
            }
          }
        }
      }
    }
  }
}
</style>
