import { createStore } from "vuex";
import memosCoRef from "../firebase";
import { getDocs } from "firebase/firestore";

const state = {
    memos: [],
};
const getters = {
    getMemos(state) {
        return state.memos;
    },

    getMemoById: (state) => (id) => {
        if (state.memos === undefined) {
            return null;
        } else {
            return state.memos.find((memo) => memo.id === id);
        }
    },
    getIdById: (state) => (id) => {
        return state.memos.findIndex((memo) => memo.id === id);
    },
};
const mutations = {
    setMemos(state, memos) {
        state.memos = memos;
    },
    addMemos(state, memo) {
        state.memos.push(memo);
    },
    setMemo(state, memo) {
        state.memos[memo.index] = {
            id: memo.id,
            title: memo.memoInfo.title,
            content: memo.memoInfo.content,
        };
    },
};

const actions = {
    fetchMemos: ({ commit }) => {
        getDocs(memosCoRef).then((res) => {
            const memos = res.docs.map((memo) => {
                return {
                    id: memo.id,
                    title: memo.data().title,
                    content: memo.data().content,
                };
            });
            commit("setMemos", memos);
        });
    },
};

export const store = createStore({
    state,
    getters,
    mutations,
    actions,
});
