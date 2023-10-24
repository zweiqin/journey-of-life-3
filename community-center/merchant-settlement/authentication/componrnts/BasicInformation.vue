<template>
	<view class="formBox">
		<tui-form ref="form">
			<view class="FormContainer">
				<view class="formHeader">账号信息</view>
				<!-- <tui-form ref="form"> -->
				<view class="inputBox">
					<tui-input v-model="basicInformationForm.account" label-color="#526787" :border-bottom="false" label="账号" placeholder="请输入账号名" clearable></tui-input>
					<tui-input v-model="basicInformationForm.password" label-color="#526787" type="password" :border-bottom="false" label="密码" placeholder="请输入密码" clearable></tui-input>
					<tui-input v-model="basicInformationForm.confirmPwd" label-color="#526787" type="password" :border-bottom="false" label="确认密码" placeholder="请再次确认密码" clearable></tui-input>
				</view>
				<!-- </tui-form> -->
			</view>
			<view class="FormContainer" style="margin-top: 20rpx">
				<view class="formHeader">基本信息</view>
				<!-- <tui-form ref="form"> -->
				<view class="inputBox">
					<tui-input v-model="basicInformationForm.contactName" label-color="#526787" :border-bottom="false" label="联系人名" placeholder="请输入姓名" clearable></tui-input>
					<tui-input v-model="basicInformationForm.contactTel" label-color="#526787" :border-bottom="false" label="联系电话" placeholder="请输入联系电话" clearable></tui-input>
					<tui-input v-model="basicInformationForm.ident" label-color="#526787" :border-bottom="false" label="身份证号" placeholder="请输入身份证号" clearable></tui-input>
					<view class="moreSlectItem">
						<tui-input v-model="basicInformationForm.region" label-color="#526787" label="门店地址" background-color="none" :border-bottom="false" placeholder="请选择门店地址" disabled>
							<template #right>
								<image style="width: 30rpx; height: 30rpx; margin-right: 20rpx" src="@/static/images/entryOfMerchants/youjiantou.png" mode="" @click="handleChooseAddress"></image>
							</template>
						</tui-input>
						<!-- 团蜂地址选择 -->
						<TuanCity ref="TuanCityRef" @confirm="handleConfirmAddress"></TuanCity>
					</view>
					<tui-input v-model="basicInformationForm.addresText" label-color="#526787" :border-bottom="false" label="详细地址" placeholder="请输入详细地址" clearable @input="spliAddres"></tui-input>
					<tui-input v-model="basicInformationForm.cardNo" label-color="#526787" :border-bottom="false" label="银行卡号" placeholder="请输入银行卡号" clearable></tui-input>
					<tui-input v-model="basicInformationForm.bankName" label-color="#526787" :border-bottom="false" label="银行名称" placeholder="请输入银行名称" clearable></tui-input>
				</view>
				<!-- </tui-form> -->
			</view>
		</tui-form>
		<view class="FormContainer imgFilesUpload">
			<view style="margin: 0rpx" class="formHeader">个人实名认证</view>
			<view class="upload_Item">
				<view class="subtitle" style="margin-top: 24rpx">头像上传（本人正面清晰头像）</view>
				<view class="uploadBox">
					<view class="ExampleImg">
						<image class="cnmd" src="@/static/images/entryOfMerchants/ExampleImghuman.png"></image>
						<text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
						<tui-gallery :urls="urls" :show="imgShow" @hide="imgShow = false"></tui-gallery>
					</view>
					<!-- 上传完成，有图片则显示这个 -->
					<view v-if="basicInformationForm.userUrl" class="ExampleImg">
						<tui-icon name="close-fill" color="#FC4023" :size="17" class="close-icon" @click="basicInformationForm.userUrl = ''"></tui-icon>
						<image class="avatarImg" :src="basicInformationForm.userUrl"></image>
					</view>
					<!-- 上传图片时，显示这个 -->
					<view v-else class="add-img-icon ExampleImg" @click="handleUploadImg('userUrl')">
						<image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
					</view>
				</view>
				<view style="margin-top: 24rpx" class="subtitle">身份证上传（本人正反面清晰身份证）</view>
				<view class="uploadBox">
					<view class="bigExample">
						<image class="expItem" src="@/static/images/entryOfMerchants/shenfenzheng.png"></image>
						<image class="expItem" src="@/static/images/entryOfMerchants/shenfenzheng2.png"></image>
						<text class="gallery" @click="imgShow2 = true">示例图 点击浏览</text>
						<tui-gallery :urls="urls2" :show="imgShow2" @hide="imgShow2 = false"></tui-gallery>
					</view>
				</view>
				<view class="uploadBig">
					<!-- 上传图片时，显示这个 -->
					<view v-if="basicInformationForm.certImg1" class="add-img-icon">
						<tui-icon name="close-fill" color="#FC4023" :size="17" class="close-icon" @click="basicInformationForm.certImg1 = ''"></tui-icon>
						<image class="big-img-icon" :src="basicInformationForm.certImg1"></image>
					</view>
					<view v-else class="add-img-icon" @click="handleUploadImg('certImg1')">
						<image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
					</view>
					<view v-if="basicInformationForm.certImg2" class="add-img-icon">
						<tui-icon name="close-fill" color="#FC4023" :size="17" class="close-icon" @click="basicInformationForm.certImg2 = ''"></tui-icon>
						<image class="big-img-icon" :src="basicInformationForm.certImg2"></image>
					</view>
					<view v-else class="add-img-icon" @click="handleUploadImg('certImg2')">
						<image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
					</view>
				</view>
				<view style="margin-top: 24rpx" class="subtitle">身份证上传（本人正反面清晰身份证）</view>
				<view class="uploadBox">
					<view class="bigExample">
						<image class="expItem" src="@/static/images/entryOfMerchants/kard1.png"></image>
						<!-- <image class="expItem" src="@/static/images/entryOfMerchants/shenfenzheng2.png"></image> -->
						<text class="gallery" @click="imgShow3 = true">示例图 点击浏览</text>
						<tui-gallery :urls="urls3" :show="imgShow3" @hide="imgShow3 = false"></tui-gallery>
					</view>
				</view>
				<view class="uploadBig">
					<!-- 上传图片时，显示这个 -->
					<view v-if="basicInformationForm.bankCardFront" class="add-img-icon" style="width: 630rpx; height: 227rpx">
						<tui-icon name="close-fill" color="#FC4023" :size="17" class="close-icon" @click="basicInformationForm.bankCardFront = ''"></tui-icon>
						<image class="big-img-icon2" :src="basicInformationForm.bankCardFront"></image>
					</view>
					<view v-else class="add-img-icon" style="width: 630rpx; height: 227rpx" @click="handleUploadImg('bankCardFront')">
						<image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="nextSteps">
			<tui-button @click="nextSteps">下一步</tui-button>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { shopCreateAccount, getAccountInfo } from '@/api/community-center/merchantSettlement'
