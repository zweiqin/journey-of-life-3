export const btnList = [
  {
    bgColor: '#16C2C2',
    //名称
    text: '返回',
    //字体大小
    fontSize: 28,
    //字体颜色
    color: '#fff',
    cb: () => {
      uni.navigateBack()
    },
  },
  {
    bgColor: '#64B532',
    //名称
    text: '首页',
    //字体大小
    fontSize: 28,
    //字体颜色
    color: '#fff',
    cb: () => {
      uni.switchTab({
        url: '/pages/stuff/stuff',
      })
    },
  },
]
