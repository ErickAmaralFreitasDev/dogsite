import React from "react";

interface DogSvgProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DogFooter: React.FC<DogSvgProps> = ({
  width = 28,
  height = 22,
  fill = "#764701",
  className = "",
  style = {}
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 10h1.652c1.708 0 2.63 2.004 1.518 3.302l-1.618 1.887A4.501 4.501 0 0024.5 14.5a1.5 1.5 0 013 0A7.5 7.5 0 0114 19 7.5 7.5 0 01.5 14.5a1.5 1.5 0 013 0 4.5 4.5 0 008.948.689l-1.618-1.887C9.718 12.004 10.64 10 12.35 10H14z"
        fill={fill}
      />
      <circle cx="21" cy="3" r="3" fill={fill} />
      <circle cx="7" cy="3" r="3" fill={fill} />
    </svg>
  );
};

export default DogFooter;