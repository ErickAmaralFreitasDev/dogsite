import React from "react";

interface AdicionarIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number | string;
  circle?: boolean; // Adiciona um círculo de fundo (opcional)
  circleColor?: string; // Cor do círculo de fundo
  circleSize?: number; // Tamanho do círculo em relação ao ícone
  thickness?: number; // Espessura do sinal de "+"
}

const AdicionarIcon: React.FC<AdicionarIconProps> = ({
  color = "#333",
  size = "28",
  circle = false,
  circleColor = "transparent",
  circleSize = 0.9, // 90% do tamanho do ícone
  thickness = 1, // Espessura relativa (1 = padrão)
  ...props
}) => {
  // Ajusta a espessura do sinal de "+"
  const pathStyle = {
    strokeWidth: thickness,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Círculo de fundo (opcional) */}
      {circle && (
        <circle
          cx="14"
          cy="14"
          r={Number(size) * circleSize / 2}
          fill={circleColor}
        />
      )}
      
      {/* Sinal de "+" */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 5a1 1 0 011 1v7h7a1 1 0 110 2h-7v7a1 1 0 11-2 0v-7H6a1 1 0 110-2h7V6a1 1 0 011-1z"
        fill={color}
        style={pathStyle}
      />
    </svg>
  );
};

export default AdicionarIcon;