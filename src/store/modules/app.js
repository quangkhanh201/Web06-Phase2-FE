const state= {
    isShowOptionMenu: false, // trạng thái hiển thị contextMenu
    isShowDialog: false, // trạng thái hiển thị dialog lỗi, cảnh báo
    contentDialog: null // Nội dung trong dialog
}
const mutations = {
    TOGGLE_DIALOG(state) {
        state.isShowDialog = !state.isShowDialog
    },
    TOGGLE_MENU_OPTION(state) {
        state.isShowOptionMenu = !state.isShowOptionMenu
    },
    CHANGE_CONTENT_DIALOG(state, payload) {
        state.contentDialog = payload
    }
}

const actions = {
    /**
     * Ẩn hiện dialog
     * @param {*} context
     * Author: PQKHANH (10/09/2022)
     */
    toggleDialog(context) {
        context.commit("TOGGLE_DIALOG")
    },
    /**
     * Ẩn hiện menu
     * @param {*} context
     * Author: PQKHANH (10/09/2022)
     */
    toggleMennuOption(context) {
        context.commit("TOGGLE_MENU_OPTION")
    },
    /**
     * Thay đổi nội dung dialog
     * @param {*} context
     * @param {*} content nội dung dialog
     * Author: PQKHANH (10/09/2022)
     */
    changeContentDialog(context, content) {
        context.commit("CHANGE_CONTENT_DIALOG", content)
    }
}

export default {
    state,
    mutations,
    actions,
}