<template>
	<tui-popup
		:duration="500"
		:show="value"
		:styles="{
			'position': 'fixed',
			'bottom': 0,
			'top': 0,
			'left': 0,
			'right': 0,
			'display': 'flex',
			'justify-content': 'center',
			'align-items': 'center',
			'backgroundColor': 'rgba(0,0,0,.6)'
		}"
		:mode-class="[ 'fade' ]"
	>
		<view class="popup-container">
			<view class="input-wrapper">
				<input v-model="code" type="text" placeholder="请输入邀请码" />
			</view>

			<view class="btn-wrapper">
				<button class="uni-btn cancel" @click="$emit('input', false)">
					取消
				</button>
				<button class="uni-btn" @click="handelBind">提交</button>
			</view>
		</view>
	</tui-popup>
</template>

<script>
import { changeActivityUserBindingApi } from '../../../../api/user'
import { getUserId } from '../../../../utils'
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			code: ''
		}
	},
	methods: {
		async handelBind() {
			if (!this.code) {
				uni.showToast({
					title: '请输入邀请码',
					duration: 2000,
					icon: 'none'
				})

				return
			}

			try {
				await changeActivityUserBindingApi({
					userId: getUserId(),
					userCode: this.code
				})

				uni.showToast({
					title: '绑定成功',
					duration: 500
				})
			} catch (error) {
				uni.showToast({
					title: error,
					icon: 'none'
				})
			} finally {
				this.$emit('value', false)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.popup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 662upx;
  padding: 80upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 24upx;

  .input-wrapper {
    background-color: #f6f6f5;
    width: 462upx;
    height: 112upx;
    border-radius: 24upx;
    padding: 35upx;
    box-sizing: border-box;

    input {
      text-align: center;
    }
  }

  .uni-btn {
    // width: 462upx;
    height: 88upx;
    background: #ffcb05;
    border-radius: 100px;
    margin-top: 80upx;
    line-height: 88upx;
    font-size: 28upx;
    font-weight: 500;
    flex: 0 0 45%;
  }

  /deep/ .tui-popup__transition {
    background-color: rgb(78, 78, 78);
  }

  .btn-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cancel {
      background-color: #ccc;
    }
  }
}
</style>
