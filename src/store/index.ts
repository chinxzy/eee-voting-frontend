import { InjectionKey } from "vue";
import {
    createStore,
    useStore as baseUseStore,
    Store,
    createLogger,
} from "vuex";

import auth from "./modules/auth"



import { State as authState } from "./modules/auth";

export type State = {
    auth: authState
};


export const store = createStore<State>({
    plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
    modules: {
        auth
    },
});

export const useStore = () => store;

