<template>
	<view style="position: absolute;top: 0;left: 0;z-index: 99999;">

		<!-- <view style="width: 100vw;height: 100vh;"></view> -->
		<view v-show="type === 'activity'" class="container activity">
			<tui-landscape show :position="1" mask mask-closable :icon-size="28" icon-color="#FFFFFF" icon-left="50rpx"
				icon-right="50rpx" @close="close">
				<view @click="type = '' || $emit('click')">
					<image :src="imgUrl" mode="widthFix" style="width: 500upx;max-height: 75vh;" />
					<!-- <view style="position: absolute;top: 52%;left:52%;font-size: 38rpx;font-weight: 700;">羊驼坐凳</view> -->
				</view>
			</tui-landscape>
		</view>

	</view>
</template>

<script>
export default {
	name: 'PopupInformation',
	props: {
		imgUrl: String,
		popupType: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			src: '',
			type: ''
		}
	},

	watch: {
		popupType: {
			handler(val) {
				if (this.$store.getters.historyPopup.includes(val)) {
					this.type = ''
				} else {
					this.type = val
					this.$store.dispatch('auth/updateHistoryPopup', val)
				}
			},
			immediate: true
		}
	},
	created() {
		// console.log(222)
	},
	// onLoad() {
	// 	// console.log(222)
	// },
	// onShow() {
	// 	// console.log(222)
	// },

	methods: {
		close() {
			this.type = ''
		},

		show() {
			this.type = 'activity'
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	image {
		// flex-shrink: 0;
	}
}

/deep/ .activity {
	.tui-landscape__inner {
		top: 40%;
	}
}
</style>
