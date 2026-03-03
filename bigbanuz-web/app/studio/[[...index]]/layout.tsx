export const metadata = {
  title: "Smile Amigo CMS Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
