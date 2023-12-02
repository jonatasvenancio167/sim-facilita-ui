import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function NavBar(){
  return (
    <div className="flex justify-end mb-10 mt-3 mr-2">
      <Menu>
        <MenuHandler>
          <Avatar variant="circular" alt="alexander" style={{width: '3%',  height: 'auto'}} src="https://docs.material-tailwind.com/img/face-2.jpg" />
        </MenuHandler>
        <MenuList className="flex flex-col gap-2">
          <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
            <div className="mb-4 mr-3 mt-3">
              <div className="flex justify-end">
                <Link to='/register'>
                  <Typography variant="small" className="flex">Register</Typography>
                </Link>
              </div>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}