<template>
    <div class="form--container">
        <div class="popup--food-group-detail">
            <div class="popup--food-group-inner">
                <div class="popup--header">
                    <div>Thêm Nhóm thực đơn</div>
                    <div @click="clickCloseFoodGroupDetail">
                        <base-icon iconName="icon-x-close"/>
                    </div>
                </div>
                <div class="popup--body">
                    <div class="field--data">
                        <div class="field--data-label">
                            Mã nhóm <span style="color: red">(*)</span>
                        </div>
                        <base-input
                        v-model="emptyGroup.FoodGroupCode"
                        @write="checkRequired('FoodGroupCode', $event)"
                        :errorMessage="errorList.FoodGroupCode"
                        :focus="focusField == 'FoodGroupCode'"
                        />
                    </div>
                    <div class="field--data">
                        <div class="field--data-label">
                            Tên nhóm <span style="color: red">(*)</span>
                        </div>
                        <base-input
                        v-model="emptyGroup.FoodGroupName"
                        @write="checkRequired('FoodGroupName', $event)"
                        :errorMessage="errorList.FoodGroupName"
                        :focus="focusField == 'FoodGroupName'"
                        />
                    </div>
                    <div class="field--data">
                        <div class="field--data-label">
                            Diễn giải
                        </div>
                        <textarea class="textarea" rows="3"
                        v-model="emptyGroup.Description"></textarea>
                    </div>
                </div>
                <div class="popup--footer">
                    <div class="footer--left">
                            <base-button content="Giúp" icon="icon-question-circle"/>
                        </div>
                        <div class="footer--right">
                            <base-button content="Cất" icon="icon-save"
                            @click="saveGroup"/>
                            <base-button content="Hủy bỏ" icon="icon-cancel"
                            @click="toggleFoodGroupDetail"/>
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
    @no-confirm="toggleFoodGroupDetail"
    @cancel="clickCloseDialog"
    />
</template>

<script>
import { mapActions } from 'vuex'
import { compareObj } from "@/ultis/format"
export default {
    data() {
        return {
            emptyGroup: {}, //bản ghi đơn vị trống
            focusField: "FoodGroupCode", // focus trường nào
            errorList: {
                FoodGroupName: null,
                FoodGroupCode: null
            }, // danh dách lỗi
            isShowConfirmCloseDialog: false, // trạng thái hiển thị dialog cảnh báo
            dialogMsg: "", // nội dung dialog cảnh báo
        }
    },
    methods: {
        ...mapActions([
            "toggleFoodGroupDetail",
            "insertGroup"
        ]),
        /**
         * Thực hiện đóng form chi tiết
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseFoodGroupDetail() {
            if(compareObj(this.emptyGroup,{})) {
                this.toggleFoodGroupDetail()
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
            this.saveGroup()
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
        saveGroup() {
            this.focusField = ""
            if(this.validateData()) {
                this.insertGroup(this.emptyGroup)
            }
        },
        /**
         * validate dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        validateData() {
            let valid = true
            // kiểm tra mã nhhóm thực đơn
            if(!this.emptyGroup.FoodGroupCode) {
                if(!this.focusField) {
                    this.focusField = "FoodGroupCode"
                }
                this.errorList.FoodGroupCode = "Trường này không được để trống"
                valid = false
            }
            // kiểm tra tên nhóm thực đơn
            if(!this.emptyGroup.FoodGroupName) {
                if(!this.focusField) {
                    this.focusField = "FoodGroupName"
                }
                this.errorList.FoodGroupName = "Trường này không được để trống"
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
@import url(@/css/page/foodgroupdetail.css);
</style>