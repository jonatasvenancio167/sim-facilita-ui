import {
  List,
  ListItem,
  Card,
  Typography,
  Button,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CommentForm } from "../comments";

type CommentPost = {
  id: number;
  author: string;
  text: string;
  date: string;
};

type PostProps = {
  commentsPost: CommentPost[];
};

export function Post({commentsPost}: PostProps){
  type Comment = {
    id: number;
    postId?: number;
    author: string;
    text: string;
    date: string;
    showCommentForm: boolean;
    parentId: number | null;
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]); // Adicione esta linha

  const handleCommentClick = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, showCommentForm: !comment.showCommentForm }
          : { ...comment, showCommentForm: false } // Feche outros formulários ao abrir um
      )
    );
  };

  const handleCommentSubmit = (commentId: number, commentText: string) => {
    const parentComment = comments.find((comment) => comment.id === commentId);
    const postToUpdate = parentComment ? comments.find((comment) => comment.id === parentComment.postId) : commentsPost[0];
    
    const newComment: Comment = {
      id: comments.length + 1,
      author: 'Usuário',
      text: commentText,
      postId: commentsPost[0]?.id && commentId,
      date: new Date().toLocaleString(),
      showCommentForm: false,
      parentId: commentId,
    }

    if (parentComment) {
      setUserComments((prevUserComments) => [...prevUserComments, newComment]);
    } else {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  }


  useEffect(() => {
    const updatedComments = commentsPost.map((comment) => ({
      ...comment,
      showCommentForm: false,
      parentId: null,
    }));
    setComments(updatedComments);
  }, [commentsPost]);

  return(
    <>
      {comments.map((comment) => (
        <Card key={comment.id} className="w-full mt-10">
          <List>
            <ListItem>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
              </ListItemPrefix>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="small" color="blue-gray" style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto'  }}>
                      <strong style={{fontWeight: 'bold', fontSize: '15px', paddingRight: '0.4rem'}}>{comment.author}</strong>{comment.text}
                    </Typography>
                </div>
                <div className="flex items-baseline">
                  <Typography variant="small" color="gray" className="font-normal">
                    {comment.date}
                  </Typography>
                  <Button variant="text" onClick={() => handleCommentClick(comment.id)} style={{color: 'black', fontSize: 10 }}>
                    Comentar
                  </Button>
                </div>
                {userComments.
                filter((userComment) => userComment.parentId === comment.id)
                .map((comment) => (
                  <div key={comment.id} className="ml-3">
                    <Typography variant="small" color="gray" className="font-normal">
                      <strong>{comment.author}:</strong> {comment.text}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal mb-2">
                      {comment.date}
                    </Typography>
                  </div>
                ))}

                {comment.showCommentForm && (
                     <CommentForm
                      onSubmit={
                        (commentText) => handleCommentSubmit(comment.id, commentText)
                      } 
                    />
                  )
                }
              </div>
            </ListItem>
          </List>
        </Card>
      ))}
    </>
  );
}