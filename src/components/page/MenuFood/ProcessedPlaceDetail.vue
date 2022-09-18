<template>
    <div class="form--container">
        <div class="popup--processed-place-detail">
            <div class="popup--processed-place-inner">
                <div class="popup--header">
                    <div>Thêm Bếp/Bar</div>
                    <div @click="clickCloseProcessedPlaceDetail">
                        <base-icon iconName="icon-x-close"/>
                    </div>
                </div>
                <div class="popup--body">
                    <div class="field--data">
                        <div class="field--data-label">
                            Tên bếp <span style="color: red">(*)</span>
                        </div>
                        <base-input
                        v-model="emptyProcessedPlace.ProcessedPlaceName"
                        @write="checkRequired('ProcessedPlaceName', $event)"
                        :errorMessage="errorList.ProcessedPlaceName"
                        :focus="focusField == 'ProcessedPlaceName'"
                        />
                    </div>
                    <div class="field--data">
                        <div class="field--data-label">
                            Diễn giải
                        </div>
                        <textarea class="textarea" rows="3"
                        v-model="emptyProcessedPlace.Description"></textarea>
                    </div>
                </div>
                <div class="popup--footer">
                    <div class="footer--left">
                            <base-button content="Giúp" icon="icon-question-circle"/>
                        </div>
                        <div class="footer--right">
                            <base-button content="Cất" icon="icon-save"
                            @click="saveProcessedPlace"/>
                            <base-button content="Hủy bỏ" icon="icon-cancel"
                            @click="toggleProcessedPlaceDetail"/>
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
    @no-confirm="toggleProcessedPlaceDetail"
    @cancel="clickCloseDialog"
    />
</template>

<script>
import { mapActions } from 'vuex'
import { compareObj } from "@/ultis/format"
export default {
    data() {
        return {
            emptyProcessedPlace: {}, //bản ghi địa điểm trống
            focusField: "ProcessedPlaceName", // focus trường nào
            errorList: {
                ProcessedPlaceName: null
            }, // danh dách lỗi
            isShowConfirmCloseDialog: false, // trạng thái hiển thị dialog cảnh báo
            dialogMsg: "", // nội dung dialog cảnh báo
        }
    },
    methods: {
        ...mapActions([
            "toggleProcessedPlaceDetail",
            "insertProcessedPlace"
        ]),
        /**
         * Thực hiện đóng form chi tiết
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseProcessedPlaceDetail() {
            if(compareObj(this.emptyProcessedPlace,{})) {
                this.toggleProcessedPlaceDetail()
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
            this.saveProcessedPlace()
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
        saveProcessedPlace() {
            this.focusField = ""
            if(this.validateData()) {
                this.insertProcessedPlace(this.emptyProcessedPlace)
            }
        },
        /**
         * validate dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        validateData() {
            let valid = true
            // kiểm tra tên bếp
            if(!this.emptyProcessedPlace.ProcessedPlaceName) {
                if(!this.focusField) {
                    this.focusField = "ProcessedPlaceName"
                }
                this.errorList.ProcessedPlaceName = "Trường này không được để trống"
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
@import url(@/css/page/processedplacedetail.css);
</style>