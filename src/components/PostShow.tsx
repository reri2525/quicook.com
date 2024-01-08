import { Fragment, useEffect, useState, useRef, useContext } from 'react';
import { MainContext } from '../App';
import '../ScssFile/PostShow.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import WarnModal from './WarnModal'
import { url } from "../config";
import { TypePostShow, TypePostAmounts, TypePostMaterials } from '../TypeDefinition/Type';

const PostShow = () => {
 const context = useContext(MainContext)
 const ref = useRef(null);
 const history = useHistory();
 const currentUser = context.user
 const relationshipCreate = context.relationshipCreate
 const relationshipDestroy = context.relationshipDestroy
 const bookmarkCreate = context.bookmarkCreate
 const bookmarkDestroy = context.bookmarkDestroy
 const heartCreate = context.heartCreate
 const heartDestroy = context.heartDestroy
 const loggedInStatus = context.loggedInStatus
 const [post, setPost] = useState<TypePostShow | undefined>(undefined)
 const [bookmarked, setBookmarked] = useState(false)
 const [hearted, setHearted] = useState(false)
 const [relationship, setRelationship] = useState(false)
 const [warnModal, setWarnModal] = useState(false)
 const [warnType, setWarnType] = useState("postDestroy")
 const { id } = useParams<{id: string}>();

 useEffect(() => {
  openPostShow(id)
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = 'auto';
  };
 }, [id])

 const openPostShow = (id: string) => {
   axios.get(`${url}/posts/${id}`, { withCredentials: true })
   .then(response => {
    if (response.data.post) {
      const data = response.data.post
      console.log(data)
      setPost(data)
      setBookmarked(data.bookmarked)
      setHearted(data.hearted)
      setRelationship(data.relationship)
    }
   })
   .catch(error => {
    console.log("b")
   })
 }
 const handleBookmark = (post: TypePostShow) => {
   console.log("ハンドルブックマーク")
   if (bookmarked) {
      setBookmarked(false)
      bookmarkDestroy(post)
   } else {
     if (loggedInStatus === "ログインなう") {
      setBookmarked(true)
     }
      bookmarkCreate(post)
   }
 }
 const handleHeart = (post: TypePostShow) => {
   console.log("ハンドルハート")
   if (hearted) {
    setHearted(false)
    heartDestroy(post)
    post.hearts_count = post.hearts_count - 1
   } else {
    heartCreate(post)
    if (loggedInStatus === "ログインなう") {
     setHearted(true)
     post.hearts_count = post.hearts_count + 1
    }
   }
 }
 const handleRelationship = (id: number) => {
   if (relationship) {
    setRelationship(false)
    relationshipDestroy(id)
   } else {
    if (loggedInStatus === "ログインなう") {
      setRelationship(true)
    }
    relationshipCreate(id)
   }
 }
 return (
  <Fragment>
    <div className='back_display2'></div>
    { post && post.user.id && (
    <div className='post_show_container' ref={ref}>
      <div className='head'>
        <div className='icon'>
          <img src={post.user.avatar.url} alt="user-avatar"></img>
        </div>
        <Link to={`/profile/${post.user.id}/page/1`}>{post.user.name}</Link>
        { currentUser && currentUser.id === post.user.id ?
          <></>
          :
          relationship ?
            <div className="unfollow" onClick={() => handleRelationship(post.user.id)}>フォロー中</div>
            :
            <div className="follow" onClick={() => handleRelationship(post.user.id)}>フォローする</div>
        }
      </div>
      <div className='middle'>
        <div className='post_display'>
          <div className='post_image_display'>
            {post.file_type === "image" ? <img src={post.image.url} alt="post-image"></img> : <></>}
            {post.file_type === "video" ? <video autoPlay controls src={post.image.url}></video> : <></>}
          </div>
          <div className='favorite_container'>
            <div className='bookmark' onClick={() => handleBookmark(post)}>
              {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              <a>保存する</a>
            </div>
            <div className='heart' onClick={() => handleHeart(post)}>
              {hearted ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorder />}
              <a>{post.hearts_count}</a>
            </div>
          </div>
        </div>
        <div className='post_detail'>
          <div className='post_detail_content'>
            <h2>{post.title}</h2>
            <a>{post.content}</a><br />
            <p>時間:　{post.time}分</p>
            <p>費用:　{post.cost}円</p>
            <h3>材料:</h3>
            <p style={{ fontSize: '16px', opacity: '0.8' }}>({post.number_of_people})</p>
            {[...Array(15)].map((_, i) => (
              post.materials[`material_${i + 1}` as keyof TypePostMaterials] && post.amounts[`amount_${i + 1}` as keyof TypePostAmounts] ?
               <div key={`material_${i + 1}`} className="material">
                 <a>{post.materials[`material_${i + 1}` as keyof TypePostMaterials]}</a>
                 <a className='amount_detail'>{post.amounts[`amount_${i + 1}` as keyof TypePostAmounts]}</a>
               </div>
                  :
               <Fragment key={`material_${i + 1}`} />
            ))}
            <h3>作り方:</h3>
            <a>{post.process}</a>
            <h3>ひとこと:</h3>
            <a>{post.coment}</a>
          </div>
        </div>
      </div>
      {currentUser && currentUser.id === post.user.id ?
        <div className='delete' onClick={() => setWarnModal(true)}><DeleteIcon style={{ fontSize: '30px', cursor: 'pointer' }} /></div>
        :
        <></>
      }
      <div className='close' onClick={() => history.goBack()}><a><ArrowBackIcon /></a></div>
    </div>
     )}
    {warnModal ? <WarnModal setWarnModal={setWarnModal} warnType={warnType} post={post} /> : <></>}
  </Fragment>
  )
 }

export default PostShow