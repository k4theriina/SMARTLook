import { useSpring, animated } from "@react-spring/web";

export const Dashboard = ({ className, data }) => {
  if (!data) return <div className={className}>Loading Data...</div>;

  // Smooth animation for numbers
  const pressure = useSpring({ value: data.pressure ?? 0, config: { tension: 120, friction: 20 } });
  const flowRate = useSpring({ value: data.flow_rate ?? 0, config: { tension: 120, friction: 20 } });
  const temperature = useSpring({ value: data.temperature ?? 0, config: { tension: 120, friction: 20 } });
  const pumpSpeed = useSpring({ value: data.pump_speed ?? 0, config: { tension: 120, friction: 20 } });
  const energyConsumption = useSpring({ value: data.energy_consumption ?? 0, config: { tension: 120, friction: 20 } });

  return (
    <div className={className}>
      <h2>Pump Vitals</h2>

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
    </div>
  );
};
