import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadPDF = (rows) => {
  const doc = new jsPDF();

  doc.text("SMARTLook – Pump Machine Log", 14, 16);

  autoTable(doc, {
    startY: 25,
    head: [[
      "Timestamp",
      "Event",
      "Pressure (bar)",
      "Flow Rate (L/min)",
      "Temperature (°C)",
      "Pump Speed (RPM)",
      "Energy (kW)"
    ]],
    body: rows.map(row => [
      row.timestamp ?? "",
      row.event_type ?? "",
      row.pressure ?? "",
      row.flow_rate ?? "",
      row.temperature ?? "",
      row.pump_speed ?? "",
      row.energy_consumption ?? "",
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [10, 122, 253],
      textColor: 255,
    },
  });

  doc.save("pump-log.pdf");
};


const MachineLog = ({ rows, onClose }) => {
  return (
    <div className="log-panel"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Pump Event Log</h2>

      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Event</th>
            <th>Pressure</th>
            <th>Flow</th>
            <th>Temp</th>
            <th>Speed</th>
            <th>Energy</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.timestamp}</td>
              <td>{row.event_type}</td>
              <td>{row.pressure}</td>
              <td>{row.flow_rate}</td>
              <td>{row.temperature}</td>
              <td>{row.pump_speed}</td>
              <td>{row.energy_consumption}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <div className="log-actions">
        <button onClick={onClose}>Close</button>
        <button onClick={() => { 
            console.log("Download PDF clicked"); 
            downloadPDF(rows); 
        }}>
          Download PDF
        </button>

      </div>
    </div>
  );
};

export { MachineLog };
