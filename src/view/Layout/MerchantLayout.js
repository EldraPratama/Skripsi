import { useState } from "react";
// import Helmet from "react-helmet";
import Header from "./Header/index";
import Sidebar from "./Sidebar";
import { Container } from "./merchant.styles";
// import useWindowDimensions from "../../hooks/useWindowDimensions";
// import useRedux from "redux/useRedux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const MerchantLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkLogin = sessionStorage.getItem('nama');

  if(!checkLogin){
    navigate("/login")
  }
  // const { width } = useWindowDimensions();
  // const {
  //   thunkDispatch,
  //   storeState: {
  //     Auth: { data },
  //   },
  // } = useRedux();

  // useEffect(() => {
  //   if (data && !data?.data?.isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [data, thunkDispatch, navigate]);

  return (
    <>
      <ToastContainer />
      {/* <Helmet>
        <title>{title ?? "Sandbox Whatsapp"}</title>
      </Helmet> */}
      <Header
        onHamburgerClick={() => setSidebarOpen(!sidebarOpen)}
        open={sidebarOpen}
      />
      <Sidebar sidebar={sidebarOpen} />
      <Container
        open={sidebarOpen}
        className="content-wrapper"
        onClick={() => {
          // setSidebarOpen(!sidebarOpen);
          // if (!sidebarOpen && width && width <= 991)
          //   setSidebarOpen(!sidebarOpen);
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default MerchantLayout;
