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
    applied: String,
    name: String,
    type: Number,
    content: String, // 具体碎片内容 过滤html
  },
  '/frags/addFrag': {
    // 与 更新 相似 没有 id
  }
}

let advers = {
  '/adver/getAdvers': {
    name: String, // 广告名称
    type: Number, // 广告类型 0 为 单个 1 为多个
    state: Boolean, // 广告状态 true 展示 false 关闭
  },
  '/adver/delAdver': {
    ids: Array, // _id 的数组
  },
  '/adver/updateAdver': {
    id: String, // 需要更新的_id
    name: String,
    type: Number,
    state: Boolean,
    title: String, // 标题
    link: String, // 连接
    target: String, // 连接类型 如 _black
    sImg: Array || String, //type === 0 ? String : Array
    sImg: [{
      link: String,
      img: String,
      alt: String,
    }],
    alt: String, // 如果为 type == 1 imgae.alt
  },
  '/adver/addAdver': {
    //  与update 类似 没有 id
  },
  '/adver/updateState': {
    id: String, // 需要修改状态的_id
  },
}

