<template>
	<view class="download-container">
		<view class="download-wrapper">
			<view class="MainDiv">
				<view class="GroundGlass">
					<p class="Logo"></p>
					<view class="AppName">{{ APPLY_NAME }} App</view>
					<view style="padding: 10px 0;color: #ffffff;">版本：v1.0.27</view>
					<view v-if="!isWeixin">
						<a download href="https://www.tuanfengkeji.cn/TF_APP_Download/__UNI__B07FE0F__20240705202937.apk" class="DownLoaButton">
							<span class="iconfont icon-anzhuo"></span> 安卓下载
						</a>
						<!-- <a download href="https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1709636108448-__UNI__B07FE0F_0304164457.ipa" class="DownLoaButton"> -->
						<a download href="https://www.tuanfengkeji.cn/TF_APP_Download/__UNI__B07FE0F_0705202344.ipa" class="DownLoaButton">
							<span class="iconfont icon-iOS"></span> IOS下载
						</a>
					</view>

					<view v-if="isWeixin">
						<view
							style="display: flex; align-items: center; justify-content: center" class="DownLoaButton"
							@click="handleShow"
						>
							<span class="iconfont icon-anzhuo"></span> 安卓下载
						</view>

						<view
							style="display: flex; align-items: center; justify-content: center" class="DownLoaButton"
							@click="handleShow"
						>
							<span class="iconfont icon-iOS"></span> IOS下载
						</view>
					</view>
				</view>

				<view
					class="mask" :style="{
						'z-index': isShowMask ? 1 : -100,
						'opacity': isShowMask ? 1 : 0
					}"
				>
					<img class="tip" src="../../static/images/common/browser-share.png" alt="" />

					<img
						class="know" src="../../components/BeeWxShare/point-share/static/point_btn.png" alt=""
						@click="isShowMask = false"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { APPLY_NAME } from '../../config'

export default {
	name: 'Download',
	data() {
		return {
			APPLY_NAME,
			isShowMask: false,
			isWeixin: true
		}
	},
	mounted() {
		this.isWeixin = this.checkedIsWeixin()
	},
	methods: {
		handleDowmloadApp() { },

		handleShow() {
			console.log(1)
			this.isShowMask = true
		},

		checkedIsWeixin() {
			// #ifdef H5
			var ua = navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') return true
			// #endif
			return false
		}
	}
}
</script>

<style lang="less">
@import "../../static/iconfont/download/iconfont.css";

.download-container {
	display: flex;
	place-items: center;
	background: url(../../static/images/common/download-backgroupImg.png) no-repeat;
	background-size: cover;
	transition: color 0.5s, background-color 0.5s;
	line-height: 1.6;
	font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
		Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	font-size: 15px;

	.download-wrapper {
		min-height: 100vh;
		box-sizing: border-box;

		max-width: 100%;
		margin: 0 auto;
		padding: 0rem;
		font-weight: 400;
		position: relative;
		top: 0vh;

		display: flex;
		grid-template-columns: 1fr 1fr;

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			width: 100vw;
			height: 100vh;
			padding: 20px;
			box-sizing: border-box;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 300ms;
		}

		.tip {
			width: 100%;
		}

		.know {
			width: 70%;
			margin-top: 20px;
		}

		.iconfont {
			font-size: 1em !important;
			margin-right: 10px;
		}

		.icon-anzhuo {
			color: #99c149;
		}

		.icon-iOS {
			color: #0389d0;
		}

		.MainDiv {
			width: 80vw;
			height: 95vh;
			text-align: center;
			display: inline-flex;
			align-items: center;
			justify-content: flex-end;
		}

		.GroundGlass {
			width: 425px;
			height: 484px;
			border-radius: 10px;
			opacity: 0.8;
			background: linear-gradient(180deg, #5692c1 0%, rgba(86, 146, 193, 0) 100%);
			box-sizing: border-box;
			border: 2px solid;
			border-image: linear-gradient(180deg, #ffffff 1%, rgba(178, 224, 226, 0) 100%) 2;
			box-shadow: 0 4px 35px 5px #a5d9eb;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
		}

		.Logo {
			width: 60%;
			height: 20%;
			opacity: 1;
			background: url(../../static/images/new-user/tf-Logo.png);
			background-size: cover;
			background-position: center;
		}

		.AppName {
			margin-top: 5%;
			margin-bottom: 5%;
			width: 80%;
			// height: 52px;
			opacity: 1;
			font-family: AlibabaPuHuiTiH;
			font-size: 40px;
			font-weight: 600;
			letter-spacing: 0.1rem;
			text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
			color: #fff;
		}

		.DownLoaButton {
			width: 259px;
			height: 68px;
			border-radius: 10px;
			opacity: 1;
			background: radial-gradient(36% 39% at 50% 50%, #cfe6e8 0%, #ffffff 100%);
			box-sizing: border-box;
			border: 2px solid;
			border-image: linear-gradient(115deg,
					#a8b9f1 44%,
					rgba(127, 203, 223, 0) 106%) 2;
			box-shadow: 0 4px 20px #0000004d;
			font-family: SourceHanSansCN-Regular;
			font-size: 30px;
			font-weight: 400;
			line-height: 17px;
			letter-spacing: 0em;
			color: #3d3d3d;
			margin-bottom: 10px;
		}

		a {
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
		}

	}
}
</style>
