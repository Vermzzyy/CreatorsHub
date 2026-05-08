import "./Admin.css";

interface Props {
  id: number;
  title: string;
  category: string;
  price: string;
  thumbnail?: string;
  onDelete: (id: number) => void;
}

export default function ServiceAdminCard({ id, title, category, price, thumbnail, onDelete }: Props) {
  return (
    <div className="admin-service-card">
      {thumbnail && <img src={thumbnail} alt={title} className="admin-svc-thumb" />}
      <div className="admin-svc-info">
        <h4>{title}</h4>
        <p>Category: {category}</p>
        <p>Price: {price}</p>
      </div>
      <button className="delete-btn" onClick={() => onDelete(id)}>Delete Service</button>
    </div>
  );
}
