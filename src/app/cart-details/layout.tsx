import ReduxProvider from "@/components/reduxProvider/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <section>{children}</section>
    </ReduxProvider>
  );
}
