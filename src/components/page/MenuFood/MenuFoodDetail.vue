<template>
    <div class="form--container">
        <div class="popup--food-detail">
            <div class="popup--food-inner">
                <div class="popup--food-header">
                    <div>{{formTitle}}</div>
                    <div @click="clickCloseFoodDetail">
                        <base-icon iconName="icon-x-close"/>
                    </div>
                </div>
                <div class="popup--food-body">
                    <div class="popup--food-tab">
                        <div class="tab--option" 
                        :class="{ selected: tabOption == 1}" 
                        @click="changeTabOption(1)">Thông tin chung</div>
                        <div class="tab--option" 
                        :class="{ selected: tabOption == 2}" 
                        @click="changeTabOption(2)">Sở thích phục vụ</div>
                    </div>
                    <div class="popup--food-content">
                        <div class="popup--food-content-1" v-if="tabOption == 1">
                            <div class="content-1-left">
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Tên món <span style="color: red">(*)</span>
                                    </div>
                                    <base-input
                                    v-model="currentFood.FoodName"
                                    @changeValue="getNewCode"
                                    @write="checkRequired('FoodName', $event)"
                                    :errorMessage="errorList.FoodName"
                                    :focus="focusField === 'FoodName'"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Mã món <span style="color: red">(*)</span>
                                    </div>
                                    <base-input
                                    v-model="currentFood.FoodCode"
                                    @write="checkRequired('FoodCode', $event)"
                                    :errorMessage="errorList.FoodCode"
                                    :focus="focusField === 'FoodCode'"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Nhóm thực đơn
                                    </div>
                                    <base-combobox
                                    :listItem="groups"
                                    table="FoodGroup"
                                    :addIcon="true"
                                    :value="currentFood.FoodGroupId"
                                    @change="(val,table) => 
                                        this.setValueCombobox('FoodGroup', val)"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Đơn vị tính <span style="color: red">(*)</span>
                                    </div>
                                    <base-combobox
                                    :listItem="units"
                                    table="FoodUnit"
                                    :addIcon="true"
                                    :value="currentFood.FoodUnitId"
                                    @change="(val,table) => 
                                        this.checkComboboxRequired('FoodUnit', val)"
                                    :errorMessage="errorList.FoodUnitId"
                                    :focus="focusField === 'FoodUnitId'"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Giá bán <span style="color: red">(*)</span>
                                    </div>
                                    <base-input 
                                    type="money"
                                    style="width: 100px"
                                    v-model="currentFood.FoodPrice"
                                    @write="checkRequired('FoodPrice', $event)"
                                    :errorMessage="errorList.FoodPrice"
                                    :focus="focusField === 'FoodPrice'"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Giá vốn
                                    </div>
                                    <base-input 
                                    type="money"
                                    style="width: 100px"
                                    v-model="currentFood.FoodInvest"
                                    :errorMessage="errorList.FoodInvest"
                                    :focus="focusField === 'FoodInvest'"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Mô tả
                                    </div>
                                    <textarea class="textarea" rows="3"
                                    v-model="currentFood.Description"
                                    ></textarea>
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label">
                                        Chế biến tại
                                    </div>
                                    <base-combobox
                                    :listItem="processedPlaces"
                                    table="ProcessedPlace"
                                    :addIcon="true"
                                    :value="currentFood.ProcessedPlaceId"
                                    @change="(val,table) => 
                                        this.setValueCombobox('ProcessedPlace', val)"
                                    />
                                </div>
                                <div class="field--data">
                                    <div class="field--data-label"></div>
                                    <input
                                        id="checkbox"
                                        type="checkbox"
                                        style="display: none"
                                        v-model="currentFood.ShowOnMenu"
                                        :true-value="0"
                                        :false-value="1"
                                    />
                                    <label for="checkbox" class="checkbox-label">
                                        <div class="checkbox-icon"></div>
                                        Không hiển thị trên thực đơn
                                    </label>
                                </div>
                            </div>
                            <div class="content-1-right">
                                <fieldset>
                                    <legend>Ảnh đại diện</legend>
                                    <div class="avatar">
                                        <div class="image--avatar">
                                            <img v-if="!currentFood.ImageUrl"
                                            src="@/assets/images/ImageHandler.png"
                                            width="160"
                                            height="120"
                                            ref="imagePreview">
                                            <img v-if="currentFood.ImageUrl"
                                            :src="`${serverLink}/${currentFood.ImageUrl}`"
                                            width="160"
                                            height="120"
                                            ref="imagePreview">
                                            <div class="image--text">
                                                Chọn các ảnh có định dạng
                                                <b>(.jpg, .jpeg, .png, .gif)</b>
                                            </div>
                                        </div>
                                        <div class="image--button">
                                            <input id="input--image"
                                            type="file"
                                            style="display: none"
                                            accept=".jpg,.jpeg,.png,.gif"
                                            @change="clickChangeImage"
                                            />
                                            <label for="input--image" class="btn--image">...</label>
                                            <label class="btn--image" @click="clickRevokeImage">
                                                <base-icon iconName="icon-x-close-red" />
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="popup--food-content-2" v-if="tabOption == 2">
                            <div class="content-2-header">
                                <div>Món ăn: <b>{{ currentFood.FoodName}}</b>
                                </div>
                                <div class="content-2-info">
                                    <base-icon iconName="icon-info-32"/>
                                    <div class="content-2-info-message">
                                        <div>Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ chọn nhanh order.</div>
                                        <div>VD: không cay/ít hành/thêm phomai...</div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-2-body">
                                <table class="table-service-hobby">
                                    <thead>
                                        <tr>
                                            <td style="width: 480px"><div>Sở thích phục vụ</div></td>
                                            <td style="width: 240px"><div>Thu thêm</div></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(hobby, index) of currentServiceHobbyFood"
                                        :key="index"
                                        @click="selectSeviceHobby(index)"
                                        @contextmenu="rightClickServiceHobby(index,$event)"
                                        >
                                            <td>
                                                <base-combobox
                                                :listItem="serviceHobbies"
                                                table="ServiceHobby"
                                                :addIcon="true"
                                                :hideBorder="true"
                                                :comboboxType="1"
                                                columnShow="ServiceHobbyName"
                                                :value="hobby.ServiceHobbyId"
                                                :focus="foodServiceHobbySelected === index"
                                                @change="changeServiceHobby"
                                                />
                                            </td>
                                            <td>
                                                <base-input
                                                :hideBorder="true"
                                                type="money"
                                                v-model="hobby.Fee"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="content-2-footer">
                                <base-button
                                content="Thêm dòng"
                                icon="icon-insert"
                                @click="clickAddRow"
                                />
                                <base-button
                                content="Xóa dòng"
                                icon="icon-x-close-red"
                                :disabled="currentServiceHobbyFood.length === 0"
                                @click="clickDeleteRow"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="popup--food-footer">
                        <div class="footer--left">
                            <base-button content="Giúp" icon="icon-question-circle"/>
                        </div>
                        <div class="footer--right" style="margin-right: 0">
                            <base-button content="Cất" icon="icon-save"
                            @click="saveFood(0)"
                            />
                            <base-button content="Cất và thêm" icon="icon-save-add"
                            @click="saveFood(1)"
                            />
                            <base-button content="Hủy bỏ" icon="icon-cancel"
                            @click="toggleFoodDetail"/>
                        </div>
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
    @no-confirm="toggleFoodDetail"
    @cancel="clickCloseDialog"
    />

    <div class="option--menu" v-if="isShowContextMenuHobby"
    :style="{position: 'fixed', top: `${menuTop}px`, left: `${menuLeft}px` }"
    v-click-outside="clickOutSideContext"
    >
        <div class="option--menu-item"
        @click="clickAddRowContext">
            <base-icon iconName="icon-insert"/>
            <div class="button--text">Thêm dòng</div>
        </div>
        <div class="option--menu-item"
        @click="clickDeleteRowContext">
            <base-icon iconName="icon-delete"/>
            <div class="button--text">Xóa dòng</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import enums from '@/enums/index'
