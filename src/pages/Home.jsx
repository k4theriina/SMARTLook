import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <h1>SMARTLook</h1>
      <p>Digital Twin Monitoring System</p>

      <button
        className="startButton"
        onClick={() => navigate("/factory")}
      >
        Start Digital Twin Factory
      </button>
    </div>
  );
};

export default Home;
