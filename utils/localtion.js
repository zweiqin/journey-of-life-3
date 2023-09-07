// #ifdef H5
import { jsonp } from 'vue-jsonp';
// #endif
import store from '../store/index';

// 导航去某地
export const navigationAddress = (destination) => {
  const locationData = destination.split(',');
  uni.openLocation({
    latitude: locationData[1] * 1,
    longitude: locationData[0] * 1,
    success: function () {
      console.log('success');
    },
    fail(err) {
      console.log(err);
    }
  });

  // APP在搞吧
  // window.open(
  //   `//uri.amap.com/navigation?from=118.115948,24.470662&to=${destination}&mode=car&policy=1&src=com.mzwu.www&callnative=1`
  // )
};

/**
 * 根据经纬度逆解析地址
 */
export const getAdressDetailByLngLat = (lat, lng) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    jsonp('https://restapi.amap.com/v3/geocode/regeo', {
      key: '5773f02930998e41b0de1d4e1bdbcaa9',
      location: `${lng},${lat}`
    })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    // #endif

    // #ifdef APP-PLUS
    uni.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: '5773f02930998e41b0de1d4e1bdbcaa9',
        location: `${lng},${lat}`
      },
      header: {},
      success: (res) => {
        resolve(res.data);
      },
      fail() {
        reject();
      }
    });
    // #endif
  });
};

// 根据地址获取
export const getLngLatByAddress = (address) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    jsonp('https://restapi.amap.com/v3/geocode/geo', {
      key: '5773f02930998e41b0de1d4e1bdbcaa9',
      address
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    // #endif

    // #ifdef APP
    uni.request({
      url: 'https://restapi.amap.com/v3/geocode/geo',
      data: {
        key: '5773f02930998e41b0de1d4e1bdbcaa9',
        address
      },
      header: {},
      success: (res) => {
        resolve(res.data);
      },
      fail() {
        reject();
      }
    });
    // #endif
  });
};

// 高德
export function MapLoader(onSuccess, onFail) {
  let aMapScript = document.createElement('script');
  aMapScript.setAttribute('src', 'https://webapi.amap.com/maps?v=1.4.11&key=262e1be2edfaf66333664f33a915ccf3&plugin=AMap.CitySearch');
  document.head.appendChild(aMapScript);
  return (aMapScript.onload = function () {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,
        buttonPosition: 'RB'
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);
      AMap.event.addListener(geolocation, 'error', onError);

      function onComplete(data) {
        // data是具体的定位信息
        const position = data.position;
        onSuccess &&
          typeof onSuccess === 'function' &&
          onSuccess({
            latitude: position.lat,
            longitude: position.lng
          });
      }

      function onError(data) {
        onFail && typeof onFail === 'function' && onFail(data);
      }
    });
  });
}

// 判断用户是否给了定位权限
export const isUserEmpowerLocationPermission = () => {
  return new Promise(async (resolve, reject) => {
    if (!navigator.permissions && !navigator.permissions.query) {
      reject(false);
    }
    const permissionStatus = await navigator.permissions.query({
      name: 'geolocation'
    });

    const state = permissionStatus.state;
    if (state === 'granted') {
      resolve(true);
    } else if (state === 'denied') {
      reject(false);
    }

    setTimeout(() => {
      reject('prompt');
    }, 3000);
  });
};

// 防止用户通过连接进入页面导致未获取到定位信息就直接发送需要携带当前定位信息的接口
export const getCurrentLocation = (error = true, isRedirectImmediately) => {
  let count = 2;
  let timer = null;
  return new Promise(async (resolve, reject) => {
    let currentAddress = store.getters.detailAddress;
    if (currentAddress) {
      resolve(currentAddress);
    }

    timer = setInterval(() => {
      if (count === 0) {
        if (!currentAddress) {
          error ? resolve('') : reject(new Error('获取您的定位失败'));
        }

        clearInterval(timer);
        if (isRedirectImmediately) {
          timer = setTimeout(() => {
            uni.redirectTo({
              url: '/pages/choose-location/choose-locatio'
            });
          }, 2000);
        }
      }

      count--;
    }, 1000);

    await store.dispatch('location/getCurrentLocation', (data) => {
      currentAddress = data.detail;
      if (currentAddress) {
        resolve(currentAddress);
      }
    });
  });
};
