import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Loader } from "../components/loader/Loader";
import { useState } from "react";
import { fetchDeepCode, generateUniqueId } from "../utils/common";
import { ChatRow } from "../components/chatRow/ChatRow";

export default function Home() {
  const [isloading, setLoading] = useState(false);
  const [ask, setAsk] = useState();
  const [board, setBoard] = useState([]);

  const addBoardValue = (isAI, value) => {
    if (value) {
      setBoard((prev) => {
        return [
          ...prev,
          {
            isAI,
            id: generateUniqueId(),
            value,
          },
        ];
      });
    }
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
    }
  }


  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    const _ask = ask
    addBoardValue(false, ask)
    setLoading(true)
    setAsk("");
    const response = await fetchDeepCode(_ask)
    setLoading(false)
    addBoardValue(true, response?.trim())
  };

  return (
    <>
      <Head>
        <title>Deep Code AI</title>
        <meta name="description" content="Deep Code AI Help you in coding" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.deepCodeApp}>
        <section className={styles.deepCodeWrapper}>
          <header className={styles.header}>
            <h2>Lets Ask Some Thing</h2>
          </header>
          {board.length > 0 &&
            board.map((item) => (
              <ChatRow key={item.id} isAI={item.isAI} value={item.value} />
            ))}
          {isloading && <Loader />}
        </section>

        <form onSubmit={handleSubmit}>
          <textarea
            name="askToAI"
            rows="1"
            cols="1"
            value={ask}
            onKeyDown={onEnterPress}
            placeholder="Ask to deep code..."
            onChange={(e) => setAsk(e.target.value)}
          ></textarea>
          <button type="submit">
            <img src="./send.png" alt="send" />
          </button>
        </form>
      </main>
    </>
  );
}
