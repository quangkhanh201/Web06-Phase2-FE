<template>
    <button :class="buttonClass">
        <div class="button--icon" v-if="icon">
            <base-icon :iconName = "icon" />
        </div>
        <div class="button--text">
            {{content}}
        </div>
    </button>
</template>

<script>
export default {
    props: [
        "content", // Nội dung button
        "icon", // Icon trong button
        "disabled", // Disabled button
        "type" // kiểu button: gồm 2 kiểu button primary và button second
    ],
    data() {
        return {
            buttonClass: ["button", this.type ? "button--primary" : "button--second"]
        }
    },
    watch: {
        /**
         * Bắt sự kiện thay đổi của prop disabled
         * @param {*} newVal giá trị mới
         * CreatedBy: PQKHANH (09/09/2022)
         */
        disabled(newVal) {
            if(newVal) {
                this.buttonClass = ["button", this.type ? "button--primary" : "button--second", this.disabled ? "disabled" : null]
            } else {
                this.buttonClass = ["button", this.type ? "button--primary" : "button--second"]
            }
        }
    },
    created() {
        // Nếu có class này thì disabled button
        if (this.disabled) {
            this.buttonClass = ["button", this.type ? "button--primary" : "button--second", this.disabled ? "disabled" : null]
        } else {
            this.buttonClass = ["button", this.type ? "button--primary" : "button--second"]
        }
    }
}
</script>

<style scoped>
@import url(@/css/base/button.css);
</style>