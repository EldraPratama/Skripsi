import { useState } from "react";
import { 
  Grid, 
  Stack, 
  Box, 
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginCover = `${process.env.PUBLIC_URL}/perpustakaan.jpeg`


  const checkLogout = sessionStorage.getItem('nama');
  if (checkLogout) { 
    toast.success("Berhasil Logout");
    sessionStorage.clear();
  } else {
    sessionStorage.clear();
  }

  const canLogin = () => {
    if(username === "" || password === ""){
      toast.warning("Silahkan lengkapi Username atau Password")
      return false
    }
    return true
  }

  const handleLogin = () => {
    let body = {
      username: username,
      password: password,
    }

    axios.post('http://localhost:5000/api/login', body)
    .then((response) => {
      sessionStorage.setItem('nama', response.data[0].name)
      // console.log(response.data)
      // console.log(response.data[0].name)
      toast.success("Login Berhasil");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
      toast.error("Check ulang username atau password");
    });
  }

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

                    <Stack direction={"column"}>
                      <TextField 
                        label="Username" 
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                      />
                      <TextField 
                        label="Password" 
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        style={{
                          marginTop:"20px",
                          marginBottom:"20px",
                        }}
                      />
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-end"}
                      // alignItems={"center"}
                      marginTop={1}
                    >
                      <Button
                        type="submit"
                        variant={"contained"}
                        color="success"
                        style={{ fontWeight: "bold" }}
                        onClick={() => canLogin() ? handleLogin() : null }
                      >
                        Masuk
                      </Button>
                    </Stack>
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
