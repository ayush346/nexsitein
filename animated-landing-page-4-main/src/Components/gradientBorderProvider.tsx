import { ReactNode } from "react";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

interface GradientBorderProviderProps {
  children: ReactNode;
  className?: string;
}

export const GradientBorderProvider = ({
  children,
  className = "",
}: GradientBorderProviderProps) => {
  return (
    <SpotlightCard className={`p-[2px] transition-effect ${className}`}>
      {children}
    </SpotlightCard>
  );
};
