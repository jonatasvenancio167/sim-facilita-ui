import { Button, Input } from "@material-tailwind/react";

export function SearchFollowing(){
  return(
    <>
      <div className="aling-stretch">
      <div className="w-72">
        <Input label="Username" crossOrigin={undefined} />
      </div>
      <Button size="sm">Search</Button>
      </div>
    </>
  );
}