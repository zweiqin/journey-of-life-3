<template>
    <view class="MakeSmallFortuneList">
        <!-- <view class="ReleaseStatus">
            <view class="subMenus">
                <scroll-view scroll-x>
                    <view class="sub-list-container">
                        <view class="sub-item" :class="{ active: examineType === item.value }" v-for="item in subCategoryList" :key="item.value">{{ item.name }}</view>
                    </view>
                </scroll-view>
            </view>
        </view> -->
          <Articles @reissueText="reissueText" @deleteText="deleteText" v-for="(item, index) in renderData" :key="index" :datas="item" :redirection="redirection"></Articles>
          <tui-modal :show="deleteModal" @click="handleClick" @cancel="deleteModal = false" title="提示" content="确定删除吗?"></tui-modal>
          <tui-dialog :buttons="buttons" :show="reissueShow" title="请确认再次投放" @close="reissueShow = false" @click="reissueTap">
            <template v-slot:content>
              重复的投放需要再次填入红包!!!
              <tui-input v-model="reissueForm.redPacketInfo.totalAmount" label="红包金额" placeholder="请输入红包金额"></tui-input>
              <tui-input v-model="reissueForm.redPacketInfo.totalPacket" label="红包数量" placeholder="请输入红包数量"></tui-input>
            </template>
          </tui-dialog>
    </view>
</template>

<script>
import Articles from './Articles.vue'
import { getRedStatistics, getPostList, postDetailsDelete } from '@/api/community-center/makeSmallFortune'
import { getUserId } from '@/utils';
import { addPublishArticleApi } from '../../../api/community-center/makeSmallFortune'
import { payFn } from '../../../utils'
export default {
  name: "MyRelease",
  components: {
    Articles
  },
  props: {},
  data() {
    return {
      deleteModal: false,
      myRelease: true,
      reissueShow: false,
      buttons:[{
        text: '取消'
      }, {
        text: '确定',
        color: '#586c94'
      }],
      renderData: [],
      querList: {
        page: 1,
        size: 10,
      },
      reissueForm: {
          publishUserId: '1234',
          postTitle: '文章标题',
          postContent: "文章内容",
          postCategoryId: "1",
          postType: "1",
          postCover: "23435576687.png",
          region: "130100",
          redPacketInfo: {
                totalAmount: "",
                totalPacket: "",
                link: ""
              }
      },
      subCategoryList: [
       {name: '审核通过', value: 3},
       {name: '待审核', value: 2},
       {name: '未通过', value: 4},
       {name: '已撤回', value: 5},
      ],
      examineType: 3,
      region: '顺德区',
      isGetMore: true,
      postId: ''
    }
  },
  created() {
      this.getPostList()
  },
  computed: {},
  methods: {
    getPostList() {
        getPostList({
          userId: getUserId(),
          page: this.querList.page,
          size: this.querList.size,
          examineType: this.examineType,
          region: this.region
        }).then(res => {
          if (res.data.talentList.length == this.renderData.length) {
              this.isGetMore = false
              this.$emit('isLoading', false)
              return uni.showToast({
                title: '没有更多数据了',
                icon: 'none'
              });
          }
          this.renderData = res.data.talentList
          this.$emit('isLoading', false)
        })
    },
    getMoewPostList() {
      if (!this.isGetMore) {
        this.$emit('isLoading', false)
        return uni.showToast({
          title: '没有更多数据了',
          icon: 'none'
        });
      }else {
        this.querList.size = this.querList.size + 10
        this.getPostList()
      }
    },
    redirection(id) {
        uni.navigateTo({
             url: `/community-center/makeSmallFortune/editingArticles?id=${id}`
        });
    },
    deleteText(ID) {
      this.deleteModal = true
      this.postId = ID
    },
    handleClick(e) {
      if (e.index == 1) {
          postDetailsDelete({
            postId:this.postId
          }).then(res => {
            uni.showToast({
              title: '删除成功',
              icon: 'none'
            })
            this.getPostList()
          }).catch(err => {
            console.log(err);
          })
      }else {
        uni.showToast({
              title: '已取消',
              icon: 'none'
          })
      }
      this.deleteModal = false
    },
    reissueText(value) {
      for(let Key in value) {
        if (this.reissueForm[Key] && Key !== 'redPacketInfo') {
            this.reissueForm[Key] = value[Key]
        }
      }
      // console.log(this.reissueForm);
      this.reissueShow = true
    },
    reissueTap(e) {
      if (e.index == 0) {
        this.reissueShow = false
        return uni.showToast({
              title: '已取消',
              icon: 'none'
          })
      }else {
        console.log(Number(this.reissueForm.redPacketInfo.totalAmount) < 1);
        if (Number(this.reissueForm.redPacketInfo.totalAmount) < 1) return this.$showToast('投放金额最低为1元')
        if (Number(this.reissueForm.redPacketInfo.totalPacket) < 1 || Number(this.reissueForm.redPacketInfo.totalAmount)/ Number(this.reissueForm.redPacketInfo.totalPacket) < 0.1) return this.$showToast('红包平均金额不得少于0.1')
        uni.showLoading()
        addPublishArticleApi({ ...this.reissueForm })
          .then(({ data }) => {
            uni.hideLoading()
            payFn({ ...data, orderSn: data.redPacketId }, 8, false)
          })
          .catch((e) => {
            uni.hideLoading()
          })
      }
      console.log(e);
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
@keyframes fade {
  0% {
    opacity: 0.4;
    transform: translateX(-100vw);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.MakeSmallFortuneList {
  /* overflow-y: auto; */
  .ArticlesItem {
    -webkit-animation: fade 450ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 450ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(1) {
    -webkit-animation: fade 350ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 350ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(2) {
    -webkit-animation: fade 400ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 400ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(3) {
    -webkit-animation: fade 450ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade  450ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(4) {
    -webkit-animation: fade 500ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 500ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(5) {
    -webkit-animation: fade 550ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 550ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(6) {
    -webkit-animation: fade 600ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 600ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
  .ArticlesItem:nth-of-type(7) {
    -webkit-animation: fade 650ms cubic-bezier(0.76, 1.68, 1, 0.84);
    animation: fade 650ms cubic-bezier(0.76, 1.68, 1, 0.84);
  }
}
.subMenus {
	width: 100vw;
	display: flex;
}
.sub-list-container {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	white-space: nowrap;
	margin-bottom: 20upx;
	padding: 0 30rpx;

	.sub-item {
		font-size: 32upx;
		padding: 6upx 18upx;
		/* border: 1upx solid #777; */
		border-radius: 12upx;
		margin-right: 20upx;
		color: #ffffff;
		background: rgba(121, 121, 121, 0.693);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);

		&.active {
            border-color: #ef530e;
            color: #0a58f4;
		}
	}
}
</style>