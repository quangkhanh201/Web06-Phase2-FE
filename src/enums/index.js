/**
 * Kiểu lọc
 */
const Operator = {
    Contain: 0, // Chứa
    Equal: 1, // Bằng
    StartWith: 2, // Bắt đầu bằng
    EndWith: 3, // Kết thúc bằng
    NotContain: 4, // Không chứa
    Less: 5, // Nhỏ hơn
    Bigger: 6, // Lớn hơn
    LessOrEqual: 7, // Nhỏ hơn hoặc bằng
    BiggerOrEqual: 8, // Lớn hơn hoặc bằng
}

/**
 * Kiểu dữ liệu đầu vào
 */
const InputType = {
    Text: 0, // dữ liệu text
    Number: 1, // dữ liệu số
}

/**
 * Kiểu sắp xếp
 */
const sortType = {
    ASC: "ASC", // tăng dần
    DESC: "DESC" // giảm dần
}

/**
 * Mã lỗi gửi từ server
 */
const ErrorCode = {
    NoError: 0, // Không có lỗi
    NoInput: 1, // Không có dữ liệu đầu vào
    EmptyFoodName: 2,
    EmptyFoodCode: 3,
    EmptyFoodUnit: 4,
    EmptyFoodPrice: 5,
    DuplicateFoodCode: 7,
    EmptyFoodGroupCode: 8,
    EmptyFoodGroupName: 9,
    DuplicateFoodGroupCode: 10,
    EmptyUnitName: 11,
    DuplicateUnitName: 12,
    EmptyProcessedPlace: 13,
    DuplicateProcessedPlace: 14,
    EmptyServiceHobby: 15,
    DuplicateServiceHobby: 16,
    ServerInternal: 17,
    Oversize: 18,
    DeleteFailed: 19,
}

/**
 * Chế độ làm việc
 */
const formMode = {
    Add: 0, // thêm
    Edit: 1 // sửa
}

/**
 * Kiểu cất dữ liệu
 */
const storageMode = {
    Save: 0, // Cất
    SaveAdd: 1 // Cất và thêm
}

/**
 * Hiển thị trên menu
 */
const showOnMenu = {
    No: 0, // Không
    Yes: 1 // Có
}

export default {
    Operator,
    InputType,
    sortType,
    ErrorCode,
    formMode,
    storageMode,
    showOnMenu
}