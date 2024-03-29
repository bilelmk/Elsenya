import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink,useHistory} from "react-router-dom";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import jwt from "jsonwebtoken";
import {useStateValue} from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#3f915e;" ,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        "&:hover": {
            backgroundColor: "#366e43" ,
        },
        backgroundColor: "#3f915e;" ,
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignIn() {
    const history = useHistory();
    const [isAuth, dispatch] = useStateValue();

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = e => {
        e.preventDefault();


        var user = {
            email: email,
            password: password,
        };
        axios
            .post(baseURL + "users/login", user)
            .then(res => {
                localStorage.setItem("jwToken", "Bearer " + res.data.token);
                let user = jwt.decode(localStorage.getItem('jwToken'));
                dispatch({type: 'login'})
                let token = localStorage.getItem("jwToken");


                if (token)
                    axios.defaults.headers.common["Authorization"] = `${token}`;
                else axios.defaults.headers.common["Authorization"] = null;

                history.push('/admin')
            }).then(() => {
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <form className={classes.form} noValidate>
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
                    <TextField style={{marginTop : "20px"}}
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </Container>
    );
}