import { getUserId } from '@/utils'
import { SELECT_ADDRESS, USER_TOKEN, B_SERVE_ORDER_NO } from '@/constant'
import { BasicInformationRules } from '../toolData/rules'
import form from '@/components/common/tui-validation/tui-validation.js'
import { forIn } from 'lodash-es'
export default {
	name: 'BasicInformation',
	props: {
		basicInformationForm: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			rules: BasicInformationRules,
			imgShow: false,
			imgShow2: false,
			imgShow3: false,
			imgKeyName: '',
			urls: [
				{
					src: require('@/static/images/entryOfMerchants/ExampleImghuman.png')
				}
			],
			urls2: [{ src: require('@/static/images/entryOfMerchants/shenfenzheng.png') }, { src: require('@/static/images/entryOfMerchants/shenfenzheng2.png') }],
			urls3: [
				{
					src: require('@/static/images/entryOfMerchants/kard1.png')
				}
			]
		}
	},
	created() {
		getAccountInfo({
			userId: getUserId()
		}).then((res) => {
			for (const key in res) {
				this.basicInformationForm[key] = res[key]
			}
			const addres = res.contactAddress.split(' ')
			this.basicInformationForm.region = addres[0]
			this.basicInformationForm.addresText = addres[1]
		})
	},
	methods: {
		// 点击上传图片
		handleUploadImg(Key) {
			this.imgKeyName = Key // 存一次键名 方便后面赋值
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
								_this.basicInformationForm[_this.imgKeyName] = JSON.parse(uploadFileRes.data).data.url
							},
							fail: (error) => {
								uni.hideLoading()
								_this.ttoast({
									type: 'fail',
									title: '图片上传失败',
									content: error
								})
							}
						})
					}
				},
				fail: (fail) => {
					console.log(fail)
				}
			})
		},
		handleChooseAddress() {
			// 打开地址选择栏
			this.$refs.TuanCityRef.show()
		},
		handleConfirmAddress(selectInfo) {
			// 地址选择后的数据
			console.log(selectInfo)
			this.basicInformationForm.region = selectInfo.formatAddress4
		},
		spliAddres(value) {
			this.basicInformationForm.contactAddress = this.basicInformationForm.region + ' ' + value
			console.log(this.basicInformationForm.contactAddress)
		},
		nextSteps() {
			// 触发下一步
			this.$refs.form
				.validate(this.basicInformationForm, this.rules)
				.then((res) => {
					// console.log(this.basicInformationForm)
					shopCreateAccount(this.basicInformationForm)
						.then((res) => {
							console.log(res)
							this.$emit('nextSteps', 1) // 用于跳转到下一个表单页
						})
						.catch((error) => {
							this.ttoast({
								type: 'info',
								title: error,
								content: '提交失败'
							})
						})
					console.log('校验通过！')
				})
				.catch((errors) => {
					console.log(errors)
					this.ttoast({
						type: 'info',
						title: errors,
						content: '提交失败'
					})
				})
			// this.$emit('nextSteps',1) // 用于跳转到下一个表单页
		}
	}
}
</script>

