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
 const [name, setName] = useState(user && user.name)
 const [nameChange, setNameChange]= useState(user && user.name)
 const [introduction, setIntroduction] = useState(user && user.introduction)
 const [email, setEmail] = useState(user && user.email)
 const [avatar, setAvatar] = useState<TypeFileDetails>()
 const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null | undefined>(user && user.avatar.url)
 const [password, setPassword] = useState("")
 const [passwordConfirmation, setPasswordConfirmation] = useState("")
 const [warnModal, setWarnModal] = useState(false)
 const warnType = "acountDestroy"
 const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  console.log(user && user.id)
  event.preventDefault()
  const formData = new FormData();
  name && formData.append('user[name]', name);
  if (avatar) {formData.append('user[avatar]', avatar)}
  introduction && formData.append('user[introduction]', introduction);
  email && formData.append('user[email]', email);
  formData.append('user[password]', password);
  formData.append('user[password_confirmation]', passwordConfirmation);
  axios.put(`${url}/users/${user && user.id}`, formData)
    .then(response => {
      if (response.data.status === true) {
        const data = response.data
        user && (user.name = data.user.name)
        user && (user.introduction = data.user.introduction)
        user && (user.email = data.user.email)
        user && (user.avatar = data.user.avatar)
        setNameChange(data.user.name)
        setErrors(null)
        setUpdate("変更されました。")
        window.scrollTo(0, 0);
      } else if (response.data.status === "update_email") {
        setErrors(null)
        setUpdate("メールを確認して承認してください。")
        window.scrollTo(0, 0);
      } else {
        setErrors("変更されませんでした。")
        setUpdate(null)
        window.scrollTo(0, 0);
      }
      }).catch(error => {
        setErrors("変更されませんでした。")
        setUpdate(null)
        window.scrollTo(0, 0);
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
 useEffect(() => {
   if (warnModal) {
     document.body.style.overflow = 'hidden';
   } else {
     document.body.style.overflow = 'auto';
   }
   setEmail(user && user.email)
 }, [warnModal])
 return (
  <Fragment>
   { user && (
    <div className='edit'>
      <div className='edit_container'>
        <form onSubmit={event => onSubmit(event)}>
         { update && <h3 className='update'>{update}</h3> }
         { errors && <h3 className='errors'>{errors}</h3> }
         <div className='icon'>
         {avatarPreview && !(avatarPreview instanceof ArrayBuffer) && 
          <img className='image'
            src={avatarPreview}>
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
         <button type='submit' className='update_button'>更新する</button>
         <button type='button' className='password_reset_button' onClick={() => handleDestroy()}>パスワード再設定</button>
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