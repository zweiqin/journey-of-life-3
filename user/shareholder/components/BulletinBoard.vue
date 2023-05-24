<template>
  <view>
    <view class="section-title">会员数据看板</view>

    <canvas canvas-id="circle" style="width: 100%; height: 380upx;"></canvas>

    <view class="lenged">
      <view class="item" v-for="item in list" :key="item.name">
        <view class="dot" :style="{ background: item.color }"></view>
        <view class="name">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script>
const list = {
  1: {
    name: '超级合伙人（门店）',
    color: '#FDCC00',
  },
  7: {
    name: '超级合伙人（个人）',
    color: '#3B72AD',

  },
  6: {
    name: '合伙人',
    color: '#0CD9B5',
  },
  5: {
    name: '普通会员',
    color: '#0098FA',
  },
  9: {
    name: '区域代理',
    color: '#FE8C00',
  },
}

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      list: Object.freeze(list),
      segments: [],
      totalVipCount: 0
    }
  },
  watch: {
    data: {
      handler(value) {
        if (value.length > 1) {
          let totalVipCount = 0;
          value.forEach(item => {
            totalVipCount += +item.userQuantity
          })

          this.segments = value.map(item => {
            const item1 = list[item.userLevelquantity]
            if (item1) {
              return {
                color: list[item.userLevelquantity].color,
                text: item.userQuantity,
                percent: (item.userQuantity / totalVipCount) * 100
              }
            }
          }).filter(Boolean)

          this.totalVipCount = totalVipCount
          this.handleDraw()
        }
      },

      immediate: true,
      deep: true
    }
  },
  methods: {
    handleDraw() {
      const _this = this
      const ctx = uni.createCanvasContext('circle', this);
      const radius = 100;
      const lineWidth = 60;
      const startAngle = -Math.PI;

      let currentAngle = startAngle;
      this.segments.forEach(segment => {
        const endAngle = currentAngle + (Math.PI * segment.percent / 100);

        // 绘制分段圆环
        ctx.beginPath();
        ctx.arc(150, 150, radius, currentAngle, endAngle);
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle(segment.color);
        ctx.setLineCap('butt');
        ctx.stroke();

        // 添加分段文字
        const textAngle = currentAngle + (endAngle - currentAngle) / 2;
        const textX = 150 + Math.cos(textAngle) * (radius + lineWidth / 2 + 10);
        const textY = 150 + Math.sin(textAngle) * (radius + lineWidth / 2 + 10);
        ctx.setFontSize(14);
        ctx.setFillStyle('#333333');
        ctx.setTextAlign('center');
        ctx.setTextBaseline('middle');
        ctx.fillText(segment.text, textX, textY);
        currentAngle = endAngle;
      });

      // 绘制进度文本
      ctx.setFontSize(20);
      ctx.setFillStyle('#333333');
      ctx.setTextAlign('center');
      ctx.font = 'bold 16px sans-serif'
      ctx.setTextBaseline('middle');
      ctx.fillText(_this.totalVipCount, 150, 155);
      // ctx.draw();

      ctx.setFontSize(14);
      ctx.setFillStyle('#606972');
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('会员总数', 150, 130);
      ctx.draw();
    }
  },
}
</script>

<style lang="less" scoped>
.section-title {
  font-size: 24upx;
  font-weight: 500;
  padding-left: 20upx;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 8upx;
    height: 28upx;
    border-radius: 100px;
    left: 0;
    transform: translateY(-50%);
    top: 50%;
    background-color: #f40;
  }
}

.lenged {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    margin-right: 16upx;
    font-size: 24upx;
    margin-bottom: 10upx;
  }

  .dot {
    width: 20upx;
    height: 20upx;
    border-radius: 50%;
    margin-right: 8upx;
  }
}
</style>