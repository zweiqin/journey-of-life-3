import { getCommentListApi, getCanCommentAgainListApi, getCommentedListApi } from '../../api/community-center';

export const statusList = [
  { name: '待评价', value: 0, api: getCommentListApi, list: 'commentList' },
  { name: '已评价', value: 2, api: getCommentedListApi, list: 'commentedList' },
  { name: '可追评', value: 1, api: getCanCommentAgainListApi, list: [] }
];
