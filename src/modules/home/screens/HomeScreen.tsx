import CardComponent from "../../shared/components/Card";
import Header from "../../shared/components/Header";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";

const HomeScreen: React.FC = () => {
  const { globalData } = useGlobalContext();
  console.log(globalData)
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