<template>
    <div class="container">
        <div id="prevPageAndSwitch">
            <div id="prevPage">
                <RouterLink :to="{ name: 'characters' }">
                    <a><font-awesome-icon icon="fa-solid fa-circle-left" size="2x" /></a>
                </RouterLink>
            </div>
        </div>

        <div class="titleBox">
            <h1 class="title">{{ hero[0].name }}</h1>
            <p id="lastModificationDate">Last modification : {{ hero[0].modified }}</p>
        </div>

        <div id="dataDescriptionBox">
            <div id="imgAndDescription">
                <div id="imgDescriptionBox" v-if="hero[0].thumbnail.path">
                    <a :href="hero[0].urls[0].url">
                        <img :src="(hero[0].thumbnail.path + sizeImg + hero[0].thumbnail.extension)"
                            :alt="hero[0].name + ' image'" id="imgDescription" />
                    </a>
                </div>

                <div id="descriptionBox" v-if="hero[0].description">
                    <p id="description">{{ hero[0].description }}</p>
                </div>

                <div id="descriptionBox" v-if="!hero[0].description">
                    <p id="description">{{ split }} is a hero with some power. Sorry I
                        can't tell you more. Google it!</p>
                </div>
            </div>

            <div id="listBox">
                <div id="comicsBox">
                    <h3>Comics : ({{ hero[0].comics.available }} available)</h3>
                    <ul id="comicsList" v-if="(hero[0].comics.items.length > 0)">
                        <li v-for="comic in hero[0].comics.items">{{ comic.name }}</li>
                    </ul>
                    <ul id="comicsList" v-if="(hero[0].comics.items.length == 0)">
                        <li>0 Comic Book</li>
                    </ul>
                </div>

                <div id="serieBox">
                    <h3>Series : ({{ hero[0].series.available }} available)</h3>
                    <ul id="serieList" v-if="(hero[0].series.items.length > 0)">
                        <li v-for="serie in hero[0].series.items">{{ serie.name }}</li>
                    </ul>
                    <ul id="serieList" v-if="(hero[0].series.items.length == 0)">
                        <li>0 Serie</li>
                    </ul>
                </div>

                <div id="storiesBox">
                    <h3>Stories : ({{ hero[0].stories.available }} available)</h3>
                    <ul id="storiesList" v-if="(hero[0].stories.items.length > 0)">
                        <li v-for="story in hero[0].stories.items">{{ story.name }}
                            <span>{{ story.type }}</span>
                        </li>
                    </ul>
                    <ul id="storiesList" v-if="(hero[0].stories.items.length == 0)">
                        <li>0 Story</li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer :style="footerStyle" />
    </div>
</template>

<script lang="ts">
import { config } from "../../config";
import { Md5 } from "ts-md5";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'

import Footer from "./Footer.vue"

const APIURL = config.MY_API_URL;
const APIPUBLICKEY = config.MY_PUBLIC_API_KEY;
const MY_PRIVATE_API_KEY = config.MY_PRIVATE_API_KEY;
const HASH = Md5.hashStr(`1${MY_PRIVATE_API_KEY}${APIPUBLICKEY}`);

// const OPTIONS = {
//     weekday: "long",
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
// }

export default {
    created: function () {
        this.mounted();
    },
    data() {
        return {
            heroName: "",
            hero: [{
                id: Number,
                name: "",
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
            }],
            sizeImg: "/portrait_uncanny.",
            footerStyle: {
                color: "#eee3e3",
                position: "relative"
            }
        };
    },
    components: {
        'font-awesome-icon': FontAwesomeIcon,
        Footer
    },
    computed: {
        split(): string {
            return this.hero[0].name.split(/[(].+/).join("")
        }
    },
    methods: {
        mounted() {
            let name = this.$route.params.hero_name

            for (let i = 0; i < name.length; i++) {
                this.heroName += name[i].replaceAll('_', ' ');
            }

            fetch(
                `${APIURL}characters?name=${this.heroName}&ts=1&apikey=${APIPUBLICKEY}&hash=${HASH}`
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("La requête n'a pas abouti");
                }
            }).then((data) => {
                this.hero[0] = data.data.results[0]

                // LAST MODIFICATION
                this.hero[0].modified = new Date(this.hero[0].modified).toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).replace(/, /g, " ");
            })

            library.add(faCircleLeft)
        },
    }
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-flow: column wrap;

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

    // TITLE + DATE MODIFICATION
    .titleBox {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        padding: 5px;

        .title {
            font-size: 40px;
            letter-spacing: 5px;
            color: #dd2852;
        }

        #lastModificationDate {
            font-size: 11px;
            margin: 20px 0 0 5px;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
    }

    // IMAGE + STORIES + COMICS + SERIES
    #dataDescriptionBox {
        display: flex;
        flex-flow: column wrap;

        #imgAndDescription {
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            margin: 100px 0;
            padding: 35px 0;

            // border: 1px solid red;
            #imgDescriptionBox {
                display: flex;
                justify-content: center;
                margin-right: 50px;

                // flex-grow: 1;
                img {
                    box-shadow: 0 10px 55px 5px rgba(5, 5, 5, 0.445);
                    border-radius: 20px;
                }
            }

            #descriptionBox {
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgb(24, 23, 23);
                margin: 0 50px;

                // flex-grow: 1;
                // margin: 20px 50px 0 50px;
                p {
                    text-align: center;
                    letter-spacing: 1px;
                    font-size: 20px;
                }
            }
        }

        #listBox {
            display: flex;
            flex-flow: row nowrap;
            // justify-content: space-around;
            padding-bottom: 50px;
            margin: 0 50px;

            #comicsBox,
            #serieBox,
            #storiesBox {
                display: flex;
                flex-flow: column wrap;
                flex-grow: 1;
                align-content: center;
                margin: 5px 20px 0 20px;

                h3 {
                    font-size: 20px;
                    color: #dd2852;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }

                ul {
                    list-style-type: none;
                    color: rgb(24, 23, 23);
                    letter-spacing: 1px;
                    font-size: 17px;
                    padding: 0;
                    margin-top: 5px;

                    span {
                        font-size: 12px;
                        color: #dd2852;
                    }
                    
                }
            }
        }
    }
}
</style>
