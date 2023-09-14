 # 欢迎使用 layout 布局組件
**layout組件，高性能下拉刷新触底加载，具有轻量级、高性能、高配置等能力。
具有回到顶部功能，具有头部底部自动分配布局的能力，可以根据需求自定义下拉刷新动画和触底加载动画也可自定义回到顶部样式，使用简单，等优点**

### 安装方式
本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 推荐
##### 推荐瀑布流样式可使用 [jp-falls](https://ext.dcloud.net.cn/plugin?id=12916)该瀑布流组件，该组件具有轻量级、高性能等优势
##### 推荐css加载动画可参考 [jp-loading](https://ext.dcloud.net.cn/plugin?id=12993) ，该加载动画为css动画，提升动画流畅性

##有项目需要开发的请联系 QQ:371524845
###开发不易，如果帮助到你的，请支持 有问题请留言，作者会积极更新

###项目实例请查看 @/jp-layout/pages/index/index.vue
#### 该实例因为使用到瀑布流组件，所以需要下载依赖  [jp-falls](https://ext.dcloud.net.cn/plugin?id=12916)

#使用方法
##### layout基础用法
```html
<template>
	<jp-layout @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh" :isMore="isMore" refresher isBackTop
		:style="'height:' + tempHeight +'px'">
		<view>
			<view v-for="item in list" class="item">{{item}}</view>
	    </view>
	</jp-layout>
</template>

<script>
	export default {
		data() {
			return {
				isMore:false,
				list:[1,2,3,4,5,6,7,8,9,10]
			}
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息， 因为我们的 layout没有高度需要自己设置        
				success: function(res) {
					that.tempHeight = res.windowHeight;
					console.log(res)
				}
			});
		},
		onLoad() {},
		methods: {
			refresherrefresh(fun = function() {}) {
				let that = this
				this.isMore= false
				setTimeout(() => {
					fun()
					console.log('冲冲冲')
					that.list = [1,2,3,4,5,6,7,8,9,10]
				}, 3200)
			},
			scrolltolower(fun = function() {}) {
				if(this.list.length>30){
					this.isMore = true
					return
				}
				this.list = [...this.list,...[1,2,3,4,5,6,7,8,9,10]]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		line-height: 150rpx;
		border-bottom: 1px solid #ccc;
	}
</style>
```

###方法介绍 
####参数
| 参数名        | 类型   |  默认值  | 说明  |
| --------   |  -------- |  --------| --------|
|   refresher   |  [Boolean, String]  |   false    |  是否拥有下拉刷新     |
|   refresherBackground   | String  |   #ffffff    |  下拉刷新背景色 |
|   refresherNone   |  [Boolean, String]  |   false    |  隐藏下拉刷新样式（因为uniapp，slots使用传值，父组件获取值之后没办法判断$slots.refresher是否用过，所以只能传值控制）     |
| voluntarilyRefresherClose        |   Number   |  0   |  是否自动关闭下拉刷新（当我们下拉刷新的时候有时候需要他自动关闭动画，传入的值即使关闭时间 单位毫秒）        |
| refresherThreshold        |    Number    |  50 |  下拉刷新触发距离，此高度是下拉刷新插槽高度 |
| lowerThreshold        |    Number    |  50 |  触底加载触发距离 |
| isMore        |  Boolean     |  false  |  没有更多数据了（没有更多数据是传true），这样我们就不会再触发触底加载了 |
| isBackTop        |    Boolean    |  false |  是否拥有回到顶部 |
| backTopDistance        |    Number    |  150 |  回到顶部按钮出现的距离 |
| duration        |    Number    |  800 |  回到顶部时间 （毫秒）|
|empty |   Boolean    |  false |  现在暂无数据插槽 |   


####插槽 Slots
| 方法名        |   说明  |
| --------   |  --------|
|  top    | 头部插槽  |  
|   refresher    |  下拉刷新动画插槽 （接收值triggeredType  1：下拉加载  2：松开刷新 3：加载中  4：加载完成）  | 
|   more    |  触底加载动画插槽（根据传进去的isMore判断是没有更多数据还是在进行加载动画）   | 
|   empty    |  暂无数据   | 
|   bottom    |  底部插槽   | 
|   backtop    |  回到顶部插槽   | 

####事件
| 方法名        |   返回值 | 说明  |
| --------   |  --------|--------|
|  refresherrefresh  | function（）   |  返回的是一个函数方法，在触发事件里面调用这个方法可以结束下拉加载动画   | 
|  scrolltolower  |     |  触底加载动画，如果没有更多数据了请传入 isMore=true| 

## 进阶用法
使用插槽替换里面的样式达到自己需要的效果，操作简单
```html
<template>
	<jp-layout @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh" :isMore="isMore" refresher isBackTop
		:style="'height:' + tempHeight +'px'" refresherNone :refresherThreshold="80" :duration="duration">
		<template #refresher={refresher}>
			<view>
				<view v-if="refresher==0" class="refresherm">下拉加载</view>
				<view v-if="refresher==1" class="refresherm">松开刷新</view>
				<view v-if="refresher==2" class="refresherm">
				   <image mode="heightFix" src="../../static/output-15_34_53.gif"></image>
				</view>
				 <view v-if="refresher==4" class="refresherm">刷新成功</view>
			</view>
		</template>
		<template #backtop>
			<view class="backtop" @click="setisbacktop">
				<image v-if="isbacktop" mode="heightFix" src="../../static/jintai.png"></image>
				<image v-else mode="heightFix" src="../../static/output-15_48_3.gif"></image>
			</view>
		</template>
		<view>
			<view v-for="item in list" class="item">{{item}}</view>
	    </view>
		<template #more>
			<view class="more" >
				<view class="" v-if="isMore">已经到达宇宙尽头了</view>
				<image v-else mode="widthFix"  src="../../static/output-15_47_23.gif"></image>
			</view>
		</template>
	</jp-layout>
</template>

<script>
	export default {
		data() {
			return {
				duration:1500,
				isbacktop:true,
				isMore:false,
				list:[1,2,3,4,5,6,7,8,9,10]
			}
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息， 因为我们的 layout没有高度需要自己设置        
				success: function(res) {
					that.tempHeight = res.windowHeight;
					console.log(res)
				}
			});
		},
		onLoad() {},
		methods: {
			setisbacktop(){
				let that = this
				this.isbacktop = false
				setTimeout(()=>{
					that.isbacktop = true
				},that.duration)
			},
			refresherrefresh(fun = function() {}) {
				let that = this
				this.isMore= false
				setTimeout(() => {
					fun()
					that.list = [1,2,3,4,5,6,7,8,9,10]
				}, 3200)
			},
			scrolltolower(fun = function() {}) {
				if(this.list.length>30){
					this.isMore = true
					return
				}
				let that = this
				setTimeout(()=>{
					that.list = [...that.list,...[1,2,3,4,5,6,7,8,9,10]]
				},2000)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.more{
		text-align: center;
		color: #999;
		line-height: 80px;
		image{
			width: 750rpx;
		}
	}
	.backtop{
		width: 80px;
		height: 80px;
		overflow: hidden;
		border-radius: 50%;
		image{
			height: 80px;
			width: 80px;
		}
	}
	.refresherm{
						  line-height: 80px;
						  text-align: center;
						  color: #999;
		image{
			height: 80px;
		}
	}
	.item{
		line-height: 150rpx;
		border-bottom: 1px solid #ccc;
	}
</style>
```

