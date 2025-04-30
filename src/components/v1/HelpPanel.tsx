import { useState } from 'react';

const HelpPanel = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        padding: hovered ? '16px 24px' : '8px 12px',
        borderRadius: 12,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        fontSize: hovered ? 14 : 12,
        lineHeight: '1.5',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        maxWidth: hovered ? 300 : 150,
        whiteSpace: hovered ? 'normal' : 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        zIndex: 1000,
        fontFamily: 'monospace',
      }}
    >
      {hovered ? (
        <>
          <strong>Controls</strong>
          <br />
          🖱️ Mouse: Look around
          <br />
          ⌨️ W / A / S / D: Move
          <br />
          🧭 Q / E: Up / Down
          <br />
          🖱️ Scroll: Zoom
          <br />
          🖱️ Double-click: Fullscreen
          <br />
          💻 <em>Use PC for best experience</em>
        </>
      ) : (
        <>🕹️ Show Controls</>
      )}
    </div>
  );
};

export default HelpPanel;
