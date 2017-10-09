module.exports = {
  // 数据库配置
  URL: 'mongodb://localhost:27017/cms_system',
  DB: 'cms_system',
  HOST: '',
  PORT: 27017,
  USERNAME: '',
  PASSWORD: '',

  // 站点信息配置
  SITETITLE: '创翊软科官网',
  SITEDOMAIN: 'www.baidu.com',
  SITEICP: 'SITEICP',
  SITEVERSION: 'v0.0.1',

  // 消息参数
  system_illegal_param : '非法参数',
  system_noPower : '对不起，您无权执行该操作！',
  system_atLeast_one : '请选择至少一项后再执行删除操作！',
  system_batch_delete_not_allowed : '对不起，该模块不允许批量删除！'
}