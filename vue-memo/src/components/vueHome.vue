<template>
    <div>
        <ul>
            <li v-for="memo in getMemos" :key="memo.id" exact>
                <router-link :to="{ name: 'Edit', params: { id: memo.id } }">
                    {{ memo.title }}
                </router-link>
            </li>
        </ul>
        <router-link :to="{ path: '/add' }" exact>+</router-link>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: mapGetters(["getMemos"]),
    created() {
        this.$store.dispatch("fetchMemos");
    },
};
</script>
