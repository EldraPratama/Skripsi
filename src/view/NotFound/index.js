import { Box, Stack, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"column"}
      alignContent={"center"}
      justifyContent={"center"}
      height={"100vh"}
      width={"100vw"}
    >
      <Box justifyContent={"center"}>
        <Typography fontSize={"10rem"} textAlign={"center"}>
          404
        </Typography>
        <Typography fontSize={"1.5rem"} textAlign={"center"}>
          Halaman tidak ditemukan!
        </Typography>
        <Chip icon={<ArrowBackIcon />} label="Kembali" color="success" 
          style={{ width:"20%", marginLeft:"40%", marginTop:"20px"}}
          onClick={() => navigate("/")}
        />
      </Box>
    </Stack>
  );
};

export default NotFound;
