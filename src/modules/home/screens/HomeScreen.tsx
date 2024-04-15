import { useEffect } from "react";
import CardComponent from "../../shared/components/Card";
import Header from "../../shared/components/Header";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const { isAuthenticated } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated && !localStorage.getItem('user')) {
      navigate('/login')
    }
  }, [isAuthenticated])

  return (
    <>
      <Header />
      <div>
        <CardComponent />
      </div>
    </>
  );
}

export default HomeScreen;