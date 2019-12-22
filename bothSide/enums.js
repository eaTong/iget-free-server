/**
 * created by eaTong at 2019/11/22
 */

const bookMarkStatus = [
  '未读', '想读', '在读', '已读完',
];
const bookMarkListenedStatus = [
  '未听', '已听完',
];
const bookMarkStatusOptions = bookMarkStatus.map((status, index) => ({label: status, value: String(index)}));

module.exports = {bookMarkStatus, bookMarkStatusOptions};
