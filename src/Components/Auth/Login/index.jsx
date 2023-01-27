import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import { login } from 'redux/auth/thunks';
import { cleanError } from 'redux/auth/actions';
import { Input, ButtonText, ErrorSuccessModal, Preloader } from 'Components/Shared';
import styles from './login.module.css';
import { useState } from 'react';

const schema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid email format',
      'string.empty': 'Email is a required field'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain both letters and numbers',
      'string.empty': 'Password is a required field'
    })
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const [showAccounts, setShowAccounts] = useState(false);

  const closeModal = () => {
    dispatch(cleanError());
  };

  const onSubmit = (data) => {
    return dispatch(login(data)).then((response) => {
      if (response) {
        switch (response.payload?.role) {
          case 'EMPLOYEE':
            return history.push('/employee');
          case 'ADMIN':
            return history.push('/admin');
          case 'SUPERADMIN':
            return history.push('/super-admin');
          default:
            break;
        }
      }
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    },
    shouldFocusError: false
  });

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Input
            label="Email"
            register={register}
            name="email"
            type="text"
            placeholder="juanperez@gmail.com"
            error={errors.email?.message}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            register={register}
            error={errors.password?.message}
          />
          <ButtonText clickAction={handleSubmit(onSubmit)} label={'Login'} enter />
        </div>
        {isLoading ? (
          <Preloader />
        ) : (
          <div className={styles.errorSuccessModal}>
            <ErrorSuccessModal
              show={!!error}
              closeModal={closeModal}
              closeModalForm={closeModal}
              successResponse={{ message: 'Wrong email or password', data: {}, error: true }}
            />
          </div>
        )}
      </form>
      <div className={showAccounts ? styles.container : styles.containerTwo}>
        <ButtonText
          clickAction={() => setShowAccounts(!showAccounts)}
          label={!showAccounts ? 'Show accounts' : 'Hide accounts'}
        />
        <div
          style={
            showAccounts
              ? { display: 'block', width: '100%', maxWidth: 440, margin: '15px 0px' }
              : { display: 'none' }
          }
        >
          <div className={styles.cardAccount}>
            <p className={styles.titleCard}>SuperAdmin</p>
            <p className={styles.textAccount}>
              <span>Username:</span>
              <span>superadmin@gmail.com</span>
            </p>
            <p className={styles.textAccount}>
              <span>Password:</span>
              <span>test1234</span>
            </p>
          </div>
          <div className={styles.cardAccount}>
            <p className={styles.titleCard}>Admin</p>
            <p className={styles.textAccount}>
              <span>Username:</span>
              <span>admin@gmail.com</span>
            </p>
            <p className={styles.textAccount}>
              <span>Password:</span>
              <span>test1234</span>
            </p>
          </div>
          <div className={styles.cardAccount}>
            <p className={styles.titleCard}>Employee</p>
            <p className={styles.textAccount}>
              <span>Username:</span>
              <span>estafaniapillon03@gmail.com</span>
            </p>
            <p className={styles.textAccount}>
              <span>Password:</span>
              <span>test1234</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
