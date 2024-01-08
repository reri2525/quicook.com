import { Fragment, useEffect } from 'react';
import '../ScssFile/New.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { url } from "../config";
type NewProps = {
  newModal: boolean,
  setFlashMessage: React.Dispatch<React.SetStateAction<string>>,
  setNewModal: React.Dispatch<React.SetStateAction<boolean>>,
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}
function Newmodal(props: NewProps) {
  const {
      register,
      reset,
      watch,
      handleSubmit,
      formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    });
  const name = watch('name', '')
  const email = watch('email', '')
  const password = watch('password', '')
  const passwordConfirmation = watch('passwordConfirmation', '')

  const CloseModal = () => {
    props.setNewModal(false)
    props.setModal(false)
    reset();
  }

  const onSubmit = (event: any) => {
    axios.post(`${url}/users`,
        {
            user: {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            }
        },
        { withCredentials: true }
    ).then(response => {
        if (response.data.status === 'created') {
            CloseModal()
            props.setFlashMessage("メールを確認してアカウントを有効にしてください。")
            setTimeout(() => {
              props.setFlashMessage("");
            }, 5000);
        }
    }).catch(error => {
        console.log("registration error", error)
    })
    event.preventDefault()
}

useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = 'auto';
  };
},[])

return ( 
    <Fragment>
        <div className="back_display2">
          
        </div>
        <div className="form_modal_new">
         <form className="form_new">
             <h1>アカウント作成</h1>
                <label>名前</label><br></br>
                <input className={errors.name ? 'input_errors' : 'input'}
                    type="name"
                    {...register('name', { required: true, maxLength: 20})}
                /><br></br>
                {errors.name?.type === 'required' && (
                  <div className='errors'>※名前が入力されていません</div>
                )}
                {errors.name?.type === 'maxLength' && (
                  <div className='errors'>※名前が長すぎます!</div>
                )}
                <label>メールアドレス</label><br></br>
                <input className={errors.email ? 'input_errors' : 'input'}
                    type="email"   
                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}                     
                /><br></br>
                {errors.email?.type === 'required' && (
                  <div className='errors'>※メールアドレスが入力されていません</div>
                )}
                {errors.email?.type === 'pattern' && (
                  <div className='errors'>※有効なメールアドレスを入力してください</div>
                )}
                <label>パスワード</label><br></br>
                <input className={errors.password ? 'input_errors' : 'input'}
                    type="password"
                    {...register('password', { required: true, minLength: 6})}                     
                /><br></br>
                {errors.password?.type === 'required' && (
                  <div className='errors'>※パスワードが入力されていません</div>
                )}
                {errors.password?.type === 'minLength' && (
                  <div className='errors'>※パスワードが短すぎます!</div>
                )}
                <label>パスワード確認</label><br></br>
                <input className={errors.passwordConfirmation ? 'input_errors' : 'input'}
                    type="password"
                    {...register('passwordConfirmation', { 
                      required: true, 
                      minLength: 6,
                      validate: (value) =>
                      value === watch('password'),
                    })}                     
                /><br></br>
                {errors.passwordConfirmation?.type === 'required' && (
                  <div className='errors'>※パスワードが入力されていません</div>
                )}
                {errors.passwordConfirmation?.type === 'minLength' && (
                  <div className='errors'>※パスワードが短すぎます!</div>
                )}
                {errors.passwordConfirmation?.type === 'validate' && (
                  <div className='errors'>※パスワードが一致しません</div>
                )}
                <button className='btn' type="button" onClick={handleSubmit(onSubmit)}>アカウントを作成</button><br></br>
                <a className='password-warn'>パスワードは英文字または数字で6桁以上入力してください</a><br></br>
               <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
            </form>
        </div>

          
    </Fragment>
)
}
export default Newmodal;