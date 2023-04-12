<template>
	<view class="account-book-container">
		<view class="main">
			<NewHeader
				title="活动中心"
				position="left"
				top="37%"
				:left="-10"
				color="#fff"
				padding="0 0 20upx 0upx"
				tabbar="/pages/user/user"
				@back="handleBack"
			>
				<!-- <block slot="right">
					<tui-icon name="share" color="#fff"></tui-icon>
					</block> -->
			</NewHeader>

			<Extension :data="extensionData"></Extension>

			<view style="width: 100%;border-top-left-radius: 20upx;border-top-right-radius: 20upx;overflow: hidden;">
				<tui-tabs :tabs="tabs" :current-tab="currentTab" item-width="50%" @change="(e) => currentTab = e.index"></tui-tabs>
			</view>
			<view v-if="currentTab === 0">
				<tui-list-view title="">
					<tui-list-cell v-for="item in activityList" :key="item.id">
						<view @click="go('/user/sever/activityCenter/activity-code')">
							<view>{{ item.campaignsName }}</view>
							<view style="display: flex;justify-content: space-between;padding-top: 5px;font-size: 10px;color: #605D52;">
								<text>开始：{{ item.startDate }}</text>
								<text>结束：{{ item.endDate }}</text>
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
				<LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
			</view>
			<view v-if="currentTab === 1">
				<view>
					<!-- <block v-for="(item, index) in bindingUserList" :key="index">
						<tui-collapse :index="index" :current="currentIndex" @click="changeCurrent">
						<template #title>
						<tui-list-cell>{{ item.avatar }}{{ item.username }}</tui-list-cell>
						</template>
						<template #content>
						<view class="tui-content">{{ item.intro }}</view>
						</template>
						</tui-collapse>
						</block> -->
					<block>
						<tui-collapse :index="0" :current="currentIndex" @click="changeCurrent">
							<template #title>
								<tui-list-cell>
									<view style="display: flex;justify-content: start;align-items: center;">
										<Avatar margin="0 24upx 0 0" :src="bindingUserList.avatar" :size="40"></Avatar>
										<text style="padding-left: 10px;">{{ bindingUserList.username || '--' }}</text>
									</view>
								</tui-list-cell>
							</template>
							<template #content>
								<view v-if="bindingUserList.userDtoList">
									<tui-list-view title="">
										<tui-list-cell v-for="item in bindingUserList.userDtoList" :key="item.id">
											<view style="display: flex;justify-content: start;align-items: center;">
												<view>
													<Avatar margin="0 24upx 0 0" :src="item.avatar" :size="40"></Avatar>
													<text style="padding-left: 10px;">{{ item.username || '--' }}</text>
												</view>
												<text>佣金：{{ item.userDto.amount || '0' }}</text>
											</view>
										</tui-list-cell>
									</tui-list-view>
								</view>
								<view v-else>暂无数据</view>
							</template>
						</tui-collapse>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Extension from './cpns/extension.vue'
import { getUserIncomeApi, getUserCrmListApi, getBindingUserApi } from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'ActivityCenter',
	components: {
		Extension
	},

	data() {
		return {
			extensionData: {},
			fansData: {},
			currentTab: 0,
			tabs: [{
				name: '快乐分享'
			}, {
				name: '我的粉丝'
			}],

			activityList: [],
			queryInfo: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none',

			bindingUserList: [],
			currentIndex: -1

		}
	},

	onLoad() {
		getUserIncomeApi({
			userId: getUserId()
		}).then(({ data }) => {
			this.extensionData = {
				accumulated: data.accumulated,
				withdrawal: data.withdrawal,
				before: data.before
			}
			// this.fansData = {
			// 	superPartner: data.superPartner,
			// 	partner: data.partner,
			// 	ordinaryMember: data.ordinaryMember
			// }
			// this.genData = data.orderVoList
			// this.analysisData = data.orderVoList
		})
		this.getUserCrmList()
		this.getBindingUser()
	},
	// 触底加载
	onReachBottom() {
		if (this.totalPages <= this.queryInfo.page) {
			return 'no-more'
		}
		if (this.activityList.length < this.queryInfo.size) {
			return 'lack'
		}
		this.queryInfo.page++
		this.getUserCrmList(true)
	},

	methods: {
		async getUserCrmList(isLoadmore) {
			const res = await getUserCrmListApi(this.queryInfo)
			if (res.errno === 0) {
				this.totalPages = res.data.totalPages
				if (isLoadmore) {
					// this.activityList.push(...res.data.smartList.map((item) => ({
					this.activityList.push(...res.data)
				} else {
					this.activityList = [ ...res.data ]
				}
			}
			this.status = 'none'
		},

		async getBindingUser() {
			const res = await getBindingUserApi({ userId: getUserId() })
			// this.bindingUserList = res.data.userDtoList||[]
			this.bindingUserList = res.data
		},

		changeCurrent(e) {
			// 可关闭自身
			this.currentIndex = this.currentIndex == e.index ? -1 : e.index
		},

		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.account-book-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f9f9f9;

  .main {
    padding: 72upx 0 0;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 2;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 500upx;
      top: 0;
      left: 0;
      position: absolute;
      background: url("../../../static/images/user/activity/activity-bg.png") no-repeat center/cover;
      // background-color: #e95d20;
      // border-bottom-left-radius: 400upx 40upx;
      // border-bottom-right-radius: 400upx 40upx;
      z-index: -1;
    }

		/deep/ .tui-tabs-view {
			width: 100%!important;
		}

    /deep/ .title {
      color: #fff;
    }

    /deep/ .slot-pane {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item {
        width: 25%;
				padding: 40upx 20upx;
				color: #FFFFFF;
        text-align: center;
				border-radius: 24px;
				background: rgba(255, 255, 255, 0.32);
				border: 2px solid rgba(255, 255, 255, 0.16);

        .value {
          font-size: 40upx;
          font-weight: bold;
          margin-top: 10upx;
        }
      }
    }
  }
}
</style>
