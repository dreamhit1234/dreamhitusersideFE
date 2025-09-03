import React, { useMemo } from "react";
import { Modal } from "antd";
import "./FinalListModal.scss";

// Safely coerce price like "₹1,200" → number
const toNumber = (val) => {
  if (val == null) return 0;
  const n =
    typeof val === "string"
      ? Number(val.replace(/[^\d.-]/g, ""))
      : Number(val);
  return Number.isFinite(n) ? n : 0;
};

export default function FinalListModal({ match, players, onClose }) {
  // Normalize players: accept array OR { left: [], right: [] }
  const rows = useMemo(() => {
    const raw =
      Array.isArray(players)
        ? players
        : [...(players?.left || []), ...(players?.right || [])];

    return raw.map((p, i) => ({
      idx: i + 1,
      name: p?.name ?? "Player",
      buyer: p?.buyer ?? p?.owner ?? "—",
      price: toNumber(p?.price),
    }));
  }, [players]);

  const totalAmount = useMemo(
    () => rows.reduce((sum, p) => sum + p.price, 0),
    [rows]
  );

  return (
    <Modal
      open
      onCancel={onClose}
      footer={null}
      className="final-list-modal"
      title={`Final List - ${match?.name || "Match"} (${match?.format || ""})`}
    >
      <div className="final-table-wrapper">
        <table className="final-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Buyer</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.idx}>
                <td>{p.idx}</td>
                <td>{p.name}</td>
                <td>{p.buyer}</td>
                <td>₹{p.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={3}>Total Amount</td>
              <td>₹{totalAmount.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Modal>
  );
}
