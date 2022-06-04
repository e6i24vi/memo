<template>
  <div>
    <ul>
      <li v-for="memo in memos" :key="memo.id" exact>
        <router-link :to="{ name: 'Edit', params: { id: memo.id } }">{{
          memo.title
        }}</router-link>
      </li>
    </ul>
    <router-link :to="{ path: '/add' }" exact>+</router-link>
  </div>
</template>

<script>
import memosCoRef from "../firebase";
import { getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      memos: [],
    };
  },
  watch: {
    $route: function () {
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
  methods: {
    async fetchMemos() {
      const memosSnapShot = await getDocs(memosCoRef);
      this.memos = memosSnapShot.docs.map((memo) => {
        return {
          id: memo.id,
          title: memo.data().title,
          content: memo.data().content,
        };
      });
    },
  },
  created() {
    this.fetchMemos();
  },
};
</script>
