import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { url } from "../config";
import '../ScssFile/PasswordResetForm.scss'
function UpdateEmail() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });
  const { id } = useParams<{id: string}>();
  const { newEmail } = useParams<{newEmail: string}>();
  const onSubmit = () => {
    axios.put(`${url}/update_emails/1`,{user: {email: newEmail, id: id}},{ withCredentials: true }
    ).then(response => {
        if (response.data.status === true) {
          window.location.pathname = "/";
        } 
    }).catch(error => {
       console.log()
    })
  }
  return (
    <div className='reset_form'>
        <form className="form">
             <h1>入力してください</h1>
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
                <button className='btn' type="button" onClick={handleSubmit(onSubmit)}>送信</button><br></br>
                <a className='password-warn'>パスワードは英文字または数字で6桁以上入力してください</a><br></br>
        </form>
    </div>
  )
}

export default UpdateEmail