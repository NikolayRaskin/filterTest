<template>
  <div>
    <div v-if="!loading && fields" class="fields">
      <div v-for="field in fields" :key="field.id" class="field__wrapper">
        <span v-if="field.title" class="title">{{ field.title }}</span>
        <br />
        <select
          v-if="field.type === 'combobox' && selected[field.id]"
          v-model="selected[field.id].value"
          :disabled="selected[field.id].isDisabled"
          @change="checkEnable"
        >
          <option
            v-for="item in field.values"
            :key="item.id"
            v-bind:value="item.id"
            >{{ item.label }}
          </option>
        </select>
        <input
          v-if="field.type === 'date' && selected[field.id]"
          v-model="selected[field.id].value"
          type="text"
        />
      </div>
    </div>

    <span v-else>Loading...</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FilterTest',
  data() {
    return {
      selected: {},
      date: '',
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['fields']),
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchFields').then(() => {
      this.loading = false;
      const obj = {};
      if (this.fields) {
        this.fields.forEach((item) => {
          obj[item.id] = {
            value: item.default
              ? item.default
              : item.values[0]
              ? item.values[0]
              : item.value
              ? item.value
              : null,
          };
        });
        this.selected = { ...obj };
        this.checkEnable();
      }
    });
  },
  methods: {
    checkEnable() {
      const obj = { ...this.selected };
      this.fields.forEach((item) => {
        let flag = false;
        let counter = 0;
        if (item.disabled) {
          item.disabled.forEach((i) => {
            for (let key in i) {
              if (obj[key].value === i[key]) counter += 1;
            }
          });
          flag = item.disabled.length === counter;
        }
        obj[item.id].isDisabled = flag;
      });
      this.selected = { ...obj };
      return obj;
    },
  },
};
</script>

<style lang="scss" scoped>
.fields {
  display: flex;
}
.field__wrapper {
  margin: 20px;
}
</style>
