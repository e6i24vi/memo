import { createStore } from "vuex";
import memosCoRef from "../firebase";
import { getDocs } from "firebase/firestore";

const state = {
    memos: null,
    num: 0,
};
const getters = {
    getMemos(state) {
        return state.memos;
    },
    getAddNum(state) {
        return state.num++;
    },
    getMemoById({ state }, id) {
        console.log(state.memos);

        return state.memos.find((memo) => memo.id === id);
    },
    getIdById({ state }, id) {
        return state.memos.findIndex((memo) => memo.id === id);
    },
};
const mutations = {
    setMemos(state, memos) {
        state.memos = memos;
    },
    countNum(state) {
        return state.num;
    },
    countClear(state) {
        state.num = 0;
    },
    addMemos(state, memo) {
        state.memos.push(memo);
    },
};

const actions = {
    fetchMemos: ({ commit, state }) => {
        commit("countClear");
        getDocs(memosCoRef).then((res) => {
            const memos = res.docs.map((memo) => {
                return {
                    id: memo.id,
                    title: memo.data().title,
                    content: memo.data().content,
                };
            });
            commit("setMemos", memos);
            console.log(memos);
            console.log(state.memos);
            console.log(typeof state.memos);
        });
    },
};

export const store = createStore({
    state,
    getters,
    mutations,
    actions,
});
