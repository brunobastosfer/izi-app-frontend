import React, { useState } from "react";
import { Container, Image, BackgroundImageContainer, ContainerMain} from '../styles/loginScreen.styles';
import FormComponent from "../components/Form";
import img from '../../../assets/aplicativos-izi.png';
import { Col, Row } from 'antd';
import useWindowSize from "@custom-react-hooks/use-window-size";

const LoginScreen: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { width } = useWindowSize();

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  return (
    <ContainerMain>
      <Row>
        <Col flex={10}>
          <BackgroundImageContainer>
            <Image src={img} alt="background" />
          </BackgroundImageContainer>
        </Col>
        <Col flex={width >= 781 ? 1 : 9}>
            <Container>
              <FormComponent toggleForm={toggleForm} isRegisterForm={isRegisterForm} />
            </Container>
        </Col>
      </Row>
    </ContainerMain>
  );
}

export default LoginScreen;