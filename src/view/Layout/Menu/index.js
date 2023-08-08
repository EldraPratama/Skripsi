import { 
  Home, 
  Book, 
  People, 
  NoteAdd, 
  Paid, 
  Logout 
} from '@mui/icons-material';


const features = [
  {
    text: "Beranda",
    path: "/",
    type: "item",
  },
  {
    text: "Home",
    path: "/home",
    type: "item",
    icon: <Home/>,
  },
  {
    text: "Buku",
    path: "/buku",
    type: "item",
    icon: <Book/>,
  },
  {
    text: "Anggota",
    path: "/anggota",
    type: "item",
    icon: <People/>,
  },
  {
    text: "Peminjaman",
    path: "/peminjaman",
    type: "item",
    icon: <NoteAdd/>,
  },
  {
    text: "Denda",
    path: "/denda",
    type: "item",
    icon: <Paid/>,
  },
  {
    text: "Logout",
    path: "/logout",
    type: "item",
    icon: <Logout/>,
  },
];

export default features;
