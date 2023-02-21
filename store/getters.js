export default {
  userId: state => state.auth.userId,
  userInfo: state => state.auth.userInfo,
  userToken: state => state.auth.userToken,

  // 购物车
  shopCarInfo: state => state.shopCar.shopCarInfo,
  currentMode: state => state.shopCar.currentMode,
  deleteList: state => state.shopCar.deleteList,

  // 位置
  currentCity: state => state.location.currentCity,
}
