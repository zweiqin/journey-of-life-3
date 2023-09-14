<template>
	<view class="pages" >
		<view class="pages-header">
			<slot name="top"></slot>
		</view>
		<view class="pages-main">
			<scroll-view ref="scrollView" class="pages-scroller" scroll-y  
			   :refresher-enabled="refresher"
			   refresher-default-style="none"
				:lower-threshold="lowerThreshold"
				:refresher-threshold="refresherThreshold"
			    :refresher-triggered="triggered"
				:scrollTop="scrollTop"
				:refresherBackground="refresherBackground"
			   @refresherrefresh="refresherrefresh"
			   @refresherpulling="refresherpulling"
			   @refresherrestore="onRestore" 
			   @scrolltolower="scrolltolower"
			   @scroll="scroll"
			 >
			 <view class="content" >
				 <view class="refresher" :style="{top: '-'+refresherThreshold+'px',height:refresherThreshold+'px'}" >
					 <view v-if="!refresherNone">
						 <view v-if="triggeredType==0" class="refresherm">下拉加载</view>
						 <view v-if="triggeredType==1" class="refresherm">松开刷新</view>
						 <view v-if="triggeredType==2" class="refresherm cartoon">
							  <span class="char">拼</span>
							   <span class="char">命</span>
							   <span class="char">加</span>
							   <span class="char">载</span>
							   <span class="char">中</span>
							   <span class="char">.</span>
							   <span class="char">.</span>
							   <span class="char">.</span>
						 </view>
						  <view v-if="triggeredType==4" class="refresherm">刷新成功</view>
					 </view>
					 <slot name="refresher" :refresher="triggeredType" ></slot>
				 </view>
				 <view>
					<slot></slot>
				 </view>
				 <view  v-if="empty" >
					<view v-if="!$slots.empty" class="empty">
							<view>
								<svg t="1686214819926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12692" width="100" height="100"><path d="M958.660364 288.642956l0.024559 0L511.996418 65.304332 66.119395 288.23568l-0.830925 0L65.28847 735.350904l446.707948 223.344764 446.714088-223.344764L958.710506 288.642956 958.660364 288.642956 958.660364 288.642956 958.660364 288.642956zM511.996418 119.41267l335.906399 168.380942-127.914298 64.48671L382.46939 184.402847 511.996418 119.41267 511.996418 119.41267 511.996418 119.41267zM323.935252 216.08543l341.852832 164.712389-153.816225 74.501808L176.095135 288.642956 323.935252 216.08543 323.935252 216.08543 323.935252 216.08543zM121.126196 345.139691l17.753339 0-17.753339-0.652869 0-27.915793L484.086765 498.05643l0 390.871245L121.126196 707.446367 121.126196 345.139691 121.126196 345.139691 121.126196 345.139691zM902.86664 372.414895l0 335.031473L539.905048 888.927675 539.905048 498.05643 902.86664 316.571029 902.86664 372.414895 902.86664 372.414895 902.86664 372.414895z" fill="#e6e6e6" p-id="12693"></path></svg>
							</view>
							<view class="text">
								暂无数据
							</view>
					</view>
				 	<slot name="empty"></slot>
				 </view>
				 <view v-if="isMore && triggeredType!=2">
					 <view class="more" v-if="!$slots.more">~没有更多数据了~</view>
					 <slot name="more" ></slot>
				 </view>
				 <view v-if="!isMore && triggeredType!=2">
					<view class="more cartoon" v-if="!$slots.more">
						 <span class="char">拼</span>
						 <span class="char">命</span>
						 <span class="char">加</span>
						 <span class="char">载</span>
						 <span class="char">中</span>
						 <span class="char">.</span>
						 <span class="char">.</span>
						 <span class="char">.</span>
					</view>
					<slot name="more"  ></slot>
				 </view>
			 </view>
			</scroll-view>
			<div class="_backtop" v-if="isBackTop" @click.stop="toTop" >
				<view v-if="isTop">
					 <transition name="fade"  appear>
						<div class="top"  v-if="!$slots.backtop">
							<svg t="1686212981503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3289" width="30" height="30"><path d="M866.7 96H157.3c-17.8 0-32.2 14.4-32.2 32.2 0 17.8 14.4 32.2 32.2 32.2h709.5c17.8 0 32.2-14.4 32.2-32.2 0-17.8-14.4-32.2-32.3-32.2zM512 225c-16.5 0-33 6.3-45.6 18.9L169.9 540.3c-5.8 5.8-9.4 13.9-9.4 22.8s3.6 17 9.4 22.8c5.8 5.8 13.9 9.4 22.8 9.4s17-3.6 22.8-9.4l264.2-264.2v574c0 17.8 14.4 32.2 32.2 32.2 17.8 0 32.2-14.4 32.2-32.2v-574l264.2 264.2c5.8 5.8 13.9 9.4 22.8 9.4s17-3.6 22.8-9.4c5.8-5.8 9.4-13.9 9.4-22.8s-3.6-17-9.4-22.8L557.6 243.9C545 231.3 528.5 225 512 225z" fill="#515151" p-id="3290"></path></svg>
						</div>
						<slot name="backtop"></slot>
					 </transition>
				</view>
			</div>
		</view>
		<view class="pages-header">
			<slot name="bottom"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 下拉刷新
			refresher: {// 是否拥有下拉刷新
			    type: [Boolean, String],
			    default: false,
			},
			refresherBackground: {// 是否拥有下拉刷新
			    type: String,
			    default: '#fff',
			},
			refresherNone: {// 隐藏下拉刷新下拉刷新
			    type: [Boolean, String],
			    default: false,
			},
			voluntarilyRefresherClose: { // 自动关闭，默认没有
			    type: Number,
			    default: 0,
			},
			refresherThreshold: { // 下拉刷新触发距离，此高度是下拉刷新插槽高度
			    type: Number,
			    default: 50,
			},
			// 回到顶部
			isBackTop: {// 是否拥有回到顶部
			    type: [Boolean, String],
			    default: false,
			},
			backTopDistance: { // 回到顶部显示距离
			    type: Number,
			    default: 150,
			},
			duration: { // 回到顶部时间
				type: Number,
				default: 800,
			},
			// 没有数据处理
			isMore: {// 没有更多数据了
			    type: [Boolean, String],
			    default: false,
			},
			empty: {// 没有数据
			    type: [Boolean, String],
			    default: false,
			},
			// 触底加载
			lowerThreshold: { // 触底距离
			    type: Number,
			    default: 50,
			},
		},
		data() {
			return {
				triggered: 'restore',
				triggeredType:0,
				scrollTop:0,
				isScrolltolower:true,
				isTop:false
			}
		},
		created() {},
		onLoad() {},
		mounted() {
			if (this.$slots.refresher) {
			    console.log('插槽 "refresher" 被使用了');
			} else {
			    console.log('插槽 "refresher" 没有被使用');
			}
		},
		methods: {
			scrolltolower(e){
				if(this.isMore){
					return
				}
				if(this.isScrolltolower){
					let that = this
					// that.isScrolltolower = false
					// setTimeout(() => {
					// 	that.isScrolltolower = true
					// },1000)
					this.$emit('scrolltolower',function () {
						that.isScrolltolower = true
					})
				}
			},
			toTop() {
			     let that = this
				  this.scrollTop = this.$refs.scrollView.lastScrollTop
			      const duration = this.duration // duration 默认为 1000ms
			      const easing = (t) => t * (2 - t) // 缓动函数
			      let start = this.scrollTop // 起始位置
			      let end = 0 // 结束位置
			      let change = end - start // 变化量
			      let currentTime = 0 // 当前时间
			      // 滚动动画函数
			      const animateScroll = function () {
			        currentTime += 16 // 设定定时器暂停时间，16ms
			        let val = easing(currentTime / duration) * change + start
			        that.scrollTop = val
			        if (currentTime < duration) {
			          setTimeout(animateScroll, 16)
			        }
			      }
			      animateScroll()
			 },
			 scroll(e){
		        if(e.target.scrollTop>this.backTopDistance){
					this.isTop = true
				}else{
					this.isTop =false
				}
			 },
			// 刷新
			onRestore() {
				this.triggered = 'restore'; // 需要重置
			},
			refresherrefresh(e) {
				this.triggeredType = 0
				if (this.triggeredType==2) return;
				this.triggeredType = 2
				if(this.voluntarilyRefresherClose>0){
					setTimeout(() => {
						this.triggered = false;
						this.triggeredType = 0
					}, this.voluntarilyRefresherClose)
				}
				// 取数据
				let that = this
				this.$emit('refresherrefresh',function () {
					that.triggeredType = 4
					setTimeout(()=>{
						that.triggered = false;
						that.triggeredType = 0
					},500)
				})
			},
			refresherpulling(e) {
				let deltaY = e.detail.deltaY || e.target.deltaY
				if (deltaY < 70) {
					this.triggeredType = 0
				} else {
					this.triggeredType = 1
				}
			},
		}
	}
