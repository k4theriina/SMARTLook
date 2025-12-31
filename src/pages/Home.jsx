import { useNavigate } from "react-router-dom";
import { CustomCanvas } from "../components/CustomCanvas";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
        <div className="homePage">
            
            <img
                src="EyeLogo.svg"
                id="HomeLogo"
            ></img>
        <h1 id="heading">A better visualization of SMART Factories. </h1>
        <p id="caption">Maintain your factory better, faster, and smarter.</p>

        <button
            className="startButton"
            onClick={() => navigate("/factory")}
        >
            Get Started
        </button>
            <div id="canvas-container">
                <CustomCanvas />
            </div>
        </div>
    </>
    
  );
};

export default Home;
