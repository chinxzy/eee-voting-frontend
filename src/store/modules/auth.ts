import axios from "axios";
import { Module, Commit } from "vuex";
import LocalStorageService from "../../services/localStorageService";
// import { query } from "../../types/general";
import { AuthRequestStatus, AuthenticatedUser, UserLogin, Status, AuthenticatedUserType, UserSignup, userList } from "../../types/auth";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';

const api = import.meta.env.VITE_APP_API_BASE_URL
export interface State {
    authenticationError: string;
    recoveryError: string,
    authRequestStatus: AuthRequestStatus;
    authenticatedUser: AuthenticatedUser;
    user: userList
}

const auth: Module<State, Rootstate> = {
    namespaced: true,

    state: () => ({
        authenticationError: '',
        recoveryError: '',
        authRequestStatus: {
            loginUser: Status.IDLE,
            signupUser: Status.IDLE,
            getUser: Status.IDLE,
            forgotUser: Status.IDLE,
            resetUser: Status.IDLE
        },
        authenticatedUser: {} as AuthenticatedUser,
        user: {
            user: [],

        }
    }),

    mutations: {
        //Mutation to clear error
        ['CLEAR_ERROR'](state: State): void {
            state.authenticationError = '';
        },

        // Login Mutations
        [ACTIONS.LOGIN_USER_LOADING](state: State): void {
            state.authRequestStatus.loginUser = Status.LOADING;
        },

        [ACTIONS.LOGIN_USER_SUCCESS](state: State, responseToken: string): void {

            state.authRequestStatus.
                loginUser = Status.SUCCESS;
            LocalStorageService.setItem('token', responseToken);

            const user = LocalStorageService.decodeToken();
            if (!user) return;

            state.authenticatedUser = user;
            // LocalStorageService.setItem('ebrrar_userName', user.firstName);

            // state.authenticatedUser = user;
            // LocalStorageService.setItem('ebrraUserId', user.uniqueId);

            // state.authenticatedUser = user;
            // LocalStorageService.setItem('ebrraUser_mail', user.email);
        },

        [ACTIONS.LOGIN_USER_ERROR](state: State, error: string): void {
            state.authenticationError = error;
            state.authRequestStatus.loginUser = Status.ERROR;
        },

        //signup mutations
        [ACTIONS.SIGNUP_USER_LOADING](state: State): void {
            state.authRequestStatus.signupUser = Status.LOADING;
        },

        [ACTIONS.SIGNUP_USER_SUCCESS](state: State): void {
            state.authRequestStatus.signupUser = Status.SUCCESS;
        },

        [ACTIONS.SIGNUP_USER_ERROR](state: State, error: string): void {
            state.authenticationError = error;
            state.authRequestStatus.signupUser = Status.ERROR;
        },

        //get users mutation
        [ACTIONS.GET_USER_LOADING](state: State): void {
            state.authRequestStatus.getUser = Status.LOADING;
        },

        [ACTIONS.GET_USER_SUCCESS](state: State, user: userList): void {
            state.authRequestStatus.getUser = Status.SUCCESS;
            state.user = user;
        },

        [ACTIONS.GET_USER_ERROR](state: State, error: string): void {
            state.authenticationError = error;
            state.authRequestStatus.getUser = Status.ERROR;
        },

    },

    actions: {

        async clearError({ commit }: { commit: Commit }) {

            commit("CLEAR_ERROR");

        },
        // Login Action
        async loginUser({ commit }: { commit: Commit }, loginDetails: UserLogin) {
            try {
                console.log(typeof (api))
                commit(ACTIONS.LOGIN_USER_LOADING);

                const accessToken = await axios.post(
                    `${api}/user/loginUser`, loginDetails
                );

                commit(ACTIONS.LOGIN_USER_SUCCESS, accessToken.data.accessToken);

            } catch (response: any) {
                commit(ACTIONS.LOGIN_USER_ERROR, response.response.status);
                console.log("error: ", response.response.status);
            }

        },

        //signup action
        async signupUser({ commit }: { commit: Commit }, signupDetails: UserSignup) {
            try {
                commit(ACTIONS.SIGNUP_USER_LOADING);

                const data = await axios.post(
                    `${api}/user/createUser`, signupDetails
                );
                console.log("signup test", { signupDetails })
                commit(ACTIONS.SIGNUP_USER_SUCCESS, data);

            } catch (response: any) {
                commit(ACTIONS.SIGNUP_USER_ERROR, response.response.status);
                console.log("error: ", response.response);
            }

        },
        //get user
        // async fetchUser({ commit }: { commit: Commit }, {
        //     id = 0,
        //     date = '',

        // }: query,) {
        //     try {
        //         const token = localStorage.getItem("token")
        //         const Authorization = ` Bearer ${token}`;
        //         ACTIONS.GET_USER_LOADING;
        //         const { data } = await axios.get(
        //             `${api}/api/User/get-user-customer-view?id=${id}`, { headers: { Authorization } }
        //         );
        //         commit(ACTIONS.GET_USER_SUCCESS, data.data);

        //     } catch (response: any) {
        //         commit(ACTIONS.GET_USER_ERROR, response.response.status);
        //         console.log("error: ", response.response.status);
        //     }

        // },
        //reset password


    },
};

export default auth;