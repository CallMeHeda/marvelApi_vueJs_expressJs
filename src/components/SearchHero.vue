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

export default {
    data() {
        return {
            searchHero: "",
        };
    },
    methods: {},
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