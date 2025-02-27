import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 text-center text-sm text-muted-foreground z-40">
      <Link href="/terms">
        <a className="hover:underline">Terms & Conditions • Privacy Policy • Copyright</a>
      </Link>
    </footer>
  );
}
