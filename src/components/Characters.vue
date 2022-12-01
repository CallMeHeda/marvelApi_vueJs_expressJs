<template>
  <div class="container" id="container">
    <!-- AJOUTER SWITCH THEME ICI -->

    <div class="titleBox">
      <h1 id="title"><span>Marvel</span> characters<span>.</span></h1>
    </div>

    <div id="herosNameInputBox">
      <input type="text" id="herosName" placeholder="Hero's Name">
      <!-- <input type="button" value="Give Me My Hero" id="btnSearch" onclick="searchHero();" required> -->
    </div>

    <div id="charactersImgBox">
      <div id="imgCharacterDiv" v-for="hero in heros">
        <div v-if="hero.thumbnail">
          <img class="charactersImg" :src="hero.thumbnail.path + sizeImg + hero.thumbnail.extension">
          <div id="infosCharactereBox">
            <a href="" class="hrefDescription"><p id="charactereName">{{ hero.name }}</p></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="counter">
    <p>loading</p>
    <h1 id="pourcentage"></h1>
    <hr id="hr">
  </div> -->
</template>

<script lang="ts">
import { Md5 } from 'ts-md5';

const APIURL = "http://gateway.marvel.com/v1/public/";
const APIPUBLICKEY = 'd4509d8741ad3378f24fb6b93f84b6aa';
const MY_PRIVATE_API_KEY = '76ade49434b3426ff16e9e83fe5c952f4825f6d6'
const HASH = Md5.hashStr(`1${MY_PRIVATE_API_KEY}${APIPUBLICKEY}`);

export default {
  data() {
    return {
      heros: [{
        name: "",
        thumbnail: {
          path: "",
          extension: ""
        },
      }],
      sizeImg: "/standard_xlarge."
    }
  },
  methods: {
    mounted() {
      let promise = [];
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

        this.heros = data

        for (let i = 0; i < this.heros.length - 1; i++) {
          this.heros[i] = data[i].data.results[randomIMG]
        }
        this.heros[15] = data[15].data.results[randomIMGLastLine]
        console.log(this.heros)
      })
    }
  },
  created: function () {
    this.mounted();
  }
}
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
    }

    #infosCharactereBox {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
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