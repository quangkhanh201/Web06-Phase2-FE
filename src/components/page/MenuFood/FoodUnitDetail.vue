<template>
    <div class="form--container">
        <div class="popup--food-unit-detail">
            <div class="popup--food-unit-inner">
                <div class="popup--header">
                    <div>Thêm Đơn vị tinh</div>
                    <div @click="clickCloseFoodUnitDetail">
                        <base-icon iconName="icon-x-close"/>
                    </div>
                </div>
                <div class="popup--body">
                    <div class="field--data">
                        <div class="field--data-label">
                            Đơn vị tính <span style="color: red">(*)</span>
                        </div>
                        <base-input
                        v-model="emptyUnit.FoodUnitName"
                        @write="checkRequired('FoodUnitName', $event)"
                        :errorMessage="errorList.FoodUnitName"
                        :focus="focusField == 'FoodUnitName'"
                        />
                    </div>
                    <div class="field--data">
                        <div class="field--data-label">
                            Diễn giải
                        </div>
                        <textarea class="textarea" rows="3"
                        v-model="emptyUnit.Description"></textarea>
                    </div>
                </div>
                <div class="popup--footer">
                    <div class="footer--left">
                            <base-button content="Giúp" icon="icon-question-circle"/>
                        </div>
                        <div class="footer--right">
                            <base-button content="Cất" icon="icon-save"
                            @click="saveUnit"/>
                            <base-button content="Hủy bỏ" icon="icon-cancel"
                            @click="toggleFoodUnitDetail"/>
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
    @no-confirm="toggleFoodUnitDetail"
    @cancel="clickCloseDialog"
    />
</template>

<script>
import { mapActions } from 'vuex'
import { compareObj } from "@/ultis/format"
export default {
    data() {
        return {
            emptyUnit: {}, //bản ghi đơn vị trống
            focusField: "FoodUnitName", // focus trường nào
            errorList: {
                FoodUnitName: null
            }, // danh dách lỗi
            isShowConfirmCloseDialog: false, // trạng thái hiển thị dialog cảnh báo
            dialogMsg: "", // nội dung dialog cảnh báo
        }
    },
    methods: {
        ...mapActions([
            "toggleFoodUnitDetail",
            "insertUnit"
        ]),
        /**
         * Thực hiện đóng form chi tiết
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseFoodUnitDetail() {
            if(compareObj(this.emptyUnit,{})) {
                this.toggleFoodUnitDetail()
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
            this.saveUnit()
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
        saveUnit() {
            this.focusField = ""
            if(this.validateData()) {
                this.insertUnit(this.emptyUnit)
            }
        },
        /**
         * validate dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        validateData() {
            let valid = true
            // kiểm tra tên đơn vị
            if(!this.emptyUnit.FoodUnitName) {
                if(!this.focusField) {
                    this.focusField = "FoodUnitName"
                }
                this.errorList.FoodUnitName = "Trường này không được để trống"
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
@import url(@/css/page/foodunitdetail.css);
</style>