import { Fragment, useEffect, useState, useContext } from 'react'
import { MainContext } from '../App';
import '../ScssFile/FollowersIndex.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { url } from "../config";
import { TypeFollowers, TypeUser } from '../TypeDefinition/Type';
type Props = {
  user: TypeUser | undefined;
  setFollowersIndexModal: React.Dispatch<React.SetStateAction<boolean>>
}
function FollowersIndex(props: Props) {
  const context = useContext(MainContext)
  const loggedInStatus = context.loggedInStatus
  const user = props.user
  const currentUser = context.user
  const setFollowersIndexModal = props.setFollowersIndexModal
  const setPromptingAccountCreation = context.setPromptingAccountCreation
  const [followers, setFollowers] = useState<TypeFollowers[]>([])
  useEffect(() => {
    user && openFollowModal(user.id)
  }, [])
  const openFollowModal = (id: number) => {
    axios.get(`${url}/followers/${id}`, { withCredentials: true })
    .then(response => {
      const data = response.data
      setFollowers(data.followers)
      console.log(data.followers)
      console.log(data.count)
    })
  }

  const handleRelationship = (value: TypeFollowers, key: number) => {
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
        setTimeout(() => {
          console.log(followers);
        }, 6000);
      }
    })
    .catch(error => {
      console.log("エラー")
    })
   } else {
      setPromptingAccountCreation(true)
   }
  }

  const relationshipDestroy = (id: number) => {
    axios.delete(`http://localhost:3001/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log(response.data.post)
        user && openFollowModal(user.id)
        setTimeout(() => {
          console.log(followers);
        }, 6000);
      }
    })
    .catch(error => {
      console.log("エラー")
   })
  }

  const closeModal = () => {
    setFollowersIndexModal(false)
  }

  return (
   <Fragment>
    <div className='back_display2'></div>
    { user && user.id && (
    <div className='followers_index_modal'>
      <h3>フォロワー</h3>
      <div className='followers_innner'>
          {followers.map((value: TypeFollowers, key: number) => {
            return (
             <Fragment>
               <div className='followers_content'>
                <div className='icon'>
                { value.avatar.url && <img src={value.avatar.url}></img> }
                </div>
                { value.id && <Link to={`/profile/${value.id}/page/1`} onClick={() => closeModal()} className='user_name'><a>{value.name}</a></Link> }
                { currentUser && currentUser.id === value.id ? 
                  <></>
                  : 
                  currentUser && value.following && currentUser.id ?
                    <a className="unfollow" onClick={() => handleRelationship(value, key)}>フォロー中</a>
                      :
                    <a className="follow" onClick={() => handleRelationship(value, key)}>フォローする</a>
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

export default FollowersIndex