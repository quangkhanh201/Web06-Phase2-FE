<template>
    <div class="dialog--container">
        <div class="dialog--form">
            <div class="mgf-inner">
                <div class="popup--header">
                    <div>CUKCUK - Quản lý nhà hàng</div>
                </div>
                <div class="dialog--body">
                    <div class="dialog-icon">
                        <base-icon :iconName="dialogIcon" />
                    </div>
                    <div class="dialog--message">
                        <div>{{message}}</div>
                    </div>
                </div>
                <div class="dialog--footer">
                    <base-button
                        class="button--popup"
                        :content="button.content"
                        v-for="(button, index) of rightButton"
                        :key="index"
                        @click="clickButton(button.eventClick)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "type", 
        "rightButton", // mảng chứa các button
        "message" // câu thông báo trong popup
    ],
    data() {
        return {
            dialogIcon: ""
        }
    },
    created() {
        this.dialogIcon = this.type ? "icon-warning-32" : "icon-question-32"
    },
    methods: {
        /**
         * Xử lý sự kiện click button
         * @param {*} btn 
         * CreatedBy: PQKHANH (09/09/2022)
         */
        clickButton(btn) {
            // Phát sự kiện lên cha
            this.$emit(`${btn}`)
        }
    },
}
</script>

<style scpoed>
@import url(@/css/base/dialog.css);
</style>