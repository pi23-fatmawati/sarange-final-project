import { Flowbite, Tabs, } from "flowbite-react";
import HistoryProcess from "./HistoryProcess";
import HistorySuccess from "./HistorySuccess";
import "./component.css";

const customeTheme = {
  tabitem: {
    styles: {
      underlines: {
        base: "rounded-none",
        active: "text-green-2 border-b-2 border-green-2 active",
      },
    },
  },
};
export default function Tab() {
  return (
    <Flowbite>
      <Tabs style="underline">
        <Tabs.Item active title="Diproses" theme={customeTheme} underlines= "active" >
          <HistoryProcess />
        </Tabs.Item>
        <Tabs.Item title="Selesai">
          <HistorySuccess />
        </Tabs.Item>
      </Tabs>
    </Flowbite>
  );
}
