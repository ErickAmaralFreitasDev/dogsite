import React from "react";
import Enviar from "../Assets/Enviar";
import useFetch from "../Hooks/useFetch";
import { COMMENT_POST } from "../Hooks/api";

interface ApiComment {
  comment_ID: number | string;
  comment_content: string;
  comment_author: string;
  comment_date?: string;
  user_id?: string;
}

interface CommentResponse {
  comment_ID?: number | string;
  id?: number;
  comment_content?: string;
  comment?: string;
  comment_author?: string;
  author?: string;
  comment_date?: string;
  date?: string;
}

interface PhotoCommentsFormProps {
  id: number;
  comments: ApiComment[];
  onCommentAdded: (newComment: ApiComment) => void; 
}

const PhotoCommentsForm: React.FC<PhotoCommentsFormProps> = ({ 
  id, 
  comments, 
  onCommentAdded  
}) => {
  const [comment, setComment] = React.useState('');
  const { request, error, loading } = useFetch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!comment.trim()) {
      alert('O comentário não pode ser vazio');
      return;
    }

    const token = window.localStorage.getItem('token');
    
    if (!token) {
      alert('Você precisa estar logado para comentar');
      return;
    }

    try {
      const { url, options } = COMMENT_POST({ 
        id, 
        body: { comment: comment.trim() }, 
        token 
      });
      
      const { response, json } = await request(url, options);
      
      // Tipar a resposta
      const responseData = json as CommentResponse;
      
      if (response && response.ok) {
        // Formato do comentário retornado pela API
        const newComment: ApiComment = {
          comment_ID: responseData.comment_ID || responseData.id || Date.now(),
          comment_content: responseData.comment_content || responseData.comment || comment,
          comment_author: responseData.comment_author || responseData.author || 'Você',
          comment_date: responseData.comment_date || responseData.date || new Date().toISOString()
        };
        
        // Limpa o campo
        setComment('');
        
        // Chama o callback para atualizar a lista
        onCommentAdded(newComment);
      }
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <h3>Comentários ({comments.length})</h3>
        <textarea
            id='comment'
            name="comment" 
            placeholder="Comente ..."
            value={comment} 
            onChange={({target}) => setComment(target.value)}
        />
        <button>
            <Enviar />
        </button>
    </form>
  );
};

export default PhotoCommentsForm;