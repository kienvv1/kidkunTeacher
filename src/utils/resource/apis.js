import {host} from './system';
const Apis = {
  login: `${host.api_mamnon}/ps_user/login`,
  logout: `${host.api_mamnon}/ps_user/logout`,
  register: `${host.api_user}/ps_user/register`,
  profile: `${host.api_mamnon}/ps_user/profile`,
  home_relative: `${host.api_mamnon}/ps_user/home_relative`,
  home: `${host.api_mamnon}/ps_teacher/home`,
  registerDeviceid: `${host.api_mamnon}/ps_user/active`,
  registerNotificationToken: `${host.api_mamnon}/ps_user/notification`,
  getNews: student_id =>
    `${host.api_mamnon}/ps_articles/list/all/1?student_id=${student_id}`,
  getNewsDetail: ({id, student_id}) =>
    `${host.api_mamnon}/ps_articles/${id}?student_id=${student_id}`,
  getTableHeight: student_id =>
    `${host.api_mamnon}/ps_student/${student_id}/growth_height`,
  getTableWeight: student_id =>
    `${host.api_mamnon}/ps_student/${student_id}/growth_weight`,
  getCharHeight: student_id =>
    `${host.api_mamnon}/ps_student/${student_id}/growth_chart/height`,
  getCharWeight: student_id =>
    `${host.api_mamnon}/ps_student/${student_id}/growth_chart/weight`,
  getMenus: student_id => `${host.api_mamnon}/ps_student/menus/${student_id}`,
  getMenusDay: ({student_id, date}) =>
    `${host.api_mamnon}/ps_student/menus/${student_id}/${date}`,
  getStudent: student_id => `${host.api_mamnon}/ps_student/${student_id}`,
  getGrowth: student_id => `${host.api_mamnon}/ps_student/${student_id}/growth`,
  getOffSchool: student_id =>
    `${host.api_mamnon}/ps_offschool/offschool/${student_id}?status=ok`,
  getOffSchoolcd: student_id =>
    `${host.api_mamnon}/ps_offschool/offschool/${student_id}?status=cd`,
  getListSend: student_id =>
    `${host.api_mamnon}/ps_offschool/listsend/${student_id}`,
  postOffSchool: `${host.api_mamnon}/ps_offschool/offschool`,

  getFee: ({student_id, date}) =>
    `${host.api_mamnon}/ps_student/${student_id}/${date}/report_fees`,
  getAdvice: student_id =>
    `${host.api_mamnon}/ps_advice/advices/${student_id}?status=ok`,
  getAdvicecd: student_id =>
    `${host.api_mamnon}/ps_advice/advices/${student_id}?status=cd`,
  getAdviceCate: student_id =>
    `${host.api_mamnon}/ps_advice/a_categories/${student_id}`,
  postAdvice: `${host.api_mamnon}/ps_advice/advice`,
  getServices: student_id =>
    `${host.api_mamnon}/ps_student/${student_id}/services_used`,
  getActive: ({student_id, date}) =>
    `${host.api_mamnon}/ps_student/${student_id}/active/${date}`,
  getListNotification: `${host.api_mamnon}/ps_cms/notifications/sent`,
  getNotificationDetail: id =>
    `${host.api_mamnon}/ps_cms/notifications/show/sent/${id}`,
  getCountNotification: `${host.api_mamnon}/ps_cms/notreadteacher`,
  // giáo viên
  
  getAttendancein: ({class_id}) =>
  `${host.api_mamnon}/ps_teacher/attendance?attendancetype=in&class_id=${class_id}`,
  getAttendanceout: ({class_id}) =>
  `${host.api_mamnon}/ps_teacher/attendance?attendancetype=out&class_id=${class_id}`,
  getAttendanceDetail: ({student_id,class_id, attendancetype}) =>
  `${host.api_mamnon}/ps_teacher/attendances/${student_id}?attendancetype=${attendancetype}&class_id=${class_id}`,
  postAttendanceDetail: `${host.api_mamnon}/ps_teacher/attendances`,
  getOffTeacher: `${host.api_mamnon}/ps_offschool/teacher/offschool?status=ok`,
  getOffTeachercd: `${host.api_mamnon}/ps_offschool/teacher/offschool?status=cd`,
  putOffTeacher: id => `${host.api_mamnon}/ps_offschool/offschool/confirm/${id}`,
  getAdviceTeacherCate: `${host.api_mamnon}/ps_advice/a_categories`,
  
  getListAdviceTeacher: ({catid, class_id}) =>
  `${host.api_mamnon}/ps_advice/teacher/advices?status=ok&catid=${catid}&class_id=${class_id}`,
  
  getListAdviceTeachercd: ({catid, class_id}) =>
  `${host.api_mamnon}/ps_advice/teacher/advices?status=cd&catid=${catid}&class_id=${class_id}`,

  putTeacherAdvice: id => `${host.api_mamnon}/ps_advice/confirm/${id}`,

  getListAlbum: class_id => `${host.api_mamnon}/ps_albums/album/class/${class_id}`,

  postAlbum: `${host.api_mamnon}/ps_albums/album/create`,

  getCateReview: `${host.api_mamnon}/ps_review/category`,

  postReviewDate: `${host.api_mamnon}/ps_review/save_option`,
  
  getReviewDate: ({category_id, date_at}) =>
  `${host.api_mamnon}/ps_review/list_review?category_id=${category_id}&date_at=${date_at}`,
  
  postUpdateReviewDate:`${host.api_mamnon}/ps_review/save_edit`,
  
  deleteReviewDate: id => `${host.api_mamnon}/ps_review/delete/${id}`,

  deleteAlbum: id => `${host.api_mamnon}/ps_albums/album/${id}`,
  
  postLike: `${host.api_mamnon}/ps_albums/album/like`,
  getListComment: id => `${host.api_mamnon}/ps_albums/albums/show_comment?album_id=${id}`,
  
  postComment: `${host.api_mamnon}/ps_albums/album/comment`,
  deleteComment: id => `${host.api_mamnon}/ps_albums/albums/bl/${id}`,
  getOption: cate_id => `${host.api_mamnon}/ps_review/option?category_id=${cate_id}`,
  getListReviewWeek: student_id=> `${host.api_mamnon}/ps_review/list_coment_week?student_id=${student_id}`,
  updateListReviewWeek: `${host.api_mamnon}/ps_review/comment_week_save_edit`,
  deleteListReviewWeek: id => `${host.api_mamnon}/ps_review/delete_comment/${id}`,
  postSaveReviewWeek: `${host.api_mamnon}/ps_review/save_comment_week`,
  postDiemDanhNhanh : `${host.api_mamnon}/ps_teacher/attendance`,
  getEditAlbum: id => `${host.api_mamnon}/ps_albums/album/${id}`,
  putTitleAlbum: id=> `${host.api_mamnon}/ps_albums/album/${id}`,
  postUpload:  `${host.api_mamnon}/ps_albums/album/upload`,
  deleteImage: id => `${host.api_mamnon}/ps_albums/albumitem/${id}`,
  getListWeek: year => `${host.api_mamnon}/ps_review/get_week?year_data=${year}`
};

export {Apis};
