<template>
  <div class="container" id="container" ref="container">
    <!-- AJOUTER SWITCH THEME ICI -->

    <div class="titleBox">
      <h1 id="title"><span>Marvel</span> characters<span>.</span></h1>
    </div>

    <div id="herosNameInputBox">
      <input type="text" id="herosName" placeholder="Hero's Name" />
      <!-- <input type="button" value="Give Me My Hero" id="btnSearch" onclick="searchHero();" required> -->
    </div>

    <div id="charactersImgBox">
      <div id="imgCharacterDiv" v-for="hero in heros" :key="hero.id">
        <div class="charactersImg" v-if="hero.thumbnail.path && hero.thumbnail.path.includes('4c002e0305708')">
          <img src="../assets/images/notFound.jpg" />
          <div id="infosCharactereBox" v-if="hero.url_name">
            <RouterLink :to="{ name: 'details', params: { hero_name: hero.url_name } }">
              <a class="hrefDescription">
                <p id="charactereName">{{ hero.name }}</p>
              </a>
            </RouterLink>
          </div>
        </div>
        <div class="charactersImg" v-if="
          hero.thumbnail.path &&
          !hero.thumbnail.path.includes('4c002e0305708')
        ">
          <img :src="hero.thumbnail.path + sizeImg + hero.thumbnail.extension" />
          <div id="infosCharactereBox" v-if="hero.url_name">
            <RouterLink :to="{ name: 'details', params: { hero_name: hero.url_name } }">
              <a class="hrefDescription">
                <p id="charactereName">{{ hero.name }}</p>
                <!-- <p id="charactereName" @click="$emit('getHeroName', hero.name)">{{ hero.name }}</p> -->
              </a>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="counter" ref="counter">
    <p>loading</p>
    <h1 id="pourcentage" ref="pourcentage"></h1>
    <hr id="hr" ref="hr" />
  </div>
</template>

<script lang="ts">
import { config } from "../../config";
import { Md5 } from "ts-md5";
import { onMounted } from "vue";

const APIURL = config.MY_API_URL;
const APIPUBLICKEY = config.MY_PUBLIC_API_KEY;
const MY_PRIVATE_API_KEY = config.MY_PRIVATE_API_KEY;
const HASH = Md5.hashStr(`1${MY_PRIVATE_API_KEY}${APIPUBLICKEY}`);

export default {
  data() {
    return {
      heros: [
        {
          id: Number,
          name: "",
          thumbnail: {
            path: "",
            extension: "",
          },
          url_name: "",
        },
      ],
      sizeImg: "/standard_xlarge.",
      link: "details/",
      heroName: "",
    };
  },
  methods: {
    mounted() {
      let promise = [];

      onMounted(() => {
        if (this.$refs.counter) {
          const CONTAINER: any = this.$refs.container;
          const COUNTER: any = this.$refs.counter;
          const POURCENTAGE: any = this.$refs.pourcentage;
          const HR: any = this.$refs.hr;

          // console.log("type ", this.$refs.container)

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

      for (let i = 0; i < 1600; i += 100) {
        promise.push(
          fetch(
            `${APIURL}characters?&ts=1&apikey=${APIPUBLICKEY}&hash=${HASH}&limit=100&offset=${i}`
          ).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("La requête n'a pas abouti");
            }
          })
        );
      }

      Promise.all(promise).then((data) => {
        let randomIMG = Math.round(Math.random() * 100);
        let randomIMGLastLine = Math.round(Math.random() * 58);

        this.heros = data;

        for (let i = 0; i < this.heros.length - 1; i++) {
          this.heros[i] = data[i].data.results[randomIMG];
          this.heros[i].url_name = this.heros[i].name.split(" ").join("_");
        }
        this.heros[15] = data[15].data.results[randomIMGLastLine];
        this.heros[15].url_name = this.heros[15].name.split(" ").join("_");
      });
    }
  },
  created: function () {
    this.mounted();
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column wrap;
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
}

// IMAGE PERSONNAGES
#charactersImgBox {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 25px;

  #imgCharacterDiv {
    display: flex;
    position: relative;
    border-radius: 100%;

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

  #heroEmpty {
    font-size: 50px;
    color: rgb(24, 23, 23);
    margin-top: 2%;
    letter-spacing: 1px;
  }
}
</style>
