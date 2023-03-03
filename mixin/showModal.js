export default () => {
  return {
    data() {
      return {
        _isShowTuiModel: false,
        _opInfo: null,
      }
    },
    methods: {
      _handleClickTuiModel(e, cb, backUrl) {
        if (e.index) {
          this.$data._isShowTuiModel = false
          if (typeof cb === 'string') {
            switch (cb) {
              case 'login':
                uni.navigateTo({
                  url: '/pages/login/login?redirect=' + backUrl,
                })
                break
            }
            return
          } else {
            this.$data._isShowTuiModel = false
            // 当点击了确定时触发执行回调
            cb && typeof cb === 'function' && cb(this.$data._opInfo)
          }
        }
        this.$data._opInfo = null
      },
    },
  }
}