import request from '@/utils/request'

export function dataForStuShow(data) {
  return request({
    url: 'http://182.92.231.190:9000/dataForStuShow',
    method: 'post',
    data
  })
}

// 教师上传excel
export function uploadExcel(data) {
  return request({
    url: 'http://182.92.231.190:9000/uploadExcel',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 获取班级列表
export function getClassList(data) {
  return request({
    url: 'http://182.92.231.190:9000/getClassList',
    method: 'post',
    data
  })
}

//
// 获取班级作业信息
export function dataForTeaShow(data) {
  return request({
    url: 'http://182.92.231.190:9000/dataForTeaShow',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 获取班级成员名单
export function getStuList(data) {
  return request({
    url: 'http://182.92.231.190:9000/getStuList',
    method: 'post',
    data
  })
}

// 教师实验列表中的数据由该接口获取
export function getExpList(data) {
  return request({
    url: 'http://182.92.231.190:9000/getexplist',
    method: 'post',
    data
  })
}
// 教师作业列表中的数据由该接口获取
export function getHwList(data) {
  return request({
    url: 'http://182.92.231.190:9000/gethwlist',
    method: 'post',
    data
  })
}
// 点击实验列表中的实验批改，获得某位学生的实验报告信息
export function getStuExpForTea(data) {
  return request({
    url: 'http://182.92.231.190:9000/getstuexpfortea',
    method: 'post',
    data
  })
}
// 获取用户信息，如用户简介，头像，权限等
export function getInfo(token) {
  return request({
    url: 'http://182.92.231.190:9000/getinfo',
    method: 'post',
    params: { token }
  })
}
// 用户退出系统
export function logout() {
  return request({
    url: 'http://182.92.231.190:9000/logout',
    method: 'post'
  })
}
// 点击实验列表中的实验批改，获得某位学生的实验报告信息
export function expCommentSubmit(data) {
  return request({
    url: 'http://182.92.231.190:9000/expcommentsubmit',
    method: 'post',
    data
  })
}
// 添加评语
export function addonecomment(data) {
  return request({
    url: 'http://182.92.231.190:9000/addonecomment',
    method: 'post',
    data
  })
}
// 删除评语
export function delonecomment(data) {
  return request({
    url: 'http://182.92.231.190:9000/delonecomment',
    method: 'post',
    data
  })
}
// 获取评语
export function getallcomment(data) {
  return request({
    url: 'http://182.92.231.190:9000/getallcomment',
    method: 'post',
    data
  })
}
// 对答案进行修改（结合学生作业情况）
export function changedaan(data) {
  return request({
    url: 'http://182.92.231.190:9000/changedaan',
    method: 'post',
    data
  })
}
// 获取主页面信息
export function getyxinfos(data) {
  return request({
    url: 'http://182.92.231.190:9000/getyxinfos',
    method: 'post',
    data
  })
}
// 获取章节内容
export function getchaptercontent(data) {
  return request({
    url: 'http://182.92.231.190:9000/getchaptercontent',
    method: 'post',
    data
  })
}
// 提交章节内容
export function submitchaptercontent(data) {
  return request({
    url: 'http://182.92.231.190:9000/submitchaptercontent',
    method: 'post',
    data
  })
}
// 获取课程知识点
export function getknowlib(data) {
  return request({
    url: 'http://182.92.231.190:9000/getknowlib',
    method: 'post',
    data
  })
}
// 根据term获取知识数据
export function kginfobyterm(data) {
  return request({
    url: 'http://182.92.231.190:9000/kginfobyterm',
    method: 'post',
    data
  })
}
// 根据cid获取知识数据
export function kginfobycid(data) {
  return request({
    url: 'http://182.92.231.190:9000/kginfobycid',
    method: 'post',
    data
  })
}
// 根据cid修改gloss
export function changekngloss(data) {
  return request({
    url: 'http://182.92.231.190:9000/changekngloss',
    method: 'post',
    data
  })
}
// 布置预习作业
export function assignyx(data) {
  return request({
    url: 'http://182.92.231.190:9000/assignyx',
    method: 'post',
    data
  })
}
// 学生获取预习作业
export function getknowsforstu(data) {
  return request({
    url: 'http://182.92.231.190:9000/getknowsforstu',
    method: 'post',
    data
  })
}
// 学生提交预习作业
export function submitstuyx(data) {
  return request({
    url: 'http://182.92.231.190:9000/submitstuyx',
    method: 'post',
    data
  })
}
// 打开作业
export function hwOpenSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/hwopenswitch',
    method: 'post',
    data
  })
}
// 关闭作业
export function hwCloseSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/hwcloseswitch',
    method: 'post',
    data
  })
}
// 在题库界面获取所有作业
export function getallhws(data) {
  return request({
    url: 'http://182.92.231.190:9000/getallhws',
    method: 'post',
    data
  })
}
// 批量打开作业
export function hwOpenBatchSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/hwopenbatchswitch',
    method: 'post',
    data
  })
}
// 批量关闭作业
export function hwCloseBatchSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/hwclosebatchswitch',
    method: 'post',
    data
  })
}
// 打开实验
export function expOpenSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/expopenswitch',
    method: 'post',
    data
  })
}
// 关闭实验
export function expCloseSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/expcloseswitch',
    method: 'post',
    data
  })
}
// 批量打开实验
export function expOpenBatchSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/expopenbatchswitch',
    method: 'post',
    data
  })
}
// 批量关闭实验
export function expCloseBatchSwitch(data) {
  return request({
    url: 'http://182.92.231.190:9000/expclosebatchswitch',
    method: 'post',
    data
  })
}
export function publishExp(data) {
  return request({
    url: 'http://182.92.231.190:9000/publishexp',
    method: 'post',
    data
  })
}
export function getExpLib(data) {
  return request({
    url: 'http://182.92.231.190:9000/getexplib',
    method: 'post',
    data
  })
}
export function saveExpLib(data) {
  return request({
    url: 'http://182.92.231.190:9000/saveexplib',
    method: 'post',
    data
  })
}
export function getQuesBase(data) {
  return request({
    url: 'http://182.92.231.190:9000/getquesbase',
    method: 'post',
    data
  })
}
export function getOneQues(data) {
  return request({
    url: 'http://182.92.231.190:9000/getoneques',
    method: 'post',
    data
  })
}
export function addQues(data) {
  return request({
    url: 'http://182.92.231.190:9000/addquestion',
    method: 'post',
    data
  })
}
export function assginHomeWork(data) {
  return request({
    url: 'http://182.92.231.190:9000/assignhomework',
    method: 'post',
    data
  })
}
export function generateExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/generateexam',
    method: 'post',
    data
  })
}
export function getExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/getexamnation',
    method: 'post',
    data
  })
}
export function assignStuExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/assignstuexam',
    method: 'post',
    data
  })
}
export function stuGetOwnExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/stugetownexam',
    method: 'post',
    data
  })
}
export function stuExamOwnPre(data) {
  return request({
    url: 'http://182.92.231.190:9000/stuexamownpre',
    method: 'post',
    data
  })
}
export function getstuownhw(data) {
  return request({
    url: 'http://182.92.231.190:9000/getstuownhw',
    method: 'post',
    data
  })
}
export function getstuhwfortea(data) {
  return request({
    url: 'http://182.92.231.190:9000/getstuhwfortea',
    method: 'post',
    data
  })
}
export function pigaistuhw(data) {
  return request({
    url: 'http://182.92.231.190:9000/pigaistuhw',
    method: 'post',
    data
  })
}
export function submitstuownhw(data) {
  return request({
    url: 'http://182.92.231.190:9000/submitstuownhw',
    method: 'post',
    data
  })
}
export function submitstuownexam(data) {
  return request({
    url: 'http://182.92.231.190:9000/submitstuownexam',
    method: 'post',
    data
  })
}
export function delExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/delexam',
    method: 'post',
    data
  })
}
export function delStuExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/delstuexam',
    method: 'post',
    data
  })
}
export function getStuExamForTea(data) {
  return request({
    url: 'http://182.92.231.190:9000/getstuexamfortea',
    method: 'post',
    data
  })
}
export function getStuOwnExamForTea(data) {
  return request({
    url: 'http://182.92.231.190:9000/getstuownexamfortea',
    method: 'post',
    data
  })
}
export function extendExamTime(data) {
  return request({
    url: 'http://182.92.231.190:9000/extendexamtime',
    method: 'post',
    data
  })
}
export function pigaiStuOwnExam(data) {
  return request({
    url: 'http://182.92.231.190:9000/pigaistuOwnexam',
    method: 'post',
    data
  })
}
export function submitKgCode(data) {
  return request({
    url: 'http://182.92.231.190:9000/submitkgcode',
    method: 'post',
    data
  })
}
export function dataForYx(data) {
  return request({
    url: 'http://182.92.231.190:9000/dataforyx',
    method: 'post',
    data
  })
}
export function dataForKeJian(data) {
  return request({
    url: 'http://182.92.231.190:9000/dataforkejian',
    method: 'post',
    data
  })
}
export function kejianHandle(data) {
  return request({
    url: 'http://182.92.231.190:9000/kejianhandle',
    method: 'post',
    data
  })
}
export function fabuKejian(data) {
  return request({
    url: 'http://182.92.231.190:9000/fabukejian',
    method: 'post',
    data
  })
}
export function stuGetKjChap(data) {
  return request({
    url: 'http://182.92.231.190:9000/stugetkjchap',
    method: 'post',
    data
  })
}
export function dataForDashboard(data) {
  return request({
    url: 'http://182.92.231.190:9000/datafordashboard',
    method: 'post',
    data
  })
}
export function dataForMyPage(data) {
  return request({
    url: 'http://182.92.231.190:9000/dataformypage',
    method: 'post',
    data
  })
}
export function editKG(data) {
  return request({
    url: 'http://182.92.231.190:9000/editkg',
    method: 'post',
    data
  })
}
export function fuzzFindConterm(data) {
  return request({
    url: 'http://182.92.231.190:9000/fuzzfindconterm',
    method: 'post',
    data
  })
}
export function fuzzFindRelterm(data) {
  return request({
    url: 'http://182.92.231.190:9000/fuzzfindrelterm',
    method: 'post',
    data
  })
}
export function getStuExp(data) {
  return request({
    url: 'http://182.92.231.190:9000/getstuexp',
    method: 'post',
    data
  })
}
export function saveStuExp(data) {
  return request({
    url: 'http://182.92.231.190:9000/savestuexp',
    method: 'post',
    data
  })
}
export function recImg(data) {
  return request({
    url: 'http://182.92.231.190:9000/recimg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
export function recKnImg(data) {
  return request({
    url: 'http://182.92.231.190:9000/recKnImg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
export function setPerInfo(data) {
  return request({
    url: 'http://182.92.231.190:9000/setperinfo',
    method: 'post',
    data
  })
}
export function getPerInfo(data) {
  return request({
    url: 'http://182.92.231.190:9000/getperinfo',
    method: 'post',
    data
  })
}
export function setStuPsw(data) {
  return request({
    url: 'http://182.92.231.190:9000/setstupsw',
    method: 'post',
    data
  })
}
