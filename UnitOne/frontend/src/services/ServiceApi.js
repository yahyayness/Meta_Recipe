import axios from "axios";

// "proxy": "http://127.0.0.1:8000/",

const BASE_URL = "http://127.0.0.1:8000/"

                
export default {




    async retrieveMenu() {
        return new Promise((reslove) => {
            axios.get(BASE_URL + 'api/recipesnames/').then(res => {
                reslove(res.data);
            });
        });
    },


    async retrieveRecipe(id) {
        return new Promise((reslove) => {
            axios.get(BASE_URL + 'metarecipe/' + id + '/').then(res => {
                reslove(res.data);
            });
        });
    },



}