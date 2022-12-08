<template>
    <div id="herosNameInputBox">
        <input type="text" id="herosName" placeholder="Hero's Name" v-model="searchHero">
        <input type="button" value="Give Me My Hero" id="btnSearch" @click="$emit('search', searchHero)" required>
    </div>
</template>

<script lang="ts">
import { config } from "../../config";
import { Md5 } from "ts-md5";

const APIURL = config.MY_API_URL;
const APIPUBLICKEY = config.MY_PUBLIC_API_KEY;
const MY_PRIVATE_API_KEY = config.MY_PRIVATE_API_KEY;
const HASH = Md5.hashStr(`1${MY_PRIVATE_API_KEY}${APIPUBLICKEY}`)
// const emit = defineEmits(['search']);

export default {
    data() {
        return {
            // heros: [
            //     {
            //         id: Number,
            //         name: "",
            //         thumbnail: {
            //             path: "",
            //             extension: "",
            //         },
            //         url_name: "",
            //     },
            // ],
            // sizeImg: "/standard_xlarge.",
            // link: "details/",
            // heroName: "",
            // footerStyle: {
            //     color: "#eee3e3",
            // },
            searchHero: "",
            // noSearch: true

        };
    },
    methods: {
        search() {
            // let promise = []
            
            // // emit('search', this.searchHero);
            // for (let i = 0; i < 1600; i += 100) {
            //     promise.push(
            //         fetch(
            //             `${APIURL}characters?nameStartsWith=${this.searchHero}&ts=1&apikey=${APIPUBLICKEY}&hash=${HASH}&limit=100&offset=${i}`
            //         ).then((response) => {
            //             if (response.ok) {
            //                 return response.json();
            //             } else {
            //                 throw new Error("La requête n'a pas abouti");
            //             }
            //         })
            //     );
            // }

            // Promise.all(promise).then((data) => {
                // let randomIMG = Math.round(Math.random() * 100);
                // let randomIMGLastLine = Math.round(Math.random() * 58);

                // this.heros = data;
                // console.log("data : ", this.heros)

                // for (let i = 0; i < 1600; i++) {
                    
                    // this.heros[i] = data[i].data.results[i];
                    // this.heros[i].url_name = this.heros[i].name.split(" ").join("_");
                // }
                // console.log("data : ", this.heros)
                // this.heros[15] = data[15].data.results[randomIMGLastLine];
                // this.heros[15].url_name = this.heros[15].name.split(" ").join("_");
            // });
        }
    },
    emits: ['search']
}
</script>

<style lang="scss">
// INPUT DE RECHERCHE
#herosNameInputBox {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 25px;

    #herosName {
        width: 20%;
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 0;
        border: 1px solid rgb(24, 23, 23);

        &:focus {
            outline: none;
        }
    }

    #btnSearch {
        border: none;
        background-color: #dd2852;
        padding: 15px;
        color: #eee3e3;
        text-transform: uppercase;
        font-weight: bold;

        &:hover {
            opacity: 0.8;
        }

        &:active {
            box-shadow: 0 2px #666;
            transform: translateY(1px);
        }
    }
}
</style>