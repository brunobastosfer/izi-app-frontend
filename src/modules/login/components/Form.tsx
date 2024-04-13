import { Button, Input, Space } from "antd"
import { ForgetPassword, LoginForm, RegisterText } from "../styles/loginScreen.styles"
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
// import Swal from 'sweetalert2';
import { Alert, Spin } from 'antd';

interface FormComponentProps {
  toggleForm: () => void;
  isRegisterForm: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ toggleForm, isRegisterForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmpty, setInputEmpty] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const navigate = useNavigate();

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleForgetPassword = () => {
  }

  return (
    <LoginForm>
      <Space direction="vertical">
        <Input style={{ marginBottom: !inputEmpty ? 10 : 0}} size="large" placeholder="Usuario" prefix={<UserOutlined />} onChange={ (e) => setUsername(e.target.value) }/>
        {
          inputEmpty && !username && (
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