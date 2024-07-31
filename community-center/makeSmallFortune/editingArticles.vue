<template>
    <view class="EditingPage">
        <view class="header">
            <text class="Cancel" @click="goback">取消</text>
            <view class="text">文章编辑</view>
            <view class="btnBox">
                <!-- <view class="preview" style="margin-right: 32rpx;color: #000;" @click="previewPage">预览</view> -->
                <view :class="{isOverForm:isOverForm}" v-if="isOverForm">完成</view>
                <view class="NextSteps" v-else @click="nextSteps">完成</view>
            </view>
        </view>
        <view class="articlesTitle">
            <input type="text" v-model="formData.postTitle" class="texts" placeholder="填写标题(2-30个字)">
        </view>
        <view class="uploadImg">
          <view class="texts">上传文章封面</view>
          <view class="add-img-icon" v-if="!formData.postCover" @click="handleUploadImg()">
        		<tui-icon :size="40" color="#b3b2ad" name="add" margin="0"></tui-icon>
          </view>
          <view class="add-img-icon" v-else>
             <tui-icon @click="formData.postCover = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
             <image class="add-icon bigbig" :src="formData.postCover"></image>
          </view>
        </view>
        <view class="ParagraphBox" v-for="(item, index) in paragraphData" :key="index">
            <view class="ParagraphBoxChild">
              <tui-icon v-if="index > 0" @click="deletedItem(index)" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
              <textarea @input="formDataAdd" v-model="item.text" class="textArea" :auto-height="true" :maxlength="-1" placeholder="请输入段落正文"></textarea>
              <view class="uploadImg">
                <view class="texts">上传段落配套图片(非必传)</view>
                <view class="add-img-icon" v-if="!item.imgUrl" @click="handleUploadTextImg(item)">
        					<tui-icon :size="40" color="#b3b2ad" name="add" margin="0"></tui-icon>
                </view>
                <view class="add-img-icon" v-else>
                    <tui-icon @click="item.imgUrl = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
                    <image class="add-icon bigbig" :src="item.imgUrl"></image>
                </view>
              </view>
            </view>
        </view> 
        <view class="CreatedText">
            <button class="CreatedTextBtn" @click="createdParagraph">添加段落组合</button>  
            <text class="CreatedTeps">(如果一组段落中的图片不传则默认为不存在该图片)</text>
        </view>
    </view>
</template>

<script>
import { ANOTHER_TF_UPLOAD } from '../../config';
import { T_STORAGE_KEY } from '../../constant'
import { getPostDetails, postDetailsEdit } from '@/api/community-center/makeSmallFortune'
import { selectCategory } from '@/api/community-center/makeSmallFortune'
export default {
    name: 'EditingPage',
    onLoad(option) {
        // this.formData.postId = option.id;
        getPostDetails({
            postId: option.id
        }).then(res => {
            this.formData = res.data
            this.formData.postId = option.id;
            this.paragraphData = JSON.parse(this.formData.postContent)
            // console.log(res)
        })
    },
    data() {
        return {
            show: false,
            articlesType: [],
            postCategoryName: '',
            paragraphData: [{
                text: '',
                imgUrl: ''
            }],
            formData: {
                postId: '',
                header: '',
                username: '蔡徐坤',
                region: '440606',
                publishUserId: "", // 发布者id
                postTitle: "", // 文章标题
                postContent:"", // 文章内容
                postCategoryId:"", // 文章分类id
                postType:"", // 文章类型：1-图文（1张封面）2-纯文字
                postCover:"", // 文章封面post_type=1是储存
                redPacketInfo: {
                        totalAmount:"", // 红包总金额
                        totalPacket:"", // 红包总个数
                        link:"" // 广告链接
                    }
            }
        }
    },
    created() {
        selectCategory().then(res => {
            res.forEach((item, index) => {
				this.articlesType.push({
					text: item.categoryName,
					value: item.categoryId
				})
			})
        })
    },
    computed: {
        isOverForm: {
            get() {
                if (this.formData.postTitle == '' && this.formData.postCategoryId == '' && this.formData.postContent == '') {
                    return true  // 就这样吧，摆烂
                }else {
                    return false
                }
            }
        }
    },
    methods: {
        goback() {
            uni.navigateBack();
        },
        nextSteps() {
            postDetailsEdit(this.formData).then(res => {
                console.log(res)
                uni.navigateBack()
            }).catch(err => {
                console.log(err)
            })
        },
        previewPage() {
            this.$emit('checkoutCurrent', 1, false)
        },
        confirm(e) {
            this.postCategoryName = e.options.text
            this.formData.postCategoryId = e.options.value
            this.show = false
			// console.log(e)
		},
        onClose() {
			this.show = false
		},
        // 点击上传图片
        handleUploadImg(Key) {
					uni.chooseImage({
						extension: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
						success: (chooseImageRes) => {
							for (const imgFile of chooseImageRes.tempFiles) {
								uni.showLoading()
								uni.uploadFile({
									url: ANOTHER_TF_UPLOAD,
									filePath: imgFile.path,
									name: 'file',
									header: {
										Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
									},
									formData: {
										'folderId': -1
									},
									success: (uploadFileRes) => {
										uni.hideLoading()
										this.formData.postCover = JSON.parse(uploadFileRes.data).data.url
									},
									fail: (error) => {
										uni.hideLoading()
										this.ttoast({
											type: 'fail',
											title: '图片上传失败',
											content: error
										})
									}
								})
							}
						}
					})
        },
        handleUploadTextImg(item) { // 懒得封装了，傻逼玩意，直接开摆
					uni.chooseImage({
						extension: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
						success: (chooseImageRes) => {
							for (const imgFile of chooseImageRes.tempFiles) {
								uni.showLoading()
								uni.uploadFile({
									url: ANOTHER_TF_UPLOAD,
									filePath: imgFile.path,
									name: 'file',
									header: {
										Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
									},
									formData: {
										'folderId': -1
									},
									success: (uploadFileRes) => {
										uni.hideLoading()
										item.imgUrl = JSON.parse(uploadFileRes.data).data.url
										this.formDataAdd()
									},
									fail: (error) => {
										uni.hideLoading()
										this.ttoast({
											type: 'fail',
											title: '图片上传失败',
											content: error
										})
									}
								})
							}
						}
					})
        },
        createdParagraph() {
            this.paragraphData.push({
                text: '',
                imgUrl: ''
            })
        },
        formDataAdd() {
            this.formData.postContent = JSON.stringify(this.paragraphData);
            // console.log(this.formData.postContent);
        },
        deletedItem(index) {
            this.paragraphData.splice(index, 1);
            this.formDataAdd()
        }
    }
}
</script>

