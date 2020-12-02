<template>
  <div class="loader">
    <div class="loader__container">
      <div class="loader__yellow"></div>
      <div class="loader__red"></div>
      <div class="loader__blue"></div>
      <div class="loader__violet"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.loader {
  &__container {
    padding-top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div > div {
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    margin: 2vw;
    background-image: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    animation: bounce 1.5s 0.5s linear infinite;
  }
  &__yellow {
    background-color: #feb60a;
  }

  &__red {
    background-color: #ff0062;
    animation-delay: 0.1s;
  }

  &__blue {
    background-color: #00dbf9;
    animation-delay: 0.2s;
  }

  &__violet {
    background-color: #da00f7;
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0%,
    50%,
    100% {
      transform: scale(1);
      filter: blur(0px);
    }
    25% {
      transform: scale(0.6);
      filter: blur(3px);
    }
    75% {
      filter: blur(3px);
      transform: scale(1.4);
    }
  }
}
</style>
