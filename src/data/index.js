const DATA_VIEW_LIST = [
  {
    fid: "FID0001",
    company: "COINBASE GLOBAL INC",
    insider: "Armstrong Brian",
    designation: "Founder, Chairman / CEO",
    adoptionDate: "15-Aug-2024",
    terminationDate: "14-Nov-2025",
    planShares: "3,750,000",
    reportedSell: "1,450,000",
    remainingShares: "2,300,000",
    remarks: "10-Q   361days",
    security: "common stock",
    filingType: "10-Q",
    duration: 361,
    plan: "A",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0002",
    company: "COINBASE GLOBAL INC",
    insider: "Ehrsam Frederick Ernest III (Fred)",
    designation: "Founder, Director, TOP5 Insider",
    adoptionDate: "25-Aug-2024",
    terminationDate: "27-May-2025",
    planShares: "866,122",
    reportedSell: "115,665",
    remainingShares: "750,457",
    remarks: "No remarks",
    security: "common stock",
    filingType: "10-Q",
    duration: 183,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0003",
    company: "COINBASE GLOBAL INC",
    insider: "Grewal Paul Singh",
    designation: "Chief Legal Officer",
    adoptionDate: "28-Aug-2024",
    terminationDate: "12-Dec-2024",
    planShares: "151,005",
    reportedSell: "7,104",
    remainingShares: "143,901",
    remarks: "No remarks",
    security: "common stock",
    filingType: "10-Q",
    duration: 365,
    plan: "T",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0004",
    company: "COINBASE GLOBAL INC",
    insider: "Wilson Frederick R (Fred)",
    designation: "Lead Independent Director",
    adoptionDate: "8-Aug-2024",
    terminationDate: "4-Nov-2026",
    planShares: "50,000",
    reportedSell: "10,000",
    remainingShares: "40,000",
    remarks: "No remarks",
    security: "common stock",
    filingType: "10-Q",
    duration: 727,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0005",
    company: "TESLA INC",
    insider: "Taneja Vaibhav",
    designation: "CFO",
    adoptionDate: "1-May-2024",
    terminationDate: "31-Jul-25",
    planShares: "84,000",
    reportedSell: "37,606",
    remainingShares: "46,394",
    remarks: "No remarks",
    security: "common stock",
    filingType: "10-Q",
    duration: 457,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0006",
    company: "NVIDIA CORPORATION",
    insider: "Kress Colette M.",
    designation: "CFO",
    adoptionDate: "22-Mar-2024",
    terminationDate: "15-May-2025",
    planShares: "50,000",
    reportedSell: "433,340",
    remainingShares: "66,660",
    remarks:
      "Split of 1:10 on 2024-06-10, making the plan to 500,000 from 50,000",
    security: "common stock",
    filingType: "10-K",
    duration: 187,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0007",
    company: "NVIDIA CORPORATION",
    insider: "Huang Jen Hsun",
    designation: "President and Chief Executive Officer",
    adoptionDate: "14-Mar-2024",
    terminationDate: "31-Mar-2025",
    planShares: "600,000",
    reportedSell: "6,000,000",
    remainingShares: "0",
    remarks:
      "Split of 1:10 on 2024-06-10, making the plan to 6,000,000 from 600,000",
    security: "common stock",
    filingType: "10-K",
    duration: 187,
    plan: "T",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0008",
    company: "NVIDIA CORPORATION",
    insider: "Dabiri John O.",
    designation: "Independent Director",
    adoptionDate: "18-Dec-2023",
    terminationDate: "2-Dec-2024",
    planShares: "553",
    reportedSell: "1,042",
    remainingShares: "4,488",
    remarks: "Split of 1:10 on 2024-06-10",
    security: "common stock",
    filingType: "10-K",
    duration: 187,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0009",
    company: "NVIDIA CORPORATION",
    insider: "Robertson Donald F Jr",
    designation: "Chief Accounting Officer",
    adoptionDate: "6-Oct-2023",
    terminationDate: "18-Dec-2025",
    planShares: "3,500",
    reportedSell: "14,400",
    remainingShares: "20,600",
    remarks: "Split of 1:10 on 2024-06-10",
    security: "common stock",
    filingType: "10-K",
    duration: 187,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0010",
    company: "NVIDIA CORPORATION",
    insider: "Shoquist Debora C.",
    designation: "Executive Vice President",
    adoptionDate: "27-Aug-2023",
    terminationDate: "29-Nov-24",
    planShares: "81,500",
    reportedSell: "81,500",
    remainingShares: "Completed",
    remarks:
      "Last reported for the plan is 2023-12-18, after cool off period next started plan on March 2024",
    security: "common stock",
    filingType: "10-K",
    duration: 187,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
  {
    fid: "FID0011",
    company: "META PLATFORMS INC",
    insider: "Clegg Nicholas",
    designation: "President (division / unit / region)",
    adoptionDate: "12-May-2024",
    terminationDate: "16-May-2025",
    planShares: "7,528",
    reportedSell: "7,290",
    remainingShares: "",
    remarks: "No remarks",
    security: "common stock",
    filingType: "10-K",
    duration: 187,
    plan: "N",
    materialInfo: "shares sold in the previous quarter",
    aggregate: "50% of RSUs issued in the year",
  },
];

const ISSUER_LIST = [
  {
    arcId: 25,
    companyName: "meta",
    cik: "0001565717",
    irs: "610647538",
    fileNo: "037833100",
    yearEnd: "1231",
  },
  {
    arcId: 5,
    companyName: "facebook",
    cik: null,
    irs: null,
    fileNo: null,
    yearEnd: null,
  },
  {
    arcId: 56,
    companyName: "meta",
    cik: null,
    irs: "610647538",
    fileNo: "037833100",
    yearEnd: "1231",
  },
  {
    arcId: 45,
    companyName: "facebook",
    cik: "0001565717",
    irs: null,
    fileNo: null,
    yearEnd: null,
  },
];
const AFFILIATE_LIST = [
  {
    araId: 33,
    affiliateName: "mark zuckerberg",
    cik: "0001548760",
  },
  {
    araId: 42,
    affiliateName: "Musk Elon",
    cik: "0001494730",
  },
];
const SECURITY_LIST = [
  {
    filingId: "001",
    materialInfo: "shares consist of 1150 class A and 1325 class B",
    noOfSecurityFormsToBeAdded: 2,
  },
  {
    filingId: "002",
    materialInfo: "shares consist of 11505 class A and 13625 RSU",
    noOfSecurityFormsToBeAdded: 2,
  },
  {
    filingId: "003",
    materialInfo: "shares consist of 115068 class A",
    noOfSecurityFormsToBeAdded: 1,
  },
  {
    filingId: "004",
    materialInfo: "shares consists of 1150 common and 1325 preferred stock",
    noOfSecurityFormsToBeAdded: 2,
  },
  {
    filingId: "005",
    materialInfo: "shares consists of 1150 class A and 1325 class B",
    noOfSecurityFormsToBeAdded: 2,
  },
];

export { DATA_VIEW_LIST, ISSUER_LIST, AFFILIATE_LIST, SECURITY_LIST };
