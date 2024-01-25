<template>
	<view class="store-filter-container">
		<view
			style="display: flex;justify-content: space-between;align-items: center;font-size: 28upx;"
			@click="dropdownShow = true"
		>
			<view
				:style="{ color: primaryFilterBoxObj.currentClassifyId ? '#ff4b10' : '#000000' }"
				@click="dropdownType = 'classification'"
			>
				<text>{{ classificationText }}</text>
				<tui-icon
					name="arrowdown" :color="primaryFilterBoxObj.currentClassifyId ? '#ff4b10' : '#888889'" :size="12"
					margin="0 0 0 6upx"
				></tui-icon>
			</view>
			<view :style="{ color: primaryFilterBoxObj.distance ? '#ff4b10' : '#000000' }" @click="dropdownType = 'nearby'">
				<text>{{ nearbyText }}</text>
				<tui-icon
					name="arrowdown" :color="primaryFilterBoxObj.distance ? '#ff4b10' : '#888889'" :size="12"
					margin="0 0 0 6upx"
				></tui-icon>
			</view>
			<view
				:style="{ color: primaryFilterBoxObj.type || primaryFilterBoxObj.volume ? '#ff4b10' : '#000000' }"
				@click="dropdownType = 'sort'"
			>
				<text>{{ sortText }}</text>
				<tui-icon
					name="arrowdown" :color="primaryFilterBoxObj.type || primaryFilterBoxObj.volume ? '#ff4b10' : '#888889'"
					:size="12" margin="0 0 0 6upx"
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
				<view style="display: flex;justify-content: space-between;align-items: center;font-size: 28upx;">
					<view
						:style="{ color: primaryFilterBoxObj.currentClassifyId || (dropdownType === 'classification') ? '#ff4b10' : '#000000' }"
						@click="dropdownType === 'classification' ? handleCloseDropdown() : dropdownType = 'classification'"
					>
						<text>{{ classificationText }}</text>
						<tui-icon
							name="arrowdown"
							:color="primaryFilterBoxObj.currentClassifyId || (dropdownType === 'classification') ? '#ff4b10' : '#888889'"
							:size="12" margin="0 0 0 6upx"
						></tui-icon>
					</view>
					<view
						:style="{ color: primaryFilterBoxObj.distance || (dropdownType === 'nearby') ? '#ff4b10' : '#000000' }"
						@click="dropdownType === 'nearby' ? handleCloseDropdown() : dropdownType = 'nearby'"
					>
						<text>{{ nearbyText }}</text>
						<tui-icon
							name="arrowdown"
							:color="primaryFilterBoxObj.distance || (dropdownType === 'nearby') ? '#ff4b10' : '#888889'" :size="12"
							margin="0 0 0 6upx"
						></tui-icon>
					</view>
					<view
						:style="{ color: (primaryFilterBoxObj.type || primaryFilterBoxObj.volume) || (dropdownType === 'sort') ? '#ff4b10' : '#000000' }"
						@click="dropdownType === 'sort' ? handleCloseDropdown() : dropdownType = 'sort'"
					>
						<text>{{ sortText }}</text>
						<tui-icon
							name="arrowdown"
							:color="(primaryFilterBoxObj.type || primaryFilterBoxObj.volume) || (dropdownType === 'sort') ? '#ff4b10' : '#888889'"
							:size="12" margin="0 0 0 6upx"
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
						<view>
							<view v-if="classifyTreeList && classifyTreeList.length" style="display: flex;box-sizing: border-box;">
								<view style="background-color: #f3f3f3;max-height: 85vh;overflow-y: auto;">
									<view
										v-for="item in classifyTreeList" :key="item.id"
										style="max-width: 286upx;padding: 20upx 28upx;word-break: break-all;box-sizing: border-box;"
										:style="{ backgroundColor: item.id === currentClassifyTab ? '#ffffff' : 'transparent' }"
										@click="(currentClassifyTab = item.id) && (currentClassifyList = classifyTreeList.find(part => part.id === item.id).childs || [])"
									>
										{{ item.levelName }}
									</view>
								</view>
								<view style="flex: 1;padding: 20upx;max-height: 85vh;overflow-y: auto;">
									<view v-if="currentClassifyList && currentClassifyList.length">
										<view
											v-for="item in currentClassifyList" :key="item.id" style="padding: 20upx 18upx;"
											:style="{ color: item.id === primaryFilterBoxObj.currentClassifyId ? '#ff4b10' : '#000000' }"
											@click="handleSelectClassify(item)"
										>
											{{ item.levelName }}
										</view>
									</view>
									<view v-else style="margin: 40upx 0;text-align: center;">
										暂无数据~
									</view>
								</view>
							</view>
							<view v-else style="padding-bottom: 45upx;">
								<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无数据</tui-no-data>
							</view>
						</view>
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
									border: (!primaryFilterBoxObj.distance && (index === 0)) || ((primaryFilterBoxObj.distance / 0.25 - index) / index === index) ? '2upx solid #ff4b10' : '2upx solid #fff1ec',
									color: (!primaryFilterBoxObj.distance && (index === 0)) || ((primaryFilterBoxObj.distance / 0.25 - index) / index === index) ? '#ff4b10' : '#000000'
								}" @click="handleSelectNearby(index * ((index + 1) * 0.25))"
							>
								{{ index === 0 ? '附近' : `${index * ((index + 1) * 0.25)}km` }}
							</view>
						</view>
					</view>
					<view v-else-if="dropdownType === 'sort'">
						<view
							v-for="(item, index) in ['智能排序', ...['低价优先', '高价优先', '销量低优先', '销量高优先']]" :key="index"
							style="padding: 12upx 0;"
							:style="{ color: [ primaryFilterBoxObj.type ].includes(index) || [ primaryFilterBoxObj.volume ].includes(index - 2) ? '#ff4b10' : '#000000' }"
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
import { getShopOneClassifyApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'StorePrimaryFilterBox',
	props: {
		type: {
			type: String,
			require: true
		},
		parentClassifyId: {
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
			nearbyText: '附近',
			sortText: '智能排序',
			filterText: '筛选 ',
			filterTimeText: [],
			filterServeText: [],
			primaryFilterBoxObj: {
				currentClassifyId: '',
				distance: '',
				type: '',
				volume: '',
				shaixuan: {
					yingyeshijian: [],
					cantingfuwu: []
				}
			},

			// 分类数据
			classifyTreeList: [],
			currentClassifyTab: '',
			currentClassifyList: [],
			classificationText: '全部美食'
		}
	},
	created() {
		if ([ '6' ].includes(this.type)) {
			getShopOneClassifyApi({ classifyId: this.parentClassifyId })
				.then((res) => {
					this.classifyTreeList = res.data || []
					if (this.classifyTreeList && this.classifyTreeList.length) {
						(this.currentClassifyTab = this.classifyTreeList[0].id) && (this.currentClassifyList = this.classifyTreeList[0].childs || [])
					}
				})
		}
	},
	methods: {
		// mapTree(data) {
		// 	data.forEach((items) => {
		// 		items.text = items.label
		// 		if (level === '1' && items.children && items.children.length === 0) {
		// 			items.children[0] = { text: '无', value: 0, children: [ { text: '无', value: 0 } ] }
		// 		} else if (items.children) {
		// 			this.mapTree(items.children, String(Number(level) + 1))
		// 		}
		// 	})
		// },
		handleCloseDropdown() {
			this.dropdownShow = false
			this.dropdownType = ''
			// console.log('handleCloseDropdown', this.dropdownType)
		},
		handleSelectClassify(e) {
			this.primaryFilterBoxObj.currentClassifyId = e.id || ''
			this.classificationText = e.levelName
			this.$emit('select', this.primaryFilterBoxObj)
			this.dropdownShow = false
		},
		handleSelectNearby(e) {
			this.primaryFilterBoxObj.distance = e || ''
			this.nearbyText = e ? `${e}km` : '附近'
			this.$emit('select', this.primaryFilterBoxObj)
			this.dropdownShow = false
		},
		handleSelectSort(e, name) {
			if (e === 0) {
				this.primaryFilterBoxObj.type = this.primaryFilterBoxObj.volume = ''
			} else if ((e === 1) || (e === 2)) {
				this.primaryFilterBoxObj.type = e
				this.primaryFilterBoxObj.volume = ''
			} else if ((e === 3) || (e === 4)) {
				this.primaryFilterBoxObj.type = ''
				this.primaryFilterBoxObj.volume = e - 2
			}
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
