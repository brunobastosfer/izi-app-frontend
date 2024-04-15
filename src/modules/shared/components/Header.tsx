import { HeaderContainer } from "./header.style";
import { LogoutOutlined } from '@ant-design/icons';
import img from '../../../assets/logo-izi.svg'
import { Image } from 'antd';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async() => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <HeaderContainer>
        <Image src={img} style={{ width: "50px" }}/>
        <LogoutOutlined style={{ color: "white" }} onClick={() => handleLogout()}/>
    </HeaderContainer>
  );
}
export default Header;