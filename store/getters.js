export default {
  userId: (state) => state.auth.userId,
  userInfo: (state) => state.auth.userInfo,
  userToken: (state) => state.auth.userToken,
  historyInfo: (state) => state.auth.historyInfo,
  historyPopup: (state) => state.auth.historyPopup,

  // 购物车
  shopCarInfo: (state) => state.shopCar.shopCarInfo,
  currentMode: (state) => state.shopCar.currentMode,
  deleteList: (state) => state.shopCar.deleteList,

  // 位置
  currentCity: (state) => state.location.currentCity,
  detailAddress: (state) => state.location.detailAddress,

  // 聊天
  customerServiceInfo: (state) => state.customerService.customerServiceInfo,
  chatListData: (state) => state.customerService.chatListData,
  wsHandleInfo: (state) => state.customerService.wsHandleInfo,
  wsHandle: (state) => state.customerService.wsHandle,

  // 个人中心
  shopCarNumber: (state) => state.user.shopCarNumber,
  couponNumber: (state) => state.user.couponNumber,
  communityOrderInfo: (state) => state.user.communityOrderInfo,
  applyRegionAgentStatus: (state) => state.user.applyRegionAgentStatus,
  regimentalCommanderStatus: state => state.user.regimentalCommanderStatus,

  // 社区
  popupImage: (state) => state.community.popupImage,
  homeCommunityStore: (state) => state.community.homeCommunityStore,
  popupImagePath: (state) => state.community.popupImagePath,
  dzVipList: (state) => state.community.dzVipList,

  // app
  statusBarHeight: (state) => state.app.systermInfo.statusBarHeight || 0,
};
