<template>
    <div>
        <form @submit.prevent="updateMemo">
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
        <button type="submit" @click="deleteMemo">削除</button>
    </div>
</template>

<script>
import memosCoRef from "../firebase";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { mapGetters } from "vuex";
export default {
    name: "vueEdit",
    props: ["id"],
    data() {
        return {
            memoId: null,
            docRef: null,
            memoInfo: {
                title: null,
                content: null,
            },
        };
    },
    computed: {
        getMemoById() {
            if (this.$store.getters.getMemoById(this.id) === undefined) {
                return null;
            } else {
                return this.$store.getters.getMemoById(this.id);
            }
        },
        getIdById() {
            return this.$store.getters.getIdById(this.id);
        },
        ...mapGetters(["getMemos"]),
    },
    methods: {
        async getMemo() {
            this.docRef = doc(memosCoRef, this.memoId);
            const memo = await getDoc(this.docRef);
            this.memoInfo = memo.data();
        },
        async updateMemo() {
            const index = this.$store.getters.getIdById(this.id);
            const memo = {
                index: index,
                memoInfo: this.memoInfo,
                id: this.id,
            };
            this.$store.commit("setMemo", memo);
            this.docRef = await doc(memosCoRef, this.id);
            await setDoc(this.docRef, this.memoInfo);
            alert(
                `The memo with ID of ${this.memoId} has been updated successfully`
            );
            this.$router.push("/");
        },

        async deleteMemo() {
            this.$store.commit(
                "setMemos",
                this.getMemos.filter((memo) => memo.id !== this.memoId)
            );
            await deleteDoc(doc(memosCoRef, this.memoId));
            alert(`The memo deleted successfully`);
            this.$router.push("/");
        },
    },
    beforeRouteUpdate(to, from, next) {
        this.memoId = to.params.id;
        this.getMemo();
        next();
    },
    created() {
        this.memoId = this.id;
        this.getMemo();
    },
};
</script>
