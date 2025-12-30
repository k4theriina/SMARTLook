import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
        
        <img
            src="Logo.svg"
            id="HomeLogo"
        ></img>
      <h1 id="heading">A better visualization of SMART Factories. </h1>
      <p id="caption">Look at your factory better, faster, and smarter.</p>

      <button
        className="startButton"
        onClick={() => navigate("/factory")}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
