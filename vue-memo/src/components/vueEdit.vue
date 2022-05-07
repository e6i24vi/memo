<template>
<div>
    <form @submit.prevent="updateMemo">
        <div>
            <label for="title">タイトル</label>
            <input type="text" v-model="memoInfo.title">
            {{memoInfo.title}}
        </div>
        <div>
            <label for="title">内容</label>
            <input type="text" v-model="memoInfo.content">
            {{memoInfo.content}}
        </div>
        <div> 
            <button >編集</button>
        </div>
    </form>
    <button type="submit" @click="deleteMemo">削除</button> 
</div>
</template>

<script>
import memosCoRef from "../firebase"
import {getDoc,doc,setDoc,deleteDoc} from "firebase/firestore"

export default{
    name:"vueEdit",
    data(){
        return {
            memoId:null,
            docRef:null,
            memoInfo:{
                title:null,
                content:null,
            }
        }
    },
    methods:{
        async getMemo(){
            this.docRef=doc(memosCoRef,this.memoId);
            let memo=await getDoc(this.docRef);
            this.memoInfo.title=memo.data().title;
            this.memoInfo.content=memo.data().content;
        },
        async updateMemo(){
            await setDoc(this.docRef,this.memoInfo);
            alert(
                `The memo with ID of ${this.memoId} has been updated successfully`
            )
            this.$router.push("/");
        },
        async deleteMemo(){
            await deleteDoc(doc(memosCoRef,this.memoId))
            alert(
                `The memo deleted successfully`
            )
            this.$router.push("/");
        },
        
    },
    created(){
        this.memoId=this.$route.params.id;
        this.getMemo();
    }
}
</script>
