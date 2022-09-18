<template>
    <div class="menu--food">
        <div class="title">
            <div class="title--name">Thực đơn</div>
            <base-button 
            content="Phản hồi"
            icon="icon-view-email"
            />
        </div>
        <div class="toolbar">
            <div @click="clickAddFood">
                <base-button 
                content="Thêm"
                icon="icon-insert"
                type="button--primary"
                />
            </div>
            <div @click="clickDuplicateFood">
                <base-button 
                content="Nhân bản"
                icon="icon-duplicate"
                type="button--primary"
                />
            </div>
            <div @click="clickEditFood">
                <base-button 
                content="Sửa"
                icon="icon-edit"
                type="button--primary"
                />
            </div>
            <div @click="clickDeleteFood">
                <base-button 
                content="Xóa"
                icon="icon-delete"
                type="button--primary"
                />
            </div>
            <div @click="clickRefresh">
                <base-button 
                content="Nạp"
                icon="icon-reload"
                type="button--primary"
                />
            </div>
        </div>
        <div class="menu--food-list">
            <MenuFoodList @showOptionMenu="showOptionMenu"></MenuFoodList>
        </div>
        <MenuFoodPagination></MenuFoodPagination>

        <MenuFoodDetail v-if="isShowFoodDetail"></MenuFoodDetail>
        <FoodGroupDetail v-if="isShowGroupDetail"></FoodGroupDetail>
        <FoodUnitDetail v-if="isShowUnitDetail"></FoodUnitDetail>
        <ProcessedPlaceDetail v-if="isShowProcessPlaceDetail"></ProcessedPlaceDetail>
        <ServiceHobbyDetail v-if="isShowServiceHobbyDetail"></ServiceHobbyDetail>
        
        <base-dialog v-if="isShowDeleteDialog"
        :message="contentDialogDelete"
        :rightButton="[
            { content: 'Có', eventClick: 'confirm' },
            { content: 'Không', eventClick: 'no-confirm' },
        ]"
        @confirm="clickConfirmDelete"
        @no-confirm="closeDialogDelete"
        />

        <base-dialog v-if="isShowDialog"
        type="warning"
        :rightButton="[
            { content: 'Đồng ý', eventClick: 'confirm' },
        ]"
        :message="contentDialog"
        @confirm="toggleDialog"
        />

        <div class="option--menu" v-if="isShowContextMenu"
        :style="{position: 'fixed', top: `${menuTop}px`, left: `${menuLeft}px` }"
        v-click-outside="showContextMenuTable"
        >
            <div class="option--menu-item"
            @click="clickAddFoodContextMenu">
                <base-icon iconName="icon-insert"/>
                <div class="button--text">Thêm thực đơn</div>
            </div>
            <div class="option--menu-item"
            @click="clickDuplicateFoodContextMenu">
                <base-icon iconName="icon-duplicate"/>
                <div class="button--text">Nhân bản</div>
            </div>
            <div class="option--menu-item"
            @click="clickEditFoodContextMenu">
                <base-icon iconName="icon-edit"/>
                <div class="button--text">Sửa</div>
            </div>
            <div class="option--menu-item"
            @click="clickDeleteFoodContextMenu">
                <base-icon iconName="icon-delete"/>
                <div class="button--text">Xóa</div>
            </div>
            <div class="option--menu-item"
            @click="clickRefreshContextmenu">
                <base-icon iconName="icon-refresh"/>
                <div class="button--text">Nạp</div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuFoodList from './MenuFoodList.vue'
