<template>
    <div>OverView</div>
    <base-combobox 
    :listItem="data"
    :addIcon="true"
    table="FoodUnit"
    />
    <div style="position: relative; width: 100%; height: 300px">
      <base-loading/>
    </div>
    <base-input type="money"/>

</template>

<script>
export default {
    data() {
        return {
            data: [
        {
            FoodUnitId: 1,
            FoodUnitName: "bát",
        },
        {
            FoodUnitId: 2,
            FoodUnitName: "Kg",
        },
        {
            FoodUnitId: 3,
            FoodUnitName: "chiếc",
        },
      ],
      isShowConfirmDialog:true
        }
    },
}
</script>