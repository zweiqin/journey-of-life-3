<template>
	<view class="order-header-container">
		<TuanAppShim bg="#fff"></TuanAppShim>
		<view class="top-wrapper">
			<view class="switch-btn">
				<button
					class="uni-btn" :class="{ active: currentMode === 'community' }"
					@click="$emit('change-mode', 'community')"
				>
					社区
				</button>
				<button class="uni-btn" :class="{ active: currentMode === 'businessDistrict' }" @click="$emit('change-mode', 'businessDistrict')">
					商圈
				</button>
				<view
					class="active-scroll-bar"
					:class="{ 'scroll-right': currentMode === 'businessDistrict', 'scroll-center': currentMode === 'xxx' }"
				></view>
			</view>
			<view
				v-show="currentMode === 'community'" class="search-wrapper"
				:style="{ 'border-color': !!searchValue ? '#ef5613' : '' }"
			>
				<input
					v-model="searchValue" class="search-input" type="text"
					:placeholder="currentMode === 'community' ? '请输入订单号/上门地址/师傅姓名/店长姓名' : '搜索订单'"
				/>
				<tui-icon :size="20" name="search" :color="!!searchValue ? '#ef5613' : ''" @click="handleSearchOrder"></tui-icon>
			</view>
		</view>

		<scroll-view
			v-if="menus && menus.length" :scroll-into-view="currentActiveId" scroll-with-animation
			class="menus-wrapper" scroll-x="true"
		>
			<view class="menu-list">
				<view
					v-for="menu in menus" :id="'item_' + menu.value" :key="menu.value" class="menu-item"
					:class="{ active: currentStatus * 1 === menu.value }" @click="$emit('change-status', menu)"
				>
					{{ menu.label }}
				</view>
			</view>
		</scroll-view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
export default {
	name: 'OrderHeader',
	props: {
		currentMode: {
			type: String,
			default: 'community'
		},

		menus: {
			type: Array,
			required: true
		},

		currentStatus: {
			type: [Number, String],
			required: true
		}
	},

	data() {
		return {
			searchValue: ''
		}
	},

	computed: {
		currentActiveId() {
			return 'item_' + this.currentStatus
		}
	},

	watch: {
		searchValue(newSeachValue) {
			if (!newSeachValue) {
				this.$emit('search', this.searchValue)
			}
		}
	},

	methods: {
		handleSearchOrder() {
			if (!this.searchValue) {
				this.ttoast({
					type: 'info',
					title: '请输入订单号'
				})
				return
			}

			this.$emit('search', this.searchValue)
		},

		clearSearch() {
			this.searchValue = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.order-header-container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	padding: 30upx;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 0 0 50upx 50upx;
	z-index: 10;

	.top-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.switch-btn {
			width: 405upx;
			position: relative;
			display: flex;
			align-items: center;
			height: 62upx;
			flex-shrink: 0;
			border: 1upx solid #ef5613;
			border-radius: 100upx;
			overflow: hidden;

			.uni-btn {
				position: relative;
				z-index: 1;
				flex: 1;
				color: #ef5613;
				font-size: 32upx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;

				&.active {
					color: #fff;
				}
			}

			.active-scroll-bar {
				position: absolute;
				left: 0;
				top: 0;
				// width: 150upx;
				width: 220upx;
				height: 62upx;
				border-radius: 50upx 0px 84upx 50upx;
				background: linear-gradient(112deg, #ef5613 6%, #f87f4b 74%);
				transition: all 350ms;

				&.scroll-right {
					// left: 260upx;
					left: 190upx;
					border-radius: 0 0 0px 54upx;
				}

				&.scroll-center {
					left: 126upx;
					border-radius: 0;
				}
			}
		}

		.search-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 1upx solid #888889;
			border-radius: 100upx;
			height: 62upx;
			flex: 1;
			margin-left: 28upx;
			padding: 15upx 20upx;
			box-sizing: border-box;

			.search-input {
				font-size: 24upx;
				flex: 1;
				margin-right: 10upx;
			}
		}
	}

	.menu-list {
		display: flex;
		align-items: center;
		color: #888889;
		font-size: 28upx;
		white-space: nowrap;
		margin-top: 22upx;

		.menu-item {
			position: relative;
			white-space: nowrap;
			line-height: 1.5;
			margin-right: 68upx;

			&::after {
				content: '';
				display: block;
				width: 0;
				height: 6upx;
				background-color: #f87f4b;
				border-radius: 20px;
				transition: all 350ms;
				transform-origin: center center;
			}

			&.active {
				color: #222229;

				&::after {
					width: 100%;
				}
			}
		}
	}
}
</style>
