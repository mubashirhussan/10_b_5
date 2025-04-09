import React, { useState } from "react";
import { Tabs } from "antd";

const CustomTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  return (
    <>
      <div className=" mb-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          className="custom-tabs"
          tabBarStyle={{
            color: "#7D7D7D",
            marginBottom: "0px",
          }}
          items={tabs.map((tab) => ({
            key: tab.key,
            label: tab.label,
            children: tab.content, // ✅ Use `children` to render content inside the tab
          }))}
        />
      </div>

      <div>{tabs.find((tab) => tab.key === activeTab)?.component}</div>
    </>
  );
};

export default CustomTabs;
