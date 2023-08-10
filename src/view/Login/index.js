import { useState, useEffect } from "react";
// import MainLayout from "components/Layouts/MainLayout";
import { 
  Grid, 
  Stack, 
  Box, 
  Typography,
  TextField,
  Button,
} from "@mui/material";
// import { Button } from "components/styled/button.styled";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
 
// import LoginCover from "assets/media/images/login-cover.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const LoginCover = `${process.env.PUBLIC_URL}/perpustakaan.jpeg`
  // const {
  //   thunkDispatch,
  //   storeState: { Auth },
  // } = useRedux();
  // //const [isLoginFailed, setIsLoginFailed] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [credentials, setCredentials] = useState({
  //   username: "",
  //   password: "",
  // });

  // useEffect(() => {
  //   if (Auth?.data?.data?.isAuthenticated) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Auth]);

  // const handleLogin = (e) => {
  //   setIsSubmitted(true);
  //   e.preventDefault();
  //   thunkDispatch(AuthLogin(credentials))
  //     .unwrap()
  //     .then((res) => {
  //       if (res && res.status === "error") {
  //         //setIsLoginFailed(true);
  //         toast.error("Login gagal!");
  //       } else {
  //         //setIsLoginFailed(false);
  //         toast.success("Login berhasil");
  //       }
  //     });
  // };

  return (
    // <MainLayout>
      <Box>
        <ToastContainer />
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <BoxStyled
              sx={{
                background: `url(${LoginCover}) no-repeat`,
                backgroundSize: "cover",
                height: "100vh",
              }}
            ></BoxStyled>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BoxRight
              height="100vh"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%" }}
            >
              <Stack
                direction={"column"}
                alignItems={"center"}
                sx={{ width: "100%" }}
              >
                <Box sx={{ width: "50%" }}>
                  <Typography
                    variant="h1"
                    textAlign="left"
                    fontWeight={"bold"}
                    fontSize={"40px"}
                    marginBottom={3}
                  >
                    Login
                  </Typography>

                  <form onSubmit={console.log("")}>
                    <Stack direction={"column"}>
                      <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                      />
                      <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        style={{
                          marginTop:"20px",
                          marginBottom:"20px",
                        }}
                      />

                      {/* <TextField
                        value={credentials.username}
                        validationType={isSubmitted ? "ERROR" : ""}
                        validationText={
                          isSubmitted
                            ? credentials.username === ""
                              ? "Silahkan masukan username anda"
                              : ""
                            : ""
                        }
                        type={"text"}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            username: e.target.value,
                          })
                        }
                        placeholder={"Username"}
                      ></TextField>
                      <TextField
                        isRequired
                        type={"password"}
                        minLength={8}
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                        placeholder={"Kata sandi"}
                      ></TextField> */}
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                      marginTop={1}
                    >
                      <Button
                        type="submit"
                        variant={"contained"}
                        color="success"
                        style={{ fontWeight: "bold" }}
                      >
                        Masuk
                      </Button>
                    </Stack>
                  </form>

                </Box>
              </Stack>
            </BoxRight>
          </Grid>
        </Grid>
      </Box>
    // </MainLayout>
  );
};

const BoxStyled = styled(Box)`
  @media only screen and (max-width: 786px) {
    height: 20vh;
  }
`;
const BoxRight = styled(Box)`
  @media only screen and (max-width: 900px) {
    height: 70vh;
    align-items: start;
    margin: 10vh 0 0 0;
  }
`;

export default Login;
