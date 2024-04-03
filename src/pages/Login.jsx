/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import PageNav from "../components/pageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthorized } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }
  useEffect(
    function () {
      if (isAuthorized)
        // replace set to true --> to navigate back to the main page because it wont go back even to the login form if the replace object is not there
        return navigate("/app", {
          replace: true,
        });
    },
    [isAuthorized, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
          {/* <button type="submit" onClick={isAuthorized ? navigate("/app") : ""}>
            Login
          </button> */}
        </div>
      </form>
    </main>
  );
}