<style lang="scss" scoped>
.isOverForm {
    font-family: 思源黑体;
    font-size: 28rpx;
    font-weight: bold;
    line-height: 44rpx;
    display: flex;
    align-items: center;
    color: #FF380C;
}
.preview {
    font-size: 28rpx;
    /* font-weight: bold; */
    line-height: 46rpx;
}
.CreatedText {
    box-sizing: border-box;
    width: 100vw;
    /* height: 88rpx; */
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .CreatedTextBtn {
        width: 650rpx;
        color: #000000c7
    }
    .CreatedTeps {
        margin-top: 6rpx;
        width: 100vw;
        text-align: center;
        font-size: 28rpx;
        color: #a50606bd;
    }
}
.addType {
    box-sizing: border-box;
    padding: 30rpx;
    width: 100%;
    height: auto;
    .addTypeIltem {
         width: 100%;
         height: auto;
         margin-bottom: 10rpx;
         display: flex;
         align-items: center;
         flex-wrap: wrap;
         .ZHFwcnm {
            position: relative;
            margin: 15rpx;
            width: 100rpx;
            height: 48rpx;
            border-radius: 8rpx;
            line-height: 48rpx;
            display: flex;
            padding: 7rpx 14rpx;
            justify-content: center;
            background: #FEEEEE;
            font-size: 24rpx;
            color: #FF380C;
         }
         .typeText {
            font-size: 28rpx;
            font-weight: normal;
            line-height: normal;
            color: #9E9E9E;
         }
    }
    /* display: flex; */
    .addTpyeBtn {
        margin: 0;
        width: 165rpx;
        height: 60rpx;
        border-radius: 8rpx;
        background: #F6F6F8;
        text-align: center;
        line-height: 60rpx;
        font-size: 24rpx;
    }
}
.close-icon {
  position: absolute;
  top: -10upx;
  right: -10upx;
  width: 34upx;
  height: 34upx;
  z-index: 10;
}
.EditingPage {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    .header {
        box-sizing: border-box;
        padding: 22rpx 30rpx;
        width: 750rpx;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .Cancel {
            font-size: 30rpx;
            letter-spacing: 4rpx;
            font-weight: bold;
            line-height: 44rpx;
            display: flex;
            align-items: center;
            color: #222229;
            &:active {
                color: rgb(201, 3, 3);
            }
        }
        .text {
            margin-left: 60rpx;
            font-size: 28rpx;
            font-weight: normal;
            line-height: 44rpx;
            color: #C0BEC1;
        }
        .btnBox {
            /* width: 170rpx; */
            height: 44rpx;
            display: flex;
            justify-content: space-between;
            font-size: 28rpx;
            color: #C0BEC1;
            .NextSteps {
                color: #222229;
            }
        }
    }
    .articlesTitle {
				box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 105rpx;
        padding: 10rpx 30rpx;
        display: flex;
        align-items: center;
        .texts {
            width: 690rpx;
            height: 88rpx;
            font-size: 36rpx;
            font-weight: 500;
            line-height: 44rpx;
        }
    }
    .articlesTitle::before {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            content: '';
            width: 690rpx;
            height: 2rpx;
            background-color: #D8D8D8;
    }
    .ParagraphBox {
        box-sizing: border-box;
        width: 100vw;
        height: auto;
        padding: 30rpx;
        .ParagraphBoxChild {
           position: relative;
           box-sizing: border-box;
           padding: 20rpx;
           box-shadow: 0px 0px 0px 4rpx #1a00004f;
           border-radius: 15rpx;
           .textArea {
                box-sizing: border-box;
                margin-top: 15rpx;
                width: 100%;
                min-height: 200rpx;
                font-size: 30rpx;
                font-weight: normal;
                line-height: 44rpx;
                color: #222229;
            }
            .uploadImg {
                padding: 0rpx;
            }
        }
    }
    .uploadImg {
        box-sizing: border-box;
        padding: 30rpx;
        width: 100%;
        /* height: 300rpx; */
        .texts {
            font-size: 28rpx;
            font-weight: 350;
            line-height: 44rpx;
            color: #9E9E9E;
        }
        .add-img-icon {
            position: relative;
            width: 293rpx;
            height: 293rpx;
            border-radius: 8rpx;
            background: #F6F6F8;
            display: flex;
            align-items: center;
            justify-content: center;
            .add-icon {
                width: 80rpx;
                height: 80rpx;
            }
            .bigbig {
                width: 293rpx !important;
                height: 293rpx !important;
            }
        }
    }
}
</style>