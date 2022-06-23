<template>
    <div>
        <form @submit.prevent="updateMemoEdit">
            <div>
                <label for="title">タイトル</label>
                <input type="text" v-model="memoInfo.title" />
                {{ memoInfo.title }}
            </div>
            <div>
                <label for="content">内容</label>
                <input type="text" v-model="memoInfo.content" />
                {{ memoInfo.content }}
            </div>
            <div>
                <button>編集</button>
            </div>
        </form>
        <button type="submit" @click="deleteMemoEdit">削除</button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "vueEdit",
    props: ["id"],
    data() {
        return {
            memoInfo: {
                title: null,
                content: null,
            },
        };
    },
    methods: {
        async getMemoEdit(Id) {
            const memo = await this.getMemo(Id);
            this.memoInfo = memo.data();
        },
        async updateMemoEdit() {
            const memo = {
                Id: this.id,
                memoInfo: this.memoInfo,
            };
            await this.updateMemo(memo);
            this.$router.push("/");
        },
        async deleteMemoEdit() {
            await this.deleteMemo(this.id);
            this.$router.push("/");
        },
        ...mapActions(["getMemo", "updateMemo", "deleteMemo"]),
    },
    beforeRouteUpdate(to, from, next) {
        this.getMemoEdit(to.params.id);
        next();
    },
    created() {
        this.getMemoEdit(this.id);
    },
};
</script>
