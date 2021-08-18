const url = 'http://39.107.84.0:8600/'

//用户登录
export const login = url+"login";
//用户注册
export const register = url+"register";
//创建房间
export const createRoom = url+"createRoom";
//进入房间
export const enterRoom = url+"enterRoom";
//退出房间
export const quitRoom = url+"quitRoom";
//获取排行榜
export const getRank = url+"getRank";
//查询房间
export const queryRoom =url+"queryRoom";
//修改密码
export const resetPassword = url+"resetPassword";
//修改用户名
export const changeUsername = url+"changeUsername";
//修改头像
export const changeFace = url+"changeFace";
//根据房间获取题目
export const getQuestions = url+"getQuestions";
//获取一个匿名用户id
export const getAnonymousId = url+"getAnonymousId";
//提交单题成绩
export const credit = url+"battle/update/credit";
//获取房间对战信息
export const refreshBattle = url+"battle/refresh";
//提交对战成绩
export const saveScore = url+"battle/saveScore";
//获取用户所有信息
export const getAllMyInfo = url+"getAllMyInfo";
