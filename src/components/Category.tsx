import { Fragment, useEffect, useState, useContext } from 'react'
import '../ScssFile/Home.scss'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StarIcon from '@mui/icons-material/Star';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { amber, grey, brown } from '@mui/material/colors';
import { url } from "../config";
import { MainContext } from '../App';
import { TypePost } from '../TypeDefinition/Type';
function Category() {
  const context = useContext(MainContext);
  const loggedInStatus = context.loggedInStatus;
  const bookmarkCreate = context.bookmarkCreate;
  const bookmarkDestroy = context.bookmarkDestroy;
  const heartCreate = context.heartCreate;
  const heartDestroy = context.heartDestroy;
  const { id } = useParams<{id: string}>();
  const { query } = useParams<{query: string}>();
  const numericId = parseInt(id);
  const history = useHistory();
  const [postall, setPostall] = useState<TypePost[]>([]);
  const [pagecount, setPagecount] = useState(1);
  const [currentPage, setCurrentPage] = useState(numericId);
  const page = [...Array(pagecount).keys()].map((i) => i + 1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [heartedPosts, setHeartedPosts] = useState<number[]>([]);
  const [postExist, setPostExist] = useState(true);

  useEffect(() => {
    setPostExist(true)
    setPostall([])
    postAllGet();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPostExist(true)
    setPostall([])
    setPagecount(1)
    setCurrentPage(1)
    postAllGet();
    setCurrentPage(numericId)
  }, [query]);

  const postShow = (id: number) => {
    history.push(`/posts/${id}`)
  };

  const postAllGet = () =>{
     axios.get(`${url}/category/${query}`, { params: { page: currentPage }, withCredentials: true })
    .then(response => {
      if (response.data.status) {
        const data = response.data.post_all
        setPostall(data)
        setPagecount(response.data.total_pages)
        console.log("投稿取得成功")
        for (let i = 0; i < data.length; i++) {
          bookmarkExist(data[i]);
        }
        for (let i = 0; i < data.length; i++) {
          heartExist(data[i]);
        }
        setPostExist(true)
      } else {
        setPagecount(0)
        setPostExist(false)
        console.log("投稿なし")
      }
    })
    .catch(error => {
      console.log("投稿取得エラー", error)
    })
  };

  const postAdd = (page: number) => {
    setCurrentPage(page)
    history.push(`/category/${query}/page/${page}`)
    window.scrollTo(0, 0);
  };

  const postBack = (currentPage: number) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      history.push(`/category/${query}/page/${currentPage - 1}`)
      }
    window.scrollTo(0, 0);
  };

  const postGo = (currentPage: number) => {
    if (currentPage !== pagecount) {
      setCurrentPage(currentPage + 1)
      history.push(`/category/${query}/page/${currentPage + 1}`)
    }
    window.scrollTo(0, 0);
  };

  const handleBookmark = (post: TypePost) => {
    if  (bookmarkedPosts.includes(post.id)) {
     bookmarkDestroy(post)
     setBookmarkedPosts(bookmarkedPosts.filter(id => id !== post.id));
    } else {
     bookmarkCreate(post)
     if (loggedInStatus === "ログインなう") {
      setBookmarkedPosts([...bookmarkedPosts, post.id]);
     }
    }
  };

  const bookmarkExist = (post: TypePost) => {
    setBookmarkedPosts((prevBookmarkedPosts) => {
      if (post.bookmarks && post.bookmarks[0]) {
        return [...prevBookmarkedPosts, post.id];
      } else {
        return prevBookmarkedPosts.filter(id => id !== post.id);
      }
    });
  };

  const handleHeart = (post: TypePost) => {
    if  (heartedPosts.includes(post.id)) {
     heartDestroy(post)
     setHeartedPosts(heartedPosts.filter(id => id !== post.id));
     post.heart_count = post.heart_count - 1
    } else {
     heartCreate(post)
     if (loggedInStatus === "ログインなう") {
      setHeartedPosts([...heartedPosts, post.id]);
      post.heart_count = post.heart_count + 1
     }
    }
  };

  const heartExist = (post: TypePost) => {
    setHeartedPosts((prevHeartedPosts) => {
      if (post.hearts && post.hearts[0]) {
        return [...prevHeartedPosts, post.id];
      } else {
        return prevHeartedPosts.filter(id => id !== post.id);
      }
    });
  };
  
  return (
    <Fragment>  
      { postExist ? 
         <></> 
           : 
         <Fragment>
           <div className='post_not_exist'>
             <h1>投稿が見つかりませんでした。</h1>
             <HighlightOffIcon className='highlight_off_icon' style={{fontSize: '100px'}}/>
           </div>
         </Fragment>
      } 
      { postall[0] ? 
      <Fragment>
      <h2 className='saerch_or_category_query'>カテゴリ「{query}」</h2>
      <div className='post_container'>
      {postall.map((value: TypePost, index: number) => {
         let iconColor;

         if (postall.length > 0) {
          if (value.id === postall[0].id) {
            iconColor = amber[500]; // 金色
          } else if (value.id === postall[1].id) {
            iconColor = grey[500]; // 銀色
          } else if (value.id === postall[2].id) {
            iconColor = brown[500]; // 銅色
          }
        }
         return (
         <Fragment>
          <div className='post' key={value.id} onClick={() => postShow(value.id)}>
           <div className='head'>
             <div className='icon'>
               <img src={value.user.avatar.url}></img>
               {index <= 2 && (
                <Fragment>
                 <StarIcon style={{ color: iconColor, fontSize: '60px', position: 'relative', top: '33px', right: '36px'}} />
                 <h2>{index + 1}</h2>
                </Fragment>
               )}
             </div>
               <Link to={`/profile/${value.user.id}/page/1`}
                  onClick={(e) => {e.stopPropagation();} }>
                     {value.user.name}
               </Link>
               <div className='bookmark' onClick={(e) => {e.stopPropagation(); handleBookmark(value); } }>
                    {bookmarkedPosts.includes(value.id) ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
               </div>
           </div>
           <div className='middle'>
              { value.file_type === "image" ? <img src={value.thumbnail.url}></img> : <></> }
              { value.file_type === "video" ? 
                  <Fragment>
                    <img src={value.thumbnail.url}></img>
                    <PlayCircleOutlineIcon className='play_icon' style={{fontSize: '50px', color: 'white', fontWeight: '200'}}/> 
                  </Fragment>
                     : 
                  <></> 
              }
           </div>
           <div className='foot'>
             <a>{value.title}</a>
             <div className='favorite' onClick={(e) => {e.stopPropagation(); handleHeart(value); }}>
                  {heartedPosts.includes(value.id) ? <FavoriteIcon style={{ color: 'red' }}/> : <FavoriteBorder/>}
             </div>
             <a className='heart_count'>{value.heart_count}</a>
           </div>
          </div>
         </Fragment> 
         )
       })}
      </div>
      </Fragment>
      : <></> }
      { postall.length === 0 && postExist ? 
               <div className='post_skeleton_container'>
                 {[...Array(20).keys()].map(i =>
                    <div className='post_skeleton'></div>
                 )}
               </div> :
      <div className='pagenate_container'>
       {pagecount > 1 ? 
       <div className='pagenate'><nav className='back'>back</nav>
        <button className='page_move' onClick={() => postBack(currentPage)}><NavigateBeforeIcon/></button>
        { currentPage === 1 ? "" :
         <button 
           className={1 === currentPage ? 'active' : ''}
           onClick={() => postAdd(1)}>
              1
          </button>}
        {pagecount > 6 && currentPage > pagecount - 6 ? 
        page.slice(pagecount - 6, pagecount ).map((page) => (
         <button 
          className={page === currentPage ? 'active' : ''}
          onClick={() => postAdd(page)}>
              {page}
         </button>
         )) :
        page.slice(currentPage < 7 && currentPage !== 1 ? 1 : currentPage - 1, currentPage === 1 ? currentPage + 6 : currentPage < 7 ? 7 : currentPage + 5 ).map((page) => (
         <button 
          className={page === currentPage ? 'active' : ''}
          onClick={() => postAdd(page)}>
              {page}
         </button>
         ))}
        <button className='page_move' 
           onClick={() => postGo(currentPage)}>
            <NavigateNextIcon/>
        </button>
        <nav className='next'>next</nav>
       </div> : <></> }
      </div>}
   </Fragment>
  )
} 

export default Category