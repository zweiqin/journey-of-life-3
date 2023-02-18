export const saveImg = (url, cb) => {
  // #ifdef H5
  const uniappA = document.createElement('a')
  uniappA.download = ''
  uniappA.href = url
  document.body.appendChild(uniappA)
  uniappA.click()
  uniappA.remove()
  cb && typeof cb === 'function' && cb()
  // #endif

  // #ifdef APP
  uni.saveImageToPhotosAlbum({
    filePath: url,
    success: function () {
      cb && typeof cb === 'function' && cb()
    },
  })
  // #endif
}
