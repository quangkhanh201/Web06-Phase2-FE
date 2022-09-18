import { createStore } from "vuex";
import app from "@/store/modules/app";
import food from "@/store/modules/food";
import foodGroup from "@/store/modules/foodGroup";
import foodUnit from "@/store/modules/foodUnit";
import processedPlace from "@/store/modules/processedPlace";
import serviceHobby from "@/store/modules/serviceHobby";


export default createStore({
    modules: {
        app,
        food,
        foodGroup,
        foodUnit,
        processedPlace,
        serviceHobby
    }
})