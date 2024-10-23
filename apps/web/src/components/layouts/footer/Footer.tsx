export function Footer() {
  return (
    <footer className="py-3 border-t border-t-secondary/60">
      <div className="container text-center mx-auto">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Active Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
