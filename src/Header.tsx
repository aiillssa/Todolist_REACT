import React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
  initializeIcons,
} from "@fluentui/react";
import { Link, useNavigate } from "react-router-dom";
import { NewTask } from "./routes/newTask";
initializeIcons();
function MyCommandBar() {
  //const nav = useNavigate();
  //const nav = (url: string) => {};
  const items: ICommandBarItemProps[] = [
    {
      key: "navHome",
      text: "Home",
      iconProps: { iconName: "Home" },
      href: "#/",
      //onClick: () => nav(`/`),
    },
    {
      key: "newItem",
      text: "New",
      iconProps: { iconName: "Add" },
      href: "#/new",
      // onClick: () => nav(`/new`),
    },
    {
      key: "aidan",
      text: ":O",
      iconProps: { iconName: "Emoji2" },
      href: "#/yay",
      // onClick: () => nav(`/yay`),
    },
  ];

  return <CommandBar items={items} />;
}
export default MyCommandBar;
