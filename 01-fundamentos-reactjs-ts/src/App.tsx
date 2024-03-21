import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import "./global.css";
import { IPostData } from "./model/Post";

setDefaultOptions({ locale: ptBR });

const posts: IPostData[] = [
  {
    id: "08ea295c-126d-54d2-965e-0cf0db2da74b",
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Shawn Sandoval",
      role: "CTO @ Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "👉 jane.design/doctorcare",
      },
    ],
    publishedAt: new Date("2023-05-03 20:00:00"),
  },
  {
    id: "f913338e-e83c-544d-aa48-12c96e305243",
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Haska Berry",
      role: "Educator",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "👉 jane.design/doctorcare",
      },
    ],
    publishedAt: new Date("2023-05-10 20:00:00"),
  },
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
