import React, {useContext} from 'react';
import {AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import { LOGIN_ROUTE } from '../util/const';
import { NavLink } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Context } from '..';

function Navbar() {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        <AppBar 
        style = {{ background: "linear-gradient(.35turn, red, 30%, blue)" }} position="static">
            <Toolbar variant="dense">
                <h3>Bobomurod Jabbarov</h3>
                <Grid container justify = {"flex-end"}>
                    {user ? (
                        <Button onClick={ () => auth.signOut()} variant={"outlined"} style = {{ background:"blue", color: "white", marginTop: 5}}>Exit</Button>
                    ) : (
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={"outlined"} style = {{ background:"blue", color: "white", marginTop: 5}}>Login</Button>
                        </NavLink>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;