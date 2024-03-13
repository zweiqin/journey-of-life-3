<template>
	<view
		id="_drag_button" class="drag" :style="'left: ' + left + 'px; top:' + top + 'px;'"
		:class="{ transition: isDock && !isMove }" @touchstart="touchstart" @touchmove.stop.prevent="touchmove"
		@touchend="touchend" @click.stop.prevent="click"
	>
		<view class="drag-icon">
			<BeeIcon :size="42" :src="iconSrc"></BeeIcon>
		</view>
		<view class="drag-text">{{ text }}</view>
	</view>
</template>

<script>
export default {
	name: 'DragButton',
	props: {
		text: {
			type: String,
			default: '按钮'
		},
		iconSrc: {
			type: String,
			// required: true
			default: require('../../static/images/new-user/menu-icon/kefuzaixian.png')
		},
		isDock: {
			type: Boolean,
			default: false
		},
		existTabBar: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			top: 0,
			left: 0,
			width: 0,
			height: 0,
			offsetWidth: 0,
			offsetHeight: 0,
			windowWidth: 0,
			windowHeight: 0,
			isMove: true,
			edge: 10
		}
	},
	mounted() {
		const sys = uni.getSystemInfoSync()
		this.windowWidth = sys.windowWidth
		this.windowHeight = sys.windowHeight
		// #ifdef APP-PLUS
		this.existTabBar && (this.windowHeight -= 50)
		// #endif
		if (sys.windowTop) {
			this.windowHeight += sys.windowTop
		}
		// console.log(sys)
		const query = uni.createSelectorQuery().in(this)
		query.select('#_drag_button').boundingClientRect((data) => {
			this.width = data.width
			this.height = data.height
			this.offsetWidth = data.width / 2
			this.offsetHeight = data.height / 2 + 60
			this.left = this.windowWidth - this.width - this.edge
			this.top = this.windowHeight - this.height - this.edge - 80
		})
			.exec()
	},
	methods: {
		click() {
			this.$emit('btnClick')
		},
		touchstart(e) {
			this.$emit('btnTouchstart')
		},
		touchmove(e) {
			// 单指触摸
			if (e.touches.length !== 1) {
				return false
			}
			this.isMove = true
			this.left = e.touches[0].clientX - this.offsetWidth
			let clientY = e.touches[0].clientY - this.offsetHeight
			// #ifdef H5
			clientY += this.height
			// #endif
			const edgeBottom = this.windowHeight - this.height - this.edge
			// 上下触及边界
			if (clientY < this.edge) {
				this.top = this.edge
			} else if (clientY > edgeBottom) {
				this.top = edgeBottom
			} else {
				this.top = clientY
			}
		},
		touchend(e) {
			if (this.isDock) {
				const edgeRigth = this.windowWidth - this.width - this.edge
				if (this.left < this.windowWidth / 2 - this.offsetWidth) {
					this.left = this.edge
				} else {
					this.left = edgeRigth
				}
			}
			this.isMove = false
			this.$emit('btnTouchend')
		}
	}
}
</script>

<style lang="scss">
$uni-font-size-sm: 24upx;
$uni-text-color-inverse: #ffffff;

.drag {
	position: fixed;
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 6upx 20upx;
	background-color: transparent;
	// border: 1upx solid #a6f8d6;
	border-radius: 60upx;
	font-size: $uni-font-size-sm;
	color: $uni-text-color-inverse;
	box-sizing: border-box;

	.drag-icon {
		padding: 6upx;
		background-color: #ffffff;
		// box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
		border-radius: 50%;
	}

	.drag-text {
		padding: 8upx;
		background-color: #ef530e;
		border-radius: 28upx;
		box-shadow: 0px 4px 10px 0px rgba(4, 10, 19, 0.2);
	}

	&.transition {
		transition: left .3s ease, top .3s ease;
	}
}
</style>
