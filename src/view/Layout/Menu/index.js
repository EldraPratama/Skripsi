// import IcDashboard from "../../assets/icons/dashboard.svg";
// import IcUser from "../../assets/icons/user.svg";
// import IcProduct from "../../assets/icons/product.svg";
// import IcOrder from "../../assets/icons/order.svg";
// import IcReport from "../../assets/icons/report.svg";
// import IcSetting from "../../assets/icons/settings.svg";


const features = [
  {
    id: "dashboard",
    text: "Beranda",
    path: "/",
    type: "item",
    permission: "dashboard@isView",
    // icon: IcDashboard,
  },
  {
    id: "customers",
    text: "Pelanggan",
    path: "/customers",
    type: "item",
    permission: "dashboard@isView",
    // icon: IcUser,
  },
  {
    id: "product",
    text: "Produk",
    path: "#",
    type: "item",
    permission: "products@isView",
    // icon: IcProduct,
  },
  {
    id: "order",
    text: "Penjualan",
    path: "#",
    type: "item",
    permission: "order@isView",
    // icon: IcOrder,
  },
  {
    id: "finance",
    text: "Keuangan",
    path: "#",
    type: "item",
    permission: "finance@isView",
    // icon: IcReport,
  },
  {
    id: "report",
    text: "Laporan",
    path: "#",
    type: "item",
    permission: "products@isView",
    // icon: IcReport,
  },
  {
    id: "setting",
    text: "Pengaturan",
    path: "#",
    type: "item",
    permission: "products@isView",
    // icon: IcSetting,
  },
];

export default features;
