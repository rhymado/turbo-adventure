import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import axios from "axios";
import Layout from "components/Layout";

function ReactPage() {
  const [counter, setCounter] = useState(0);
  const [file, setFile] = useState(null);
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const changeCounter = () => {
    setCounter(2);
  };
  const handleNavigate = (to) => {
    router.push(to);
  };
  const onFileInput = (e) => {
    setFile(e.target.files[0]);
  };
  const onUpload = async () => {
    if (file === null) return;
    const formData = new FormData();
    formData.append("image", file);
    const url = "http://localhost:8080";
    try {
      const result = await axios.post(url, formData, { signal: controller.signal });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"REACT in NEXT"}>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="App-logo relative">
            <Image src="/react-logo.svg" fill alt="logo" priority />
          </div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link href="/">Home Page</Link>
          <div>
            <p>Counter: {counter}</p>
            <button onClick={changeCounter}>Change Counter</button>
          </div>
          <div>
            <button onClick={() => handleNavigate("/")}>View CV</button>
          </div>
          <div>
            <input type="file" onChange={onFileInput} />
            <button className="btn btn-primary" onClick={onUpload}>
              Upload
            </button>
          </div>
        </header>
      </div>
      <style jsx>
        {`
          button {
            cursor: pointer;
            user-select: none;
            padding: 10px;
            font-size: 1.25rem;
            border-radius: min(25px, 50%);
          }
          .App-link {
            color: #61dafb;
          }
          button:hover {
            opacity: 0.8;
          }
          .App-header {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }
          .App {
            text-align: center;
          }
          .App-logo {
            height: 500px;
            width: 500px;
            pointer-events: none;
          }
          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @media (prefers-reduced-motion: no-preference) {
            .App-logo {
              animation: App-logo-spin infinite 20s linear;
            }
          }
        `}
      </style>
    </Layout>
  );
}

export default ReactPage;
