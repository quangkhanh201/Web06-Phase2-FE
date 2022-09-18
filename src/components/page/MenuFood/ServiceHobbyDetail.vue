<template>
    <div class="form--container">
        <div class="popup--service-hobby-detail">
            <div class="popup--service-hobby-inner">
                <div class="popup--header">
                    <div>Thêm Sở thích phục vụ</div>
                    <div @click="clickCloseServiceHobbyDetail">
                        <base-icon iconName="icon-x-close"/>
                    </div>
                </div>
                <div class="popup--body">
                    <div class="field--data">
                        <div class="field--data-label">
                            Sở thích phục vụ <span style="color: red">(*)</span>
                        </div>
                        <base-input
                        v-model="emptyServiceHobby.ServiceHobbyName"
                        @write="checkRequired('ServiceHobbyName', $event)"
                        :errorMessage="errorList.ServiceHobbyName"
                        :focus="focusField == 'ServiceHobbyName'"
                        />
                    </div>
                    <div class="field--data">
                        <div class="field--data-label">
                            Thu thêm
                        </div>
                        <base-input
                        type="money"
                        v-model="emptyServiceHobby.Fee"
                        />
                    </div>
                </div>
                <div class="popup--footer">
                    <div class="footer--left">
                            <base-button content="Giúp" icon="icon-question-circle"/>
                        </div>
                        <div class="footer--right">
                            <base-button content="Cất" icon="icon-save"
                            @click="saveServiceHobby"/>
                            <base-button content="Hủy bỏ" icon="icon-cancel"
                            @click="toggleServiceHobbyDetail"/>
                        </div>
                </div>
            </div>
        </div>
    </div>
    <base-dialog v-if="isShowConfirmCloseDialog"
    :rightButton="[
      { content: 'Có', eventClick: 'confirm' },
      { content: 'Không', eventClick: 'no-confirm' },
      { content: 'Hủy bỏ', eventClick: 'cancel' },
    ]"
    :message="dialogMsg"
    @confirm="clickConfirmDialog"
    @no-confirm="toggleServiceHobbyDetail"
    @cancel="clickCloseDialog"
    />
</template>

<script>
import { mapActions } from 'vuex'
import { compareObj } from "@/ultis/format"
export default {
    data() {
        return {
            emptyServiceHobby: {
                Fee: 0
            }, //bản ghi đơn vị trống
            focusField: "ServiceHobbyName", // focus trường nào
            errorList: {
                ServiceHobbyName: null,
            }, // danh dách lỗi
            isShowConfirmCloseDialog: false, // trạng thái hiển thị dialog cảnh báo
            dialogMsg: "", // nội dung dialog cảnh báo
        }
    },
    methods: {
        ...mapActions([
            "toggleServiceHobbyDetail",
            "insertHobby"
        ]),
        /**
         * Thực hiện đóng form chi tiết
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseServiceHobbyDetail() {
            if(compareObj(this.emptyServiceHobby,{})) {
                this.toggleServiceHobbyDetail()
            } else {
                this.dialogMsg = "Dữ liệu đã thay đổi, bạn có muốn cất không?"
                this.isShowConfirmCloseDialog = true
            }
        },
        /**
         * Nhấn có đóng form đồng thời thực hiện cất
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickConfirmDialog() {
            this.isShowConfirmCloseDialog = false
            this.saveServiceHobby()
        },
        /**
         * Nhấn Hủy bỏ Thực hiện đóng dialog cảnh báo
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseDialog() {
            this.isShowConfirmCloseDialog = false
        },
        /**
         * Thực hiện cất dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        saveServiceHobby() {
            this.focusField = ""
            if(this.validateData()) {
                if(this.emptyServiceHobby.Fee && typeof this.emptyServiceHobby.Fee == "string") {
                    this.emptyServiceHobby.Fee = this.emptyServiceHobby.Fee.replaceAll(".","")
                    this.emptyServiceHobby.Fee = parseInt(this.emptyServiceHobby.Fee)
                }
                this.insertHobby(this.emptyServiceHobby)
            }
        },
        /**
         * validate dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        validateData() {
            let valid = true
            // kiểm tra tên đơn vị
            if(!this.emptyServiceHobby.ServiceHobbyName) {
                if(!this.focusField) {
                    this.focusField = "ServiceHobbyName"
                }
                this.errorList.ServiceHobbyName = "Trường này không được để trống"
                valid = false
            }

            return valid
        },
        /**
         * checkInputRequỉed
         * CreatedBy: PQKHANH(15/09/2022)
         */
        checkRequired(column, $event) {
            if(!$event.target.value) {
                this.errorList[column] = "Trường này không được để trống"
            } else {
                this.errorList[column] = null
            }
        },

    },
}
</script>

<style scoped>
@import url(@/css/page/servicehobbydetail.css);
</style>