</script>

<style  lang="scss" scoped>
	.cartoon{
		.char {
		  display: inline-block;
		   transform: translateY(5px);
		  animation: bounce 0.5s infinite alternate;
		}
		.char:nth-child(2) {
		  animation-delay: 0.1s;
		}
		
		.char:nth-child(3) {
		  animation-delay: 0.2s;
		}
		
		.char:nth-child(4) {
		  animation-delay: 0.3s;
		}
		
		.char:nth-child(5) {
		  animation-delay: 0.4s;
		}
		
		.char:nth-child(6) {
		  animation-delay: 0.5s;
		}
		
		.char:nth-child(7) {
		  animation-delay: 0.6s;
		}
		
		.char:nth-child(8) {
		  animation-delay: 0.7s;
		}
		
		@keyframes bounce {
		  from {
		    transform: translateY(5px);
		  }
		  to {
		    transform: translateY(-5px);
		  }
		}
	}
	
	.pages {
	  display: flex;
	  flex-direction: column;
	  height: 100%;
	  overflow-x: hidden;
	  .pages-header {
	    position: relative;
	    z-index: 10;
	  }
	  .pages-main {
	    position: relative;
	    flex: 1;
	    overflow: hidden;
	    .pages-scroller {
	      position: absolute;
	      top: 0;
	      left: 0;
	      bottom: 0;
	      right: 0;
		  height: 100%;
	      overflow: hidden;
	      overflow-y: scroll;
		  .empty{
			height: 100%;
			line-height: 100%;
			color: #999;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			padding: 120rpx 0;
			.text{
				width: 750rpx;
				text-align: center;
			}
		  }
		  .content{
			  position: relative;
			  .refresher{
				  position: absolute;
				  left: 0;
				  right: 0;
				  .refresherm{
					  line-height: 50px;
					  text-align: center;
					  color: #999;
				  }
			  }
			  .more{
				  color: #ccc;
				  text-align: center;
				  line-height: 80rpx;
			  }
		  }
	    }
		._backtop{
			position: absolute;
			z-index: 1;
			right: 30rpx;
			bottom: 50px;
			.top{
				width: 60px;
				height: 30px;
				box-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, .3), -0.2rem -0.2rem 0.5rem rgba(255, 255, 255, .3);
				background: #fff;
				border-radius: 50%;
				padding: 15px 0;
				text-align: center;
			}
			  /* 过渡类名 */
			  .fade-enter-active,
			  .fade-leave-active {
			    transition: opacity 0.7s;
			  }
			  .fade-enter,
			  .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
			    opacity: 0;
			  }
		}
	  }
	}

</style>
