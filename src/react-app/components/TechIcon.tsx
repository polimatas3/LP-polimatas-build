interface TechIconProps {
  name: string;
  id?: string;
  className?: string;
  size?: number;
}

export function TechIcon({ name, id, className = '', size = 48 }: TechIconProps) {
  const spriteId = id || name.toLowerCase();
  
  return (
    <svg
      className={className}
      width={size}
      height={size}
      role="img"
      aria-label={name}
    >
      <title>{name}</title>
      <use href={`#${spriteId}`} />
    </svg>
  );
}
