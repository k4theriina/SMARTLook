import { useSpring, animated } from "@react-spring/web";

export const Dashboard = ({
  className,
  data,
  setLogVisible
}) => {
  if (!data) return <div className={className}>Loading Data...</div>;

  // Smooth animation for numbers
  const pressure = useSpring({ value: data.pressure ?? 0, config: { tension: 80, friction: 10 } });
  const flowRate = useSpring({ value: data.flow_rate ?? 0, config: { tension: 30, friction: 20 } });
  const temperature = useSpring({ value: data.temperature ?? 0, config: { tension: 60, friction: 20 } });
  const pumpSpeed = useSpring({ value: data.pump_speed ?? 0, config: { tension: 60, friction: 20 } });
  const energyConsumption = useSpring({ value: data.energy_consumption ?? 0, config: { tension: 50, friction: 20 } });

  const getStatusColor = () => {
    if (data.event_type === "normal") return "#57e64b";
    else if (data.event_type === "Warning") return "yellow";
    else return "red";
  };

  return (
    <div 
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}>
      <div className={className}>
        <h1> <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: getStatusColor(),
              display: "inline-block",
              marginRight: "10px",
            }}
          ></span>Pump Vitals</h1>
        

        <section>
          <h3>Continuous Sensors</h3>
          <ul>
            <li>
              Pressure: <animated.span>{pressure.value.to(n => n.toFixed(1))}</animated.span> bar
            </li>
            <li>
              Flow Rate: <animated.span>{flowRate.value.to(n => n.toFixed(1))}</animated.span> L/min
            </li>
            <li>
              Temperature: <animated.span>{temperature.value.to(n => n.toFixed(1))}</animated.span> °C
            </li>
          </ul>
        </section>

        <section>
          <h3>Operational State</h3>
          <ul>
            <li>Valve Status: {data.valve_status ?? "N/A"}</li>
            <li>Pump State: {data.pump_state ?? "N/A"}</li>
            <li>
              Pump Speed: <animated.span>{pumpSpeed.value.to(n => n.toFixed(0))}</animated.span> RPM
            </li>
            <li>Compressor State: {data.compressor_state ?? "N/A"}</li>
            <li>
              Energy Consumption: <animated.span>{energyConsumption.value.to(n => n.toFixed(1))}</animated.span> kW
            </li>
          </ul>
        </section>

        <section>
          <h3>Events & Alarms</h3>
          <ul>
            <li>Status: {data.event_type ?? "N/A"}</li>
            <li>Last Event: N/A</li>
          </ul>
        </section>

        
        <button className="LogButton" style={{ cursor: "pointer" }}
    onClick={() => {
      setLogVisible(true);
    }}>
          View Logs
        </button>

        <button className="LogButton" id="maintenence" style={{ cursor: "pointer" }}
    onClick={() => {
      
    }}>
          Schedule Maintenence
        </button>
      </div>

    </div>
    
  );
};
