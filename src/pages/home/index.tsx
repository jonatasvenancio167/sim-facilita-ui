import { Button, Textarea } from "@material-tailwind/react";
import { NavBar } from "../../components/navbar";
import { Post } from "../../components/post";
import { Followers } from "../../components/followers";
import { useEffect, useState } from "react";
import api from "../../service/apiClient";

type CommentPost = {
  id: number;
  userId: number;
  author: string;
  text: string;
  date: string;
};

type User = {
  id: number;
  username?: string;
  avatarUrl: string;
  firstName: string;
  lastName?: string;
}

export function Home({ user }: { user: User }){
  const [postText, setPostText] = useState("");
  const [commentsPost, setCommentsPost] = useState<CommentPost[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [followingUsers, setFollowingUsers] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userCurrent, setUserCurrent] = useState({
    id: 0,
    username: '',
    last_name: '',
    birthday: '',
    phone: '',
    email: ''
  });
  const [token, setToken] = useState({
    token: ''
  })
  const [date, setDate] = useState({
    created_at: ''
  })

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFollowToggle = (userId: number) => {
    setFollowingUsers((prevFollowingUsers) => {
      return prevFollowingUsers.includes(userId)
        ? prevFollowingUsers.filter((id) => id !== userId)
        : [...prevFollowingUsers, userId];
    });
  };

  const fetchComments = () => {
    if (followingUsers.length > 0) {
      const filteredComments = mockComments().filter((comment) =>
        followingUsers.includes(comment.id)
      );
      setCommentsPost(filteredComments);
    } else {
      setCommentsPost([]);
      console.log(commentsPost)
    }
  };

  useEffect(() => {
    fetchComments();
  }, [followingUsers]); 

  const mockComments = () => {
    return [
      { id: 1, userId: 1, author: 'José', text: 'Ótimo post!', date: '2023-01-01T12:00:00' },
      { id: 2, userId: 2, author: 'Jônatas', text: 'Adorei a ideia!', date: '2023-01-01T12:30:00' },
      { id: 3, userId: 3, author: 'Sâmila', text: 'Muito inspirador!', date: '2023-01-01T13:00:00' },
    ];
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const mockUsers: User[] = [
          { id: 1, firstName: 'José', avatarUrl: 'https://docs.material-tailwind.com/img/face-2.jpg' },
          { id: 2, firstName: 'Jônatas', avatarUrl: 'https://docs.material-tailwind.com/img/face-2.jpg' },
          { id: 3, firstName: 'Sâmila', avatarUrl: 'https://docs.material-tailwind.com/img/face-2.jpg' },
        ];
        setAllUsers(mockUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const userCurrent = localStorage.getItem('user')

    if(!userCurrent) {
      console.error('Usuário não autenticado!')
      return;
    }

    const userInfo = JSON.parse(userCurrent)
    setUserCurrent(userInfo.user)
    setToken(userInfo.token)
  }, [])

  const handlePostTextChange = (text: string) => {
    setPostText(text);
  }
  

  const handlePostSubmit = async () => {
    try {
      if (!userCurrent.id) {
        console.error('Usuário não autenticado!');
        return;
      }
  
      const newComment: CommentPost = {
        id: commentsPost.length + 1,
        userId: userCurrent.id,
        author: `${userCurrent.username} ${userCurrent.last_name}`,
        text: postText,
        date: new Date().toLocaleDateString()
      };

      const response = await api.post('post', newComment, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
      });

      if (response.status === 201) { 
        setCommentsPost((prevComments) => [newComment, ...prevComments]);
        setPostText('');
      } else {
        console.error('Erro ao enviar o comentário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
    }
  };

  return (
    <>
      <NavBar/>
      <div className="flex">
        <Followers
          followers={allUsers}
          onFollowingUsers={followingUsers}
          handleFollowToggle={(userId) => handleFollowToggle(userId)}
        />
        <div className="mr-2">
          <div className="container flex-grow">
            <div className="flex justify-center items-center">
              <div className="flex w-screen flex-col gap-6">
                  <Textarea 
                    variant="outlined" 
                    label="Post"
                    value={postText}
                    onChange={(e) => handlePostTextChange(e.target.value)}
                    maxLength={500}
                  />
              </div>
            </div>
            <div className="gap-2 flex justify-end">
              <Button onClick={handlePostSubmit}>Enviar comentário</Button>
            </div>

            <Post commentsPost={commentsPost} />
          </div>
        </div>
      </div>
    </>
  );
}