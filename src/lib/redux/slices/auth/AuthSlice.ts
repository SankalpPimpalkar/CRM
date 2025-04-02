import { Models } from "appwrite";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomUser extends Omit<Models.User<Models.Preferences>, any> {
    name: string | null;
    email: string | null;
    phone: string | null;
    avatar: string | null;
    username: string;
    companies: any[];
    deals: any[];
    interactions: any[];
    $databaseId: string;
    $collectionId: string;
}

const INITIAL_USER = {
    name: '',
    email: '',
    phone: '',
    avatar: null,
    username: '',
    companies: [],
    deals: [],
    interactions: [],
    $databaseId: '',
    $collectionId: '',
}

interface AuthState {
    userData: CustomUser;
    isAuthenticated: boolean;
}

const INITIAL_STATE: AuthState = {
    userData: INITIAL_USER,
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        loginReducer: (state, action) => {
            state.userData = action.payload
            state.isAuthenticated = true
        },
        logoutReducer: (state, _) => {
            state.userData = INITIAL_USER
            state.isAuthenticated = false
        }
    }
})

export const { loginReducer, logoutReducer } = authSlice.actions
export default authSlice.reducer
