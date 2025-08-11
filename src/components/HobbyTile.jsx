import React from 'react';

export default function HobbyTile({ label, emoji, icon, selected, onClick }) {
  return (
    <button
      className={`hobby-tile ${selected ? 'selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {icon ? (
        <img src={icon} alt={label} className="hobby-icon" />
      ) : (
        <span className="hobby-emoji">{emoji}</span>
      )}
      <span>{label}</span>
    </button>
  );
}
