let apiPrefix = '/api'
let apiNexfix = ''
let api = {
  signUp: apiPrefix + '/user/signUp' + apiNexfix, //用户注册
  login: apiPrefix + '/user/login' + apiNexfix, //用户登录
  signOut: apiPrefix + '/user/signOut' + apiNexfix, //用户退出登录
  queryTypeData: apiPrefix + '/bills/queryTypeData' + apiNexfix, //用户查询汇总数据
  getUserInfo: apiPrefix + '/user/getUserInfo' + apiNexfix, //获取用户信息
  getUserList: apiPrefix + '/user/getUserList' + apiNexfix, //获取用户列表
  billsAdd: apiPrefix + '/bills/add' + apiNexfix, //新增账单数据
  billsClose: apiPrefix + '/bills/close' + apiNexfix, //结算当前所有未结算的账单
  queryBillList: apiPrefix + '/bills/queryBillList' + apiNexfix, //查询账单列表
}
export default api
