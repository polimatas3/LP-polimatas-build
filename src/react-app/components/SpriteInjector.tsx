import sprite from '@/assets/images/tech-sprite.svg?raw';

export function SpriteInjector() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      dangerouslySetInnerHTML={{ __html: sprite }}
    />
  );
}
