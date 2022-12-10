<template>
    <div id="herosNameInputBox">
        <input type="text" id="herosName" placeholder="Hero's Name" v-model="searchHero" @keyup="$emit('search', searchHero)">
        <input type="button" value="Reset Random Heros (Takes ±5sec)" id="btnSearch" @click="$emit('reset')" >
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            searchHero: "",
        };
    },
    methods: {},
    emits: ['search', 'reset']
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