<style lang="scss" scoped>
.moreSlectItem:active {
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
}
.formBox {
  position: relative;
  box-sizing: border-box;
  padding: 10rpx 30rpx 180rpx 30rpx;
  width: 100vw;
  height: auto;
  flex: 1;
  .FormContainer {
    overflow: hidden; // 清除浮动
    width: 100%;
    /* height: 733rpx; */
    background-color: #fff;
    border-radius: 20rpx;
    .formHeader {
      font-weight: 600;
      font-size: 32rpx;
      margin-left: 30rpx;
      margin-top: 39rpx;
      color: #08377f;
    }
  }
  .imgFilesUpload {
    box-sizing: border-box;
    padding: 40rpx 30rpx;
    margin-top: 24rpx;
    .upload_Item {
      /* margin-top: 38rpx;
      margin-left: 30rpx; */
      .subtitle {
        font-size: 28rpx;
        font-weight: normal;
        line-height: 38rpx;
        color: #526787;
      }
      .uploadBox {
        display: flex;
        margin-top: 24rpx;
        width: auto;
        .ExampleImg {
          margin-left: 20rpx;
          position: relative;
          width: 220rpx;
          height: 226rpx;
          background: #f7fbff;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .cnmd {
            width: 175rpx;
            height: 226rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
          .avatarImg {
            margin-left: 20rpx;
            width: 100%;
            height: 100%;
            border-radius: 12rpx;
          }
        }
        .add-img-icon {
          margin-left: 20rpx;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
        }
        .bigExample {
          position: relative;
          width: 100%;
          height: 228rpx;
          background: #f7fbff;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .expItem {
            background: #f7fbff;
            width: 276.34rpx;
            height: 174.91rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
        }
      }
      .uploadBig {
        margin-top: 38rpx;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .add-img-icon {
          position: relative;
          display: flex;
          align-items: center;
          width: 305rpx;
          height: 184rpx;
          border-radius: 12rpx;
          justify-content: center;
          background: #f7fbff;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
          .big-img-icon {
            width: 305rpx;
            height: 184rpx;
          }
          .big-img-icon2 {
            width: 630rpx;
            height: 227rpx;
          }
        }
      }
    }
  }
  .nextSteps {
    box-sizing: border-box;
    position: absolute;
    padding: 18rpx 30rpx 50rpx 30rpx;
    bottom: 0;
    left: 0;
    /* margin-top: 128rpx; */
    width: 100%;
    height: 150rpx;
    background-color: #fff;
  }
}
.inputBox {
  width: 100%;
  /* height: 600rpx; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.close-icon {
  position: absolute;
  top: -10upx;
  right: -10upx;
  width: 34upx;
  height: 34upx;
  z-index: 10;
}
</style>
