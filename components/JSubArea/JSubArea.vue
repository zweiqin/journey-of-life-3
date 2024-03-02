<template>
	<view class="j-city">
		<view
			class="value" :style="{
				color: text ? color ? color : '' : '#999'
			}" @click="open"
		>
			{{ text ? text : placeholder || "请选择地区" }}
		</view>
		<uni-popup ref="popup" type="bottom" @change="onPopupStatusChange">
			<view class="city-wrapper">
				<view class="header">
					<view class="citys">
						<view
							v-for="(item, index) in levelList" :key="item.level"
							class="item" :class="{
								active: current === item.level
							}"
						>
							<!-- {{ item.text }} -->
							{{ areaInfo[item.level - 1].text || item.text }}
						</view>
					</view>
					<button
						class="confirm" style="color: #fa5151;" :style="{
							color: areaInfo[areaInfo.length - 1].text ? '#fa5151' : '#8b8b8b'
						}" @click="handleConfirmArea"
					>
						确定
					</button>
				</view>

				<view class="body">
					<ul>
						<li
							v-for="item in data" :key="item.id" :class="{
								active: item.id === areaInfo[current - 1].id
							}" @click="chooseCity(item)"
						>
							{{ item.name }}
						</li>
					</ul>
				</view>
				<view style="width: 100%;display: flex;justify-content: flex-end;margin-top: 12rpx;">
					<tui-button
						type="warning" width="180rpx" height="50rpx" style="border-radius: 50rpx;"
						@click="handleResetting"
					>
						重置选择
					</tui-button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { getCityManageAreaTreeOneApi } from '../../api/anotherTFInterface'

export default {
	name: 'JSubArea',
	props: {
		text: String,
		placeholder: String,
		color: String,
		code: Number
	},
	data() {
		return {
			current: 1,
			levelList: [ {
				text: '1级区域',
				level: 1
			} ],
			data: [],
			areaInfo: [ {
				text: '',
				id: null,
				parentId: ''
			} ]
		}
	},

	mounted() {
		this.getCityFirst({ parentId: this.code })
	},
	methods: {
		// 打开popup
		open() {
			this.$refs.popup.open('bottom')
		},

		// 第一次获取地址信息
		getCityFirst(data) {
			getCityManageAreaTreeOneApi(data).then((res) => {
				// console.log(res)
				this.data = res.data
			})
		},

		// 获取地址信息
		getCity(data) {
			getCityManageAreaTreeOneApi(data)
				.then((res) => {
					// console.log(res)
					if (res.data && res.data.length) {
						this.levelList.push({
							text: (this.levelList.length + 1) + '级区域',
							level: this.levelList.length + 1
						})
						this.areaInfo.push({
							text: '',
							id: null,
							parentId: ''
						})
						this.current += 1
						this.data = res.data
					}
				})
				.catch(() => {
					this.levelList.push({
						text: (this.levelList.length + 1) + '级区域',
						level: this.levelList.length + 1
					})
					this.areaInfo.push({
						text: '',
						id: null,
						parentId: ''
					})
					this.current += 1
					this.data = []
				})
		},

		// 选择区域
		chooseCity(cityInfo) {
			this.areaInfo[this.current - 1].text = cityInfo.name
			this.areaInfo[this.current - 1].id = cityInfo.id
			this.areaInfo[this.current - 1].parentId = cityInfo.id
			this.getCity({
				parentId: cityInfo.id
			})
		},

		// 监控popup的状态发生改变
		onPopupStatusChange(e) {
			this.current = 1
			this.getCityFirst({ parentId: this.code })
			if (!e.show) {
				this.areaInfo = [ {
					text: '',
					id: null,
					parentId: ''
				} ]
				this.levelList = [ {
					text: '1级区域',
					level: 1
				} ]
			}
		},

		handleResetting() {
			this.current = 1
			this.getCityFirst({ parentId: this.code })
			this.areaInfo = [ {
				text: '',
				id: null,
				parentId: ''
			} ]
			this.levelList = [ {
				text: '1级区域',
				level: 1
			} ]
		},

		// 点击确定按钮
		handleConfirmArea() {
			if (!this.areaInfo[this.areaInfo.length - 1].text) return
			const areaString = this.areaInfo.reduce((total, value, index, arr) => total + value.text, '')
			this.$emit('confirm', { areaInfo: this.areaInfo, area: areaString })
			this.$refs.popup.close()
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.j-city {
	.active {
		color: #fa5151;
	}

	.city-wrapper {
		background-color: #fff;
		height: 600upx;
		padding: 40upx;
		box-sizing: border-box;
		.flex();
		flex-direction: column;

		.header {
			width: 100%;
			.flex();
			border-bottom: 1upx solid #ccc;
			padding-bottom: 10upx;
			height: 40upx;

			.citys {
				.flex(center, flex-start);
				color: #8b8b8b;

				.item {
					width: 100upx;
					margin-right: 20px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					transition: all 350ms;
				}
			}

			.confirm {
				padding: 0 2upx;
				line-height: 1;
				margin: 0;
				font-size: 24upx;
				color: #fa5151;
				transition: all 350ms;
			}
		}

		.body {
			flex: 1;
			width: 100%;
			// background: #fa5151;
			overflow-y: auto;

			ul {
				margin: 0;
				padding: 0;

				li {
					margin: 0;
					padding: 20upx 0;
					transition: all 350ms;

					&.active {
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
