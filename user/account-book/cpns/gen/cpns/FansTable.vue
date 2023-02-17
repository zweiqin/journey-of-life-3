<template>
  <view class="tables-container">
    <tui-table v-if="data.length">
      <tui-tr>
        <tui-td
          bold
          v-for="(item, index) in header"
          :key="index"
          :span="item.span"
          >{{ item.title }}</tui-td
        >
      </tui-tr>
      <tui-tr v-for="(item, index) in data" :key="index">
        <tui-td
          :index="index"
          :span="obj.span"
          v-for="(obj, idx) in header"
          :key="idx"
        >
          <text v-if="obj.key === 'index'">{{ index }}</text>
          <text v-else>{{ item[obj.key] }}</text>
        </tui-td>
      </tui-tr>
    </tui-table>

    <view class="no-data" v-else>
      暂无数据
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      header: [
        {
          title: '序号',
          key: 'index',
          span: 4,
        },
        {
          title: '粉丝姓名',
          key: 'userName',
          span: 12,
        },
        {
          title: '订单数',
          key: 'totalQuantity',
          span: 8,
        },
        {
          title: '订单金额',
          key: 'totalAmount',
          span: 8,
        },
      ],

      listData: [
        {
          id: 1,
          name: '张三',
          age: '18',
          address: '上海市普陀区金沙江路',
        },
        {
          id: 2,
          name: '李四',
          age: '16',
          address: '上海市普陀区金沙江路',
        },
        {
          id: 3,
          name: '王小虎',
          age: '38',
          address: '上海市普陀区金沙江路',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.no-data{
  text-align: center;
  width: 100%;
  height: 200upx;
  line-height: 200upx;
  letter-spacing: 6upx;
  color: #ccc;
}
</style>
