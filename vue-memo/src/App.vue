<template>
    <div>
        <vueLists :memos="getMemos" />
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import vueLists from "./components/vueLists.vue";

export default {
    name: "App",
    components: {
        vueLists,
    },
    computed: mapGetters(["getMemos"]),
    created() {
        this.$store.dispatch("fetchMemos");
    },
};
</script>
