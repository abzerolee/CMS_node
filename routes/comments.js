let frags = {
  '/frags/getFrags': {
    applied: String, // 应用哪个路由 不填默认为公共'public'
    name: String, // 碎片名称 中英都可
    type: Number, // 0 图片 1 文字
  },
  '/frags/delFrag': {
    ids: Array, // _id 的数组
  },
  '/frags/updateFrag': {
    id: String, // _id 
    name: String,
    type: Number,
    content: String, // 具体碎片内容 过滤html
  },
  '/frags/addFrag': {
    // 与 更新 相似 没有 id
  }
}