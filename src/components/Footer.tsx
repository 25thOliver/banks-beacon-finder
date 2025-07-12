import { Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 text-center text-sm text-muted-foreground flex flex-col items-center gap-4">
      <p>Bank information search tool - Get instant access to bank and branch details</p>
      <div className="flex items-center gap-4">
        <a href="https://x.com/Oliv3r_Sami" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          <Twitter size={40} />
        </a>
      </div>
      <p className="text-xs">&copy; {currentYear} Oliver Samwel. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
