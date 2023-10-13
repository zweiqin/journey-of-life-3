<template>
	<view class="store-filter-container">
		<view
			style="display: flex;justify-content: space-between;align-items: center;font-size: 30upx;"
			@click="dropdownShow = true"
		>
			<view
				:style="{ color: primaryFilterBoxObj.quanbumeishi ? '#ff4b10' : '#000000' }"
				@click="dropdownType = 'classification'"
			>
				<text>{{ classificationText }}</text>
				<tui-icon
					name="arrowdown" :color="primaryFilterBoxObj.quanbumeishi ? '#ff4b10' : '#888889'" :size="12"
					margin="0 0 0 6upx"
				></tui-icon>
			</view>
			<view :style="{ color: primaryFilterBoxObj.fujin ? '#ff4b10' : '#000000' }" @click="dropdownType = 'nearby'">
				<text>{{ nearbyText }}</text>
				<tui-icon
					name="arrowdown" :color="primaryFilterBoxObj.fujin ? '#ff4b10' : '#888889'" :size="12"
					margin="0 0 0 6upx"
				></tui-icon>
			</view>
			<view :style="{ color: primaryFilterBoxObj.zhinengpaixu ? '#ff4b10' : '#000000' }" @click="dropdownType = 'sort'">
				<text>{{ sortText }}</text>
				<tui-icon
					name="arrowdown" :color="primaryFilterBoxObj.zhinengpaixu ? '#ff4b10' : '#888889'" :size="12"
					margin="0 0 0 6upx"
				></tui-icon>
			</view>
			<view :style="{ color: filterText === '筛选 ' ? '#000000' : '#ff4b10' }" @click="dropdownType = 'filter'">
				<text>{{ filterText }}</text>
				<tui-icon
					name="arrowdown" :color="filterText === '筛选 ' ? '#888889' : '#ff4b10'" :size="12"
					margin="0 0 0 6upx"
				></tui-icon>
			</view>
		</view>

		<tui-top-dropdown
			:show="dropdownShow" :height="0" :translatey="translatey" background-color="#ffffff"
			style="position: fixed;left: 0;z-index: 996;" @close="handleCloseDropdown()"
		>
			<view style="padding: 6upx 24upx 26upx;">
				<view style="display: flex;justify-content: space-between;align-items: center;font-size: 30upx;">
					<view
						:style="{ color: primaryFilterBoxObj.quanbumeishi || (dropdownType === 'classification') ? '#ff4b10' : '#000000' }"
						@click="dropdownType === 'classification' ? handleCloseDropdown() : dropdownType = 'classification'"
					>
						<text>{{ classificationText }}</text>
						<tui-icon
							name="arrowdown"
							:color="primaryFilterBoxObj.quanbumeishi || (dropdownType === 'classification') ? '#ff4b10' : '#888889'"
							:size="12" margin="0 0 0 6upx"
						></tui-icon>
					</view>
					<view
						:style="{ color: primaryFilterBoxObj.fujin || (dropdownType === 'nearby') ? '#ff4b10' : '#000000' }"
						@click="dropdownType === 'nearby' ? handleCloseDropdown() : dropdownType = 'nearby'"
					>
						<text>{{ nearbyText }}</text>
						<tui-icon
							name="arrowdown"
							:color="primaryFilterBoxObj.fujin || (dropdownType === 'nearby') ? '#ff4b10' : '#888889'" :size="12"
							margin="0 0 0 6upx"
						></tui-icon>
					</view>
					<view
						:style="{ color: primaryFilterBoxObj.zhinengpaixu || (dropdownType === 'sort') ? '#ff4b10' : '#000000' }"
						@click="dropdownType === 'sort' ? handleCloseDropdown() : dropdownType = 'sort'"
					>
						<text>{{ sortText }}</text>
						<tui-icon
							name="arrowdown"
							:color="primaryFilterBoxObj.zhinengpaixu || (dropdownType === 'sort') ? '#ff4b10' : '#888889'" :size="12"
							margin="0 0 0 6upx"
						></tui-icon>
					</view>
					<view
						:style="{ color: (filterText === '筛选 ') && (dropdownType !== 'filter') ? '#000000' : '#ff4b10' }"
						@click="dropdownType === 'filter' ? handleCloseDropdown() : dropdownType = 'filter'"
					>
						<text>{{ filterText }}</text>
						<tui-icon
							name="arrowdown"
							:color="(filterText === '筛选 ') && (dropdownType !== 'filter') ? '#888889' : '#ff4b10'" :size="12"
							margin="0 0 0 6upx"
						></tui-icon>
					</view>
				</view>
				<view style="position: relative;max-height: 68vh;margin-top: 20upx;overflow-y: auto;">
					<view v-if="dropdownType === 'classification'">
						classification二级目录里面包含三极目录
					</view>
					<view v-else-if="dropdownType === 'nearby'">
						<view style="font-size: 28upx;">
							<tui-icon name="position" color="#888889" :size="16" margin="0 10upx 0 6upx"></tui-icon>我的附近
						</view>
						<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10upx;text-align: center;">
							<view
								v-for="(item, index) in 6" :key="index"
								style="width: 20%;padding: 10upx 0;margin: 18upx 15upx 0;font-size: 26upx;background-color: #f4f4f4;border-radius: 16upx;"
								:style="{
									border: (!primaryFilterBoxObj.fujin && (index === 0)) || ((primaryFilterBoxObj.fujin / 0.25 - index) / index === index) ? '2upx solid #ff4b10' : '2upx solid #fff1ec',
									color: (!primaryFilterBoxObj.fujin && (index === 0)) || ((primaryFilterBoxObj.fujin / 0.25 - index) / index === index) ? '#ff4b10' : '#000000'
								}" @click="handleSelectNearby(index * ((index + 1) * 0.25))"
							>
								{{ index === 0 ? '附近' : `${index * ((index + 1) * 0.25)}km` }}
							</view>
						</view>
					</view>
					<view v-else-if="dropdownType === 'sort'">
						<view
							v-for="(item, index) in ['智能排序', ...['销量优先', '距离优先', '好评优先', '低价优先', '高价优先']]" :key="index"
							style="padding: 12upx 0;"
							:style="{ color: primaryFilterBoxObj.zhinengpaixu === index ? '#ff4b10' : '#000000' }"
							@click="handleSelectSort(index, item)"
						>
							{{ item }}
						</view>
					</view>
					<view v-else-if="dropdownType === 'filter'">
						<view style="padding-top: 40upx;">
							<view style="font-size: 28upx;">营业时间</view>
							<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10upx;text-align: center;">
								<view
									v-for="(item, index) in 13" :key="index"
									style="width: 22%;padding: 10upx 0;margin: 18upx 6upx 0;font-size: 26upx;background-color: #f4f4f4;border-radius: 16upx;"
									:style="{
										border: filterTimeText.includes(index === 12 ? '24小时营业' : `${index * 2}-${index * 2 + 2}时`) ? '2upx solid #ff4b10' : '2upx solid #fff1ec',
										color: filterTimeText.includes(index === 12 ? '24小时营业' : `${index * 2}-${index * 2 + 2}时`) ? '#ff4b10' : '#000000'
									}" @click="handleSelectFilterTime(index === 12 ? '00:00-24:00' : (index * 2 + ':00').padStart(5, '0') + '-' + (index * 2 + 2 + ':00').padStart(5, '0'), index === 12 ? '24小时营业' : `${index * 2}-${index * 2 + 2}时`)"
								>
									{{ index === 12 ? '24小时营业' : `${index * 2}-${index * 2 + 2}时` }}
								</view>
							</view>
						</view>
						<view style="padding-top: 40upx;">
							<view style="font-size: 28upx;">餐厅服务</view>
							<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10upx;text-align: center;">
								<view
									v-for="(item, index) in ['买单', '在线订座', '在线排队', '外卖送餐']" :key="index"
									style="width: 22%;padding: 10upx 0;margin: 18upx 6upx 0;font-size: 26upx;background-color: #f4f4f4;border-radius: 16upx;"
									:style="{
										border: filterServeText.includes(item) ? '2upx solid #ff4b10' : '2upx solid #fff1ec',
										color: filterServeText.includes(item) ? '#ff4b10' : '#000000'
									}" @click="handleSelectFilterServe(index, item)"
								>
									{{ item }}
								</view>
							</view>
						</view>
						<view
							style="position: sticky;bottom: 2upx;margin: 20upx 0 0;display: flex;justify-content: space-between;background-color: #ffffff;"
						>
							<tui-button
								margin="10upx 8upx" height="92upx" type="gray" shape="circle"
								plain
								style="color: #000000!important;" @click="handleSelectFilterReset"
							>
								重置
							</tui-button>
							<tui-button
								margin="10upx 8upx" height="92upx" type="warning" shape="circle"
								style="background: linear-gradient(90deg, #ff5012 2%, #ff7c22 98%)!important;"
								@click="handleSelectFilterConfirm"
							>
								确定
							</tui-button>
						</view>
					</view>
					<view v-else>
						退出
					</view>
				</view>
			</view>
		</tui-top-dropdown>
	</view>
