import { Button, Textarea } from "@material-tailwind/react";
import { ChangeEvent, FormEvent, useState } from "react";

type CommentFormProps = {
  onSubmit: (commentText: string) => void;
  initialText?: string
};

export function CommentForm({ onSubmit, initialText = '' }: CommentFormProps){
  const [commentText, setCommentText] = useState(initialText)

  const handleCommentSubmit = (e: FormEvent) => {
    console.log(initialText)
    e.preventDefault();
    onSubmit(commentText);
    setCommentText('');
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  return(
    <>
    <div className="container">
      <div className="flex justify-center items-center">
        <div className="flex w-96 flex-col gap-3">
            <Textarea 
              variant="outlined" 
              label="Post" 
              value={commentText} 
              maxLength={150} 
              onChange={handleTextChange}
            />
        </div>
      </div>
      <div className="gap-2 flex justify-end">
        <Button size="sm" variant="outlined" onClick={handleCommentSubmit}>Send</Button>
      </div>
      </div>
    </>
  );
};