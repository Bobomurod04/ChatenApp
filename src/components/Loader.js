import React, {useContext} from 'react';
import {  Grid, Container } from '@material-ui/core';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Context } from '..';


function Loader() {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return (
    <Container>
        <Grid
            container alignItems={"center"} justify={"center"} style={{ height: window.innerHeight - 50 }}>
            <Grid container alignItems={"center"} justify={"center"} >
                <div className="lds-hourglass"></div>
            </Grid>
        </Grid>
    </Container>
    );
}

export default Loader;