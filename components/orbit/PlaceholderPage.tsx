export default function PlaceholderPage({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div>
      <h1 className="text-[26px] font-bold">{title}</h1>
      <p className="mt-2 max-w-xl text-[13px] text-white/55">
        {note ||
          "This Orbit module is ready for content wiring. Hero and Media Library are fully live."}
      </p>
    </div>
  );
}
