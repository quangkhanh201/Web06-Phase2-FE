<template>
    <div :class="iconClass"></div>
</template>

<script>
export default {
    data() {
        return {
            iconClass: [] 
        }
    },
    props: ["iconName", "disabled"],
    watch: {
        /**
         * Bắt sự kiện thay đổi của prop disabled
         * @param {*} newVal giá trị mới
         * CreatedBy: PQKHANH (09/09/2022)
         */
        disabled(newVal) {
            if(newVal) {
                this.iconClass = [`${this.iconName}`, "disabled"]
            } else {
                this.iconClass = [`${this.iconName}`]
            }
        }
    },
    created() {
        if (this.disabled) {
            this.iconClass = [`${this.iconName}`, "disabled"];
        } else {
            this.iconClass = [`${this.iconName}`];
        }
  },
}
</script>

<style scoped>
@import url(@/css/base/icon.css);
</style>