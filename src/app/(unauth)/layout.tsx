import UnAuthNavbar from "@/components/navbars/UnAuthNavbar";

export default function UnAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UnAuthNavbar />
      {children}
    </>
  );
}
