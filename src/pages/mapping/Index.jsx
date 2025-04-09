import React from "react";
import CustomTabs from "../../components/CustomTabs";
import IssuerList from "./IssuerList";
import AffiliateList from "./AffiliateList";
// import AffiliateList from "./AffiliateList";

const MappingList = () => {
  const tabsData = [
    {
      label: "Issuer",
      key: "issuer",
      component: <IssuerList />,
    },
    { label: "Affiliate", key: "affiliate", component: <AffiliateList /> },
  ];

  return (
    <div className="py-2">
      <CustomTabs tabs={tabsData} />
    </div>
  );
};

export default MappingList;
