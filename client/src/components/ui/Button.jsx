/**
 * Composant bouton réutilisable avec différentes variantes
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.variant="primary"] - Variante du bouton (primary, secondary, outline)
 * @param {string} [props.size="md"] - Taille du bouton (sm, md, lg)
 * @param {boolean} [props.fullWidth=false] - Si true, le bouton prend toute la largeur disponible
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {React.ElementType} [props.as="button"] - Élément HTML ou composant React à utiliser
 * @param {Object} props.rest - Autres propriétés HTML du bouton
 */
export default function Button({ 
  variant = "primary", 
  size = "md", 
  fullWidth = false,
  children,
  className = "",
  as: Component = "button",
  ...rest 
}) {
  const baseStyles = "rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#FF4E0D] text-white hover:bg-[#E64304] focus:ring-[#FF4E0D]",
    secondary: "bg-[#1B3A6B] text-white hover:bg-[#2C5BA6] focus:ring-[#1B3A6B]",
    outline: "border-2 border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#D1E8FF] focus:ring-[#1B3A6B]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  const width = fullWidth ? "w-full" : "";

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`;

  return (
    <Component className={styles} {...rest}>
      {children}
    </Component>
  );
}
