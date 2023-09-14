import axios from "axios";
import { InputType } from "../interface/interfaces";

const endpoint = "http://localhost:8000";

export const login = ({ username, password }: InputType) => axios.get(`${endpoint}/users?username=${username}&password=${password}`);
export const getContactsByUserId = (userId: number) => axios.get(`${endpoint}/contacts?userId=${userId}`);
