import "./Admin.css";

interface Props {
  id: number;
  userId: number;
  serviceTitle: string;
  price: string;
  status: string;
  instructions: string;
  onStatusUpdate: (id: number, newStatus: string) => void;
}

export default function OrderCard({ id, userId, serviceTitle, price, status, instructions, onStatusUpdate }: Props) {
  const getStatusClass = (s: string) => {
    switch (s) {
      case 'COMPLETED': return 'status-complete';
      case 'PENDING': return 'status-pending';
      case 'IN_PROGRESS': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="order-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4>ORDER #{id}</h4>
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>
      
      <p><strong>User ID:</strong> {userId}</p>
      <p><strong>Service:</strong> {serviceTitle}</p>
      <p><strong>Price:</strong> {price}</p>
      <p><strong>Instructions:</strong> {instructions || "None"}</p>

      <div className="order-actions" style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        {status === 'PENDING' && (
          <button onClick={() => onStatusUpdate(id, 'IN_PROGRESS')} className="status-btn">Accept</button>
        )}
        {status === 'IN_PROGRESS' && (
          <button onClick={() => onStatusUpdate(id, 'COMPLETED')} className="status-btn complete">Complete</button>
        )}
        {status !== 'COMPLETED' && status !== 'CANCELLED' && (
          <button onClick={() => onStatusUpdate(id, 'CANCELLED')} className="status-btn cancel">Cancel</button>
        )}
      </div>
    </div>
  );
}
