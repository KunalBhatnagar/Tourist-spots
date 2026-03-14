import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="skeleton-card">
          <div className="skeleton-header"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-footer">
            <div className="skeleton-badge"></div>
            <div className="skeleton-badge"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
