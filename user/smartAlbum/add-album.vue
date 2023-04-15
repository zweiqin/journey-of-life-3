<template>
	<view class="community-order">
		<view class="title-list">
			<img
				src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
				alt=""
				class="return"
				@click="handleBack"
			/>
			<view class="title">新建画册</view>
		</view>

		<view class="add-album-content">
			<view class="item-wrapper">
				<view class="add-album-title">画册名称</view>
				<view class="add-album-value">
					<input v-model="form.atlasName" type="text" class="common-text" placeholder="请填写画册名称" style="padding-bottom: 32upx" />
				</view>
			</view>

			<view class="item-wrapper">
				<view class="add-album-title">画册类型</view>
				<view class="add-album-value"><input v-model="form.atlasType" type="text" class="common-text" placeholder="请填写画册类型" style="padding-bottom: 32upx" /></view>
			</view>
		</view>

		<view class="body">
			<view class="item-image">
				<view class="tag">*</view>
				<view class="name">画册封面图片</view>
			</view>
			<view class="upload-list">
				<view class="upload-pane">
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="img in imagesFace"
							:key="img"
							style="
                position: relative;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                margin-bottom: 20upx;
              "
						>
							<img :src="img" alt="" class="img1" />
							<img
								src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qqzm2u887derediugqlf.png"
								alt=""
								class="img2"
								@click="removeBackgroundFace(img)"
							/>
						</view>
					</view>
					<view
						v-if="imagesFace.length === 0"
						class="upload"
						style="margin-right: 6upx"
						@click="chooseImgFace"
					>
						+
					</view>
				</view>
			</view>

			<view class="item-image">
				<view class="tag">*</view>
				<view class="name">画册内容图片</view>
			</view>
			<view class="upload-list">
				<view class="upload-pane">
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="img in images"
							:key="img"
							style="
                position: relative;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                margin-bottom: 20upx;
              "
						>
							<img :src="img" alt="" class="img1" />
							<img
								src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qqzm2u887derediugqlf.png"
								alt=""
								class="img2"
								@click="removeBackground(img)"
							/>
						</view>
					</view>
					<view
						class="upload"
						style="margin-right: 6upx"
						@click="chooseImg"
					>
						+
					</view>
				</view>
			</view>

			<view class="item-image">
				<view class="tag">*</view>
				<view class="name">画册封尾图片</view>
			</view>
			<view class="upload-list">
				<view class="upload-pane">
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="img in imagesEnd"
							:key="img"
							style="
                position: relative;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                margin-bottom: 20upx;
              "
						>
							<img :src="img" alt="" class="img1" />
							<img
								src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/qqzm2u887derediugqlf.png"
								alt=""
								class="img2"
								@click="removeBackgroundEnd(img)"
							/>
						</view>
					</view>
					<view
						v-if="imagesEnd.length === 0"
						class="upload"
						style="margin-right: 6upx"
						@click="chooseImgEnd"
					>
						+
					</view>
				</view>
			</view>

			<view class="foot">
				<view class="on" @click="handleToServiceInformation">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
