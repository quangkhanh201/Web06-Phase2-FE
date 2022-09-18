<template>
    <div :class="comboboxClass" ref="comboboxRef">
        <input class="combobox--input"
        type="text"
        @input="handleInput"
        @keyup="handleKeyUp"
        @keydown="handleKeyDown"
        ref="comboboxInput"
        :disabled="disabled"
        v-on:focusin="() => (this.isFocus = true)"
        v-on:blur="handleBlur"
        />
        <base-icon 
        iconName="icon-grey-drop-arrow" 
        @click="handleShowComboboxItem"
        />
        <div class="add--button" 
        v-if="addIcon" 
        @click="handleAddItem"
        >
            <base-icon 
            iconName="icon-add"
            />
        </div>
    </div>
    <div 
    class="input--error-icon" 
    v-if="errorMessage"
    >
        <base-icon 
        iconName="icon-danger" 
        :title="errorMessage"
        />
    </div>

    <div class="combobox--data" 
    v-if="isShowComboboxItem && comboboxType != 1"
    :style="{
        top: `${cbxDataTop}px`,
        left: `${cbxDataLeft}px`,
        width: `${cbxDataWidth}px`,
    }"
    v-click-outside="toggleDropDown"
    >
        <ul class="combobox--list">
            <li 
            class="combobox--item"
            v-for="item of filterItems" :key="item[`${table}Id`]"
            @click="handleSelectItem(item)"
            :class="{
                'item--selected' : selectedItem && item[`${table}Id`] == selectedItem[`${table}Id`]
            }"
            >
                {{item[`${table}Name`]}}
            </li>
        </ul>
    </div>

    <div class="combobox--data" 
    v-if="isShowComboboxItem && comboboxType == 1"
    :style="{
        top: `${cbxDataTop}px`,
        left: `${cbxDataLeft}px`,
    }"
    v-click-outside="toggleDropDown"
    >
        <ul class="combobox--list-table">
            <li class="combobox--item-table title--table">
                <div class="item--name">Sở thích phục vụ</div>
                <div class="item--fee">Thu thêm</div>
            </li>
            <li 
            class="combobox--item-table"
            v-for="item of filterItems" :key="item[`${table}Id`]"
            @click="handleSelectItem(item)"
            :class="{
                'item--selected' : selectedItem && item[`${table}Id`] == selectedItem[`${table}Id`]
            }"
            >
                <div class="item--name">
                    {{item[`${table}Name`]}}
                </div>
                <div class="item--fee">
                    {{item[`Fee`]}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: [
        "listItem", // Danh sách item trong combobox
        "value", // Giá trị ban đầu của combobox
        "addIcon", // icon thêm bản ghi
        "table", // bảng dữ liệu đưa vào combobox
        "disabled", // disabled input chỉ xem, không  filter
        "focus", // focus input
        "errorMessage", // thông báo lỗi
        "hideBorder", // ẩn border
        "comboboxType", // kiểu combobox: gồm 2 kiểu 1cột và 2 cột
        "columnShow" // với kiểu 2 cột chọn cột hiển thị lên input
    ],
    data() {
        return {
            comboboxClass: "combobox", // class combobox
            isShowComboboxItem: false, // ẩn hiện combobox data
            cbxDataTop: 0, // tọa độ của comboboxData
            cbxDataLeft: 0, // tọa độ của comboboxData
            cbxDataWidth: 0, // chiều dài của comboboxData
            filterItems: [], // object các item phù hợp với filter
            selectedItem: null, // item được chọn, sẽ hiển thị lên input
            selectedIndex: 0, // số thứ tự của item được chọn
            isFocus: false, // focus input
            show: "" // cột để hiển thị lên input
        }
    },
    /**
     * Xử lý các xự kiện khi khởi tạo component
     * CreatedBy: PQKHANH (10/09/2022)
     */
    created() {
        // set class cho combobox
        this.comboboxClass = ["combobox", this.hideBorder ? "hide--border" : null]
        // Chọn cột hiển thị lên combobox, nếu không có mặc định hiển thị cột chứa tên
        if(this.columnShow) {
            this.show = this.columnShow
        } else {
            this.show = `${this.table}Name`
        }
    },
    /**
     * Bắt sự thay đổi của các biến
     * CreatedBy: PQKHANH (10/09/2022)
     */
    watch: {
        focus(newVal) {
            if(newVal) {
                this.$refs.comboboxInput.focus()
            }
        },
        errorMessage(newVal) {
            if(newVal) {
                this.comboboxClass = [...this.comboboxClass, "combobox--error"]
            } else {
                this.comboboxClass = this.comboboxClass.filter((item) => item !== "combobox--error")
            }
        },
        value(newVal) {
            this.selectedItem = this.listItem.find((item) => { 
                return item[`${this.table}Id`] == newVal})
            if(this.selectedItem) {
                this.$refs.comboboxInput.value = this.selectedItem[this.show]
                this.$emit("change", this.selectedItem, this.table)
            } else {
                this.$refs.comboboxInput.value = null
            }
        },
        isFocus(newVal) {
            if(newVal) {
                this.comboboxClass = [...this.comboboxClass, "combobox--focus"]
            } else {
                this.comboboxClass = this.comboboxClass.filter((item) => item !== "combobox--focus")
            }
        }
    },
    methods: {
        /**
         * Xử lý sự kiện kjhi nhân lên xuống chọn bản ghi
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleKeyUp(event) {
            // Khi nhẫn mũi tên xuống
            if(event.key === "ArrowDown") {
                // kiểm tra filterItem, nếu chưaqs có giá trị thì truyền listItem vào
                if(this.filterItems.length === 0) {
                    this.filterItems = this.listItem
                }
                // Mở combobox data, xét vị trí
                if(!this.isShowComboboxItem) {
                    this.setUpPositon()
                    this.isShowComboboxItem = true
                    this.selectedIndex = 0
                } else if(this.selectedIndex < this.filterItems.length - 1) {
                    this.selectedIndex++
                } else if(this.selectedIndex === this.filterItems.length - 1) {
                    this.selectedIndex = 0
                }
                //Đánh dấu item được chọn
                this.selectedItem = this.filterItems[this.selectedIndex]
            }
            if(event.key === "ArrowUp") {
                if(this.isShowComboboxItem && this.selectedIndex > 0) {
                    this.selectedIndex--
                } else if(this.selectedIndex === 0) {
                    this.selectedIndex = this.filterItems.length - 1
                }
                this.selectedItem = this.filterItems[this.selectedIndex]
            }
        },
        /**
         * Xử lý sự kiện khi keydown
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleKeyDown(event) {
            if(event.key === "Tab" || event.key === "Enter") {
                // đóng combobox
                this.isShowComboboxItem = false
                if(this.filterItems.length > 0) {
                    this.selectedItem = this.filterItems[this.selectedIndex]
                    event.target.value = this.selectedItem[this.show]
                    this.$emit("change", this.selectedItem, this.table)
                }
            }
        },
        /**
         * Xử lý autocomplete
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleInput(event) {
            // Lọc giá trị
            if(event.target.value !== "") {
                this.filterItems = this.listItem.filter((item) =>
                    this.handleVietnameseTones(item[`${this.table}Name`].toLowerCase())
                    .includes(this.handleVietnameseTones(event.target.value.toLowerCase())))
            } else {
                this.filterItems = []
            }
            //Nếu có giá trị thì chọn cái đầu tiên
            if(this.filterItems.length > 0) {
                this.selectedIndex = 0
                this.selectedItem = this.filterItems[this.selectedIndex]
                this.setUpPositon()
                this.isShowComboboxItem = true
            } else {
                this.selectedItem = null
            }
            if(!this.selectedItem) {
                this.$emit("change", this.selectedItem, this.table)
            }
        },
        /**
         * Xử lý sự kiện khi blur ra khỏi input
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleBlur() {
            // bỏ focus
            this.isFocus = false
            // set value input, nếu có item được chọn, nếu không thì null
            if(this.selectedItem) {
                this.$refs.comboboxInput.value = this.selectedItem[this.show]
            } else {
                this.$refs.comboboxInput.value = null
            }
        },
        /**
         * Xử lý sự kiện show combobox
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleShowComboboxItem() {
            this.filterItems = this.listItem
            this.toggleDropDown()
            this.$refs.comboboxInput.focus()
        },
        /**
         * Xử lý sự kiện khi nhấn thêm item
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleAddItem() {
            this.$store.dispatch(`toggle${this.table}Detail`)
        },
        /**
         * Xử lý sự kiện khi chọn item
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleSelectItem(item) {
            this.selectedItem = item
            this.$refs.comboboxInput.value = item[this.show]
            this.$emit("change", this.selectedItem, this.table)
            this.toggleDropDown()
        },
        /**
         * Đóng mở dropdown
         * CreatedBy: PQKHANH (10/09/2022)
         */
        toggleDropDown() {
            if(!this.isShowComboboxItem) {
                this.setUpPositon()
            }
            this.isShowComboboxItem = !this.isShowComboboxItem
        },
        /**
         * Đặt vị trí cho combobox data
         * CreatedBy: PQKHANH (10/09/2022)
         */
        setUpPositon() {
            let rect = this.$refs.comboboxRef.getBoundingClientRect()
            this.cbxDataLeft = rect.left
            this.cbxDataWidth = rect.width
            let height = (24 * this.listItem.length) < 300 ? 24 * this.listItem.length : 300
            if(rect.bottom + height < window.innerHeight) {
                this.cbxDataTop = rect.top + rect.height
            } else {
                this.cbxDataTop = rect.top - height
            }
        },
        /**
         * Xử lý ký tự tiếng việt
         * CreatedBy: PQKHANH (10/09/2022)
         */
        handleVietnameseTones(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            str = str.replace(/đ/g, "d")
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
            str = str.replace(/Đ/g, "D")
            // Some system encode vietnamese combining accent as individual utf-8 characters
            // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
            str = str.replace(/\u02C6|\u0306|\u031B/g, "") // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
            // Remove extra spaces
            // Bỏ các khoảng trắng liền nhau
            str = str.replace(/ + /g, " ")
            str = str.trim()
            // Remove punctuations
            // Bỏ dấu câu, kí tự đặc biệt
            str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ")
            return str
        },

    },
    mounted() {
        if(this.value && !this.selectedItem && this.listItem.length != 0) {
            this.selectedItem = this.listItem.find((item) => { 
                return item[`${this.table}Id`] == this.value})
            this.$refs.comboboxInput.value = this.selectedItem[this.show]
        }
        if (this.focus) {
            this.$refs.comboboxInput.focus();
        }
    },
    updated() {
        if(!this.filterItems) {
            this.filterItems = this.listItem
        }
    },
}
</script>

<style scoped>
@import url(@/css/base/combobox.css);
</style>