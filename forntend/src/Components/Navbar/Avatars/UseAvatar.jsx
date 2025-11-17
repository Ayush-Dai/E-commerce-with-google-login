import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../../../APIs/GoogleApi';
import Avatar from './Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const UseAvatar = () => {
  const [user, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUserInfo(data);
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API to clear the cookie on the server
      await logoutApi();
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-success'));
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Avatar src={user?.image} name={user?.name} size="md" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg border border-gray-200 ">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <a href="/yourOrders">Manage Orders</a>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <a href="/changePswd"> change Password</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleLogout()}
          className="text-red-600 focus:text-red-600 cursor-pointer "
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UseAvatar;
