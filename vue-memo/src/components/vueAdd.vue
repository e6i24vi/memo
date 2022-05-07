<template>
 <div>
    <form @submit.prevent="createMemo">
        <label>タイトル</label>
        <input v-model="memo.title">
        <label>内容</label>
        <input v-model="memo.content">
        <button href="/">追加</button>
    </form>
 </div>
</template>
<script>

import memosCoRef from '@/firebase'
import {addDoc} from "firebase/firestore"

export default {
    name:"vueAdd",
    data(){
        return{
            memo:{
                title:null,
                 content:null
                }
        }
    },
    methods:{
        async createMemo(){
            await addDoc(memosCoRef,this.memo)
            this.$router.push("/");    
        },
    }
}
</script>