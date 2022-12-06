<template>
    <div class="container">
        <div id="prevPageAndSwitch">
            <div id="prevPage">
                <a href=""><font-awesome-icon icon="fa-solid fa-circle-left" size="2x"/></a>
            </div>
        </div>

        <div class="titleBox">
            <h1 id="title" class="title">{{ heroName }}</h1>
            <p id="lastModificationDate"></p>
        </div>

        <div id="dataDescriptionBox">
            <div id="imgAndDescription">
                <div id="imgDescriptionBox"><img alt="Hero" id="imgDescription" /></div>

                <div id="descriptionBox">
                    <p id="description"></p>
                </div>
            </div>

            <div id="listBox">
                <div id="comicsBox">
                    <h3>Comics :</h3>
                    <ul id="comicsList"></ul>
                </div>

                <div id="serieBox">
                    <h3>Series :</h3>
                    <ul id="serieList"></ul>
                </div>

                <div id="storiesBox">
                    <h3>Stories :</h3>
                    <ul id="storiesList"></ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { config } from "../../config";
import { Md5 } from "ts-md5";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'

const APIURL = config.MY_API_URL;
const APIPUBLICKEY = config.MY_PUBLIC_API_KEY;
const MY_PRIVATE_API_KEY = config.MY_PRIVATE_API_KEY;
const HASH = Md5.hashStr(`1${MY_PRIVATE_API_KEY}${APIPUBLICKEY}`);

export default {
    data() {
        return {
            heroName: "",
            heros: {
                results: [{
                    id: Number,
                    description: "",
                    modified: "",
                    thumbnail: {
                        path: "",
                        extension: ""
                    },
                    comics: {
                        available: Number,
                        items: [{
                            name: ""
                        }]
                    },
                    series: {
                        available: Number,
                        items: [{
                            name: ""
                        }]
                    },
                    stories: {
                        available: Number,
                        items: [{
                            name: "",
                            type: ""
                        }]
                    },
                    urls: [{
                        url: ""
                    }]
                }]
            },
            sizeImg: "/portrait_uncanny."
        };
    },
    components: {
        'font-awesome-icon': FontAwesomeIcon

    },
    methods: {
        mounted() {
            let name = this.$route.params.hero_name
            for (let i = 0; i < name.length; i++) {
                this.heroName += name[i].replaceAll('_', ' ');
            }

            const data = fetch(
                `${APIURL}characters?name=${this.heroName}&ts=1&apikey=${APIPUBLICKEY}&hash=${HASH}`
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("La requête n'a pas abouti");
                }
            }).then((data) => {
                this.heros = data
                console.log(this.heros)
            })

            library.add( faCircleLeft )
        },
    },
    created: function () {
        this.mounted();
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-flow: column wrap;
}

// PREV BUTTON
#prevPageAndSwitch {
    display: flex;
    justify-content: space-between;
    #prevPage {
        margin: 25px 0 15px 25px;
        svg {
            color: #dd2852;
            &:hover {
                opacity: 0.8;
            }
        }
        a {
            text-decoration: none;
        }
    }
}
</style>
