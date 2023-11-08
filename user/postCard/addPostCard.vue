<template>
	<view class="addPostCard">
		<uni-collapse accordion>
			<uni-collapse-item title="基本信息" :open="true">
				<view class="img">
					<view
						style="display: flex;align-items: center;justify-content: center;width: 160upx;height: 160upx;background-color: #efefef;border-radius: 8upx;"
					>
						<tui-icon name="plus" color="#767676" :size="36" unit="upx"></tui-icon>
					</view>
					<view class="imgText">添加名片图像</view>
				</view>
				<view v-for="item in basicInformation" :key="item.value" class="inputDetail">
					<view class="inputTitle">{{ item.lable }}</view>
					<input v-model="form[item.field]" type="text" :placeholder="item.mandatory" class="input" />
				</view>
			</uni-collapse-item>
		</uni-collapse>

		<uni-collapse accordion>
			<uni-collapse-item title="联系方式" :open="true">
				<view v-for="item in contact" :key="item.value" class="inputDetail">
					<view class="inputTitle">{{ item.lable }}</view>
					<input v-model="form[item.field]" type="text" :placeholder="item.mandatory" class="input" />
				</view>
			</uni-collapse-item>
		</uni-collapse>

		<uni-collapse accordion>
			<uni-collapse-item title="业务简介" :open="true"> </uni-collapse-item>
		</uni-collapse>

		<uni-collapse accordion>
			<uni-collapse-item title="图片简介" :open="true"> </uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
// import addPostCardDetail from "./components/addPostCardDetail";
import { basicInformation, contact } from './config'
export default {
	// components: {
	//   addPostCardDetail,
	// },
	data() {
		return {
			title: '基本信息',
			baseInfo: {},
			basicInformation,
			contact,
			value: [ 0 ],
			placeholderText: '',
			form: {
				name: '',
				phone: '',
				position: '',
				company: '',
				industry: '',
				mobile: '',
				weChat: '',
				address: ''
			}
		}
	},
	methods: {}
}
</script>

<style lang="less" scoped>
.addPostCard {
	padding: 100upx 0upx;

	.img {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 30upx 0;

		.imgText {
			color: #999999;
			font-size: 26upx;
		}
	}

	.inputDetail {
		display: flex;
		padding: 20upx 30upx;

		.inputTitle {
			font-size: 28upx;
			font-weight: 500;
			width: 10%;
			padding-right: 20upx;
		}

		.input {
			width: 90%;
			border-bottom: 1upx solid #999999;
			font-size: 28upx;
			font-weight: 500;
		}
	}
}
</style>
