import {createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrimarySearchAppBar from './components/AppBar';
import BasicComponent from './components/babylon/BasicComponent';
import ReactComponent from './components/babylon/ReactComponent';
import MenuDrawer from './components/MenuDrawer';
import FloorPlan from './components/babylon/Floorplan';

export const DRAWER_WIDTH: number = 250;

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            marginLeft: DRAWER_WIDTH,
            marginTop: 64,
            display: 'flex',

            '& canvas': {
                width: '100%',
                height: '100%',
            }
        },
    }),
);

const routes: string[] = [
    'Basic Example',
    'React Example #1',
    'React Example #2',
    'Floor Plan',
];

const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <>
                <PrimarySearchAppBar/>
                <MenuDrawer routes={routes}/>

                <div className={classes.content}>
                    <Switch>
                        <Route path={'/0'}>
                            <BasicComponent />
                        </Route>
                        <Route path={'/1'}>
                            <div/>
                        </Route>
                        <Route path={'/2'}>
                            <ReactComponent />
                        </Route>
                        <Route path={'/3'}>
                            <FloorPlan />
                        </Route>
                        <Route path='/'>
                            <div/>
                        </Route>
                    </Switch>
                </div>
            </>
        </BrowserRouter>
    );
}

export default App;
