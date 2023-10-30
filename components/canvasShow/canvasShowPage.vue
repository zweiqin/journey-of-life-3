<template>
	<div class="layout hom-layout">
		<div v-for="(item, index) in componentsData" :key="index" class="list-group-item">
			<!-- {{ item.type }} -->
			<!--        <component :is="componentMap[terminal-1].get(item.type)" :componentContent="item.componentContent" :terminal="terminal" :typeId="typeId" :shopId="shopId"></component> -->
			<ComBanner
				v-if="item.type === 'banner'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComBanner>
			<ComText
				v-if="item.type === 'text'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComText>
			<ComImageText
				v-if="item.type === 'imageText'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComImageText>
			<ComBrandList
				v-if="item.type === 'brandList'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComBrandList>
			<ComCategoryList
				v-if="item.type === 'categoryList'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComCategoryList>
			<ComImageTextList
				v-if="item.type === 'imageTextList'" :component-content="item.componentContent"
				:terminal="terminal" :type-id="typeId" :shop-id="shopId"
			></ComImageTextList>
			<ComAssistDiv
				v-if="item.type === 'assistDiv'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComAssistDiv>
			<ComImageTextNav
				v-if="item.type === 'imageTextNav'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComImageTextNav>
			<ComProduct
				v-if="item.type === 'productList'" ref="productPage" :component-content="item.componentContent"
				:terminal="terminal" :type-id="typeId" :shop-id="shopId"
			></ComProduct>
			<ComVideoBox
				v-if="item.type === 'videoBox'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComVideoBox>
			<ComCoupon
				v-if="item.type === 'coupon'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComCoupon>
			<ComCustom
				v-if="item.type === 'custom'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComCustom>
			<ComNotice
				v-if="item.type === 'notice'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComNotice>
			<ComVip
				v-if="item.type === 'vip'" :component-content="item.componentContent" :terminal="terminal" :type-id="typeId"
				:shop-id="shopId"
			></ComVip>
			<ComGroup
				v-if="item.type === 'groupList'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComGroup>
			<ComDiscount
				v-if="item.type === 'discountList'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComDiscount>
			<ComSpike
				v-if="item.type === 'spikeList'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComSpike>
			<ComPrice
				v-if="item.type === 'priceList'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComPrice>
			<ComNewProduct
				v-if="item.type === 'newProduct'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComNewProduct>
			<ComShop
				v-if="item.type === 'shop'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComShop>
			<ComLive
				v-if="item.type === 'live'" :component-content="item.componentContent" :terminal="terminal"
				:type-id="typeId" :shop-id="shopId"
			></ComLive>
		</div>
	</div>
</template>

<script>
// import comComponentMap from './componentMap'

import comBanner from '@/components/canvasShow/basics/banner'
import comText from '@/components/canvasShow/basics/text'
import comImageText from '@/components/canvasShow/basics/imageText'
import comBrandList from '@/components/canvasShow/basics/brandList'
import comCategoryList from '@/components/canvasShow/basics/categoryList'
import comImageTextList from '@/components/canvasShow/basics/imageTextList'
import comAssistDiv from '@/components/canvasShow/basics/assistDiv'
import comImageTextNav from '@/components/canvasShow/basics/imageTextNav'
import comProduct from '@/components/canvasShow/basics/product/app/index'
import comVideoBox from '@/components/canvasShow/basics/video'
import comCoupon from '@/components/canvasShow/basics/coupon/app'
import comCustom from '@/components/canvasShow/basics/custom'
import comNotice from '@/components/canvasShow/basics/notice'
import comVip from '@/components/canvasShow/basics/vip/app'
import comGroup from '@/components/canvasShow/basics/group/app/index'
import comDiscount from '@/components/canvasShow/basics/discount/app'
import comSpike from '@/components/canvasShow/basics/spike/app'
import comPrice from '@/components/canvasShow/basics/price/app'
import comNewProduct from '@/components/canvasShow/basics/newProduct/app'
import comShop from '@/components/canvasShow/basics/shop'
import comLive from '@/components/canvasShow/basics/live/app'
import { sendReqMixin } from './config/mixin'

export default {
	name: 'CanvasPage',
	components: {
		ComBanner: comBanner,
		ComText: comText,
		ComImageText: comImageText,
		ComBrandList: comBrandList,
		ComCategoryList: comCategoryList,
		ComImageTextList: comImageTextList,
		ComAssistDiv: comAssistDiv,
		ComImageTextNav: comImageTextNav,
		ComProduct: comProduct,
		ComVideoBox: comVideoBox,
		ComCoupon: comCoupon,
		ComCustom: comCustom,
		ComGroup: comGroup,
		ComDiscount: comDiscount,
		ComSpike: comSpike,
		ComPrice: comPrice,
		ComNotice: comNotice,
		ComVip: comVip,
		ComNewProduct: comNewProduct,
		ComShop: comShop,
		ComLive: comLive
	},
	mixins: [ sendReqMixin ],
	props: {
		terminal: {
			type: Number,
			default: 4
		},
		typeId: {
			type: Number,
			default: 1
		},
		shopId: {
			type: Number,
			default: 0
		},
		componentsData: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			// terminal: 4, // 画布设备 1 小程序，2 H5，3 App 4 电脑
			// typeId: 3, // 画布类型 1 平台画布，2 自定义页面，3 商家店铺装修
			// shopId: 0, // 店铺id
			// componentsData: [],
			// componentMap: componentMap
		}
	},
	methods: {

	}
}
</script>

<style lang="scss"
       scoped
>
.hom-layout {
	background-color: #ffffff;
	width: 100%;
	overflow: hidden;
}
</style>

<style lang="scss">
.warp {
	width: 710upx;
	margin: 0 auto;
	max-width: 100%;

	&.terminal4 {
		width: 1200px;
		max-width: 100%;
	}
}

.flex-box {
	display: flex;
}
</style>
