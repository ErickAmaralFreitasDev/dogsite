import React from "react";
import {UserContext} from "../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

interface ApiComment {
  comment_ID: number | string;
  comment_content: string;
  comment_author: string;
  comment_date?: string;
  user_id?: string;
}

interface PhotoCommentsProps {
  id: number;
  comments: ApiComment[];
  onCommentAdded?: (newComment: ApiComment) => void;
}

const PhotoComments: React.FC<PhotoCommentsProps> = ({ id, comments, onCommentAdded }) => {
  const context = React.useContext(UserContext);
  const [localComments, setLocalComments] = React.useState<ApiComment[]>(comments);
  const commentSection = React.useRef<HTMLUListElement>(null);
  
  if (!context) {
    throw new Error('UserContext deve estar dentro do Provider');
  }

  const { login } = context;

  React.useEffect(() => {
    if (commentSection.current) {
      commentSection.current.scrollTop = commentSection.current.scrollHeight
    }
    }, [localComments]);

  React.useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleNewComment = (newComment: ApiComment) => {
    setLocalComments(prev => [...prev, newComment]);
    if (onCommentAdded) {
      onCommentAdded(newComment);
    }
  };

  return (
    <>
      <ul ref={commentSection} className={styles.comments}>
        {localComments.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}</b>: 
            <span>{comment.comment_content}</span>
          </li>))}
      </ul>
      {login && <PhotoCommentsForm id={id} comments={localComments} onCommentAdded={handleNewComment}  />}
    </>
  );
};

export default PhotoComments;