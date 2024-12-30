import React from 'react'
import { Menu, Button, Text, rem  , Avatar} from '@mantine/core';
import { User,BriefcaseBusiness, BriefcaseIcon ,LogOut ,LayoutDashboard } from 'lucide-react';
import { logOut } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function ProfileDropdown({role}) {
const dispatch = useDispatch();
const navigate = useNavigate()
  const handleLogout = async () => {
    await dispatch(logOut());
    navigate('/login');
  };
  const renderItemBasedOnRole = (role) => {
    if(role === 'jobseeker'){
      return <Menu.Item  leftSection={<BriefcaseBusiness size={18}/>}>My Applications</Menu.Item>
    }else if(role === 'recruiter'){
      return <Menu.Item leftSection={<BriefcaseBusiness size={18}/>}>My Job Posts</Menu.Item>
    }else if(role === 'admin'){
      return <Menu.Item leftSection={<LayoutDashboard size={18}/>}>Dashboard</Menu.Item>
    }else {
      return null ;
    }
  }
  return (
    <div>
      <Menu shadow="md" width={200}>
         <Menu.Target>
          <Avatar src={null} alt="no image here" style={{cursor:'pointer'}}>RP</Avatar>
      </Menu.Target>

         <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={ <User size={18} />} >
       My Profile
        </Menu.Item>
      {renderItemBasedOnRole(role)}
      <Menu.Item onClick={handleLogout} color='red' leftSection={<LogOut size={18}/>}>
        Log out
      </Menu.Item>
      </Menu.Dropdown>
        </Menu> 
    </div>
  )
}

export default ProfileDropdown
