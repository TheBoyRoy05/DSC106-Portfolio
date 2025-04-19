const SectionHeader = ({ text, style, nolight }: { text: string; style: string, nolight?: boolean }) => {
  return (
    <div className="flex items-center gap-4">
      {!nolight && <div className="w-[10px] h-[10px] bg-black dark:bg-white rounded-full white-glow" />}
      <h4 className={`text-black dark:text-white text-shadow font-bold ${style}`}>
        {text}
      </h4>
    </div>
  );
};

export default SectionHeader;
