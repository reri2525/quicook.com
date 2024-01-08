import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { url } from "../config";
import '../ScssFile/PasswordResetForm.scss'
function PasswordResetForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });
  const password = watch('password', '')
  const passwordConfirmation = watch('passwordConfirmation', '')
  const { id } = useParams<{id: string}>();
  const onSubmit = () => {
    axios.put(`${url}/password_resets/1`,{user: {password: password, password_confirmation: passwordConfirmation, email: id}},{ withCredentials: true }
    ).then(response => {
        if (response.data.status === true) {
          window.location.pathname = "/";
        }
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
                <button className='btn' type="button" onClick={event => handleSubmit(onSubmit)}>送信</button><br></br>
                <a className='password-warn'>パスワードは英文字または数字で6桁以上入力してください</a><br></br>
        </form>
    </div>
  )
}

export default PasswordResetForm