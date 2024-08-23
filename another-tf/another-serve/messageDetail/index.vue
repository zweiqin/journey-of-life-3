<template>
	<view class="message-detail-container">
		<JHeader title="公告详情" width="50" height="50"></JHeader>
		<view class="messageDetail">
			<h3 class="detailTit">{{ messageDateils.noticeTitle }}</h3>
			<view v-if="messageDateils.createTime" class="detailTime">时间：{{ messageDateils.createTime }}</view>
			<view class="detailInfo">
				<rich-text :nodes="htmlData"></rich-text>
				<img :src="common.seamingImgUrl(messageDateils.image)" alt="">
			</view>
		</view>
	</view>
</template>

<script>
import parse from 'mini-html-parser2'
import { getByIdNoticeMessageDateilsApi, updateReadNoticeApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MessageDetail',
	data() {
		return {
			onlyid: 0,
			messageDateils: {},
			htmlData: []
		}
	},
	onShow() {
		this.getNotice()
	},
	onLoad(options) {
		this.onlyid = options.noticeId
		this.getNotice()
	},
	methods: {
		formatRichText(html) {
			let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
				return match
			})
			newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(
					/width:[^;]+;/gi,
					'max-width:100%;'
				)
				return match
			})
			newContent = newContent.replace(/<br[^>]*\/>/gi, '')
			newContent = newContent.replace(
				/\<img/gi,
				'<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'
			)
			return newContent
		},
		gitMassageDateils() {
			getByIdNoticeMessageDateilsApi({
				noticeId: this.onlyid
			}).then((res) => {
				this.messageDateils = res.data
				this.messageDateils.noticeContent = this.formatRichText(this.messageDateils.noticeContent)
				parse(this.messageDateils.noticeContent, (err, htmlData) => {
					this.htmlData = htmlData
				})
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		getNotice() {
			// uni.showLoading({
			// 	title: '加载中...',
			// })
			updateReadNoticeApi({
				noticeId: this.onlyid
			}).then((res) => {
				uni.hideLoading()
				this.gitMassageDateils()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.message-detail-container {

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.messageDetail {
		padding: 30rpx;

		h3 {
			font-size: 36rpx;
			color: #333333;
			margin-bottom: 40rpx;
		}

		.detailTime {
			font-size: 28rpx;
			color: #666666;
			margin-bottom: 50rpx;
		}

		.detailInfo {
			word-wrap: break-word;

			p {
				font-size: 28rpx;
				color: #333333;
				line-height: 48rpx;
				text-indent: 1em;
				margin-bottom: 50rpx;
			}

			img {
				width: 100%;
			}
		}
	}
}
</style>
