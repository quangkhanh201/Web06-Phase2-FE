import { constants } from "@/config"
import axios from "axios"
import { handleError } from "@/ultis/format"

const state= {
    processedPlaces: [], //danh sách don vi tinh
    isShowProcessPlaceDetail: false, //hiển thị form thêm don vi
}
const mutations = {
    SHOW_PLACE_DETAIL(state) {
        state.isShowProcessPlaceDetail = !state.isShowProcessPlaceDetail
    },
    LOAD_ALL_PLACE(state, payload) {
        state.processedPlaces = payload
    },
    INSERT_PLACE(state, payload) {
        state.processedPlaces.unshift(payload)
        state.isShowProcessPlaceDetail = false
    }
}

const actions = {
    /**
     * Lấy toàn bộ dữ liệu địa điểm
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async loadAllProcessedPlace(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/ProcessedPlaces`)
        if(res.data.Success) {
            context.commit("LOAD_ALL_PLACE", res.data.Data)
        }
    },
    /**
     * Ẩn hiện form chi tiết địa điểm
     * @param {*} context
     * CreatedBy: PQKHANH (10/09/2022)
     */
    toggleProcessedPlaceDetail(context) {
        context.commit("SHOW_PLACE_DETAIL")
    },
    /**
     * Thêm địa điểm chế biến
     * @param {*} context
     * @param {*} place dữ liệu đầu vào
     * CreatedBy: PQKHANH (10/09/2022)
     */
    async insertProcessedPlace(context, place) {
        const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/ProcessedPlaces`,
        place)
        if(res.data.Success) {
            place.ProcessedPlaceId = res.data.Data
            context.commit("INSERT_PLACE", place)
        } else {
            handleError(context, res, place.ProcessedPlaceName)
        }
    }
}

export default {
    state,
    mutations,
    actions,
}