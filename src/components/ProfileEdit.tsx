import { useState, useEffect, Fragment, useContext } from 'react'
import '../ScssFile/ProfileEdit.scss'
import WarnModal from './WarnModal'
import axios from 'axios'
import { url } from "../config";
import { MainContext } from '../App';
import { TypeFileDetails, TypeUserProfileEdit } from '../TypeDefinition/Type';
function ProfileEdit() {
 const context = useContext(MainContext)
 const user: TypeUserProfileEdit = context.user as TypeUserProfileEdit;
 const [update, setUpdate] = useState<string | null>(null)
 const [errors, setErrors] = useState<string | null>(null)
 const [passwordReset, setPasswordReset] = useState<string | null>(null)
 const [name, setName] = useState(user && user.name)
 const [introduction, setIntroduction] = useState(user && user.introduction)
 const [email, setEmail] = useState(user && user.email)
 const [avatar, setAvatar] = useState<TypeFileDetails>()
 const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null | undefined>(user && user.avatar.url)
 const [warnModal, setWarnModal] = useState(false)
 const [disabled, setDisabled] = useState(true)
 const warnType: string = "acountDestroy"
 const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  setDisabled(false)
  event.preventDefault()
  const formData = new FormData();
  name && formData.append('user[name]', name);
  if (avatar) {formData.append('user[avatar]', avatar)}
  introduction && formData.append('user[introduction]', introduction);
  email && formData.append('user[email]', email);
  axios.put(`${url}/users/${user.id}`, formData)
    .then(response => {
      if (response.data.status === true) {
        setPasswordReset(null)
        setErrors(null)
        setUpdate("変更されました。")
        setDisabled(true)
      } else {
        setErrors("変更されませんでした。")
        setUpdate(null)
        setDisabled(true)
      }
      }).catch(error => {
        console.log(error)
        setErrors("変更されませんでした。")
        setUpdate(null)
        setDisabled(true)
      })
 }
 const filechange = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.target.files && setAvatar(event.target.files[0])
  const reader = new FileReader()
       reader.onload = (event: ProgressEvent<FileReader>) => {
           setAvatarPreview(event.target && event.target.result)
       };
       event.target.files && reader.readAsDataURL(event.target.files[0])
 }
 const handleDestroy = () => {
  setWarnModal(true)
 }
 const handlePasswordReset = () => {
  setDisabled(false)
  axios.post(`${url}/password_resets`, { email: user.email })
  .then(response => {
    setPasswordReset("メールを確認してください。")
    setUpdate(null)
    setDisabled(true)
  }).catch(error => {
    console.log(error)
    setErrors("エラーが発生しました.")
    setDisabled(true)
  })
 }
 useEffect(() => {
   if (warnModal) {
     document.body.style.overflow = 'hidden';
   } else {
     document.body.style.overflow = 'auto';
   }
 }, [warnModal])

 useEffect(() => {
    axios.get(`${url}/user/profile/edit`, { withCredentials: true })
    .then(response => {
      let user = response.data.user
      console.log(user)
      setName(user.name)
      setIntroduction(user.introduction)
      setEmail(user.email)
    }).catch(error => {
      console.log(error)
    })
 }, [])



 return (
  <Fragment>
   { user && (
    <div className='edit'>
      <div className='edit_container'>
        <form onSubmit={event => onSubmit(event)}>
         { update && <h3 className='update'>{update}</h3> }
         { errors && <h3 className='errors'>{errors}</h3> }
         { passwordReset && <h3 className='password_reset'>{passwordReset}</h3> }
         <div className='icon'>
         {avatarPreview && !(avatarPreview instanceof ArrayBuffer) && 
          <img className='image'
            src={avatarPreview}>
          </img>
         }
         {user && !(avatarPreview) &&
          <img className='image'
            src={user.avatar.url}>
          </img>
         }
         </div>
         <label className='icon_edit'>
           プロフィール写真の編集
           <input type='file' 
             className='image_input'
             accept='image/*'
             onChange={filechange}
           />
         </label><br/>
         <label>名前</label><br/>
         <input className='name'
          value={name}
          maxLength={10}
          onChange={event => setName(event.target.value)}
         /><br/>
         <label>自己紹介</label><br/>
         <textarea className='self_introduction'
          value={introduction}
          maxLength={130}
          onChange={event => setIntroduction(event.target.value)}
         /><br/>
         <label>メールアドレス</label><br/>
         <input className='email'
           value={email}
           onChange={event => setEmail(event.target.value)}
         /><br/>
         <button type='submit' className='update_button' disabled={!disabled}>更新する</button>
         <button type='button' className='password_reset_button' onClick={() => handlePasswordReset()} disabled={!disabled}>パスワード再設定</button>
         <button type='button' className='acount_destroy_button' onClick={() => handleDestroy()}>アカウント削除</button>
        </form>
      </div>
    </div>
   )}
    { warnModal ? <WarnModal setWarnModal={setWarnModal} warnType={warnType} user={user}/> : <></> }
  </Fragment>
  )
}

export default ProfileEdit