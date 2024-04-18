import React, { useState, useEffect } from 'react';
import { Paper, Popover, Typography, Box, Avatar, CircularProgress } from '@mui/material';
import { userstyle } from './userstyle';
import { useNavigate } from 'react-router-dom';
import { getusers } from '../../store/userslice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UserListPage() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(getusers());
        notifySuccess()
    }, []);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const notifySuccess = () =>
        toast.success("Hover in Your Name To Show Your Details...", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

        });
    const handleUserMouseEnter = (event, user) => {
        setAnchorEl(user);
        setSelectedUser(user);
    };
    const handleUserMouseLeave = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };
    const gotoUserpage = () => {
        Navigate(`/user/${selectedUser.id}`, { state: selectedUser })
    };
    return (
        <Box >
            <Typography sx={userstyle.list}>User List</Typography>
            <Paper elevation={7} sx={userstyle.mainpaper}>
                {isLoading ? (
                    <Box sx={userstyle.loading}>
                        <CircularProgress />
                        <Typography sx={userstyle.loadingtext}>Loading...</Typography>
                    </Box>
                ) : (
                    users.map((user) => (
                        <Paper
                            elevation={6}
                            key={user.id}
                            onMouseEnter={(event) => handleUserMouseEnter(event, user)}
                            sx={userstyle.userPaper}
                        >
                            <Avatar><Typography sx={userstyle.userno}>{user.id}</Typography></Avatar>
                            <Typography sx={userstyle.name}>{user.name}</Typography>

                        </Paper>
                    ))
                )}

            </Paper>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleUserMouseLeave}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',

                }}
                PaperProps={{
                    sx: { ...userstyle.paperprops }
                }}
            >
                {selectedUser && (
                    <Box sx={userstyle.mainbox} onClick={gotoUserpage} >
                        <Box sx={userstyle.namebox}>
                            <Typography sx={userstyle.text}>UserName:</Typography>
                            <Typography>{selectedUser.name}</Typography>
                        </Box>
                        <Box sx={userstyle.namebox}>
                            <Typography sx={userstyle.text}>Email Id:</Typography>
                            <Typography>{selectedUser.email}</Typography>
                        </Box>
                        <Box sx={userstyle.namebox}>
                            <Typography sx={userstyle.text}>NickName:</Typography>
                            <Typography>{selectedUser.username}</Typography>
                        </Box>
                    </Box>
                )}
            </Popover>
            <ToastContainer />
        </Box>
    );
}
