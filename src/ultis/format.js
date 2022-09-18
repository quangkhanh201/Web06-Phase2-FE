import enums from "@/enums/index"

/**
 * Format tiền theo định dạng 1.000.000
 * CreatedBy: PQKHANH (10/09/2022)
 */
export function formatMoney(money) {
  return money.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

/**
 * Kiểm tra có phải object không
 * CreatedBy: PQKHANH (10/09/2022)
 */
function isObject(obj) {
  if(obj != null && typeof obj === "object"){
    return true
  }
  return false
}

/**
 * So sánh 2 object
 * CreatedBy: PQKHANH (10/09/2022)
 */
export function compareObj(obj1, obj2) {
  let key1= Object.keys(obj1)
  let key2= Object.keys(obj2)
  if(key1.length !== key2.length) {
    return false
  }
  for(let key of key1) {
    let areObjs = isObject(obj1[key]) && isObject(obj2[key])
    if((areObjs && !compareObj(obj1[key],obj2[key])) || (!areObjs && obj1[key] !== obj2[key])) {
      return false
    }
  }
  return true
}

/**
 * Xử lý lỗi trả về khi call api
 * CreatedBy: PQKHANH (10/09/2022)
 */
export function handleError(context, res, code) {
  let msg=""
  switch(res.data.ErrorCode) {
    case enums.ErrorCode.DuplicateFoodCode:
      msg = `Mã <${code}> đã tồn tại trên danh sách món ăn`
      break
    case enums.ErrorCode.DuplicateFoodGroupCode:
      msg = `Nhóm thực đơn <${code}> đã tồn tại `
      break
    case enums.ErrorCode.DuplicateUnitName:
      msg = `Đơn vị tính <${code}> đã tồn tại.`
      break
    case enums.ErrorCode.DuplicateProcessedPlace:
      msg = `Địa điểm chế biến <${code}> đã tồn tại `
      break
    case enums.ErrorCode.DuplicateServiceHobby:
      msg = `Sở thích phục vụ <${code}> đã tồn tại `
      break
    case enums.ErrorCode.Oversize:
      msg = `Ảnh không tải được do vượt quá dung lượng. Vui lòng chọn ảnh có dung lượng nhỏ hơn 5 MB`
      break
    default:
      msg = `Đã có lỗi xảy ra. Vui lòng liên hệ MISA để được hỗ trợ`
  }
  context.commit("CHANGE_CONTENT_DIALOG", msg)
  context.commit("TOGGLE_DIALOG")
}