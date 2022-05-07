<template>
 <div>
    <ul>
        <li v-for="memo in memos" :key="memo.id" exact>
            <router-link :to="{name:'Edit', params:{id:memo.id}}">{{memo.title}}</router-link>
        </li>    
    </ul>
    <router-link :to="{path:'/add'}" exact>+</router-link>
    <router-view></router-view>
 </div>
</template>

<script> 
 import memosCoRef from "../firebase"
 import {getDocs} from "firebase/firestore"

 export default{
    data(){
        return {
            memos:[]
        }
    },
      watch:{
        '$route':function(){
             this.$router.go({path: this.$router.currentRoute.path, force: true})
        }
    },
    methods:{
        async fetchMemos(){
            let memosSnapShot=await getDocs(memosCoRef);
            memosSnapShot.forEach((memo)=>{
                this.memos.push({
                    id:memo.id,
                    title:memo.data().title,
                    content:memo.data().content
                })
            })
        }
    },
    created(){
       this.fetchMemos();
    }
}   
</script>