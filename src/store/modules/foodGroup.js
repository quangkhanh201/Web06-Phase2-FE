import { constants } from "@/config"
import axios from "axios"
import { handleError } from "@/ultis/format"

const state= {
    groups: [], // Toàn bộ nhóm thực đơn
    isShowGroupDetail: false, // trạng thái hiển thị form nhóm thực đơn
}
const mutations = {
    SHOW_GROUP_DETAIL(state) {
        state.isShowGroupDetail = !state.isShowGroupDetail
    },
    LOAD_ALL_GROUP(state, payload) {
        state.groups = payload
    },
    INSERT_GROUP(state, payload) {
        state.groups.unshift(payload)
        state.isShowGroupDetail = false
    }
}

const actions = {
    /**
     * Lấy toàn bộ nhóm thực đơn
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async loadAllGroup(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/FoodGroups`)
        if(res.data.Success) {
            context.commit("LOAD_ALL_GROUP", res.data.Data)
        }
    },
    /**
     * Ẩn hiện chi tiết nhóm thực đơn
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    toggleFoodGroupDetail(context) {
        context.commit("SHOW_GROUP_DETAIL")
    },
    /**
     * Thêm nhóm thực đơn
     * @param {*} context
     * @param {*} group dữ liệu đầu vào
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async insertGroup(context, group) {
        const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/FoodGroups`,
        group)
        if(res.data.Success) {
            group.FoodGroupId = res.data.Data
            context.commit("INSERT_GROUP", group)
        } else {
            handleError(context, res, group.FoodGroupCode)
        }
    }
}

export default {
    state,
    mutations,
    actions,
}