<template>
	<view>
		<input v-if="visibleMuti && isPickVisible" v-model="multiText" @input="handleSearch" type="text" class="input-search" placeholder="请搜索" adjust-position cursor-spacing="180" />
		<picker
			ref="picker"
			mode="multiSelector"
			:value="multiIndex"
			:range="multiArray"
			@change="handleValueChange"
			@columnchange="handleColumnChange"
			@cancel="() => $emit('update:visibleMuti', false)"
		>
			<slot></slot>
		</picker>
	</view>
</template>

<script>
const CHINA_REGIONS = require('./regions.json')
export default {
	props: {
		defaultRegions: {
			type: Array,
			default() {
				return []
			}
		},
		defaultRegionCode: {
			type: String
		},
		defaultRegion: [String, Array],
		visibleMuti: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	data() {
		return {
			cityArr: CHINA_REGIONS[0].childs,
			districtArr: CHINA_REGIONS[0].childs[0].childs,
			multiIndex: [0, 0, 0],
			isInitMultiArray: true,
			multiText: '',
			localText: '北京市',
			regions: CHINA_REGIONS,
			initRegions: CHINA_REGIONS,
			isPickVisible: false
		}
	},
	watch: {
		defaultRegion: {
			handler(region, oldRegion) {
				if (Array.isArray(region)) {
					// 避免传的是字面量的时候重复触发
					oldRegion = oldRegion || []
					if (region.join('') !== oldRegion.join('')) {
						this.handleDefaultRegion(region)
					}
				} else if (region && region.length == 6) {
					this.handleDefaultRegion(region)
				} else {
					console.warn('defaultRegion非有效格式')
				}
			},
			immediate: true
		}
	},
	computed: {
		multiArray() {
			return this.pickedArr?.map(arr => arr.map(item => item.name))
		},
		pickedArr() {
			// 进行初始化
			if (this.isInitMultiArray) {
				if(this.regions.length > 0) {
					return [this.regions, this.regions[0].childs, this.regions[0].childs[0].childs]
				}
			}
			return [this.regions, this.cityArr, this.districtArr]
		}
	},
	mounted() {
		this.$refs.picker.$watch('visible', val => {
			this.isPickVisible = val
		}, {
			immediate: true
		})
	},
	methods: {
		handleSearch() {
			let list = []
			if (this.multiText) {
				this.initRegions.forEach(province => {
					if (province.name.indexOf(this.multiText) > -1) {
						list.push({ name: province.name, code: province.code, childs: province.childs })
					}
					province?.childs?.forEach(city => {
						if (city.name.indexOf(this.multiText) > -1) {
							list.filter(item => item.name.indexOf(this.multiText) > -1).length === 0 &&
								list.push({ name: province.name, code: province.code, childs: [city] })
						}
						city?.childs?.forEach(district => {
							if (district.name.indexOf(this.multiText) > -1) {
								list.filter(item => {
									if (item.name.indexOf(this.multiText) > -1) {
										return true
									}
									if (item.childs.filter(value => value.name.indexOf(this.multiText) > -1).length === 0) {
										return true
									}
									return false
								}).length === 0 && list.push({ name: province.name, code: province.code, childs: [{ name: city.name, code: city.code, childs: [district] }] })
							}
						})
					})
				})
				this.cityArr = (list.length>0&&list[0]?.childs) || []
				this.districtArr = (this.cityArr.length>0&&this.cityArr[0]?.childs) || []
				this.regions = list
			} else {
				this.cityArr = CHINA_REGIONS[0].childs
				this.districtArr = CHINA_REGIONS[0].childs[0].childs
				this.regions = JSON.parse(JSON.stringify(this.initRegions))
			}
		},
		handleColumnChange(e) {
			this.isInitMultiArray = false
			const that = this
			let col = e.detail.column
			let row = e.detail.value
			that.multiIndex[col] = row
			try {
				switch (col) {
					case 0:
						if (this.regions[that.multiIndex[0]].childs.length == 0) {
							that.cityArr = that.districtArr = [this.regions[that.multiIndex[0]]]
							break
						}
						that.cityArr = this.regions[that.multiIndex[0]].childs
						that.districtArr = this.regions[that.multiIndex[0]].childs[that.multiIndex[1]].childs
						break
					case 1:
						that.districtArr = this.regions[that.multiIndex[0]].childs[that.multiIndex[1]].childs
						break
					case 2:
						break
				}
			} catch (e) {
				that.districtArr = this.regions[that.multiIndex[0]].childs[0].childs
			}
		},
		handleValueChange(e) {
			// 结构赋值
			if (e.detail.value) {
				let [index0, index1, index2] = e.detail.value
				let [arr0, arr1, arr2] = this.pickedArr
				let address = [arr0[index0], arr1[index1], arr2[index2]]
				this.$emit('getRegion', address)
			}
			this.$emit('update:visibleMuti', false)
		},
		handleDefaultRegion(region) {
			const isCode = !Array.isArray(region)
			this.isInitMultiArray = false
			let children = this.regions
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < children.length; j++) {
					let condition = isCode ? children[j].code == region.slice(0, (i + 1) * 2) : children[j].name.includes(region[i])
					if (condition) {
						// 匹配成功进行赋值
						children = children[j].childs
						if (i == 0) {
							this.cityArr = children
						} else if (i == 1) {
							this.districtArr = children
						}
						this.$set(this.multiIndex, i, j)
						break
					} else {
						// 首次匹配失败就用默认的初始化
						if (i == 0 && j == children.length - 1) {
							this.isInitMultiArray = true
						}
					}
				}
			}
		}
	}
}
</script>
<style scoped lang="less">
.input-search {
	position: fixed;
	left: 50%;
	bottom: 245px;
	z-index: 9999;
	transform: translateX(-50%);
	border: 1px solid #999;
	height: 30px;
	text-indent: 1em;
	border-radius: 10upx;
}
</style>
