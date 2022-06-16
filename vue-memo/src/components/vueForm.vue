<template>
    <div>
        <form @submit.prevent="updateMemo">
            <div>
                <label for="title">タイトル</label>
                <input type="text" v-model="memoInfo.title" />
                {{ memoInfo.title }}
            </div>
            <div>
                <label for="title">内容</label>
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
import { doc, setDoc, deleteDoc } from "firebase/firestore";
export default {
    props: ["memo"],
    data() {
        return {
            memoInfo: {
                title: this.memo.title,
                content: this.memo.content,
            },
        };
    },
    methods: {
        getMemo() {},
        async updateMemo() {
            this.$router.push("/");
            await setDoc(this.docRef, this.memoInfo);
            alert(
                `The memo with ID of ${this.memoId} has been updated successfully`
            );
            location.reload();
        },
        async deleteMemo() {
            this.$router.push("/");
            await deleteDoc(doc(memosCoRef, this.memoId));
            alert(`The memo deleted successfully`);
        },
    },
};
</script>
