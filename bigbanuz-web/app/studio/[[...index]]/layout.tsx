export const metadata = {
  title: "Smile Amigo CMS Studio",
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
