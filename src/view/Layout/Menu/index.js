import { 
  Home, 
  Book, 
  People, 
  NoteAdd, 
  Paid, 
  Logout,
  Settings,
  SwapHorizRounded,
  Assignment
} from '@mui/icons-material';


const features = [
  {
    text: "Home",
    path: "/",
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
    text: "Pengembalian",
    path: "/pengembalian",
    type: "item",
    icon: <SwapHorizRounded/>,
  },
  {
    text: "Denda",
    path: "/denda",
    type: "item",
    icon: <Paid/>,
  },
  {
    text: "Laporan",
    path: "/laporan",
    type: "item",
    icon: <Assignment/>,
  },
  {
    text: "Pengaturan",
    path: "/pengaturan",
    type: "item",
    icon: <Settings/>,
  },
  {
    text: "Logout",
    path: "/login",
    type: "item",
    icon: <Logout/>,
  },
];

export default features;
