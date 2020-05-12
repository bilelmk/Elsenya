import React, { useEffect, useState ,  useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Map , Marker , Popup , TileLayer} from "react-leaflet";
import MyBackdrop from "../../components/backdrop/MyBackdrop";
import Snachbar from "../../components/snackbar/Snackbar";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#606470" ,

  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    "&:hover": {
      backgroundColor: "#323643" ,
    },
    backgroundColor: "#606470" ,
    margin: theme.spacing(3, 0, 2)
  }
}));



function SignUp() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [place, setPlace] = useState("");
  const [comment, setComment] = useState("");
  const [agriculture, setAgriculture] = useState("");
  const [latitude, setLatitude] = useState(33.979809);
  const [longitude, setLongitude] = useState(9.435263);
  const [governorate, setGovernorate] = useState("");

  // backdrop state
  const [openbackdrop, setOpenbackdrop] = useState(false);

  // alert state
  const [open , setOpen] = useState(false) ;
  const [message , setMessage] = useState('') ;
  const [status , setStatus] = useState('success') ;

  const governorates = ["أريانة","باجة","بنزرت","بن عروس","تطاوين","تونس","جندوبة","توزر", "سليانة","زغوان","سوسة","صفاقس","سيدي بوزيد",
    "قبلي","قابس","القصرين","المنستير","قفصة","القيروان","المهدية","الكاف","نابل","مدنين" , "منوبة"] ;

  const setMarker = (e) => {
    setLatitude(e.latlng.lat);
    setLongitude(e.latlng.lng);
  };

  const handleSnackbarClose = () => {
    setOpen(false) ;
  } ;

  const handleSubmit = e => {
    setOpenbackdrop(true);
    // e.preventDefault();

      var user = {
        email: email,
        password: password,
        username: userName,
        firstname: firstName,
        lastname: lastName,
        place: place,
        longitude: longitude,
        latitude: latitude,
        comment: comment,
        agriculture: agriculture ,
        governorate : governorate
      };
      axios
        .post(baseURL  + "users/signup", user)
        .then(res => {
          setOpen(true) ;
          setMessage( "تم تسجيل المشارك بنجاح") ;
          setStatus("success");
          setOpenbackdrop(false);
        })
        .catch(err => {
          setOpen(true) ;
          setMessage( "خطأ في الإضافة") ;
          setStatus("error");
          setOpenbackdrop(false);
        })

  };

  return (
      <Grid className={"container"} container justify="center" alignItems="center">
        <Grid item xs={12} sm={4} >
            <Map style={{width : "100%" , height : "85vh"}} center={[33.979809 , 9.435263]} zoom={7}   onClick={e => setMarker(e)}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                  position={[latitude , longitude]}
              />
            </Map>
        </Grid>
        <Grid item xs={12} sm={1} >

        </Grid>

        <Grid item xs={12} sm={4} >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon  />
            </Avatar>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                      dir="rtl"
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="الاسم"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="اللقب"
                      name="lastName"
                      autoComplete="lname"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      id="userName"
                      label="اسم المستخدم"
                      name="userName"
                      autoComplete="Uname"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="عنوان البريد الإلكتروني"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="كلمة المرور"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" style={{width : "100%"}}>
                    <InputLabel id="governorate">الولاية</InputLabel>
                    <Select
                        labelId="governorate"
                        id="governorate"
                        value={governorate}
                        onChange={e => setGovernorate(e.target.value)}
                        label="Age"
                    >{governorates.map( gv => {
                      return <MenuItem key={gv} value={gv}>{gv}</MenuItem>
                    })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      name="place"
                      label="المنطقة"
                      type="text"
                      id="place"
                      autoComplete="Place"
                      value={place}
                      onChange={e => setPlace(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      name="agriculture"
                      label="الزراعات"
                      type="text"
                      id="agriculture"
                      autoComplete="Agriculture"
                      value={agriculture}
                      onChange={e => setAgriculture(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      dir="rtl"
                      variant="outlined"
                      required
                      fullWidth
                      name="comment"
                      label="تعليق"
                      type="text"
                      id="comment"
                      autoComplete="Comment"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
              >
                Sign Up
              </Button>
              {/*<Grid container justify="flex-end">*/}
              {/*  <Grid item>*/}
              {/*    <NavLink to="/sign-in" variant="body2">*/}
              {/*      Already have an account? Sign in*/}
              {/*    </NavLink>*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}
            </form>
          </div>
        </Grid>
        <MyBackdrop open={openbackdrop} />
        <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>
      </Grid>

  );
}

export default SignUp ;
