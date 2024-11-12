// import { useMutation, UseMutationResult } from "@tanstack/react-query";
// import api from "../api/api"; // Your Axios instance
// import { useNavigate } from "react-router-dom";
// import {useAuthStore} from "../store/AuthStore.tsx";
//
// // Define types for the request and response data
// type LoginRequestData = {
//     username: string;
//     password: string;
// };
//
// type LoginResponseData = {
//     access_token: string;
//     refresh_token: string;
//     username: string;
// };
//
// export const useLoginMutation = (): UseMutationResult<LoginResponseData, Error, LoginRequestData> => {
//     const setTokens = useAuthStore((state) => state.setTokens);
//     const navigate = useNavigate();
//
//     return useMutation<LoginResponseData, Error, LoginRequestData>(
//         async (data: LoginRequestData) => {
//             const response = await api.post<LoginResponseData>("/user/login", data);
//             return response.data;
//         },
//         {
//             onSuccess: (data) => {
//                 setTokens(data.access_token, data.refresh_token);
//                 navigate("/profile");
//             },
//             onError: (error) => {
//                 console.error("Login failed", error);
//             },
//         }
//     );
// };
