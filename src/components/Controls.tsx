import { useEffect, useRef, useState } from 'react';

const Controls = ({ onSelect }: { onSelect: (mode: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<'galaxy' | 'portal' | 'galaxy collapsing'>('galaxy');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSelect(selected);
  }, [onSelect, selected]);

  const modes = ['Galaxy', 'Portal', 'Galaxy Collapsing'];

  return (
    <div ref={ref} className="controls-container">
      <button className="controls-toggle" onClick={() => setOpen((prev) => !prev)}>
        {open ? 'Close Menu' : 'Open Menu'}
      </button>

      {open && (
        <div className="controls-menu">
          {modes.map((mode) => {
            const modeKey = mode.toLowerCase();
            return (
              <button
                key={mode}
                className={`controls-item ${selected === modeKey ? 'selected' : ''}`}
                onClick={() => {
                  setSelected(modeKey as 'galaxy' | 'portal' | 'galaxy collapsing');
                  onSelect(modeKey);
                  setOpen(false);
                }}
              >
                {mode}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Controls;
