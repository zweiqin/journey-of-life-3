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
							class="item" :class="{
								active: current === 'province'
							}" @click="change('province')"
						>
							{{ areaInfo.province.text || "省份" }}
						</view>
						<view
							class="item" :class="{
								active: current === 'city'
							}" @click="change('city')"
						>
							{{ areaInfo.city.text || "城市" }}
						</view>
						<view
							class="item" :class="{
								active: current === 'county'
							}" @click="change('county')"
						>
							{{ areaInfo.county.text || "区县" }}
						</view>
						<view
							class="item" :class="{
								active: current === 'township'
							}" @click="change('township')"
						>
							{{ areaInfo.township.text || "乡镇" }}
						</view>
					</view>
					<button
						class="confirm" :style="{
							color: areaInfo.province.text ? '#fa5151' : '#8b8b8b'
						}" @click="handleConfirmArea"
					>
						确定
					</button>
				</view>

				<view class="body">
					<ul>
						<li
							v-for="item in data" :key="item.id" :class="{
								active: item.id === areaInfo[current].id
							}" @click="chooseCity(item)"
						>
							{{ item.name }}
						</li>
					</ul>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { getAreaRegionApi } from '../../api/user'

export default {
	name: 'JArea',
	props: {
		text: String,
		placeholder: String,
		color: String
	},
	data() {
		return {
			current: 'province',
			data: [],
			areaInfo: {
				province: {
					text: '',
					id: null,
					parentId: ''
				},
				city: {
					text: '',
					id: null,
					parentId: ''
				},
				county: {
					text: '',
					id: null,
					parentId: ''
				},
				township: {
					text: '',
					id: null,
					parentId: ''
				}
			},
			areaString: ''
		}
	},

	mounted() {
		this.getCity({ parentId: 0 })
	},
	methods: {
		// 打开popup
		open() {
			this.$refs.popup.open('bottom')
		},

		// 切换区域
		change(field) {
			if (this.current === field) {
				return
			}
			if (field === 'city' && !this.areaInfo.province.id) {
				return
			}
			if (field === 'county' && !this.areaInfo.city.id) {
				return
			}
			if (field === 'township' && !this.areaInfo.county.id) {
				return
			}
			if (field === 'province') {
				this.getCity({
					parentId: 0
				})
			} else if (field === 'city') {
				this.getCity({
					parentId: this.areaInfo.province.id
				})
			} else if (field === 'county') {
				this.getCity({
					parentId: this.areaInfo.city.id
				})
			} else if (field === 'township') {
				this.getCity({
					parentId: this.areaInfo.county.id
				})
			}
			this.current = field
		},

		// 获取地址信息
		getCity(data) {
			getAreaRegionApi(data).then((res) => {
				// console.log(res)
				this.data = res.data
			})
		},

		// 选择区域
		chooseCity(cityInfo) {
			this.areaInfo[this.current].text = cityInfo.name
			this.areaInfo[this.current].id = cityInfo.id
			this.areaInfo[this.current].parentId = cityInfo.id
			if (this.current !== 'township') {
			}
			if (this.current === 'province') {
				this.areaInfo.city = {
					text: '',
					id: ''
				}
				this.areaInfo.county = {
					text: '',
					id: ''
				}
				this.areaInfo.township = {
					text: '',
					id: ''
				}
			} else if (this.current === 'city') {
				this.areaInfo.county = {
					text: '',
					id: ''
				}
				this.areaInfo.township = {
					text: '',
					id: ''
				}
			} else if (this.current === 'county') {
				this.areaInfo.township = {
					text: '',
					id: ''
				}
			}
		},

		// 监控popup的状态发生改变
		onPopupStatusChange(e) {
			this.current = 'province'
			this.getCity({
				parentId: 0
			})
			if (!e.show) {
				this.areaInfo = {
					province: {
						text: '',
						id: null
					},
					city: {
						text: '',
						id: null
					},
					county: {
						text: '',
						id: null
					},
					township: {
						text: '',
						id: null
					}
				}
			}
		},

		// 点击确定按钮
		handleConfirmArea() {
			if (!this.areaInfo.province.text) {
				return
			}
			this.areaString =
				this.areaInfo.province.text +
				this.areaInfo.city.text +
				this.areaInfo.county.text +
				this.areaInfo.township.text
			this.$emit('confirm', { ...this.areaInfo, area: this.areaString })
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
			overflow: scroll;

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
