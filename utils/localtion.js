// #ifdef H5
import { jsonp } from 'vue-jsonp'
// #endif

// 导航去某地
export const navigationAddress = destination => {
  const locationData = destination.split(',')
  uni.openLocation({
    latitude: locationData[1] * 1,
    longitude: locationData[0] * 1,
    success: function () {
      console.log('success')
    },
    fail(err) {
      console.log(err)
    },
  })

  // APP在搞吧
  // window.open(
  //   `//uri.amap.com/navigation?from=118.115948,24.470662&to=${destination}&mode=car&policy=1&src=com.mzwu.www&callnative=1`
  // )
}

/**
 * 根据经纬度逆解析地址
 */
export const getAdressDetailByLngLat = (lat, lng) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    jsonp('https://restapi.amap.com/v3/geocode/regeo', {
      key: 'fcd4b7ee70f357abeffaef7b43d364b3',
      location: `${lng},${lat}`,
    })
      .then(res => {
        console.log(res);
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    // #endif

    // #ifdef APP-PLUS
    uni.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: 'fcd4b7ee70f357abeffaef7b43d364b3',
        location: `${lng},${lat}`,
      },
      header: {},
      success: res => {
        resolve(res.data)
      },
      fail() {
        reject()
      },
    })
    // #endif
  })
}

// 根据地址获取
export const getLngLatByAddress = address => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    jsonp('https://restapi.amap.com/v3/geocode/geo', {
      key: 'fcd4b7ee70f357abeffaef7b43d364b3',
      address,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    // #endif
  })
}