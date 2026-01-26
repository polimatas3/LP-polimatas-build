export const Component = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-[#18181b] bg-[linear-gradient(to_right,#232326_1px,transparent_1px),linear-gradient(to_bottom,#232326_1px,transparent_1px)] bg-[size:6rem_4rem]">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      {/* Sutil radial highlight */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#23232640,transparent)] pointer-events-none"></div>
    </div>
  );
};
