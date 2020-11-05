import { useState, useEffect } from "react";
import Cookies, { CookieChangeOptions } from "universal-cookie";
import localForage from "localforage";

type User = {
  email: string;
  id: string;
  name: string;
};

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // check if we have a token
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    setIsAuthenticated(token ? true : false);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const callback = ({ name, value }: CookieChangeOptions) => {
      if (name === "access_token") {
        setIsAuthenticated(value ? true : false);
      }
    };
    cookies.addChangeListener(callback);
    () => cookies.removeChangeListener(callback);
  });

  useEffect(() => {
    // check if we have a user
    localForage.getItem("user").then((user) => setUser(<User>user));
  }, []);

  return { isAuthenticated, user };
}

export default useAuth;
