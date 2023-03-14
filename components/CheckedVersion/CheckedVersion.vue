<template>
  <div>
    <slot></slot>
    <tui-popup
      :duration="500"
      :modeClass="['fade']"
      :styles="styles"
      :show="logVisible"
    >
      <view class="logs-list-container">
        <view class="logs-container">
          <view class="title">有新版本啦！</view>
          <ul>
            <li
              v-for="(item, index) in logs &&
              logs.logDesc &&
              logs.logDesc.split(',')"
              :key="index"
            >
              <tui-icon
                name="check"
                :size="20"
                color="rgb(233, 93, 32)"
              ></tui-icon>
              {{ item }}
            </li>
          </ul>
        </view>
        <view class="op-container">
          <button class="uni-btn cancel" @click="logVisible = false">
            暂不更新
          </button>
          <button @click="handleDownloadApp" class="uni-btn confirm">
            更新
          </button>
        </view>
      </view>
    </tui-popup>

    <tui-popup
      :duration="500"
      :modeClass="['fade']"
      :styles="styles"
      :show="progressVisible"
    >
      <view class="progress-wrapper">
        <tui-circular-progress
          :diam="80"
          activeMode="forwards"
          percentText="更新中..."
          fontColor="#fc6640"
          progressColor="#fc6640"
          :percentage="progress"
        ></tui-circular-progress>
      </view>
    </tui-popup>
  </div>
</template>

<script>
import { checkedVersionApi } from '../../api/app'
export default {
  data() {
    return {
      logVisible: false,
      logs: [],
      styles: {
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': 'rgba(0,0,0,0.4)',
      },
      progress: 0,
      progressVisible: false,
    }
  },
  methods: {
    async checkedVersion(tag) {
      const _this = this
      uni.getSystemInfo({
        success: async function (res) {
          const { data } = await checkedVersionApi({ version: res.appVersion })

          if (!data.isNew) {
            _this.logVisible = true
            _this.logs = data.data
          } else {
            if (!tag) {
              uni.showToast({
                title: '当前已是最新版本',
                duration: 2000,
                icon: 'none',
              })
            }
          }
        },
      })
    },

    // 更新app
    handleDownloadApp() {
      const downTask = plus.downloader.createDownload(
        this.logs.url,
        {},
        this.downloadCallback
      )
      downTask.addEventListener('statechanged', this.listenStatechanged)
      downTask.start()

      this.logVisible = false
      this.progressVisible = true
    },

    listenStatechanged(task) {
      this.progress = parseInt(
        (parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100
      )
    },

    downloadCallback(file, status) {
      if (status != 200) return console.log('下载失败')
      this.progressVisible = false
      plus.runtime.openFile(file.filename) //运行apk
    },
  },
}
</script>

<style lang="less" scoped>
.logs-list-container {
  width: 600upx;
  height: 800upx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10upx;

  .logs-container {
    flex: 1;
    padding: 20upx;
    box-sizing: border-box;
    width: 100%;
    overflow: scroll;

    .title {
      text-align: center;
      margin-bottom: 30upx;
      margin-top: 10upx;
    }

    ul {
      padding: 0;
      margin: 0;
      width: 560upx;
      box-sizing: border-box;

      li {
        color: #000;
        font-size: 28upx;
        line-height: 2;
        display: flex;
        align-items: center;

        /deep/ .tui-icon {
          margin-right: 10upx !important;
        }
      }
    }
  }

  .op-container {
    height: 100upx;
    width: 600upx;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .uni-btn {
      width: 140upx;
      height: 80upx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      // background-color: rgb(164, 20, 20);
      margin-right: 30upx;
      border-radius: 10upx;
      transition: all 350ms;

      &:active {
        background-color: rgb(235, 235, 235);
      }

      &.cancel {
        color: #828282;
      }

      &.confirm {
        color: rgb(233, 93, 32);
      }
    }
  }
}

.progress-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240upx;
  width: 240upx;
  background-color: #fff;
  border-radius: 20upx;
}
</style>
