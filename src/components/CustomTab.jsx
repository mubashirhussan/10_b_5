import { Button } from "antd";
import { useState } from "react";

const CustomTab = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleTabClick = (value) => {
    setActiveTab(value);
    onTabChange && onTabChange(value);
  };

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className="font-semibold no-focus-outline"
          style={{
            backgroundColor: activeTab === tab.value ? "#1677ff" : "white",
            color: activeTab === tab.value ? "white" : "#7D7D7D",
            borderColor: activeTab === tab.value ? "transparent" : "#D1D5DB",
          }}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
export default CustomTab;
