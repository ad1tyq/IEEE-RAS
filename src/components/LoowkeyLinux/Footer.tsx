export default function Footer() {
  const links = [
    { cmd: "cat contact.txt", href: "mailto:ieee.ras.muj@gmail.com", label: "ieee.ras.muj@gmail.com" },
    { cmd: "./instagram.sh", href: "https://instagram.com/ieeeras.muj", label: "@ieeeras.muj" },
    { cmd: "./linkedin.sh", href: "https://linkedin.com/company/ieee-ras-muj", label: "IEEE RAS MUJ" },
    { cmd: "cat coc.txt", href: "/code-of-conduct", label: "code of conduct" },
  ];

  return (
    <footer className="ll-footer">
      <div className="ll-footer-inner">
        {links.map((l) => (
          <div key={l.cmd} className="ll-footer-line">
            <span className="ll-footer-prompt">user@lowkey:~$</span>
            <span>{l.cmd}</span>
            <span>→</span>
            <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {l.label}
            </a>
          </div>
        ))}
        <div className="ll-footer-line">
          <span className="ll-footer-prompt">user@lowkey:~$</span>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span>echo "© 2026 IEEE RAS MUJ"</span>
        </div>
      </div>
    </footer>
  );
}
