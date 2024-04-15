import { Button, Input, Space } from "antd"
import { ForgetPassword, LoginForm, RegisterText } from "../styles/loginScreen.styles"
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Alert, Spin } from 'antd';
import { instance } from "../../../utils/axios";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { useRequest } from "../../shared/hooks/useRequest";
import { AuthType } from "../types/AuthType";
import { HomeRoutesEnum } from "../../home/routes/homeRoutes";

interface FormComponentProps {
  toggleForm: () => void;
  isRegisterForm: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ toggleForm, isRegisterForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmpty, setInputEmpty] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const navigate = useNavigate();
  const { authRequest } = useRequest();
  const { setAcess, setUser } = useGlobalContext();

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    if(!email || !password) {
      setInputEmpty(true)
      setTimeout(() => {
        setInputEmpty(false);
      }, 1500)
      return;
    }
    const user = await authRequest<AuthType>('/users/auth', {
      email,
      password
    });
    setAcess(user);
    setUser(user.user);
    navigate(HomeRoutesEnum.HOME);
  }

  const handleSignup = async(e: FormEvent) => {
    e.preventDefault();
    instance.post('/users', {
      email,
      password
    }).then((response) => {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Usuário cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }).catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    });
  }

  const handleForgetPassword = () => {
  }

  return (
    <LoginForm>
      <Space direction="vertical">
        <Input style={{ marginBottom: !inputEmpty ? 10 : 0}} size="large" placeholder="Email" prefix={<UserOutlined />} onChange={ (e) => setEmail(e.target.value) }/>
        {
          inputEmpty && !email && (
            <Alert message="O usuário é obrigatório." type="error" style={{ border: "none", background: "none" }}/>
          )
        }
      </Space>
      <Space direction="vertical" >
        <Input.Password
          placeholder="Password"
          style={{ marginBottom: 0 }}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          size="large"
          onChange={ (e) => setPassword(e.target.value) }
        />
          {
          inputEmpty && !password && (
            <Alert message="A senha é obrigatória." type="error" style={{ border: "none", background: "none" }}/>
          )
        }
      </Space>
      {
        !isRegisterForm && (
          <ForgetPassword onClick={handleForgetPassword}>Esqueci minha senha</ForgetPassword>
        )
      }
      {
        isRegisterForm 
        ?
          <Button style={{ width: "60%", marginTop: "10px" }} onClick={ handleSignup } formMethod='submit' type='primary' size='large'>Cadastrar</Button>
        :
          <Button style={{ width: "60%" }} onClick={ handleSignin } formMethod='submit' type='primary' size='large'>Entrar</Button> 
      }
      {
        !isRegisterForm && (
          <RegisterText onClick={toggleForm}>Não possui uma conta? 
            <br />
            Cadastre-se.
          </RegisterText>
        )
      }
      {
        isRegisterForm && (
          <RegisterText onClick={toggleForm}>Já possui uma conta? 
            <br />
            Faça login.
          </RegisterText>
        )
      }
      {
        runSpinner && (
          <Spin size="large" />
        )
      }
      </LoginForm>
  )
}

export default FormComponent;