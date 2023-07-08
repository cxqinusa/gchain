<script setup lang="ts">
import { RouterView } from "vue-router";
import IgntHeader from "./components/IgntHeader.vue";
import { getCurrentInstance, ref } from 'vue'

const items = [
  {
    label: "Portfolio",
    to: "/",
  },
  {
    label: "Data",
    to: "/data",
  },
  {
      label: "lhcGame",
      to: "/lhc",
    },
  {
    label: "snowGame",
    to: "/snow",
  },
];

</script>
<template>
  <IgntHeader :nav-items="items" style='margin:0'></IgntHeader>
  <RouterView />
</template>

