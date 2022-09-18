<template>
    <table class="table">
        <thead class="table--header">
            <tr>
                <td style="min-width: 159px">
                    <div class="table--column">
                        Loại món
                    </div>
                    <div class="table--filter">
                        <input 
                        class="input" 
                        value="Món ăn" 
                        disabled/>
                    </div>
                </td>

                <td style="min-width: 179px">
                    <div class="table--column" 
                    @click="sortTable('FoodCode')">
                        <div :class="[sortObject.sortBy === 'FoodCode' ? 'sort--' + sortObject.sortType : null]">
                            Mã món
                        </div>
                        
                    </div>
                    <div class="table--filter">
                        <div class="filter--type" 
                        @click="openDropdownOperator('FoodCode', enums.InputType.Text, $event)">
                            {{operatorIcon[operatorType.FoodCode]}}
                        </div>
                        <input class="input--filter" 
                        @change="changeValueFilter('FoodCode', $event)"/>
                    </div>
                </td>

                <td style="min-width: 149px">
                    <div class="table--column" 
                    @click="sortTable('FoodName')">
                        <div :class="[sortObject.sortBy === 'FoodName' ? 'sort--' + sortObject.sortType : null]">
                            Tên món
                        </div>
                    </div>
                    <div class="table--filter">
                        <div class="filter--type" 
                        @click="openDropdownOperator('FoodName', enums.InputType.Text, $event)">
                            {{operatorIcon[operatorType.FoodName]}}
                        </div>
                        <input class="input--filter" 
                        @change="changeValueFilter('FoodName', $event)"/>
                    </div>
                </td>
                <td  style="min-width: 149px">
                    <div class="table--column" 
                    @click="sortTable('FoodGroupName')">
                        <div :class="[sortObject.sortBy === 'FoodGroupName' ? 'sort--' + sortObject.sortType : null]">
                            Nhóm thực đơn
                        </div>
                    </div>
                    <div class="table--filter">
                        <div class="filter--type" 
                        @click="openDropdownOperator('FoodGroupName', enums.InputType.Text, $event)">
                            {{operatorIcon[operatorType.FoodGroupName]}}
                        </div>
                        <input class="input--filter" 
                        @change="changeValueFilter('FoodGroupName', $event)"/>
                    </div>
                </td>
                <td style="min-width: 89px">
                    <div class="table--column" 
                    @click="sortTable('FoodUnitName')">
                        <div :class="[sortObject.sortBy === 'FoodUnitName' ? 'sort--' + sortObject.sortType : null]">
                            Đơn vị tính
                        </div>
                    </div>
                    <div class="table--filter">
                        <div class="filter--type" 
                        @click="openDropdownOperator('FoodUnitName', enums.InputType.Text, $event)">
                            {{operatorIcon[operatorType.FoodUnitName]}}
                        </div>
                        <input class="input--filter"
                         @change="changeValueFilter('FoodUnitName', $event)"/>
                    </div>
                </td>
                <td style="min-width: 149px">
                    <div class="table--column" @click="sortTable('FoodPrice')">
                        <div :class="[sortObject.sortBy === 'FoodPrice' ? 'sort--' + sortObject.sortType : null]">
                            Giá bán
                        </div>
                        
                    </div>
                    <div class="table--filter">
                        <div class="filter--type" 
                        @click="openDropdownOperator('FoodPrice', enums.InputType.Number, $event)">
                            {{operatorIcon[operatorType.FoodPrice]}}
                        </div>
                        <base-input 
                        type="money" 
                        @change="changeValueFilter('FoodPrice', $event)"
                        />
                    </div>
                </td>
                <td style="min-width: 149px">
                    <div class="table--column">
                        Thay đổi theo thời giá
                    </div>
                    <div class="table--filter">
                        <input class="input" disabled/>
                    </div>
                </td>
                <td style="min-width: 149px">
                    <div class="table--column">
                        Điều chỉnh giá tự do
                    </div>
                    <div class="table--filter">
                        <input class="input" disabled/>
                    </div>
                </td>
                <td style="min-width: 139px">
                    <div class="table--column">
                        Định lượng NVL
                    </div>
                    <div class="table--filter">
                        <input class="input" disabled/>
                    </div>
                </td>
                <td style="min-width: 149px">
                    <div class="table--column" @click="sortTable('ShowOnMenu')">
                        <div :class="[sortObject.sortBy === 'ShowOnMenu' ? 'sort--' + sortObject.sortType : null]">
                            Hiển thị trên thực đơn
                        </div>
                        
                    </div>
                    <div class="table--filter">
                        <base-combobox 
                        @change="changeShowOnMenu"
                        :listItem="[
                            {
                            ShowOnMenuId: 0,
                            ShowOnMenuName: 'Không',
                            },
                            {
                            ShowOnMenuId: 1,
                            ShowOnMenuName: 'Có',
                            },
                            {
                            ShowOnMenuId: 2,
                            ShowOnMenuName: 'Hiển thị tất cả',
                            },
                        ]"
                        table="ShowOnMenu"
                        />
                    </div>
                </td>
                <td style="min-width: 109px">
                    <div class="table--column">
                        Ngừng bán
                    </div>
                    <div class="table--filter">
                        <input class="input" disabled/>
                    </div>
                </td>
            </tr>
        </thead>
        <tbody class="table--body" v-if="!isLoadingFood">
            <tr v-for="food of foods" :key="food.FoodId"
            :class="{ selected: food.FoodId === selectedFood.FoodId }"
            @click="selectFood(food)"
            @dblclick="showFoodDetail(food)"
            @contextmenu="showContextMenuTable(food, $event)">
                <td>Món ăn</td>
                <td>{{ food.FoodCode }}</td>
                <td>{{ food.FoodName }}</td>
                <td>{{ food.FoodGroupName }}</td>
                <td>{{ food.FoodUnitName }}</td>
                <td align="right">{{ formatMoneyTable(food.FoodPrice) }}</td>
                <td>
                    <base-icon iconName="icon-checkbox-empty"/>
                </td>
                <td>
                    <base-icon iconName="icon-checkbox-empty"/>
                </td>
                <td>Chưa thiết lập</td>
                <td>
                    <base-icon iconName="icon-checkbox-empty" v-if="food.ShowOnMenu === 0"/>
                    <base-icon iconName="icon-checkbox-tick" v-if="food.ShowOnMenu === 1"/>
                </td>
                <td>
                    <base-icon iconName="icon-checkbox-empty"/>
                </td>
            </tr>
        </tbody>
        <div class="table--loading" v-if="isLoadingFood">
            <base-loading/>
        </div>
    </table>

    <div class="dropdown" v-if="isShowOperator" 
    v-click-outside="toggleDropDownOperator"
    :style="{
      top: `${dropdownTop}px`,
      left: `${dropdownLeft}px`,
    }"
    >
        <ul class="dropdown--item">
            <li class="filter--item"
            :class="{ 'filter--selected': item.type === operatorType[selectedCol] }"
            v-for="(item, index) of dropdownItems" :key="index"
            @click="changeOperatorColumn(item.type)">
                <div>{{operatorIcon[item.type]}} {{item.text}}</div>
            </li>
        </ul>
    </div>
