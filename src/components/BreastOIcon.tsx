import React from 'react';

interface BreastOIconProps {
  className?: string;
  size?: number;
}

/**
 * BreastOIcon: An artistic, stylized woman's breast design replacing the letter "O"
 * in "AnOnTché". It combines the circular geometry of the capital "O" with
 * the delicate curve and areola of a female breast.
 */
export const BreastOIcon: React.FC<BreastOIconProps> = ({
  className = "w-[0.9em] h-[0.9em] inline-block align-[-0.08em] mx-[0.5px]",
}) => {
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      title="Sein féminin (AnOnTché : 'Mon sein' en langue Fon)"
    >
      <svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Subtle glowing halo */}
        <circle cx="14" cy="14" r="12" fill="#ffd9e0" fillOpacity="0.45" />

        {/* Outer breast curve forming the circular geometry of 'O' */}
        <circle
          cx="14"
          cy="14"
          r="10.5"
          stroke="currentColor"
          strokeWidth="2.4"
          className="text-[#ac2356]"
        />

        {/* Inner anatomical curved contour / natural breast lift line */}
        <path
          d="M6.5 14.5C8 19 13 21 17.5 19.5C19.8 18.5 21.5 16.5 22 14"
          stroke="#be185d"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* Second upper highlight curve */}
        <path
          d="M8.5 10C10.5 7.5 14.5 6.5 18 8"
          stroke="#f472b6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Areola - delicate soft pink circle */}
        <circle
          cx="14"
          cy="13.2"
          r="3.2"
          fill="#ffd9e0"
          stroke="#cd3e6e"
          strokeWidth="0.8"
        />

        {/* Central nipple - darker rose/berry point */}
        <circle
          cx="14"
          cy="13.2"
          r="1.4"
          fill="#ac2356"
        />

        {/* Highlight spark */}
        <circle
          cx="13.5"
          cy="12.7"
          r="0.5"
          fill="#ffffff"
        />
      </svg>
    </span>
  );
};

interface AnOnTcheProps {
  className?: string;
  iconClassName?: string;
}

export const AnOnTcheText: React.FC<AnOnTcheProps> = ({
  className = "",
  iconClassName = "w-[0.9em] h-[0.9em]",
}) => {
  return (
    <span className={`inline-flex items-center font-extrabold ${className}`}>
      <span>An</span>
      <BreastOIcon className={iconClassName} />
      <span>nTché</span>
    </span>
  );
};
