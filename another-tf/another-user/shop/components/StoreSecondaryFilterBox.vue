<template>
	<view class="store-filter-container">
		<view>
			<view style="font-size: 40upx;font-weight: bold;">附近商家</view>
			<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;font-size: 30upx;">
				<view
					:style="{
						fontWeight: [{ name: '综合排序', id: '' }, ...sortList.slice(2)].some(item => item.name === sortText) ? 'bold' : 'normal',
						color: [{ name: '综合排序', id: '' }, ...sortList.slice(2)].some(item => item.name === sortText) ? '#222229' : '#979797'
					}" @click="dropdownShow = true"
				>
					<text>
						{{
							[{ name: '综合排序', id: '' }, ...sortList.slice(2)].some(item => item.name === sortText) ? sortText : '综合排序'
						}}
					</text>
					<tui-icon name="arrowdown" color="#888889" :size="12" margin="0 0 0 6upx"></tui-icon>
				</view>
				<view>
					<view
						v-for="(item, index) in sortList.slice(0, 2)" :key="index" style="display: inline-block;margin-left: 28upx;"
						:style="{
							fontWeight: item.name === sortText ? 'bold' : 'normal',
							color: item.name === sortText ? '#222229' : '#979797'
						}" @click="handleSelectFilter(item, index)"
					>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>

		<tui-top-dropdown
			:show="dropdownShow" :height="0" :translatey="translatey" background-color="#ffffff"
			style="position: fixed;left: 0;z-index: 996;" @close="dropdownShow = false"
		>
			<view style="padding: 6upx 24upx 26upx;">
				<view
					style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;font-size: 30upx;"
				>
					<view
						:style="{
							fontWeight: [{ name: '综合排序', id: '' }, ...sortList.slice(2)].some(item => item.name === sortText) ? 'bold' : 'normal',
							color: [{ name: '综合排序', id: '' }, ...sortList.slice(2)].some(item => item.name === sortText) ? '#222229' : '#979797'
						}"
					>
						<text>
							{{
								[{ name: '综合排序', id: '' }, ...sortList.slice(2)].some(item => item.name === sortText) ? sortText : '综合排序'
							}}
						</text>
						<tui-icon name="arrowdown" color="#ff4b10" :size="12" margin="0 0 0 6upx"></tui-icon>
					</view>
					<view>
						<view
							v-for="(item, index) in sortList.slice(0, 2)" :key="index" style="display: inline-block;margin-left: 28upx;"
							:style="{
								fontWeight: item.name === sortText ? 'bold' : 'normal',
								color: item.name === sortText ? '#222229' : '#979797'
							}" @click="handleSelectFilter(item, index)"
						>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view style="position: relative;max-height: 68vh;margin-top: 20upx;overflow-y: auto;">
					<view
						v-for="(item, index) in [{ name: '综合排序', id: '' }, ...sortList.slice(2)]" :key="index"
						style="padding: 18upx 0;" :style="{ color: item.name === sortText ? '#ff4b10' : '#333333' }"
						@click="handleSelectSort(item, index)"
					>
						{{ item.name }}
					</view>
				</view>
			</view>
		</tui-top-dropdown>
	</view>
</template>

<script>
export default {
	name: 'StoreSecondaryFilterBox',
	props: {
		translatey: {
			type: Number,
			default: 108
		}
	},
	data() {
		return {
			dropdownShow: false,
			sortText: '综合排序',
			sortList: [{ name: '销量优先', id: 1 }, { name: '距离优先', id: 2 }, { name: '低价优先', id: 3 }, { name: '高价优先', id: 4 }], // , { name: '好评优先', id: 5 }
			secondaryFilterBoxObj: {
				type: '',
				volume: ''
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
		handleSelectSort(item, index) {
			this.sortText = item.name
			this.secondaryFilterBoxObj.type = index
			this.secondaryFilterBoxObj.volume = ''
			this.dropdownShow = false
			this.$emit('select', this.secondaryFilterBoxObj)
		},
		handleSelectFilter(item, index) {
			this.sortText = item.name
			if (index === 0) {
				this.secondaryFilterBoxObj.type = ''
				this.secondaryFilterBoxObj.volume = 2
			} else if (index === 1) {
				this.secondaryFilterBoxObj.type = ''
				this.secondaryFilterBoxObj.volume = ''
			}
			this.dropdownShow = false
			this.$emit('select', this.secondaryFilterBoxObj)
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
