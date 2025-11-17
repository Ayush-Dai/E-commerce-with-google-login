import React from 'react';

const Avatar = ({ src, name, size = 'md' }) => {
  const firstLetter = name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-xl',
  };

  // Determine if we should show the image or fallback
  const hasValidImage = src && src.trim().length > 0;

  // Common classes for both image and fallback
  const commonClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden`;

  return (
    <div className={commonClasses}>
      {hasValidImage ? (
        <img
          src={src}
          alt={`${name}'s avatar`}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.classList.add('bg-blue-500', 'text-white');
            e.target.parentNode.innerText = firstLetter;
          }}
        />
      ) : (
        <div className="h-full w-full bg-blue-500 text-white flex items-center justify-center font-medium">
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default Avatar;
