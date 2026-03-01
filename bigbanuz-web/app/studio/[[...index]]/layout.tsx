export const metadata = {
  title: "bigbanuz CMS Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0" style={{ zIndex: 100 }}>
      {children}
    </div>
  );
}
