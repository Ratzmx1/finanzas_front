/* eslint-disable react-hooks/exhaustive-deps */

import { Menu } from "./Menu";
import { SideBar } from "./SideBar";

export const NavBar = () => {
  if (document.body.clientWidth <= 767) {
    return <SideBar />;
  }
  return <Menu />;
};
