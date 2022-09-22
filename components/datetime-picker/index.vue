<template>
  <picker
    mode="date"
    :value="date"
    :start="startDate"
    :end="endDate"
    @change="bindDateChange"
  >
    <slot></slot>
  </picker>
</template>

<script>
export default {
  data() {
    return {
      date: this.getDate(),
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
  },
  methods: {
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") {
        year = year;
      } else if (type === "end") {
        year = year + 1;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },

    bindDateChange: function (e) {
      this.$emit("confirm", e.detail);
    },
  },
};
</script>

<style lang="less" scoped>
.datetime-picker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 400;
  transition: all 350ms;

  .picker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    /deep/ .van-picker-column__item--selected {
      color: #4395ff;
    }
  }
}
</style>
