import {
  Card,
  Typography,
  List,
  Avatar,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

type Followers = {
  id: number;
  firstName: string;
  avatarUrl: string;
  username?: string;
  lastName?: string;
}

type FollowersPropos = {
  followers: Followers[];
  onFollowingUsers: number[];
  handleFollowToggle: (userId: number) => void;
}

export function Followers({  
  followers,
  onFollowingUsers,
  handleFollowToggle, }: FollowersPropos){

  const [followingUsers, setFollowingUsers] = useState<number[]>([]);

  // const handleFollowToggle = (userId: number) => {
  //   setFollowingUsers((prevFollowingUsers) => {
  //     // Se o usuário já está sendo seguido, remove da lista, senão adiciona
  //     return prevFollowingUsers.includes(userId)
  //       ? prevFollowingUsers.filter((id) => id !== userId)
  //       : [...prevFollowingUsers, userId];
  //   });
  // };

  const isFollowing = (userId: number) => followingUsers.includes(userId);

  return (
    <div className="overflow-hidden">
      <Card className="min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" style={{ bottom: '2rem'}}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Seguidores
          </Typography>
        </div>
        <List>
          {followers.map((followers) =>(
            <ListItem key={followers.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <ListItemPrefix>
                  <Avatar variant="circular" alt={followers.username} src={followers.avatarUrl} />
                </ListItemPrefix>
                <span className="ml-2">{followers.username}</span>
              </div>
              <div className="mb-2">
                <Button
                  onClick={() => handleFollowToggle(followers.id)}
                  size="sm"
                  color={onFollowingUsers.includes(followers.id)  ? 'red' : 'blue'}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                  {onFollowingUsers.includes(followers.id) ? 'Seguindo' : 'Seguir'}
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
