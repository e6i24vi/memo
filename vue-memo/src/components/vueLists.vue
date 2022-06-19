<template>
    <div>
        <ul>
            <li v-for="memo in memos" :key="memo.id" exact>
                <router-link :to="{ name: 'Edit', params: { id: memo.id } }">
                    {{ memo.title }}
                </router-link>
            </li>
        </ul>
        <router-link :to="{ path: '/add' }" exact>+</router-link>
    </div>
</template>

<script>
export default {
    props: ["memos"],
};
</script>
