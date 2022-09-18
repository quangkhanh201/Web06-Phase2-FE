<template>
    <div class="input--field">
        <input 
        :class="inputClass"
        :type="type"
        :value="showValue(modelValue)"
        :disabled="disabled"
        :maxlength="maxlength"
        ref="inputRef"
        @input="updateValue"
        @change="changeValue"
        />
        <div 
        class="input--error-icon" 
        v-if="errorMessage"
        >
            <base-icon 
            iconName="icon-danger" 
            :title="errorMessage"
            />
        </div>
    </div>
</template>

<script>
import { formatMoney } from "@/ultis/format"
export default {
    props: [
        "type", // kiểu input: dạng money hặc text
        "errorMessage", // Thông báo lỗi
        "disabled", // disabled input
        "modelValue", // giá trị input
        "focus", // focus hay không
        "hideBorder" // ẩn hiện border
    ],
    data() {
        return {
            inputClass: ["input", this.errorMessage ? "input--error" : null], 
            maxlength: null // chiều dài tối đa
        }
    },
    watch: {
        /**
         * Bắt sự kiện thay đổi của prop errorMessage và focus
         * @param {*} newVal giá trị mới
         * CreatedBy: PQKHANH (09/09/2022)
         */
        errorMessage(newVal) {
            if(newVal) {
                this.inputClass = ["input", this.hideBorder ? "hide--border": null, this.errorMessage ? "input--error" : null]
            } else {
                this.inputClass = ["input", this.hideBorder ? "hide--border": null]
            }
        },
        focus(newVal) {
            if(newVal) {
                this.$refs.inputRef.focus();
            }
        }
    },
    created() {
        this.inputClass = ["input", this.hideBorder ? "hide--border": null, this.errorMessage ? "input--error" : null]
    },
    methods: {
        /**
         * Xử lý hiển thị, với type là money hiẻn thị theo định dạng tiền cho trước
         * @param {*} val 
         * CreatedBy: PQKHANH (09/09/2022)
         */
        showValue(val) {
            if(val && this.type =="money") {
                return formatMoney(val)
            }
            return val
        },
        /**
         * Bắt sự kiện khi người dùng nhập vào
         * @param {*} event
         * CreatedBy: PQKHANH (09/09/2022)
         */
        updateValue(event) {
            if(this.type =="money") {
                event.target.value = formatMoney(event.target.value)
            }
            // cập nhật v-model
            this.$emit("update:modelValue", event.target.value)
            this.$emit("write", event)
        },
        /**
         * Bắt sự kiện khi người dùng hoàn thành nhập
         * @param {*} event
         * CreatedBy: PQKHANH (09/09/2022)
         */
        changeValue(event) {
            // cập nhật v-model
            this.$emit("update:modelValue", event.target.value)
            this.$emit("write", event)
            // phát sự kiện lên cha khi input thay đổi
            this.$emit("changeValue", event.target.value)
        }
    },
    mounted() {
        if(this.type == "money") {
            this.maxlength = 15
        }
        if (this.focus) {
            this.$refs.inputRef.focus()
        }
    },
}
</script>

<style scoped>
@import url(@/css/base/input.css);
</style>