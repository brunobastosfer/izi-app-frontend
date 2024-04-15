import { HeaderContainer } from "./header.style";
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <HeaderContainer>
        <LogoutOutlined style={{ color: "white" }} onClick={() => alert("sair")}/>
    </HeaderContainer>
  );
}
export default Header;