import { compareObj } from "@/ultis/format"
import { constants } from "@/config"
import axios from "axios"
export default {
    data() {
        return {
            formTitle: "Thêm món", // tiêu đề form
            tabOption: 1, // tab hiển thị
            currentFood: {}, // dữ liệu của bản ghi trong form
            currentServiceHobbyFood: [], // list các sở thích phục vụ hiện tại
            emptyServiceHobby: {
                Fee: 0,
                FoodId: ""
            }, // sở thích phục vụ trống
            dialogMsg: "", // nội dụng dialog cảnh báo đóng
            isShowConfirmCloseDialog: false, // trạng thái hiển thị dialog cảnh báo đóng
            errorList: {
                FoodName: null,
                FoodCode: null,
                FoodUnitId: null,
                FoodPrice: null
            }, // danh sách lỗi hiển thị trên form
            focusField: "FoodName", // trường focus
            foodServiceHobbySelected: 0, // bản ghi sở thích phục vụ được chọn
            serverLink: "", //link server backend
            emptyImg: "", // link ảnh trống
            imageFile: "", // file ảnh
            menuTop: 0, // vị trí contextmenu trong bảng sở thích phục vụ
            menuLeft: 0, // vị trí contextmenu trong bảng sở thích phục vụ
            isShowContextMenuHobby: false // trangj thái hiển thị contextmenu trong bảng sở thích phục vụ
        }
    },
    computed: mapState({
        selectedFood: (state) => state.food.selectedFood,
        formMode: (state) => state.food.formMode,
        groups: (state) => state.foodGroup.groups,
        units: (state) => state.foodUnit.units,
        processedPlaces: (state) => state.processedPlace.processedPlaces,
        serviceHobbies: (state) => state.serviceHobby.serviceHobbies,
    }),
    watch: {
        selectedFood(newVal) {
            this.tabOption = 1
            this.currentFood = JSON.parse(JSON.stringify(newVal))
            this.currentServiceHobbyFood = [JSON.parse(JSON.stringify(this.emptyServiceHobby))]
        },
        formMode(newVal) {
            if(newVal == enums.formMode.Add) {
                this.formTitle = "Thêm món"
            }
            if(newVal == enums.formMode.Edit) {
                this.formTitle = "Sửa món"
            }
        }
    },
    /**
     * Xử lý các sự kiện khi khởi tạo
     * CreatedBy: PQKHANH(12/09/2022)
     */
    async created() {
        // Lấy các dữ liệu cần thiết
        await this.loadAllGroup()
        await this.loadAllUnit()
        await this.loadAllProcessedPlace()
        await this.loadAllHobby()
        // set món ăn hiện tại
        this.currentFood = JSON.parse(JSON.stringify(this.selectedFood))
        // Nếu form thêm thì set sở thích phục vụ
        if(this.formMode === enums.formMode.Add) {
            // Nếu nhân bản thì xét foodId = Guid.Empty
            if(this.currentFood.FoodId) {
                this.currentServiceHobbyFood = this.currentFood.ServiceHobbies
                this.currentFood.FoodId = "00000000-0000-0000-0000-000000000000"
            } 
            else {
                // Nếu là thêm mới
                this.currentServiceHobbyFood.push(JSON.parse(JSON.stringify(this.emptyServiceHobby)))
            }
        }
        // Nếu form sửa thì lấy từ currentFood
        if(this.formMode === enums.formMode.Edit) {
            this.currentServiceHobbyFood = this.currentFood.ServiceHobbies
        }
        // Lấy link server
        this.serverLink = constants.API_URL
        
    },
    methods: {
        ...mapActions([
            "toggleFoodDetail",
            "toggleDialog",
            "updateFood",
            "insertFood",
            "updateStorageMode",
            "changeContentDialog",
            "loadAllGroup",
            "loadAllUnit",
            "loadAllProcessedPlace",
            "loadAllHobby",
            "loadFoodPaging",
        ]),
        /**
         * Thực hiện đóng form chi tiết
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseFoodDetail() {
            // Nếu dữ liệu không đổi thì đóng form, nếu có thay đổi thì mở dialog cảnh báo
            if(compareObj(this.currentFood, this.selectedFood)) {
                this.toggleFoodDetail()
            } else {
                this.dialogMsg = "Dữ liệu đã thay đổi, bạn có muốn cất không?"
                this.isShowConfirmCloseDialog = true
            }
        },
        /**
         * Nhấn Hủy bỏ Thực hiện đóng dialog cảnh báo
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickCloseDialog() {
            this.isShowConfirmCloseDialog = false
        },
        /**
         * Nhấn có đóng form đồng thời thực hiện cất
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickConfirmDialog() {
            this.isShowConfirmCloseDialog = false
            this.saveFood(enums.storageMode.Save)
        },
        /**
         * Thay đổi taboption
         * CreatedBy: PQKHANH(15/09/2022)
         */
        changeTabOption(tabOption) {
            this.tabOption = tabOption
        },
        /**
         * set giá trị cho các input lấy từ combobox
         * CreatedBy: PQKHANH(15/09/2022)
         */
        setValueCombobox(table, val) {
            if(!val) {
                this.currentFood[`${table}Id`] = null
                this.currentFood[`${table}Name`] = null
            } else {
                this.currentFood[`${table}Id`] = val[`${table}Id`]
                this.currentFood[`${table}Name`] = val[`${table}Name`]
            }
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
        /**
         * check combobox requỉed
         * CreatedBy: PQKHANH(15/09/2022)
         */
        checkComboboxRequired(table, val) {
            if(!val) {
                this.errorList[`${table}Id`] = "Trường này không được để trống"
            } else {
                this.errorList[`${table}Id`] = null
            }
            this.setValueCombobox(table,val)
        },
        /**
         * Thực hiện lấy mã mới
         * CreatedBy: PQKHANH(15/09/2022)
         */
        async getNewCode(val) {
            console.log(val);
            if(val) {
                const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/Foods/NewCode?name=${val}`)
                if(res.data.Success) {
                    this.currentFood.FoodCode = res.data.Data
                    this.errorList.FoodCode = null
                } 
            }
        },
        /**
         * Thực hiện chọn sở thích phục vụ
         * CreatedBy: PQKHANH(15/09/2022)
         */
        selectSeviceHobby(index) {
            this.foodServiceHobbySelected = index
        },
        /**
         * Thực hiện thay đổi sở thích phục vụ theo hàng
         * CreatedBy: PQKHANH(15/09/2022)
         */
        changeServiceHobby(hobby) {
            this.currentServiceHobbyFood[this.foodServiceHobbySelected].ServiceHobbyId = hobby.ServiceHobbyId
            this.currentServiceHobbyFood[this.foodServiceHobbySelected].ServiceHobbyName = hobby.ServiceHobbyName
            this.currentServiceHobbyFood[this.foodServiceHobbySelected].Fee = hobby.Fee
        },
        /**
         * Thực hiện thêm dòng trong bảng
         * Tự động chọn vào dòng cuối cùng
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickAddRow() {
            this.currentServiceHobbyFood.push(JSON.parse(JSON.stringify(this.emptyServiceHobby)))
            this.foodServiceHobbySelected = this.currentServiceHobbyFood.length - 1
        },
        /**
         * Thực hiện xóa dòng
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickDeleteRow() {
            if(this.currentServiceHobbyFood.length > 0) {
                this.currentServiceHobbyFood.splice(this.foodServiceHobbySelected, 1)
                if(this.foodServiceHobbySelected >= this.currentServiceHobbyFood.length){
                    this.foodServiceHobbySelected = this.currentServiceHobbyFood.length - 1
                }
            }
            
        },
        /**
         * Thực hiện cất dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        async saveFood(storageMode) {
            // bỏ focus các trường
            this.focusField = ""
            // validate data
            let isValid = this.validateData()
            if(isValid) {
                // định dạng lại giá tiền
                if(this.currentFood.FoodPrice && typeof this.currentFood.FoodPrice == "string") {
                    this.currentFood.FoodPrice = this.currentFood.FoodPrice.replaceAll(".","")
                    this.currentFood.FoodPrice = parseInt(this.currentFood.FoodPrice)
                }
                if(this.currentFood.FoodInvest  && typeof this.currentFood.FoodInvest == "string") {
                    this.currentFood.FoodInvest = this.currentFood.FoodInvest.replaceAll(".","")
                    this.currentFood.FoodInvest = parseInt(this.currentFood.FoodInvest)
                }
                // Xóa hết những bản ghi sở thích trùng
                // Đưa dữ liệu vào trong currrentFood
                this.currentServiceHobbyFood = this.currentServiceHobbyFood.filter((hobby) => {
                    return hobby.ServiceHobbyId
                })
                this.currentServiceHobbyFood.forEach((hobby) => {
                    hobby.FoodId = this.currentFood.FoodId
                })
                this.foodServiceHobbySelected = this.currentServiceHobbyFood.length - 1
                this.currentFood.ServiceHobbies = this.currentServiceHobbyFood

                // Set link ảnh
                if(this.imageFile) {
                    await this.uploadImage()
                }
                // set chế độ lưu trữ
                this.updateStorageMode(storageMode)
                if(this.formMode == enums.formMode.Add) {
                    this.insertFood(this.currentFood)
                } else if(this.formMode == enums.formMode.Edit) {
                    this.updateFood(this.currentFood)
                }
            }
        }, 
        /**
         * Validate dữ liệu
         * CreatedBy: PQKHANH(15/09/2022)
         */
        validateData() {
            let valid = true
            // tên món ăn
            if(!this.currentFood.FoodName) {
                if(!this.focusField) {
                    this.focusField = "FoodName"
                }
                this.errorList.FoodName = "Trường này không được để trống"
                valid = false
            }
            // mã món ăn
            if(!this.currentFood.FoodCode) {
                if(!this.focusField) {
                    this.focusField = "FoodCode"
                }
                this.errorList.FoodCode = "Trường này không được để trống"
                valid = false
            }
            // đơn vị tính
            if(!this.currentFood.FoodUnitId) {
                if(!this.focusField) {
                    this.focusField = "FoodUnitId"
                }
                this.errorList.FoodUnitId = "Trường này không được để trống"
                valid = false
            }
            // Giá bán
            if(!this.currentFood.FoodPrice) {
                if(!this.focusField) {
                    this.focusField = "FoodPrice"
                }
                this.errorList.FoodPrice = "Trường này không được để trống"
                valid = false
            }
            // Kiểm tra trùng sở thích phục vụ
            let findDuplicates = (arr) =>
                arr.filter(
                (item, index) =>
                    arr.findIndex((x) => x.ServiceHobbyId === item.ServiceHobbyId) != index
                )
            if (findDuplicates(this.currentServiceHobbyFood).length > 0) {
                valid = false
                let duplicate = findDuplicates(this.currentServiceHobbyFood)
                this.changeContentDialog(`Sở thích phục vụ <${duplicate[0].ServiceHobbyName} - ${duplicate[0].Fee}> đã bị trùng. Vui lòng kiểm tra lại.`)
                this.toggleDialog()
            }
            
            return valid
        },
        /**
         * Thực hiện hiển thị ảnh preview
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickChangeImage($event) {
            let file = $event.target.files[0]
            // Kiểm tra dung lượng ảnh
            if(file.size > 5*1024*1024) {
                this.changeContentDialog("Ảnh không tải được do vượt quá dung lượng. Vui lòng chọn ảnh có dung lượng nhỏ hơn 5 MB.")
                this.toggleDialog()
            } else {
                this.emptyImg = this.$refs.imagePreview.src
                URL.revokeObjectURL(this.$refs.imagePreview.src)
                this.$refs.imagePreview.src = URL.createObjectURL(file)
                this.imageFile = file
            }

        },
        /**
         * Thực hiện bỏ ảnh đẫ chọn
         * CreatedBy: PQKHANH(15/09/2022)
         */
        clickRevokeImage() {
            URL.revokeObjectURL(this.$refs.imagePreview.src)
            this.$refs.imagePreview.src = this.emptyImg
            this.currentFood.ImageUrl = null
            this.imageFile = null
        },
        /**
         * Thực hiện gọi api uploaad ảnh 
         * CreatedBy: PQKHANH(15/09/2022)
         */
        async uploadImage() {
            let formData = new FormData()
            formData.append("image", this.imageFile)
            const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/Foods/UploadImage?code=${this.currentFood.FoodCode}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            if(res.data.Success) {
                this.currentFood.ImageUrl = res.data.Data
            } else {
                this.changeContentDialog("Không thể tải ảnh lên. Vui lòng thử lại")
                this.toggleDialog()
            }
        },
        /**
         * right click hiện context menu hobby
         * CreatedBy: PQKHANH(15/09/2022)
         */
        rightClickServiceHobby(index, event) {
            event.preventDefault()
            this.foodServiceHobbySelected = index
            this.menuTop = event.pageY
            this.menuLeft = event.pageX
            this.isShowContextMenuHobby = true
        },
        clickOutSideContext() {
            this.isShowContextMenuHobby = false
        },
        clickAddRowContext() {
            this.isShowContextMenuHobby = false
            this.clickAddRow()
        },
        clickDeleteRowContext() {
            this.isShowContextMenuHobby = false
            this.clickDeleteRow()
        }
    },
    mounted() {
        if(this.formMode == enums.formMode.Add) {
            this.formTitle = "Thêm món"
        }
        if(this.formMode == enums.formMode.Edit) {
            this.formTitle = "Sửa món"
        }
        
    },
}
</script>

<style scoped>
@import url(@/css/page/menufooddetail.css);
</style>