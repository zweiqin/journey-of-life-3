<template>
	<Pane name="profile" title="活动收益">
		<!-- <block slot="right">
			<button class="uni-btn profile-btn">去提现</button>
			</block> -->

		<view class="slot-pane">
			<view class="item">
				<view>累计收益</view>
				<view id="ex_1" class="value">
					{{ data.accumulated || 0 }}
				</view>
			</view>
			<view class="item">
				<view>累计提现</view>
				<view id="ex_2" class="value">
					{{ data.withdrawal || 0 }}
				</view>
			</view><view class="item">
				<view>当前收益</view>
				<view id="ex_3" class="value">
					{{ data.before || 0 }}
				</view>
			</view>
		</view>
	</Pane>
</template>

<script>
// import { CountUp } from 'countup.js'
import Pane from './pane.vue'
export default {
	components: { Pane },
	props: {
		data: {
			type: Object,
			required: true
		}
	}
	// mounted() {},

	// watch: {
	// },

	// methods: {
	// },
}
</script>

<style lang="less" scoped>
.profile-btn {
  border-radius: 100px;
  font-size: 12px;
  padding: 4px 8px;
  color: #fff;
  background: linear-gradient(90deg, #e95d20, #ff8f1f);
  margin-left: 0;
  margin-right: 0;
}
</style>
