<!--
 * @Author: aliyun0758874076 2300202994@qq.com
 * @Date: 2023-10-12 14:29:04
 * @LastEditors: aliyun0758874076 2300202994@qq.com
 * @LastEditTime: 2023-10-14 18:22:27
 * @FilePath: \tuan\community-center\merchant-settlement\authentication\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="authenticationPage">
    <swiper class="swiper" :current="personalInformation.current" :indicator-dots="false" :autoplay="false" :disable-touch="true">
      <swiper-item>
        <Personal :personalInformation="personalInformation"></Personal>
      </swiper-item>
      <swiper-item>
        <Service :personalInformation="personalInformation"></Service>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import Personal from './childrenPage/Personal.vue';
import Service from './childrenPage/Service.vue';
import { getUserId } from '../../../utils';

export default {
  name: 'SbXuRuiLi_And_ZhonWeiQing',
  components: {
    Personal,
    Service
  },
  onLoad(params) {
    this.personalInformation.serviceInformation.businessLabel = params.labelIds;
  },
  data() {
    return {
      personalInformation: {
        current: 0,
        personalImg: {
          headUrl: ''
        },
        basicInformationForm: {
          userId: getUserId(),
          account: '', // 账号
          password: '', // 密码
          confirmPwd: '',
          contactName: '', //联系人
          contactTel: '', // 联系人电话
          ident: '', // 身份证号
          contactAddress: '', // 联系地址
          cardNo: '', // 银行卡号
          bankName: '', // 银行名称
          userUrl: '', // 个人实名头像
          certImg1: '', // 身份证正面照
          certImg2: '', // 身份证反面照
          bankCardFront: '', // 银行卡正面照
          bankCardOpposite: '', // !银行卡反面照 非必填 已隐藏
          region: '', // !用于地址选择 和addresText连用  将两者拆开 最终请求时将两者拼接 使用 shopAddress 发送请求
          addresText: '' // !详细地址
        },
        businessInformationForm: {
          accountId: '', // 	账户ID
          shopName: '', // 店铺名称
          shopAddress: '', // 店铺地址
          region: '', // 地址选择   将两者拆开合并 最终请求时将两者拼接 使用 shopAddress 发送请求
          addresText: '', // 详细地址
          businessLicense: '', // 营业执照
          rotationChart: '', // 门店门头
          shopLogo: '' // 门店LOGO
        },
        serviceInformation: {
          accountId: '', // 账户id
          scopeBusiness: '', // 业务范围
          businessLabel: '' // 经营标签
        }
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
  overflow-y: auto;
}
</style>
