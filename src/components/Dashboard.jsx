export const Dashboard = ({ machine }) => {
    
  return (
    <div className="dashboard">
      <h2>Pump Vitals</h2>

      <section>
        <h3>Continuous Sensors</h3>
        <ul>
          <li>Pressure: 2.3 bar</li>
          <li>Flow Rate: 120 L/min</li>
          <li>Temperature: 68 °C</li>
        </ul>
      </section>

      <section>
        <h3>Operational State</h3>
        <ul>
          <li>Valve Status: Open</li>
          <li>Pump Speed: 1450 RPM</li>
          <li>Energy Consumption: 3.2 kW</li>
        </ul>
      </section>

      <section>
        <h3>Events & Alarms</h3>
        <ul>
          <li>Status: Normal</li>
          <li>Last Event: None</li>
        </ul>
      </section>
    </div>
  );
};
