import { constants } from "@/config"
import axios from "axios"
import { handleError } from "@/ultis/format"

const state= {
    units: [], //danh sách don vi tinh
    isShowUnitDetail: false, //hiển thị form thêm don vi
}
const mutations = {
    SHOW_UNIT_DETAIL(state) {
        state.isShowUnitDetail = !state.isShowUnitDetail
    },
    LOAD_ALL_UNIT(state, payload) {
        state.units = payload
    },
    INSERT_UNIT(state, payload) {
        state.units.unshift(payload)
        state.isShowUnitDetail = false
    }
}

const actions = {
    /**
     * Lấy toàn bộ dữ liệu đơn vị tính
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async loadAllUnit(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/FoodUnits`)
        if(res.data.Success) {
            context.commit("LOAD_ALL_UNIT", res.data.Data)
        }
    },
    /**
     * Ẩn hiện đơn vị tính
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    toggleFoodUnitDetail(context) {
        context.commit("SHOW_UNIT_DETAIL")
    },
    /**
     * Thêm đơn vị tính
     * @param {*} context
     * @param {*} unit dữ liệu đầu vào
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async insertUnit(context, unit) {
        const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/FoodUnits`,
        unit)
        if(res.data.Success) {
            unit.FoodUnitId = res.data.Data
            context.commit("INSERT_UNIT", unit)
        } else {
            handleError(context, res, unit.FoodUnitName)
        }
    }
}

export default {
    state,
    mutations,
    actions,
}