</template>

<script>
// import { xxx } from '../../../api/user'
export default {
	name: 'StorePrimaryFilterBox',
	props: {
		type: {
			type: [Number, String],
			require: true
		},
		translatey: {
			type: Number,
			default: 108
		}
	},
	data() {
		return {
			dropdownShow: false,
			dropdownType: '',
			classificationText: '全部美食',
			nearbyText: '附近',
			sortText: '智能排序',
			filterText: '筛选 ',
			filterTimeText: [],
			filterServeText: [],
			primaryFilterBoxObj: {
				quanbumeishi: '',
				fujin: '',
				zhinengpaixu: '',
				shaixuan: {
					yingyeshijian: [],
					cantingfuwu: []
				}
			}
		}
	},
	created() {
		// xxx({})
		// 	.then((res) => {
		// 		this.xxxList = res.data || []
		// 	})
	},
	methods: {
		handleCloseDropdown() {
			this.dropdownShow = false
			this.dropdownType = ''
			// console.log('handleCloseDropdown', this.dropdownType)
		},
		handleSelectNearby(e) {
			this.primaryFilterBoxObj.fujin = e || ''
			this.nearbyText = e ? `${e}km` : '附近'
			this.$emit('select', this.primaryFilterBoxObj)
			this.dropdownShow = false
		},
		handleSelectSort(e, name) {
			this.primaryFilterBoxObj.zhinengpaixu = e || ''
			this.sortText = name
			this.$emit('select', this.primaryFilterBoxObj)
			this.dropdownShow = false
		},
		handleSelectFilterTime(e, name) {
			// if (this.filterTimeText === name) {
			// 	this.primaryFilterBoxObj.shaixuan.yingyeshijian = ''
			// 	this.filterText = this.filterText.substring(0, 3) + ((Number(this.filterText.substring(3)) - 1) || '')
			// 	this.filterTimeText = ''
			// } else {
			// 	this.primaryFilterBoxObj.shaixuan.yingyeshijian = e
			// 	if (this.filterTimeText) {
			// 	} else {
			// 		this.filterText = this.filterText.substring(0, 3) + (Number(this.filterText.substring(3)) + 1)
			// 	}
			// 	this.filterTimeText = name
			// }
			// filterTimeText是数组的形式，表示可多选，里面元素类似于每一项的唯一值（类似id）
			if (this.filterTimeText.includes(name)) { // 点击已选择的那项营业时间
				this.primaryFilterBoxObj.shaixuan.yingyeshijian = this.primaryFilterBoxObj.shaixuan.yingyeshijian.filter((item) => item !== e) // 去除已选择的那项
				if (this.filterTimeText.length === 1) { // 有长度且长度等于1的时候才对筛选值减1（减1表示没有选择任何营业时间了）
					this.filterText = this.filterText.substring(0, 3) + ((Number(this.filterText.substring(3)) - 1) || '')
				}
				this.filterTimeText = this.filterTimeText.filter((item) => item !== name)
			} else { // 点击未选择的那项营业时间
				this.primaryFilterBoxObj.shaixuan.yingyeshijian = [...this.primaryFilterBoxObj.shaixuan.yingyeshijian.filter((item) => item !== e), e] // 增加未选择的那项（增加前可先去除重复的这项）
				if (this.filterTimeText.length) {
				} else { // filterTimeText数组长度从0到1，才能表示筛选值里面有了营业时间，才能加上营业时间这个1
					this.filterText = this.filterText.substring(0, 3) + (Number(this.filterText.substring(3)) + 1)
				}
				this.filterTimeText.push(name) // filterTimeText数组长度会加1
			}
			console.log('handleSelectFilterTime', this.filterTimeText)
		},
		handleSelectFilterServe(e, name) {
			if (this.filterServeText.includes(name)) {
				this.primaryFilterBoxObj.shaixuan.cantingfuwu = this.primaryFilterBoxObj.shaixuan.cantingfuwu.filter((item) => item !== e)
				if (this.filterServeText.length === 1) {
					this.filterText = this.filterText.substring(0, 3) + ((Number(this.filterText.substring(3)) - 1) || '')
				}
				this.filterServeText = this.filterServeText.filter((item) => item !== name)
			} else {
				this.primaryFilterBoxObj.shaixuan.cantingfuwu = [...this.primaryFilterBoxObj.shaixuan.cantingfuwu.filter((item) => item !== e), e]
				if (this.filterServeText.length) {
				} else {
					this.filterText = this.filterText.substring(0, 3) + (Number(this.filterText.substring(3)) + 1)
				}
				this.filterServeText.push(name)
			}
			console.log('handleSelectFilterServe', this.filterServeText)
		},
		handleSelectFilterReset() {
			this.primaryFilterBoxObj.shaixuan = {
				yingyeshijian: [],
				cantingfuwu: []
			}
			this.filterText = this.filterText.substring(0, 3)
			this.filterTimeText = []
			this.filterServeText = []
		},
		handleSelectFilterConfirm() {
			this.$emit('select', this.primaryFilterBoxObj)
			this.dropdownShow = false
		}
	}
}
</script>

<style lang="less" scoped>
.store-filter-container {
	padding: 0 30upx;
	box-sizing: border-box;
}
</style>
