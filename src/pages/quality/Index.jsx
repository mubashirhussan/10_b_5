import React from "react";
import CustomTabs from "../../components/CustomTabs";

import SecurityList from "./SecurityList";

const Quality = () => {
  const tabsData = [
    {
      label: "Security Breakdown",
      key: "security",
      component: <SecurityList />,
    },
  ];

  return (
    <div className="py-2">
      <CustomTabs tabs={tabsData} />
    </div>
  );
};

export default Quality;
