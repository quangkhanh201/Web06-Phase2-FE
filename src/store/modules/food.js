import { constants } from "@/config"
import axios from "axios"
import enums from "@/enums"
import { handleError } from "@/ultis/format"

const state= {
    foods: [], //danh sách các món ăn filter
    isShowFoodDetail: false, // hiển thị form chi tiết món ăn
    pageSize: 25, // số lượng bản ghi trên 1 trang
    pageIndex: 1, // trang đang xét
    sortBy: "CreatedDate", // sắp xếp theo trường nào
    sortType: "DESC", // sắp cếp theo kiểu nào
    filterObjects: [], // Mảng chứa dữ liệu lọc
    selectedFood: {}, // Món ăn được chọn
    totalRecord: 0, // tổng số bản ghi sau khi lọc
    totalPage: 0, // tổng số trang
    isLoadingFood: false, // trạng thái hiển thị loading
    formMode: enums.formMode.Add, // trạng thái làm việc của form
    storageMode: enums.storageMode.Save // trạng thái cất của form
}
const mutations = {
    LOAD_ALL_FOOD(state, payload) {
        state.foods = payload
        state.selectedFood = payload[0]
    },
    LOAD_FOOD_PAGING(state, payload) {
        state.foods = payload.Data
        state.selectedFood = payload.Data[0]
        state.totalRecord = payload.TotalRecord
        state.totalPage = payload.TotalPage
    },
    INSERT_FOOD(state, payload) {
        state.foods.unshift(payload)
        state.totalRecord++
        if(state.storageMode == enums.storageMode.Save) {
            state.isShowFoodDetail = false
        }
        if(state.storageMode == enums.storageMode.SaveAdd) {
            state.selectedFood = {
                ShowOnMenu: enums.showOnMenu.Yes
            }
        }
    },
    UPDATE_FOOD(state, payload) {
        state.foods = state.foods.map((food) => {
            if(food.FoodId == payload.FoodId){
                return payload
            }
            return food
        })
        if(state.storageMode == enums.storageMode.Save) {
            state.isShowFoodDetail = false
        }
        if(state.storageMode == enums.storageMode.SaveAdd) {
            state.formMode = enums.formMode.Add
            state.selectedFood = {
                ShowOnMenu: enums.showOnMenu.Yes
            }
        }
    },
    DELETE_FOOD(state, payload) {
        state.foods = state.foods.filter((food) => food.FoodId !== payload)
        state.totalRecord--
    },
    UPDATE_SORT_OBJECT(state, payload) {
        state.sortBy = payload.sortBy
        state.sortType = payload.sortType
    },
    UPDATE_FILTER_OBJECTS(state, payload) {
        state.filterObjects = payload
    },
    UPDATE_PAGE_SIZE(state, payload) {
        state.pageSize = payload
    },
    UPDATE_PAGE_INDEX(state, payload) {
        state.pageIndex = payload
    },
    SELECT_FOOD(state, payload) {
        state.selectedFood = payload
    },
    UPDATE_FORM_MODE(state, payload) {
        state.formMode = payload
    },
    UPDATE_STORAGE_MODE(state, payload) {
        state.storageMode = payload
    },
    SHOW_LOADING(state) {
        state.isLoadingFood = !state.isLoadingFood
    },
    SHOW_FOOD_DETAIL(state) {
        state.isShowFoodDetail = !state.isShowFoodDetail
    }
}
const actions = {
    /**
     * Lấy toàn bộ món ăn
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async loadAllFood(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/Foods`)
        if(res.data.Success) {
            context.commit("LOAD_ALL_FOOD", res.data.Data)
        }
    },
    /**
     * Lấy món ăn theo phân trang, tìm kiếm
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async loadFoodPaging(context) {
        context.commit("SHOW_LOADING")
        const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/Foods/Filter?pageIndex=${state.pageIndex}&pageSize=${state.pageSize}&sortBy=${state.sortBy}&sortType=${state.sortType}`, 
        state.filterObjects)
        if(res.data.Success) {
            context.commit("LOAD_FOOD_PAGING", res.data.Data)
        } else {
            handleError(context, res)
        }
        context.commit("SHOW_LOADING")
    },
    /**
     * Thêm món ăn mới
     * @param {*} context
     * @param {*} food dữ liệu món ăn 
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async insertFood(context, food) {
        const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/Foods`, 
        food)
        if(res.data.Success) {
            food.FoodId = res.data.Data
            context.commit("INSERT_FOOD", food)
        } else {
            handleError(context, res, food.FoodCode)
        }
    },
    /**
     * Cập nhật món ăn
     * @param {*} context
     * @param {*} food dữ liệu món ăn 
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async updateFood(context, food) {
        const res = await axios.put(`${constants.API_URL}/api/${constants.API_VERSION}/Foods/${food.FoodId}`, 
        food)
        if(res.data.Success) {
            context.commit("UPDATE_FOOD", food)
        } else {
            handleError(context, res, food.FoodCode)
        }
    },
    /**
     * Têm món ăn mới
     * @param {*} context
     * @param {*} foodId id bản ghi cần xóa
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async deleteFood(context, foodId) {
        const res = await axios.delete(`${constants.API_URL}/api/${constants.API_VERSION}/Foods/${foodId}`)
        if(res.data.Success) {
            context.commit("DELETE_FOOD", foodId)
        } else {
            handleError(context, res)
        }
    },
    /**
     * Cập nhật thông tin sắp xếp
     * @param {*} context
     * @param {*} sortObject dữ liệu sắp xếp
     * CreatedBy: PQKHANH (10/09/2022)
     */
    updateSortObject(context, sortObject) {
        context.commit("UPDATE_SORT_OBJECT", sortObject)
    },
    /**
     * Cập nhật thông tin lọc
     * @param {*} context
     * @param {*} filterObjects obj dữ liệu lọc
     * CreatedBy: PQKHANH (10/09/2022)
     */
    updateFilterObjects(context, filterObjects) {
        context.commit("UPDATE_FILTER_OBJECTS", filterObjects)
    },
    /**
     * Cập nhật số bản ghi trên 1 trang
     * @param {*} context
     * @param {*} pageSize số bản ghi trên 1 trang
     * CreatedBy: PQKHANH (10/09/2022)
     */
    updatePageSize(context, pageSize) {
        context.commit("UPDATE_PAGE_SIZE", pageSize)
    },
    /**
     * Cập nhật thông tin số trang
     * @param {*} context
     * @param {*} pageIndex đang ở trang nào
     * CreatedBy: PQKHANH (10/09/2022)
     */
    updatePageIndex(context, pageIndex) {
        context.commit("UPDATE_PAGE_INDEX", pageIndex)
    },
    /**
     * Cập nhật thông tin bản ghi được chọn
     * @param {*} context
     * @param {*} food dữ liệu bản ghi được chọn
     * CreatedBy: PQKHANH (10/09/2022)
     */
    selectFood(context, food) {
        context.commit("SELECT_FOOD", food)
    },
    /**
     * Cập nhật thông tin trạng thái làm việc của form
     * @param {*} context
     * @param {*} formMode trạng thái làm việc
     * CreatedBy: PQKHANH (10/09/2022)
     */
    updateFormMode(context, formMode) {
        context.commit("UPDATE_FORM_MODE", formMode)
    },
    /**
     * Cập nhật kiểu cất dữ liệu
     * @param {*} context
     * @param {*} storageMode kiểu cất dữ liệu
     * CreatedBy: PQKHANH (10/09/2022)
     */
    updateStorageMode(context, storageMode) {
        context.commit("UPDATE_STORAGE_MODE", storageMode)
    },
    /**
     * Ẩn hiện form chi tiết món ăn
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    toggleFoodDetail(context) {
        context.commit("SHOW_FOOD_DETAIL")
    }
}

export default {
    state,
    mutations,
    actions,
}