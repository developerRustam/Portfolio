import { Navbar } from "widgets/sidebar/ui/Navbar";
import InfoUser from "shared/ui/infoUser/InfoUser";
import "./header.scss";

export function Header() {
  return (
    <header className="header" id="top">
      <div className="container">
        <Navbar />
        <InfoUser />
      </div>
    </header>
  );
}
