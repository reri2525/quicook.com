import { useState, useContext } from 'react';
import { MainContext } from '../App';
import '../ScssFile/Header.scss'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
type Props = {
  setPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function Header(props: Props) {
 const context = useContext(MainContext)
 const loggedInStatus = context.loggedInStatus
 const user = context.user
 const handleLogout = context.handleLogout
 const [searchQuery, setSearchQuery] = useState("")
 const history = useHistory();
 const ShowLogModal = () => {
  props.setLogModal(true)
  props.setModal(true)
 }
 const ShowNewModal = () => {
  props.setNewModal(true)
  props.setModal(true)
 }
 const ShowPostModal = () => {
  props.setPostModal(true)
 }
if (loggedInStatus === '未ログイン') {
return (
    <header>
        <Link to="/" className="main_title title_link">Quicook</Link>
        <form className='search' onSubmit={event => event.preventDefault()}>
         <input  
           placeholder="料理名でレシピを探す。"
           value={searchQuery}
           onChange={event => setSearchQuery(event.target.value)}
         >
         </input>
         <a onClick={() => setSearchQuery("")}><CloseIcon /></a>
         <button className='search_button' onClick={() => searchQuery !== '' && history.push(`/search/${searchQuery}/page/1`)}><SearchIcon /></button>
        </form>
        <a className="log" onClick={() => ShowLogModal()}>ログイン</a>
        <a className="log" onClick={() => ShowNewModal()}>新規登録</a>
    </header>
    );
} else if (loggedInStatus === 'ログインなう') {
return (
    <header className="header_login">
      <Link to="/home/page/1" className="main_title title_link">Quicook</Link>
      <Link to={`/profile/${user && user.id}/page/1`} className={window.location.pathname == `/profile/${user && user.id}/page/1` ? 'onprofile' : 'profile'}>
      <img className='image'
        src={user && user.avatar.url}>
      </img>
      </Link>
      <form className='search' onSubmit={event => event.preventDefault()}>
        <input  
           placeholder="料理名でレシピを探す。"
           value={searchQuery}
           onChange={event => setSearchQuery(event.target.value)}
        >
        </input>
        <a onClick={() => setSearchQuery("")}><CloseIcon /></a>
        <button className='sarch_btn' onClick={() => searchQuery !== '' && history.push(`/search/${searchQuery}/page/1`)}><SearchIcon /></button>
      </form>
      <a className="log2" onClick={() => handleLogout()}>ログアウト</a>
      <a className='post_create' onClick={() => ShowPostModal()}><a><CreateIcon /></a></a>
    </header>
);
} else {
  return (
    <></>
  )
}

}
export default Header;