</template>

<script>

import enums from "@/enums"
import { mapActions,mapState } from 'vuex'
export default {
    data() {
        return {
            enums: enums,
            dropdownTop: 0, // Vị trí dropdown operator
            dropdownLeft: 0, // Vị trí dropdown operator
            dropdownItems: [], // listitem trong dropdown
            isShowOperator: false, // trạng thái hiển thị dropdown
            selectedCol: null, // cột được chọn
            filterObjects: [
                {
                    ColumnFilter: "FoodCode",
                    Value: "",
                    InputType: enums.InputType.Text,
                    Operator: enums.Operator.Contain
                },
                {
                    ColumnFilter: "FoodName",
                    Value: "",
                    InputType: enums.InputType.Text,
                    Operator: enums.Operator.Contain
                },
                {
                    ColumnFilter: "FoodUnitName",
                    Value: "",
                    InputType: enums.InputType.Text,
                    Operator: enums.Operator.Contain
                },
                {
                    ColumnFilter: "FoodGroupName",
                    Value: "",
                    InputType: enums.InputType.Text,
                    Operator: enums.Operator.Contain
                },
                {
                    ColumnFilter: "FoodPrice",
                    Value: "",
                    InputType: enums.InputType.Number,
                    Operator: enums.Operator.LessOrEqual
                },
                {
                    ColumnFilter: "ShowOnMenu",
                    Value: "",
                    InputType: enums.InputType.Number,
                    Operator: enums.Operator.Equal
                },
            ],
            operatorIcon: ["*","=","+","-","!","<",">","≤","≥"],
            operatorType: {
                FoodCode: enums.Operator.Contain,
                FoodName: enums.Operator.Contain,
                FoodUnitName: enums.Operator.Contain,
                FoodGroupName: enums.Operator.Contain,
                FoodPrice: enums.Operator.LessOrEqual,
                ShowOnMenu: enums.Operator.Equal
            },
            sortObject: {
                sortBy: "",
                sortType: ""
            }
        }
    },
    computed: mapState({
        foods: (state) => state.food.foods,
        selectedFood: (state) => state.food.selectedFood,
        isLoadingFood: (state) => state.food.isLoadingFood,
    }),
    methods: {
        ...mapActions([
            "loadAllFood",
            "updateFilterObjects",
            "loadFoodPaging",
            "updateSortObject",
            "updatePageIndex",
            "selectFood",
            "updateFormMode",
            "toggleFoodDetail"
        ]),
        /**
         * định dạng tiền hiển thị trên bảng
         * @param {*} val Giá trị đầu vào
         * CreatedBy: PQKHANH(12/09/2022)
         */
        formatMoneyTable(val) {
            if(!val) {
                val = 0
            }
            return val.toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2})
        },
        /**
         * Sắp xếp bảng theo các trường cố định
         * @param {*} val Giá trị đầu vào
         * CreatedBy: PQKHANH(12/09/2022)
         */
        sortTable(val){
            // Nếu chọn vào cột đã được chọn thì đổi chiều, nếu chưa có thì mặc định tăng dần
            if(val === this.sortObject.sortBy) {
                if(this.sortObject.sortType === enums.sortType.ASC) {
                    this.sortObject.sortType = enums.sortType.DESC
                } else {
                    this.sortObject.sortType = enums.sortType.ASC
                }
            } else {
                this.sortObject.sortBy = val
                this.sortObject.sortType = enums.sortType.ASC
            }
            this.updateSortObject(this.sortObject)
            this.loadFoodPaging()
        },
        /**
         * mở dropdown chứa các operator
         * @param {*} val Cột đầu vào
         * @param {*} type kiểu dữ liệu lọc
         * CreatedBy: PQKHANH(12/09/2022)
         */
        openDropdownOperator(val, type, $event) {
            // xét tùng kiểu dữ liêu sẽ có đầu vào khác nhau
            this.selectedCol = val
            if(type === enums.InputType.Text) {
                this.dropdownItems = [
                    {
                        type: enums.Operator.Contain,
                        text: ': Chứa',
                    },
                    {
                        type: enums.Operator.Equal,
                        text: ': Bằng',
                    },
                    {
                        type: enums.Operator.StartWith,
                        text: ': Bắt đầu bằng',
                    },
                    {
                        type: enums.Operator.EndWith,
                        text: ': Kết thúc bằng',
                    },
                    {
                        type: enums.Operator.NotContain,
                        text: ': Không chứa',
                    },
                ]
            }
            if(type === enums.InputType.Number) {
                this.dropdownItems = [
                    {
                        type: enums.Operator.Equal,
                        text: ': Bằng',
                    },
                    {
                        type: enums.Operator.Less,
                        text: ': Nhỏ hơn',
                    },
                    {
                        type: enums.Operator.LessOrEqual,
                        text: ': Nhỏ hơn hoặc bằng',
                    },
                    {
                        type: enums.Operator.Bigger,
                        text: ': Lớn hơn',
                    },
                    {
                        type: enums.Operator.BiggerOrEqual,
                        text: ': Lớn hơn hoặc bằng',
                    },
                ]
            }
            // xét vị trí dropdown operator và hiển thị
            this.dropdownLeft = $event.target.getBoundingClientRect().left
            this.dropdownTop = $event.target.getBoundingClientRect().top + $event.target.getBoundingClientRect().height
            this.isShowOperator = true
        },
        /**
         * Click ẩn hiện dropdown
         * CreatedBy: PQKHANH(12/09/2022)
         */
        toggleDropDownOperator() {
            this.isShowOperator = !this.isShowOperator
        },
        /**
         * Thây đổi giá trị operator ở cột
         * CreatedBy: PQKHANH(12/09/2022)
         */
        changeOperatorColumn(type) {
            this.operatorType[this.selectedCol] = type
            for(let i=0;i<this.filterObjects.length;i++) {
                if(this.filterObjects[i].ColumnFilter === this.selectedCol) {
                    this.filterObjects[i].Operator = type
                }
            }
            this.isShowOperator = false
            this.updateFilterObjects(this.filterObjects)
            this.updatePageIndex(1)
            this.loadFoodPaging()
        },
        /**
         * Thay đổi giá trị lọc của cột
         * CreatedBy: PQKHANH(12/09/2022)
         */
        changeValueFilter(col, $event) {
            let val = $event.target.value
            if(col === 'FoodPrice') {
                val = val.replaceAll('.','')
            }
            val = val.trim()
            for(let i=0;i<this.filterObjects.length;i++) {
                if(this.filterObjects[i].ColumnFilter === col) {
                    this.filterObjects[i].Value = val
                }
            }
            this.updateFilterObjects(this.filterObjects)
            this.updatePageIndex(1)
            this.loadFoodPaging()
        },
        /**
         * Thay đổi hiển thị tên thực đơn
         * CreatedBy: PQKHANH(12/09/2022)
         */
        changeShowOnMenu(item, col) {
            for(let i=0;i<this.filterObjects.length;i++) {
                if(this.filterObjects[i].ColumnFilter === col) {
                    this.filterObjects[i].Value = item.ShowOnMenuId.toString()
                    if(item.ShowOnMenuId === 2) {
                        this.filterObjects[i].Value = ""
                    }
                }
            }
            this.updateFilterObjects(this.filterObjects)
            this.updatePageIndex(1)
            this.loadFoodPaging()
        },
        /**
         * hiện form chi tiết
         * @param {*} food dữ liệu gbản ghi được chọn
         * CreatedBy: PQKHANH(12/09/2022)
         */
        showFoodDetail(food) {
            this.selectFood(food)
            this.updateFormMode(enums.formMode.Edit)
            this.toggleFoodDetail()
        },
        /**
         * click chuột phải hiện context menu
         * @param {*} food dữ liệu gbản ghi được chọn
         * CreatedBy: PQKHANH(12/09/2022)
         */
        showContextMenuTable(food, $event) {
            $event.preventDefault()
            this.selectFood(food)
            this.$emit("showOptionMenu", $event)
        }
    },
    created() {
        this.loadFoodPaging()
    },
}
</script>

<style scoped>
@import url(@/css/page/menufoodlist.css);
</style>