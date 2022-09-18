import { constants } from "@/config"
import axios from "axios"
import { handleError } from "@/ultis/format"

const state= {
    serviceHobbies: [], //danh sách don vi tinh
    isShowServiceHobbyDetail: false, //hiển thị form thêm don vi
}
const mutations = {
    SHOW_HOBBY_DETAIL(state) {
        state.isShowServiceHobbyDetail = !state.isShowServiceHobbyDetail
    },
    LOAD_ALL_HOBBY(state, payload) {
        state.serviceHobbies = payload
    },
    INSERT_HOBBY(state, payload) {
        state.serviceHobbies.unshift(payload)
        state.isShowServiceHobbyDetail = false
    }
}

const actions = {
    /**
     * Lấy toàn bộ dữ liệu
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async loadAllHobby(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/ServiceHobbies`)
        if(res.data.Success) {
            context.commit("LOAD_ALL_HOBBY", res.data.Data)
        }
    },
    /**
     * Ẩn hiện form chi tiết 
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    toggleServiceHobbyDetail(context) {
        context.commit("SHOW_HOBBY_DETAIL")
    },
    /**
     * Thêm sở thích phục vụ
     * @param {*} context
     * @param {*} hobby dữ liệu đầu vào
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async insertHobby(context, hobby) {
        const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/ServiceHobbies`,
        hobby)
        if(res.data.Success) {
            hobby.ServiceHobbyId = res.data.Data
            context.commit("INSERT_HOBBY", hobby)
        } else {
            handleError(context, res, hobby.ServiceHobbyName)
        }
    }
}

export default {
    state,
    mutations,
    actions,
}