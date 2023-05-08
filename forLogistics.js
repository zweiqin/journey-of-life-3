/**
 * 此处是为了在助力通后台方便获取当前url，设置压屏窗跳转链接
 */
const routerMethods = [
  "navigateTo",
  "redirectTo",
  "reLaunch",
  "switchTab",
  "navigateBack",
];

for (const method of routerMethods) {
  uni.addInterceptor(method, {
		returnValue(){
			window.parent.postMessage(window.location.href, "*");
			return true;
		}
  });
}