import MenuFoodPagination from './MenuFoodPagination.vue';
import MenuFoodDetail from './MenuFoodDetail.vue';
import FoodGroupDetail from './FoodGroupDetail.vue';
import FoodUnitDetail from './FoodUnitDetail.vue';
import ProcessedPlaceDetail from './ProcessedPlaceDetail.vue';
import ServiceHobbyDetail from './ServiceHobbyDetail.vue';
import { mapActions, mapState } from 'vuex';
import enums from "@/enums"
export default {
    components: { MenuFoodList, MenuFoodPagination, MenuFoodDetail, FoodGroupDetail, FoodUnitDetail, ProcessedPlaceDetail, ServiceHobbyDetail },
    data() {
        return {
            isShowDeleteDialog: false, // trạng thái hiển thị form xóa
            contentDialogDelete: "", // Nội dung dialog cảnh báo xóa
            isShowContextMenu: false, // trạng thái hiển thị contextMenu
            menuTop: 0, // xét vị trí contextMenu
            nenuLeft: 0,// xét vị trí contextMenu
        }
    },
    computed: mapState({
        isShowFoodDetail: (state) => state.food.isShowFoodDetail,
        selectedFood: (state) => state.food.selectedFood,
        isShowDialog: (state) => state.app.isShowDialog,
        contentDialog: (state) => state.app.contentDialog,
        isShowGroupDetail: (state) => state.foodGroup.isShowGroupDetail,
        isShowUnitDetail: (state) => state.foodUnit.isShowUnitDetail,
        isShowProcessPlaceDetail: (state) => state.processedPlace.isShowProcessPlaceDetail,
        isShowServiceHobbyDetail: (state) => state.serviceHobby.isShowServiceHobbyDetail,
    }),
    methods: {
        ...mapActions([
            "loadFoodPaging", // load lai trang khi them sua xoa
            "deleteFood", //xoa ban ghi
            "selectFood", // chon ban ghi khi them sua xoa
            "updatePageIndex", // dua ve trang dau khi them
            "updateFormMode", // trang thai lam viec
            "toggleFoodDetail", // hien form chi tiet
            "toggleDialog"// hien dialog
        ]),
        /**
         * click thêm bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickAddFood() {
            this.selectFood({
                ShowOnMenu: enums.showOnMenu.Yes
            })
            this.updateFormMode(enums.formMode.Add)
            this.toggleFoodDetail()
        },
        /**
         * click nhân bản bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickDuplicateFood() {
            this.updateFormMode(enums.formMode.Add)
            this.toggleFoodDetail()
        },
        /**
         * click sửa bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickEditFood() {
            this.updateFormMode(enums.formMode.Edit)
            this.toggleFoodDetail()
        },
        /**
         * click xóa bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickDeleteFood() {
            this.isShowDeleteDialog = true
            this.contentDialogDelete = `Bạn có chắc chắn muốn xóa món <${this.selectedFood.FoodCode} - ${this.selectedFood.FoodName}> không?`
        },
        /**
         * click refresh bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickRefresh() {
            this.updatePageIndex(1)
            this.loadFoodPaging()
        },
        /**
         * click xác nhận xóa bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickConfirmDelete() {
            this.isShowDeleteDialog = false
            this.deleteFood(this.selectedFood.FoodId)
        },
        /**
         * click đóng form xóa bản ghi
         * CreatedBy: PQKHANH(15/09/2022)
         */
        closeDialogDelete() {
            this.isShowDeleteDialog = false
        },
        /**
         * đóng contextmenu khi click ra ngoài
         * CreatedBy: PQKHANH(15/09/2022)
         */
        showContextMenuTable() {
            this.isShowContextMenu = false
        },
        /**
         * bắt sự kiện từ table, xét vị trí và hiển thị
         * CreatedBy: PQKHANH(15/09/2022)
         */
        showOptionMenu(event) {
            this.menuTop = event.pageY
            this.menuLeft = event.pageX
            this.isShowContextMenu = true
        },
        /**
         * click các button trong contextmenu tương tự như trên toolbar, đồng thời đóng contextMenu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickAddFoodContextMenu() {
            this.isShowContextMenu = false
            this.clickAddFood()
        },
        clickDuplicateFoodContextMenu() {
            this.isShowContextMenu = false
            this.clickDuplicateFood()
        },
        clickEditFoodContextMenu() {
            this.isShowContextMenu = false
            this.clickEditFood()
        },
        clickDeleteFoodContextMenu() {
            this.isShowContextMenu = false
            this.clickDeleteFood()
        },
        clickRefreshContextmenu() {
            this.isShowContextMenu = false
            this.clickRefresh()
        }

    },
}
</script>

<style scoped>
@import url(@/css/page/menufood.css);
</style>