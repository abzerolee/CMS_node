let frags = {
  '/frags/getFrags': {
    applied: String, // 应用哪个路由名 不填默认为公共'public'
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 7a4fb710fee4710e3befebdbd35c40693ab48e0b
let article = {
  '/article/getArticles': {
    title: String, // 标题
    tags: String,  // 文章标签
    keywords: String, // 关键字
    state: Boolean, // 文章状态
    author: String,  // 作者
    original: Boolean // 是否原创
  },
  '/article/delArticle': {
    ids: Array, // _id数组
  },
  '/article/updateArticle': {
    id: String, // 更新的文章_id
    title: String, 
    stitle: String, // 副标题
    categoryId: String, // 分类_id 
    tags: String, 
    keywords: String,
    img: String, // 图片标题
    description: String, // 简介 过滤html
    author: String, // 作者 
    state: Boolean, // 文章状态 true 发布 false 待审
    original: Boolean, // 是否为原创 
    source: String, // 原创连接 , 
    content: String, // 内容 富文本, 
    comments: String // 注释
  },
  '/article/addArticle': {
    // 与更新类似 没有id
  },
  '/article/updateState': {
    ids: Array, // 更新状态 _id 数组
    state: Boolean, // 状态
  },
<<<<<<< HEAD
}
>>>>>>> 7a4fb710fee4710e3befebdbd35c40693ab48e0b
=======
}
>>>>>>> 7a4fb710fee4710e3befebdbd35c40693ab48e0b
