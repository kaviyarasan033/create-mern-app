import React from 'react';

const Spinner = ({ size = 'medium', color = 'primary', fullScreen = false }) => {
  const spinnerClass = `spinner ${size} ${color} ${fullScreen ? 'fullscreen' : ''}`;
  
  return (
    <div className={fullScreen ? 'spinner-overlay' : 'spinner-container'}>
      <div className={spinnerClass}></div>
      {fullScreen && <p>Loading...</p>}
    </div>
  );
};

export const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  const items = Array.from({ length: count });

  return (
    <div className={`skeleton-container ${type}-grid`}>
      {items.map((_, i) => (
        <div key={i} className={`skeleton-item skeleton-${type}`}>
          <div className="skeleton-line title"></div>
          <div className="skeleton-line body"></div>
          <div className="skeleton-line body"></div>
        </div>
      ))}
    </div>
  );
};

export default Spinner;
