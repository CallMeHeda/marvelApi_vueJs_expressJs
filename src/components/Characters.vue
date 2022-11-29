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
        <img class="charactersImg" :src="hero.thumbnail.path + '.' + hero.thumbnail.extension">
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
const APIPUBLICKEY = 'b6bf4c6d62c46794eb7688c596a126e8';
const MY_PRIVATE_API_KEY = '306001b9841d72c15ace775058127bdf91d38a38'
// 1 + PRIVATE KEY + PUBLIC KEY
const HASH = Md5.hashStr(`1${MY_PRIVATE_API_KEY}${APIPUBLICKEY}`);

// let cpt: number = 0
// let datas: any[]

export default {

  data() {
    return {
      heros: [{
        name: String,
        thumbnail: {
          path: String,
          extension: String
        },
      }],
      img: String
    }
  },
  methods: {
    mounted() {
      let promise = [];
      // 1559 données
      for (let i = 0; i < 1600; i += 100) {
        promise.push(
          fetch(
            `${APIURL}characters?&ts=1&apikey=${APIPUBLICKEY}&hash=${HASH}&limit=100&offset=${i}`
          ).then((response) => {
            if (response.ok) {
              // console.log(response.json())
              return response.json();
            } else {
              throw new Error("La requête n'a pas abouti");
            }
          })
            .then(data => {
              let randomIMG = Math.round(Math.random() * 100);
              let randomIMGLastLine = Math.round(Math.random() * 58);
              this.heros = data.data.results
              for (let j = 0; j < data.data.results.length - 1; j++) {
                // console.log(this.heros[j].name)
              }
            })
        );
      }
    }
  },
  created: function () {
    this.mounted();
  }
}

  //   // props: {},
  //   methods: {
  //     compteur() {
  //       let counterBox = document.getElementById("counter")
  //       // let container: any = document.getElementById("container")
  //       // let percent: any = document.getElementById("pourcentage")
  //       // let hr: any = document.getElementById("hr")

  //       // console.log('container ' , container, ' counter', counterBox)

  //       // if (counterBox) {
  //       // const interval = setInterval(function () {
  //       //   if (container === null && percent === null && hr === null) {
  //       // container.style.display = "none";
  //       // percent.textContent = `${cpt}%`;
  //       // hr.style.width = cpt ;
  //       // console.log('yes')+
  //       // }

  //       // cpt++;

  //       // console.log(cpt)

  //       // if (cpt > 100 && container && counterBox) {
  //       //   clearInterval(interval);
  //       //   container.style.display = "flex";
  //       //   counterBox.style.display = "none";
  //       //   console.log('hey 2')
  //       // }
  //       // }, 55);

  //       // TABLEAU D'URL
  //       let promise = [];
  //       // 1559 données
  //       for (let i = 0; i < 1600; i += 100) {
  //         promise.push(
  //           fetch(
  //             `${APIURL}characters?&ts=1&apikey=${APIPUBLICKEY}&hash=${HASH}&limit=100&offset=${i}`
  //           ).then((response) => {
  //             if (response.ok) {
  //               // console.log(response.json())
  //               return response.json();
  //             } else {
  //               console.log("La requête n'a pas abouti")
  //               // throw new Error("La requête n'a pas abouti");
  //             }
  //           })
  //         );
  //       }
  //       Promise.all(promise)
  //         .then(function (data) {
  //           let randomIMG = Math.round(Math.random() * 100);
  //           let randomIMGLastLine = Math.round(Math.random() * 58);

  //           for (let j = 0; j < data.length - 1; j++) {
  //             datas = data[j].data.results
  //             console.log(datas)
  //           }
  //         })

  //       // }
  //     }
  //   },
  //   created: function () {
  //     this.compteur();
  //   }
// };

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column wrap;
}

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
</style>