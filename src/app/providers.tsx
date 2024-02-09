import StoreProvider from './StoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <StoreProvider>{children}</StoreProvider>
    </main>
  );
}
