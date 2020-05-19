import React, { useEffect, useState ,  useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Map , Marker , TileLayer} from "react-leaflet";
import MyBackdrop from "../../components/backdrop/MyBackdrop";
import Snachbar from "../../components/snackbar/Snackbar";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Zoom from 'react-reveal/Zoom';
import "./SignUpPage.scss"

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#3f915e;" ,

  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    "&:hover": {
      backgroundColor: "#366e43" ,
    },
    backgroundColor: "#3f915e;" ,
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

  const [repeatPassword, setRepeatPassword] = useState("");

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

  useEffect(()=>{
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === password;

    });
  });

  const setMarker = (e) => {
    setLatitude(e.latlng.lat);
    setLongitude(e.latlng.lng);
  };


  const handleSnackbarClose = () => {
    setOpen(false) ;
  } ;

  const handleSubmit = e => {
    e.preventDefault();

    setOpenbackdrop(true);

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
      <div className={"signup-container"}>

        <div className={"signup-map-container"} >
          <Zoom>
            <Map className={"signup-map"} center={[33.979809 , 9.435263]} zoom={7}   onClick={e => setMarker(e)}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                  position={[latitude , longitude]}
              />
            </Map>
          </Zoom>
        </div>

        <div >
          <Zoom>
            <div className={classes.paper} >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon  />
              </Avatar>
              <ValidatorForm className={"full-width"}
                  onSubmit={handleSubmit}
                  onError={errors => console.log(errors)}
              >
                <div >
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required','minStringLength:3','maxStringLength:21']}
                        errorMessages={['this field is required','field is too short','field is too long']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required','minStringLength:3','maxStringLength:21']}
                        errorMessages={['this field is required','field is too short','field is too long']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required','minStringLength:3','maxStringLength:21']}
                        errorMessages={['this field is required','field is too short','field is too long']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required','minStringLength:6','maxStringLength:31']}
                        errorMessages={['this field is required','field is too short','field is too long']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
                        dir="rtl"
                        variant="outlined"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="إعادة كلمة المرور"
                        type="password"
                        id="repeatPassword"
                        autoComplete="current-password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['password mismatch', 'this field is required']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <FormControl variant="outlined" style={{width : "100%"}}>
                      <InputLabel id="governorate">الولاية</InputLabel>
                      <Select
                          required
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
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
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
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                  </div>
                  <div className={"signup-input"}>
                    <TextValidator
                        dir="rtl"
                        variant="outlined"
                        fullWidth
                        name="comment"
                        label="تعليق"
                        type="text"
                        id="comment"
                        autoComplete="Comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Sign Up
                </Button>
              </ValidatorForm>
            </div>
          </Zoom>
        </div>

        <MyBackdrop open={openbackdrop} />
        <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>
      </div>

  );
}

export default SignUp ;
