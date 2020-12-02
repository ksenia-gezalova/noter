<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li
        v-for="tab in tabsList"
        :key="tab.id"
        class="tabs__item"
        :class="{ 'tabs__item--active': tab.id === activeTab.id }"
        @click="setActive(tab)"
      >
        {{ tab.name || $t(tab.dictionaryName) }}
      </li>
    </ul>

    <div>
      <slot :name="currentTab.slotName"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTabs",
  props: {
    tabsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: this.tabsList.find((tab) => tab.default) || this.tabsList[0],
    };
  },
  computed: {
    currentTab() {
      return this.activeTab;
    },
  },
  methods: {
    setActive(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  &__list {
    max-width: 40rem;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    align-items: center;
    justify-content: center;
    padding-left: 0;
    padding-bottom: 15px;
    margin-bottom: 30px;
    font-weight: 600;
    color: #000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__item {
    width: 109px;
    color: #81c784;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    &:not(:first-child) {
      margin-left: 16px;
    }

    &:hover {
      color: #1b5e20;
    }

    &:last-child {
      margin-right: 0;
    }

    &--active {
      position: relative;
      color: #43a047;

      &::after {
        position: absolute;
        bottom: -16px;
        display: block;
        width: 100%;
        height: 2px;
        content: "";
        background-color: #43a047;
      }
    }
  }
}
</style>
