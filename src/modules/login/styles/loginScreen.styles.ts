import styled from 'styled-components';

export const ContainerMain = styled.div`
  /* display: flex; */
  height: 100vh;
`;

export const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

export const ForgetPassword = styled.p`
  text-decoration: underline;
  color: #6d9bf9;
  margin-left: 5px;
  text-align: left;
  width: 100%;
  cursor: pointer;
`

export const RegisterText = styled.p`
  text-decoration: underline;
  color: #6d9bf9;
  margin-left: 5px;

  text-align: center;
  cursor: pointer;
`

export const BackgroundImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(180deg, #0573B1 0%, #10A3E7 100%);
  border: 1px solid orange;
  

  @media (max-width: 781px) {
    display: none;
  }
`;

export const Image = styled.img`
  width: 500px;
  height: 500px;
`;

export const HeaderText = styled.h1`
  font-size: 32px;
  line-height: 1.0;
  margin-bottom: 10px;
`;

export const LeftSide = styled.div` 
  width: 40%;
`

export const LeftSideContainer = styled.div`
`

export const LeftSideText = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
  color: white;
  line-height: 30px;

`

export const LeftSideTextBold = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
  color: white;
  font-weight: 900;
  line-height: 30px;
`

export const LefSideTextDecoration = styled.span`
  background-color: rgba(237, 109, 9, 1);
  padding: 5px 10px;
  border-radius: 100px;
  font-weight: 900;
`

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;

// export const FormContainer = styled.div<{ isHidden: boolean }>`
//   display: ${(props) => (props.isHidden ? 'none' : 'block')};

//   @media (max-width: 768px) {
//     display: block;
//   }
// `;