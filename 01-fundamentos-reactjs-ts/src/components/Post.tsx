import { format, formatDistanceToNow } from "date-fns";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { IPostData } from "../model/Post";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./post.module.css";

interface IPostProps {
  post: IPostData;
}

export function Post({ post }: IPostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'ás' HH:mm'h'"
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    addSuffix: true,
  });

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault();

    setComments((oldComments) => [...oldComments, newCommentText]);

    setNewCommentText("");
  }

  function handleChangeCommentValue(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("");
    setNewCommentText(e.currentTarget.value);
  }

  function handleNewCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("Campo obrigatório!");
  }

  function deleteComment(comment: string) {
    setComments((comments) =>
      comments.filter((com) => com.toLowerCase() !== comment.toLowerCase())
    );
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((item) => {
          if (item.type === "paragraph") {
            return <p key={item.content}>{item.content}</p>;
          }

          return (
            <p key={item.content}>
              <a href="#">{item.content}</a>
            </p>
          );
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          required
          onInvalid={handleNewCommentInvalid}
          value={newCommentText}
          onChange={handleChangeCommentValue}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
