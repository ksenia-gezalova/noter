<template>
  <div v-click-outside="closeDropdown" class="lang-select">
    <div class="lang-select__container" @click="changeDropdownState">
      <img :src="selectedLangIcon" alt class="lang-select__icon" />
      <i class="fas fa-chevron-down"></i>
    </div>
    <transition>
      <div v-show="dropdownIsOpen" class="lang-select__dropdown">
        <div
          v-for="lang in anotherLangs"
          :key="lang.name"
          class="lang-select__item"
          @click="selectLang(lang)"
        >
          <img
            :src="lang.icon"
            alt
            class="lang-select__icon lang-select__icon--small"
          />
          <span class="lang-select__name">{{ lang.name }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { user } from "@/store/modules/store.namespaces";

export default {
  name: "LangSelect",
  data() {
    return {
      langs: [
        {
          icon: require("@/assets/ru.svg"),
          name: "ru",
        },
        {
          icon: require("@/assets/en.svg"),
          name: "en",
        },
      ],
      dropdownIsOpen: false,
    };
  },
  created() {
    this.initLang();
  },
  computed: {
    ...mapState(user, ["selectedLang"]),
    selectedLangIcon() {
      let selectedLangObject =
        this.langs.find((lang) => lang.name === this.selectedLang) ||
        this.langs[0];
      return selectedLangObject.icon;
    },
    anotherLangs() {
      return this.langs.filter((lang) => lang.name !== this.selectedLang);
    },
  },
  methods: {
    ...mapActions(user, ["changeLanguage"]),
    changeDropdownState() {
      this.dropdownIsOpen = !this.dropdownIsOpen;
    },
    closeDropdown() {
      this.dropdownIsOpen = false;
    },
    selectLang(lang) {
      this.changeLanguage({ lang: lang.name, i18n: this.$i18n });
      this.changeDropdownState();
    },
    initLang() {
      this.changeLanguage({ lang: this.selectedLang, i18n: this.$i18n });
    },
  },
};
</script>

<style lang="scss" scoped>
.lang-select {
  position: relative;
  padding-right: 8px;

  &__container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    object-fit: contain;

    &--small {
      width: 15px;
      height: 15px;
      margin-right: 0;
    }
  }

  &__name {
    padding-left: 6px;
    font-size: 9px;
    line-height: 11px;
    color: #000;
  }

  &__dropdown {
    position: absolute;
    top: 28px;
    left: -17px;
    z-index: 3;
    width: 53px;
    padding-top: 7px;
    user-select: none;
    background-color: #fff;
    border-radius: 11px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);

    &::before {
      position: absolute;
      top: -18px;
      left: 17px;
      content: "";
      border: 10px solid transparent;
      border-bottom-color: #fff;
    }
  }
}
</style>
