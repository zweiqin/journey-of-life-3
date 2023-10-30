import { getCanvasSelectLiveListApi } from '@/api/anotherTFInterface'
import { funMixin } from '../../config/mixin'

export const commonMixin = {
	mixins: [ funMixin ],
	data() {
		return {
			appid: 'wx123456789abcdefg',
			roomId: [], // 填写具体的房间号
			roomList: [],
			page: {
				page: 1,
				pageSize: 6
			}
		}
	},
	props: {
		terminal: {
			type: Number,
			default: 4
		},
		typeId: {
			type: Number,
			default: 1
		},
		shopId: {
			type: Number,
			default: 0
		},
		componentContent: {
			type: Object
		}
	},
	created() {
		this.getLiveRooms()
	},
	methods: {
		// 获取直播间列表
		getLiveRooms() {
			getCanvasSelectLiveListApi(this.page).then((res) => {
				this.roomList = res.data.list
			})
		},
		toLiveRoom(item) {
			this.roomId.push(item.roomid)
			if (!this.appid || !this.roomId.length) {
				return
			}
			// 路由参数
			const customParams = encodeURIComponent(JSON.stringify({ path: 'livePage/index', pid: 1 }))
			// let customParams
			// 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
			// #ifdef MP-WEIXIN
			wx.navigateTo({
				url: `plugin-private://${this.appid}/pages/live-player-plugin?room_id=${this.roomId}&custom_params=${customParams}`
			})
			// #endif
		}
	}
}
