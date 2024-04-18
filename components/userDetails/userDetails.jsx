import { Typography, Box, Grid, Paper, Avatar, Divider, TextField } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { details } from './details';
import img from "../../assets/person.jpg";
import img2 from "../../assets/upwordfingergif.gif";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { ArrowUpward, Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from '@mui/material';
import { Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img4 from "../../assets/no result.gif"

export default function UserdetailsPage() {

    const location = useLocation()
    const data = location.state
    const { id } = useParams()
    const [specifiuserPost, setspecificuserPost] = useState([])

    const [allbums, setallAllbums] = useState([])
    const [photos, setallPhotos] = useState([])
    const [isClicked, setisClicked] = useState(true)
    const [isClicked2, setisClicked2] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [editedPost, setEditedPost] = useState(
        {
            id: "",
            title: "",
            body: ""
        }
    );
    const [commentInput, setCommentInput] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [postComments, setPostComments] = useState({});
    const [search, setSearch] = useState("");
    const [updatedPosts, setupdatedPost] = useState([])

    useEffect(() => {
        fetchallPost();
        fetchallcomments();
        fetchallAllbums();
        fetchallPhotos();

    }, []);

    const fetchallPost = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch users posts');
            }
            const data = await response.json();
            const filteredPosts = data.filter((post) => post.userId == id);
            setspecificuserPost(filteredPosts);
        } catch (error) {
            console.error('Error fetching users posts:', error);
        }

    }
    const fetchallcomments = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
            if (!response.ok) {
                throw new Error('Failed to fetch users comments');
            }
            const data = await response.json();
           
            const postComments = {};
            data.forEach(comment => {
                if (!postComments[comment.postId]) {
                    postComments[comment.postId] = [];
                }
                postComments[comment.postId].push(comment);
               console.log(comment,"000")
            });
            setPostComments(postComments);
          


        } catch (error) {
            console.error('Error fetching users comments:', error);
        }

    }
    const fetchallAllbums = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
            if (!response.ok) {
                throw new Error('Failed to fetch users allbums');
            }
            const data = await response.json();
            const filteredAllbums = data.filter((allbum) => allbum.userId == id);
            setallAllbums(filteredAllbums)

        } catch (error) {
            console.error('Error fetching users allbums:', error);
        }

    }
    const fetchallPhotos = async () => {
        try {
            const response = await fetch(` https://jsonplaceholder.typicode.com/photos`);
            if (!response.ok) {
                throw new Error('Failed to fetch users photos');
            }
            const data = await response.json();
            setallPhotos(data)

        } catch (error) {
            console.error('Error fetching users photos:', error);
        }

    }
    const notifySuccess = () =>
        toast.success("Post Sucessfully Edited...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

        });
    const notifySuccess1 = () =>
        toast.success("Post Sucessfully Deleted...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

        });
    const notifySuccess2 = () =>
        toast.success("Comment Sucessfull...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

        });
    const hideImg = () => {
        setisClicked(!isClicked)
    }
    const hideImg2 = () => {
        setisClicked2(!isClicked2)
    }
    const gotoUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }
    const handleDeleteclick = (postId) => {

        const updatedPosts = specifiuserPost.filter((post) => post.id !== postId);
        notifySuccess1()
        setspecificuserPost(updatedPosts);
    };

    const handleEdit = (post) => {
        setEditedPost(post);
        setOpenModal(true);
    };
    const handleEditchange = (event) => {
        const { name, value } = event.target
        setEditedPost((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSave = () => {
        const updatedPosts = specifiuserPost.map((post) =>
            post.id === editedPost.id ? { ...post, title: editedPost.title, body: editedPost.body } : post
        );
  
        setspecificuserPost(updatedPosts);
        setOpenModal(false);
        notifySuccess()
    };
    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value);
    };
    const handleAddComment = (postId) => {
        if (!commentInput.trim()) {
            return;
        }
        const newComment = {
            postId: postId,
            body: commentInput
        };
        const updatedComments = { ...postComments };
        if (!updatedComments[postId]) {
            updatedComments[postId] = [];
        }
        updatedComments[postId].push(newComment);
        notifySuccess2()
        setPostComments(updatedComments);
        setOpenModal2(false)
        setCommentInput('');
    };
    const searchChange = (e) => {
        const searchss = e.target.value
        setSearch(e.target.value)
        switch (searchss) {
            case "searchss":
                setupdatedPost(specifiuserPost.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())))
            default:
                setupdatedPost(specifiuserPost.filter((item) => item.body.toLowerCase().includes(search.toLowerCase())))
            break;
        }
    }
    useEffect(() => {
        setupdatedPost(specifiuserPost)
    }, [specifiuserPost])
    return <>
        <Box sx={details.mainBox}>
            <Grid container sx={details.maingrid} columnGap={2.2}>
                <Grid item  xs={12} sm={3} md={2.7} lg={3}>
                    <Paper sx={details.leftgrid} elevation={7}>
                        <Box>
                            <Box sx={details.textbox}>
                                <Typography sx={details.personaltext}>Personal Details</Typography>
                            </Box>
                            <Box sx={details.pdetails1}>
                                <Avatar sx={details.avatarimg} src={img} ></Avatar>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Username:</Typography>
                                    <Typography sx={details.nameemail}>{data.name}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Email Id:</Typography>
                                    <Typography sx={details.nameemail}>{data.email}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Phone No:</Typography>
                                    <Typography>{data.phone}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Nick Name:</Typography>
                                    <Typography>{data.username}</Typography>
                                </Box>

                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Company Name:</Typography>
                                    <Typography>{data.company.name}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Website:</Typography>
                                    <Typography>{data.website}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={details.divider1}></Divider>
                            <Box sx={details.addrestext}>
                                <HomeIcon sx={details.addressicon} />
                                <Typography sx={details.addresstext1}> Address </Typography>

                            </Box>
                            <Box sx={details.homeaddress}>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>City:</Typography>
                                    <Typography>{data.address.city}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Street:</Typography>
                                    <Typography>{data.address.street}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Zip:</Typography>
                                    <Typography>{data.address.zipcode}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Lat:</Typography>
                                    <Typography>{data.address.geo.lat}</Typography>
                                </Box>
                                <Box sx={details.addressdeatils}>
                                    <Typography sx={details.detailstext}>Lng:</Typography>
                                    <Typography>{data.address.geo.lng}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={details.divider2}></Divider>
                            <Box sx={details.profesiontext}>
                                <WorkIcon sx={details.addressicon} />
                                <Typography sx={details.addresstext1}>   Profession</Typography>

                            </Box>

                            <Box sx={details.domainwork}>
                                <Typography sx={details.detailstext}>Domain:</Typography>
                                <Typography sx={details.worktext}>{data.company.bs}</Typography>
                            </Box>
                            <Box sx={details.domainwork}>
                                <Typography sx={details.detailstext}>Work:</Typography>
                                <Typography sx={details.worktext}>{data.company.catchPhrase}</Typography>
                            </Box>
                        </Box>
                        <Divider sx={details.divider2}></Divider>
                        <Box sx={details.sociallinkbox}>
                            <LinkIcon sx={details.icon} />
                            <Typography sx={details.addresstext1}> Social Link </Typography>
                        </Box>
                        <Box sx={details.lastbox}>
                            <Box sx={details.plans}>
                                <Typography sx={details.detailstext}>Website:</Typography>
                                <Link href="https://www.tripfriday.com/" target="_blank">
                                    Our Website
                                </Link>
                            </Box>
                            <Box sx={details.plans}>
                                <Typography sx={details.detailstext}>Plans:</Typography>
                                <Link href="https://www.tripfriday.com/" target="_blank">
                                    Our Plans
                                </Link>
                            </Box>
                            <Box sx={details.plans}>
                                <Typography sx={details.detailstext}>Posts</Typography>
                                <Link href="https://www.tripfriday.com/" target="_blank">
                                    Our Posts
                                </Link>
                            </Box>




                        </Box>
                        <Box sx={details.iconbox}>
                            <Facebook sx={details.ficon} />
                            <Twitter sx={details.ticon} />
                            <Instagram sx={details.iicon} />
                            <LinkedIn sx={details.licon} />
                        </Box>

                        <Box>

                        </Box>


                    </Paper>

                </Grid>
                <Grid item  xs={12} sm={4} md={5} lg={4.8}>
                    <Paper sx={details.middlegrid} elevation={7}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={details.expandicon} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                onClick={hideImg}
                                sx={details.accordinsummary}



                            >
                                View Your all Posts
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    label="Search Posts..."
                                    id="outlined-start-adornment"
                                    sx={{ width: '100%' }}
                                    onChange={searchChange}

                                />
                                <Divider sx={details.divider3}></Divider>
                                <Box sx={details.postbox}>
                                    {updatedPosts.length > 1 ? <>
                                        {updatedPosts.map((post) => {
                                      
                                            return (
                                                <>
                                                    <Paper key={post.id} sx={details.postpaper} elevation={7}>
                                                        <Box sx={details.titlebox}>

                                                            <Typography sx={details.titletext}>Title</Typography>
                                                            <Typography sx={details.title}>{post.title}</Typography>


                                                            <Typography sx={details.titletext}>Message body</Typography>
                                                            <Typography sx={details.bodytext}>{post.body}</Typography>

                                                        </Box>


                                                        <Box sx={details.btnbox}>
                                                            <Button onClick={() => handleEdit(post)} variant="contained" sx={details.editbtn}>Edit <CreateIcon sx={details.btnicon} /></Button>
                                                            <Button onClick={() => { setSelectedPostId(post.id); setOpenModal2(true); }} variant="contained" sx={details.msgbtn}>Comment <SendIcon sx={details.btnicon} /></Button>
                                                            <Button onClick={() => handleDeleteclick(post.id)} variant="contained" sx={details.deletebtn}>Delete <DeleteIcon sx={details.btnicon} /></Button>
                                                        </Box>
                                                        <Dialog open={openModal} onClose={handleCloseModal}>
                                                            <Box sx={details.dialogbox}>
                                                                <DialogTitle>Edit Your Post</DialogTitle>
                                                                <CloseIcon sx={details.clsicon} onClick={handleCloseModal} />
                                                            </Box>
                                                            <DialogContent sx={details.dialogcontent1}>
                                                                <TextField
                                                                    label="Title"
                                                                    fullWidth
                                                                    value={editedPost.title}
                                                                    name="title"
                                                                    sx={{ width: { md: "500px", xs: "100%" } }}
                                                                    onChange={handleEditchange}
                                                                />
                                                                <TextField
                                                                    label="Message Body"

                                                                    multiline
                                                                    fullWidth
                                                                    name="body"
                                                                    rows={4}
                                                                    value={editedPost.body}
                                                                    onChange={handleEditchange}
                                                                />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button variant="contained" color="error" onClick={handleCloseModal} sx={details.savecancel}>Cancel</Button>
                                                                <Button variant="contained" color="success" onClick={handleSave} sx={details.savecancel}>Save</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                        <Dialog open={openModal2} onClose={() => setOpenModal2(false)}>
                                                            <Box sx={details.dialogbox}>
                                                                <DialogTitle>Post Comment</DialogTitle>
                                                                <CloseIcon sx={details.clsicon} onClick={() => setOpenModal2(false)} />
                                                            </Box>
                                                            <DialogContent
                                                                sx={details.dailogcontent2}>
                                                                <TextField
                                                                    label="Add Comment...."
                                                                    multiline
                                                                    fullWidth
                                                                    rows={4}
                                                                    value={commentInput}
                                                                    onChange={handleCommentInputChange}
                                                                />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={() => setOpenModal2(false)} sx={details.cancelcomment} variant="contained" color="error">Cancel</Button>
                                                                <Button onClick={() => { handleAddComment(selectedPostId); setOpenModal2(false) }} sx={details.cancelcomment} variant="contained" color="success">Comment</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </Paper>
                                                    <Box sx={details.cmtbox}>
                                                        <Box sx={details.cmttext}>
                                                            <CommentIcon />
                                                            <Typography sx={details.cmttext2}>Comments</Typography>
                                                        </Box>
                                                        <Divider sx={details.cmtDivider}></Divider>
                                                    </Box>

                                                    <Box >
                                                        {postComments[post.id] && postComments[post.id].map((comment) => {
                                                            return (
                                                                <>
                                                                    <Box key={comment.id} sx={details.updatecmtbox}>

                                                                        <Avatar sx={details.cmtavatar} src={img} />
                                                                        <Typography key={comment.id} sx={details.cmtbody}>{comment.body}...</Typography>

                                                                    </Box>
                                                                </>
                                                            );
                                                        })}
                                                    </Box>
                                                </>
                                            );
                                        })}
                                    </> :
                                        <Box component={"img"} src={img4} sx={details.fallbackimg}></Box>
                                    }
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        {isClicked ? <Box sx={details.isclicked}>
                            <Box component={"img"} src={img2} sx={details.upimg}>
                            </Box>
                            <Typography>Click Above To See Your All Posts....</Typography>
                        </Box> : (<></>)}
                    </Paper>
                </Grid>
                <Grid item  xs={12} sm={4} md={4} lg={3.9}>
                    <Paper sx={details.rightgrid} elevation={7} >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={details.expandicon} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                onClick={hideImg2}
                                sx={details.allbumsummary}
                            >
                                View Your all Albums
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider sx={details.lastdivider}></Divider>
                                <Box sx={details.allbumbox}>

                                    {allbums.map((item) => {
                                        const userAlbum = photos.filter(photo => photo.albumId === item.id).slice(0, 5);
                                        return (
                                            <>

                                                <Accordion key={item.id}
                                                    sx={details.accord}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        {item.title}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box sx={details.details}>
                                                            {userAlbum.map((photo) => (
                                                                <Box key={photo.id} component="img" src={photo.url} sx={details.allbums} />
                                                            ))}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>

                                            </>
                                        );
                                    })}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Box sx={details.upbtn}>
                            <Avatar onClick={gotoUp} sx={details.uparrow}><ArrowUpward /></Avatar>
                        </Box>
                        {isClicked2 ? <Box sx={details.upimg1}>
                            <Box component={"img"} src={img2} sx={details.imgs}>
                            </Box>
                            <Typography >Click Above To See Your Allbums...</Typography>
                        </Box> : (<></>)}
                    </Paper>
                </Grid>
            </Grid>
            <ToastContainer />
        </Box>
    </>
}