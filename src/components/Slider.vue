<template>
  <div>
    <label for="speed">Speed</label>
    <input :min="min" :max="max" :value="value" type="range" @input="onInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["min", "max", "value"],
  emits: ["speed-change"],
  methods: {
    onInput(event: Event) {
      this.$emit("speed-change", +(event.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  -webkit-appearance: none;
}

input::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background-color: lightcoral;
  height: 10px;
}

input::-webkit-slider-thumb {
  width: 10px;
  -webkit-appearance: none;
  height: 10px;
  cursor: ew-resize;
  background: var(--background-white);
  border-radius: 20px;
  box-shadow: 0 0 0 4px black;
}

div {
  background: var(--background-white);
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
  border: 2px solid #000;
  box-shadow: 20px 5px var(--shadow-color);
}

label {
  display: block;
  margin-bottom: 5px;
}
</style>
