import { Fragment, useEffect, useState, useContext } from 'react'
import { MainContext } from '../App';
import '../ScssFile/FollowingIndex.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { url } from "../config";
import { TypeFollowing, TypeUser } from '../TypeDefinition/Type';
type Props = {
  user: TypeUser | undefined;
  setFollowingIndexModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function FollowingIndex(props: Props) {
  const context = useContext(MainContext)
  const loggedInStatus = context.loggedInStatus
  const user = props.user
  const currentUser = context.user
  const setFollowingIndexModal = props.setFollowingIndexModal
  const setPromptingAccountCreation = context.setPromptingAccountCreation
  const [following, setFollowing] = useState<TypeFollowing[]>([])
  useEffect(() => {
    user && openFollowModal(user.id)
  }, [])
  const openFollowModal = (id: number) => {
    axios.get(`${url}/following/${id}`, { withCredentials: true })
    .then(response => {
      const data = response.data
      setFollowing(data.following)
      console.log(data.following)
      console.log(data.count)
    })
  }

  const handleRelationship = (value: TypeFollowing) => {
    if (value.following) {
     relationshipDestroy(value.id)
    } else {
     relationshipCreate(value.id)
    }
  }

  const relationshipCreate = (id: number) => {
   if (loggedInStatus === "ログインなう") {
    axios.post("http://localhost:3001/relationships",  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
        user && openFollowModal(user.id)
      }
    })
    .catch(error => {
      console.log(error, "エラー")
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const relationshipDestroy = (id: number) => {
    axios.delete(`http://localhost:3001/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー解除")
        user && openFollowModal(user.id)
      }
    })
    .catch(error => {
      console.log(error, "エラー")
   })
  }

  const closeModal = () => {
    setFollowingIndexModal(false)
  }

  return (
   <Fragment>
    <div className='back_display2'></div>
    { user && user.id && (
    <div className='following_index_modal'>
      <h3>フォロー中</h3>
      <div className='following_innner'>
        {following.map((value: TypeFollowing, key:  number) => {
           return (
             <Fragment>
              <div className='following_content'>
               <div className='icon'>
                 <img src={value.avatar.url}></img>
                </div>
                <Link to={`/profile/${value.id}/page/1`} onClick={() => closeModal()} className='user_name'><a>{value.name}</a></Link>      
                { currentUser && currentUser.id === value.id ? 
                  <></>
                  : 
                  currentUser && value.following && currentUser.id ?
                    <a className="unfollow" onClick={() => handleRelationship(value)}>フォロー中</a>
                      :
                    <a className="follow" onClick={() => handleRelationship(value)}>フォローする</a>
                }
              </div>
             </Fragment>
           )
        })}
      </div>
      <div className='close' onClick={() => closeModal()}><a><CloseIcon /></a></div>
    </div>
    )}
   </Fragment>
  )
}

export default FollowingIndex