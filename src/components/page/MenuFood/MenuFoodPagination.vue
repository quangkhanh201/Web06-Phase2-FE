<template>
    <div class="paginate">
        <div class="paginate--left">
            <div 
            class="paginate--icon" 
            @click="clickFirstPage"
            :class="{ disabled: pageIndex == 1|| pageNumber == 0}">
                <base-icon iconName="icon-page-first"/>
            </div>
            <div 
            class="paginate--icon" 
            @click="clickPrevPage"
            :class="{ disabled: pageIndex == 1|| pageNumber == 0}">
                <base-icon iconName="icon-page-prev"/>
            </div>
            <div class="separator-horizontal"></div>
            <div class="paginate--text">
                Trang
            </div>
            <form @submit="changePageNumber">
                <base-input v-model="pageIndex"
                />
            </form>
            <div class="paginate--text">
                trên {{totalPage}}
            </div>
            <div class="separator-horizontal"></div>
            <div 
            class="paginate--icon" 
            @click="clickNextPage"
            :class="{ disabled: pageIndex == totalPage|| pageNumber == 0}">
                <base-icon iconName="icon-page-next"/>
            </div>
            <div 
            class="paginate--icon" 
            @click="clickLastPage"
            :class="{ disabled: pageIndex == totalPage|| pageNumber == 0}">
                <base-icon iconName="icon-page-last"/>
            </div>
            <div class="separator-horizontal"></div>
            <div 
            class="paginate--icon" 
            @click="loadFoodPaging">
                <base-icon iconName="icon-refresh"/>
            </div>
            <div class="separator-horizontal"></div>
            <base-combobox
            :listItem="listPageSize"
            table="pageSize"
            disabled="true"
            :value="IdtotalRecordOnPage"
            @change="changePageSize"
            />
        </div>
        <div class="paginate--right">
            <div v-if="!isLoadingFood && totalRecord !=0">
                {{`Hiển thị ${(pageIndex - 1) * pageSize + 1} - 
                ${pageIndex * pageSize < totalRecord 
                ? pageIndex * pageSize : totalRecord} 
                trên ${totalRecord} kết quả`}}
            </div>
            <div v-if="isLoadingFood || totalRecord == 0">
                Không có dữ liệu
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            pageNumber: 1,
            IdtotalRecordOnPage: 1,
            listPageSize: [
                {
                pageSizeId: "1",
                pageSizeName: 25,
                },
                {
                pageSizeId: "2",
                pageSizeName: 50,
                },
                {
                pageSizeId: "3",
                pageSizeName: 100,
                },
            ],
        }
    },
    computed: mapState({
        pageIndex: (state) => state.food.pageIndex,
        pageSize: (state) => state.food.pageSize,
        totalPage: (state) => state.food.totalPage,
        totalRecord: (state) => state.food.totalRecord,
        isLoadingFood: (state) => state.food.isLoadingFood,
    }),
    watch: {
        pageIndex(newVal) {
            this.pageNumber = newVal
            console.log(newVal, this.pageNumber);
        },
        totalRecord(newVal) {
            if(newVal == 0) {
                this.pageNumber = 0
            } else{
                this.pageNumber = this.pageIndex
            }
            
        }
    },
    methods: {
        ...mapActions([
            "updatePageSize",
            "updatePageIndex",
            "loadFoodPaging"
        ]),
        /**
         * hiện form chi tiết
         * @param {*} food dữ liệu gbản ghi được chọn
         * CreatedBy: PQKHANH(12/09/2022)
         */
        changePageSize(item) {
            this.pageIndex = 1
            this.updatePageSize(item.pageSizeName)
            this.loadFoodPaging()
        },
        /**
         * Chọn trang cuối
         * CreatedBy: PQKHANH(12/09/2022)
         */
        clickLastPage() {
            if(this.pageIndex < this.totalPage) {
                this.pageNumber = this.totalPage
                this.updatePageIndex(this.pageNumber)
                this.loadFoodPaging()
            }
        },
        /**
         * Chọn trang đầu
         * CreatedBy: PQKHANH(12/09/2022)
         */
        clickFirstPage() {
            if(this.pageIndex > 1) {
                this.pageNumber = 1
                this.updatePageIndex(this.pageNumber)
                this.loadFoodPaging()
            }
        },
        /**
         * Chọn trang trước
         * CreatedBy: PQKHANH(12/09/2022)
         */
        clickPrevPage() {
            if(this.pageIndex > 1) {
                this.pageNumber = this.pageNumber - 1
                this.updatePageIndex(this.pageNumber)
                this.loadFoodPaging()
            }
        },
        /**
         * Chọn trang tiếp theo
         * CreatedBy: PQKHANH(12/09/2022)
         */
        clickNextPage() {
            if(this.pageIndex < this.totalPage) {
                this.pageNumber = this.pageNumber + 1
                this.updatePageIndex(this.pageNumber)
                this.loadFoodPaging()
            }
        },
        /**
         * Chọn trang bằng nhập input
         * CreatedBy: PQKHANH(12/09/2022)
         */
        changePageNumber(event) {
            event.preventDefault()
            if(this.pageNumber <= 0 || !this.pageNumber) {
                this.pageNumber = 1
            }
            if(this.pageNumber > this.totalPage) {
                this.pageNumber = this.totalPage
            }
            this.updatePageIndex(this.pageNumber)
            this.loadFoodPaging()
        }
    },
    mounted() {
        this.pageNumber = this.pageIndex
    },
}
</script>

<style scoped>
@import url(@/css/page/menufoodpagination.css);
</style>