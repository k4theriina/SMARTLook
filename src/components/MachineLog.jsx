import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadPDF = (rows) => {
  const doc = new jsPDF();

  // Use the autoTable function directly
  autoTable(doc, {
    head: [["Timestamp", "Event", "Pressure", "Temperature"]],
    body: rows.map(row => [
      row.timestamp ?? "",
      row.event_type ?? "",
      row.pressure ?? "",
      row.temperature ?? "",
    ]),
    startY: 25,
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
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.timestamp}</td>
              <td>{row.event_type}</td>
              <td>{row.pressure}</td>
              <td>{row.temperature}</td>
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
