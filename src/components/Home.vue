<template>
  <div class="containerHome">
    <button id="homeBtn">
      <RouterLink :to="link.url">{{ link.name }}</RouterLink>
    </button>
    <Footer />
  </div>
</template>

<script lang="ts">
import Footer from "../components/Footer.vue"

export default {
  data() {
    return {
      link: { url: "/characters", name: "Meet them all" },
    };
  },
  components: {
    Footer
  }
};
</script>

<style scoped lang="scss">
.containerHome {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/images/marvel-characters.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
  overflow: hidden;

  #homeBtn {
    width: 400px;
    height: 86px;
    font-size: 36px;
    font-weight: bold;
    background-color: #dd2852;
    border: none;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-radius: 50px;
    box-shadow: 0px 5px 50px 0px #353333;
    margin-top: auto;

    &:hover {
      background-color: #c5284d;
    }

    &:active {
      transform: translateY(1px);
    }

    a {
      color: #eee3e3;
      text-decoration: none;
    }
  }
}
</style>
