import React from "react";

interface EstatisticasIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number | string;
  barHeight?: [number, number, number]; // Alturas personalizadas para cada barra [primeira, segunda, terceira]
}

const EstatisticasIcon: React.FC<EstatisticasIconProps> = ({
  color = "#333",
  size = "28",
  barHeight = [8, 12, 16], // Valores padrão correspondentes ao SVG original
  ...props
}) => {
  // Posições X das barras (mantidas como no original)
  const positions = [6, 13, 20];
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Barra 1 */}
      <rect
        x={positions[0]}
        y={28 - barHeight[0]} // Calcula a posição Y baseado na altura
        width="2"
        height={barHeight[0]}
        rx="1"
        fill={color}
      />
      
      {/* Barra 2 */}
      <rect
        x={positions[1]}
        y={28 - barHeight[1]}
        width="2"
        height={barHeight[1]}
        rx="1"
        fill={color}
      />
      
      {/* Barra 3 */}
      <rect
        x={positions[2]}
        y={28 - barHeight[2]}
        width="2"
        height={barHeight[2]}
        rx="1"
        fill={color}
      />
    </svg>
  );
};

export default EstatisticasIcon;