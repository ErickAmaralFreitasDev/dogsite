import React from "react";

interface Comment {
  id: number;
  comment: string;
  author: string;
}

interface PhotoCommentsProps {
  id: number;
  comments: Comment[]; 
}

const PhotoComments: React.FC<PhotoCommentsProps> = ({ id, comments }) => {
  return (
    <div>
      <h3>Comentários ({comments.length})</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoComments;