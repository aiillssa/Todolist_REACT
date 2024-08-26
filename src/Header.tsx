import React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
  initializeIcons,
} from "@fluentui/react";

//New Command Bar prop
initializeIcons();
function MyCommandBar() {
  const items: ICommandBarItemProps[] = [
    {
      key: "navHome",
      text: "Home",
      iconProps: { iconName: "Home" },
      href: "#/",
    },
    {
      key: "newItem",
      text: "New",
      iconProps: { iconName: "Add" },
      href: "#/new",
    },
  ];

  return <CommandBar items={items} />;
}
export default MyCommandBar;
