import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import Image from "next/image";

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        try{
            await axios.post("http://localhost:3000/api/login",{
                username,
                password,
            });
            router.push("/account/11");
        } catch (err) {
            setError(true);            
        }
    };

  return (
            <section className="vh-100">
                <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <Image src="/img/draw2.svg" className="img-fluid" alt="Phone image" width={1000} height={1000}/>
                    
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <div className={styles.container}>
            <div className={styles.wrapper}>
            <h1>Login Dashboard</h1>
            <input
                placeholder="username"
                className={styles.input}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} className={styles.button}>
                Sign In
            </button>
            {error && <span className={styles.error}>Wrong Credentials!</span>}

            <button className={styles.button2}>Log with Google</button>
            </div>
    </div>
                    </div>
                </div>
                </div>
            </section>
  );
};

export default Login;
