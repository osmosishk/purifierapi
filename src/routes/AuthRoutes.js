import {lazy } from "react"

const Register = lazy(() => (import('../views/authentication/Register')));
const Recoverpwd = lazy(() => (import('../views/authentication/RecoverPwd')));
const Maintanance = lazy(() => (import('../views/authentication/Maintanance')));
const Login = lazy(() => (import("../views/authentication/Login")));

var AuthRoutes = [
    { path: '/authentication/Login', name: 'Login', icon: 'mdi mdi-account-key', component: Login },
    { path: '/authentication/Register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },
    { path: '/authentication/RecoverPwd', name: 'Recover Password', icon: 'mdi mdi-account-convert', component: Recoverpwd },
    { path: '/authentication/Maintanance', name: 'Maintanance', icon: 'mdi mdi-pencil-box-outline', component: Maintanance }
];
export default AuthRoutes; 