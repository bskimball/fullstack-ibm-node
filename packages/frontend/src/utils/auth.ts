import http from "./http";
import { Credentials } from "../interfaces";
import localForage from "localforage";

export async function register({
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    return await http
      .post("users/signup", { json: { email, password, name } })
      .json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function login({ email, password, remember }: Credentials) {
  try {
    const { user } = await http
      .post("users/login", { json: { email, password, remember } })
      .json();
    await localForage.setItem("user", user);
  } catch (error) {
    console.error(error);
  }
}

export async function whoAmI() {
  const user = await http.get("who-am-i").json();
  await localForage.setItem("user", user);
}

export default { register, login, whoAmI };
