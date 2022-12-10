<template>
  <div class="container" id="container" ref="container">
    <!-- AJOUTER SWITCH THEME ICI -->

    <div class="titleBox">
      <h1 id="title"><span>Marvel</span> characters<span>.</span></h1>
    </div>

    <SearchHero @search="search" @reset="characters" />

    <div id="charactersImgBox" v-if="(heros.length > 0)">
      <div id="imgCharacterDiv1" v-for="hero in heros">
        <div id="imgCharacterDiv2" v-for="her in hero">
          <div class="charactersImg" v-if="her.thumbnail.path && her.thumbnail.path.includes('4c002e0305708')">
            <img src="../assets/images/notFound.jpg" />
            <div id="infosCharactereBox" v-if="her.url_name">
              <RouterLink :to="{ name: 'details', params: { hero_name: her.url_name } }">
                <a class="hrefDescription">
                  <p id="charactereName">{{ her.name }}</p>
                </a>
              </RouterLink>
            </div>
          </div>
          <div class="charactersImg" v-if="her.thumbnail.path && !her.thumbnail.path.includes('4c002e0305708')">
            <img :src="her.thumbnail.path + sizeImg + her.thumbnail.extension" />
            <div id="infosCharactereBox" v-if="her.url_name">
              <RouterLink :to="{ name: 'details', params: { hero_name: her.url_name } }">
                <a class="hrefDescription">
                  <p id="charactereName">{{ her.name }}</p>
                  <!-- <p id="charactereName" @click="$emit('getHeroName', her.name)">{{ her.name }}</p> -->
                </a>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="heroEmpty" v-if="(heros.length == 0)">NOPE</div>
    <Footer :style="footerStyle" />
  </div>

  <div id="counter" ref="counter">
    <p>loading</p>
    <h1 id="pourcentage" ref="pourcentage"></h1>
    <hr id="hr" ref="hr" />
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import SearchHero from "./SearchHero.vue"
import Footer from "./Footer.vue"

const APIURL = "http://localhost:3000/";

export default {
  data() {
    return {
      heros: [[
        {
          id: Number,
          name: "",
          thumbnail: {
            path: "",
            extension: "",
          },
          url_name: "",
        },
      ]],
      sizeImg: "/standard_xlarge.",
      link: "details/",
      heroName: "",
      footerStyle: {
        color: "#eee3e3",
      },
    };
  },
  methods: {
    mounted() {
      onMounted(() => {
        if (this.$refs.counter) {
          const CONTAINER: any = this.$refs.container;
          const COUNTER: any = this.$refs.counter;
          const POURCENTAGE: any = this.$refs.pourcentage;
          const HR: any = this.$refs.hr;

          let cpt = 0;
          const interval = setInterval(function () {
            CONTAINER.style.display = "none";
            POURCENTAGE.textContent = cpt;
            HR.style.width = cpt + "%";

            cpt++;

            if (cpt > 100) {
              clearInterval(interval);
              CONTAINER.style.display = "flex";
              COUNTER.style.display = "none";
            }
          }, 100);
        }
      });
    },
    async characters() {
      let promise = [];
      promise.push(
        await fetch(
          `${APIURL}characters`).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("La requête n'a pas abouti");
            }
          })
      );

      Promise.all(promise).then((data) => {

        let randomIMG = Math.round(Math.random() * 100);
        let randomIMGLastLine = Math.round(Math.random() * 58);

        this.heros = data;

        for (let i = 0; i < this.heros[0].length - 1; i++) {
          this.heros[0][i] = data[0][i].data.results[randomIMG];
          this.heros[0][i].url_name = this.heros[0][i].name.split(" ").join("_");
        }
        this.heros[0][15] = data[0][15].data.results[randomIMGLastLine];
        this.heros[0][15].url_name = this.heros[0][15].name.split(" ").join("_");
      })
    },
    async search(hero: string) {
      let promise = []
      if (hero != '') {
        promise.push(
          await fetch(
            `${APIURL}characters/${hero}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
            }
          }
          ).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("La requête n'a pas abouti");
            }
          })
        );

        Promise.all(promise).then((data) => {
          
          this.heros = data;
          console.log("HEROS SEARCH : ", this.heros.length)
          // for (let i = 0; i < this.heros[0].length; i++) {
          //   this.heros[0][i] = data[0].data.results;
          //   this.heros[0][i].url_name = this.heros[0][i].name.split(" ").join("_");

          //   console.log("ghtht " , this.heros[0][i])
          // }
          // return this.heros.filter(her => her.name.toLowerCase().includes(hero.toLowerCase()))
        });
      } else {
        this.characters()
      }
      // this.$route.query.q = hero
      // console.log(this.$route.query.q)
    }

    
  },
  created: function () {
    this.mounted()
    this.characters()
  },
  computed: {

  },
  components: {
    Footer,
    SearchHero
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column wrap;

  .titleBox {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding: 5px;

    #title {
      font-size: 40px;
      letter-spacing: 5px;

      span {
        color: #dd2852;
      }
    }
  }

  // IMAGE PERSONNAGES
  #charactersImgBox {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 25px;

    #imgCharacterDiv1 {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      position: relative;
      border-radius: 100%;
      margin: 15px;

      #imgCharacterDiv2 {
        display: flex;
        position: relative;
        margin: 15px;

        .charactersImg {
          border: 10px double rgb(24, 23, 23);
          display: flex;
          width: 100%;
          height: auto;
          border-radius: 100%;

          img {
            border-radius: 100%;
          }
        }

        #infosCharactereBox {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border-radius: 100%;
          overflow: hidden;
          opacity: 0;
          transition: all 0.5s ease-in-out;
          transform: scale(0);
          backface-visibility: hidden;

          a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-decoration: none;

            #charactereName {
              color: rgb(24, 23, 23);
              font-size: 22px;
              font-weight: 900;
              text-transform: uppercase;
              text-align: center;
            }
          }
        }

        &:hover #infosCharactereBox {
          box-shadow: inset 0 0 0 110px rgba(228, 223, 220, 0.575),
            inset 0 0 0 16px rgba(255, 255, 255, 0.473),
            0 1px 2px rgba(0, 0, 0, 0.164);
          opacity: 1;
          transform: scale(1);
        }

        &:hover .charactersImg {
          border: 10px double transparent;
        }
      }


    }

  }

  #heroEmpty {
    align-self: center;
    font-size: 50px;
    color: #dd2852;
    margin-top: 2%;
    letter-spacing: 1px;
  }
}

// COMPTEUR
#counter {
  display: flex;
  flex-direction: column;
  width: 10%;
  margin: auto;
  margin-top: 20%;

  p {
    font-size: 30px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: #dd2852;
    letter-spacing: 1px;
  }

  h1 {
    text-align: center;
    font-size: 60px;
  }

  hr {
    color: #dd2852;
  }
}
</style>
