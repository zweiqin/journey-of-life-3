<template>
    <view class="EditingPage">
        <view class="header">
            <text class="Cancel" @click="goback">取消</text>
            <view class="text">文章编辑</view>
            <view class="btnBox">
                <!-- <view class="preview"></view> -->
                <view v-if="isOverForm">下一步</view>
                <view class="NextSteps" v-else @click="nextSteps">下一步</view>
            </view>
        </view>
        <view class="articlesTitle">
            <input type="text" v-model="formData.postTitle" class="texts" placeholder="填写标题(2-30个字)">
        </view>
        <textarea v-model="formData.postContent" class="textArea" :auto-height="true" :maxlength="-1" placeholder="请输入正文"></textarea>
        <view class="uploadImg">
                      <!-- 上传图片时，显示这个 -->
          <view class="texts">上传文章封面</view>
          <view class="add-img-icon" v-if="!formData.postCover" @click="handleUploadImg()">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
          <view class="add-img-icon" v-else>
             <tui-icon @click="formData.postCover = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
             <image class="add-icon bigbig" :src="formData.postCover"></image>
          </view>
        </view>
        <!-- <view class="addType">
            <view class="addTypeIltem">
                <text class="typeText">标签类型:</text>
                <view class="ZHFwcnm" v-if="postCategoryName">
                    <tui-icon @click="formData.postCategoryId = '';postCategoryName = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
                    {{ postCategoryName }}
                </view>
            </view>
            <button class="addTpyeBtn" @click="show = true">添加标签</button>
            <TuiSelect type="select" mask-closable="true" :list="articlesType" :show="show" @confirm="confirm" @close="onClose"></TuiSelect>
        </view> -->
    </view>
</template>

<script>
import { SELECT_ADDRESS, USER_TOKEN, B_SERVE_ORDER_NO } from '@/constant';
import { getUserId, payOrderUtil } from '@/utils';
import { selectCategory } from '@/api/community-center/makeSmallFortune'
import tuiSelect from '@/components/thorui/tui-select/tui-select.vue'
export default {
    name: 'EditingPage',
    components: {
        TuiSelect: tuiSelect
    },
    props: {
        formData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            show: false,
            articlesType: [],
            postCategoryName: ''
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
            this.$emit('checkoutCurrent', 1)
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
        this.imgKeyName = Key; // 存一次键名 方便后面赋值
        const _this = this;
        uni.chooseImage({
            success: (chooseImageRes) => {
                for (const imgFile of chooseImageRes.tempFiles) {
                    uni.showLoading();
                    uni.uploadFile({
                    url: 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload',
                    filePath: imgFile.path,
                    name: 'file',
                    formData: {
                        token: USER_TOKEN,
                        userId: getUserId()
                    },
                    success: (uploadFileRes) => {
                        uni.hideLoading();
                        this.formData.postCover = JSON.parse(uploadFileRes.data).data.url
                        // console.log(this.formData.postCover)
                    },
                    fail: (error) => {
                        uni.hideLoading();
                        _this.ttoast({
                        type: 'fail',
                        title: '图片上传失败',
                        content: error
                        });
                    }
                    });
                }
                return;
                },
                fail: (fail) => {
                    console.log(fail);
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
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
            font-size: 28rpx;
            font-weight: normal;
            line-height: 44rpx;
            display: flex;
            align-items: center;
            color: #222229;
            &:active {
                color: rgb(201, 3, 3);
            }
        }
        .text {
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
    .textArea {
        box-sizing: border-box;
        padding: 30rpx;
        margin-top: 15rpx;
        width: 100%;
        min-height: 600rpx;
        font-size: 30rpx;
        font-weight: normal;
        line-height: 44rpx;
        color: #222229;
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