import { buildUserCrmSlbumApi } from '../../api/user'
import { USER_TOKEN, USER_INFO } from '../../constant'
import { getUserId } from '../../utils'
export default {
	name: 'AddAlbum',
	// props: {
	// 	imgUrl: String
	// },
	data() {
		return {
			img: '',
			name: '',
			price: '',
			id: '',
			imagesFace: [],
			images: [],
			imagesEnd: [],
			length: '',
			form: {
				atlasName: '',
				atlasType: ''
			},
			userInfo: uni.getStorageSync(USER_INFO)
		}
	},
	created() {},
	onLoad(options) {
		// this.name = options.name
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		async handleToServiceInformation() {
			if (this.imagesFace.length === 0 || this.images.length === 0 || this.imagesEnd.length === 0 || !this.form.atlasName || !this.form.atlasType) {
				return uni.showToast({
					title: '请填写完整信息',
					icon: 'none',
					duration: 2000
				})
			}
			const res = await buildUserCrmSlbumApi({
				id: '',
				userId: this.userInfo.userId,
				userName: this.userInfo.nickName,
				atlasName: this.form.atlasName,
				imageUrl: `[${this.images.map((item) => `'${item}'`).join(',')}]`,
				atlasType: this.form.atlasType,
				bookFace: this.imagesFace[0],
				bookEnd: this.imagesEnd[0]
			})
			console.log(res)
			if (res.errno === 0) {
				uni.showToast({
					title: '上传成功',
					duration: 2000,
					icon: 'none'
				})
				uni.navigateBack()
			} else {
				uni.showToast({
					title: '上传失败',
					duration: 2000,
					icon: 'none'
				})
			}
		},
		chooseImgFace() {
			const _this = this
			uni.chooseImage({
				count: 1,
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload',
							filePath: imgFile.path,
							name: 'file',
							formData: {
								token: USER_TOKEN,
								userId: getUserId()
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								_this.imagesFace.push(JSON.parse(uploadFileRes.data).data.url)
							}
						})
					}
				}
			})
		},
		removeBackgroundFace(img) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						const index = _this.imagesFace.findIndex((item) => item === img)
						_this.imagesFace.splice(index, 1)
					}
				}
			})
		},
		chooseImg() {
			const _this = this
			uni.chooseImage({
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload',
							filePath: imgFile.path,
							name: 'file',
							formData: {
								token: USER_TOKEN,
								userId: getUserId()
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								_this.images.push(JSON.parse(uploadFileRes.data).data.url)
							}
						})
					}
				}
			})
		},
		removeBackground(img) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						const index = _this.images.findIndex((item) => item === img)
						_this.images.splice(index, 1)
					}
				}
			})
		},
		chooseImgEnd() {
			const _this = this
			uni.chooseImage({
				count: 1,
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload',
							filePath: imgFile.path,
							name: 'file',
							formData: {
								token: USER_TOKEN,
								userId: getUserId()
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								_this.imagesEnd.push(JSON.parse(uploadFileRes.data).data.url)
							}
						})
					}
				}
			})
		},
		removeBackgroundEnd(img) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						const index = _this.imagesEnd.findIndex((item) => item === img)
						_this.imagesEnd.splice(index, 1)
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.community-order {
  padding-bottom: 180upx;
  .title-list {
    padding: 40upx 54upx 36upx 16upx;
    display: flex;
    .return {
      width: 48upx;
      height: 48upx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
	.add-album-content {
		// flex: 1;
		// width: 100%;
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 36upx 20upx 0 20upx;
		padding: 32upx 32upx 0 32upx;

		.item-wrapper {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			// margin-top: 46upx;
			// width: 100%;
			// height: 74upx;
			padding-bottom: 32upx;

			.add-album-title {
				flex: 0 0 140upx;
				text-align: left;
				font-size: 28upx;
				color: #141000;

				// font-weight: bold;
				// height: 100%;
				&.add-album-title-checked {
					white-space: nowrap;
					width: auto;
				}
			}

			.common-text {
				color: #141000;
				font-size: 28upx;
				// padding-bottom: 20upx;
			}

			.add-album-value {
				flex: 1;
				// max-width: 340upx;
				// margin-right: 96upx;
				width: 100%;
				// height: 100%;
				border-bottom: 1px solid #F1F1F0;

			}
		}
	}
  .body {
    padding: 36upx 30upx 0upx 30upx;
    .item-image {
      display: flex;
      align-items: center;
      padding-top: 36upx;
      padding-bottom: 28upx;
      .tag {
        font-weight: 600;
        color: #fa5151;
      }
      .name {
        font-size: 32upx;
        font-weight: 500;
        color: #3d3d3d;
      }
    }

    .upload-pane {
      border-radius: 20upx;
      display: flex;
      flex-wrap: wrap;

      .img1 {
        width: 160upx;
        height: 160upx;
        border-radius: 20upx;
      }
      .img2 {
        width: 40upx;
        height: 40upx;
        position: absolute;
        right: -15upx;
        top: -15upx;
        background: white;
        border-radius: 50%;
      }

      .upload {
        margin: 0;
        width: 160upx;
        height: 160upx;
        background-color: #ececec;
        border-radius: 20upx;
        color: #767676;
        text-align: center;
        line-height: 160upx;
        font-size: 60upx;
      }
    }
    .foot {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30upx 30upx 30upx 30upx;
      width: 100%;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #ffffff;
      border-top: 8upx solid #f7f8fa;
      .on {
        font-size: 32upx;
        font-weight: bold;
        color: #ffffff;
        width: 408upx;
        height: 80upx;
        border-radius: 100upx;
        background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
        text-align: center;
        line-height: 80upx;
      }
    }
  }
}
</style>
