import {createStyles, makeStyles, ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrimarySearchAppBar from './components/AppBar';
import BasicComponent from './components/babylon/BasicComponent';
import ReactComponent from './components/babylon/ReactComponent';
import MenuDrawer from './components/MenuDrawer';
import FloorPlan from './components/babylon/Floorplan';
import FloorPlan2 from './components/babylon/Floorplan2';

import theme from './config/theme';
import EdgeDetection from './components/EdgeDetection';
import Beer from "./components/babylon/Beer";
import Beer1 from "./components/babylon/Beer1";

export const DRAWER_WIDTH: number = 250;

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            marginLeft: DRAWER_WIDTH,
            marginTop: 64,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',

            '& canvas': {
                width: 1000,
                height: 1000,
            }
        },
    }),
);

const routes: string[] = [
    'Basic Example',
    'React Example #1',
    'React Example #2',
    'Floor Plan #1',
    'Floor Plan #2',
    'Edge Detecton',
    'Beer 1',
    'Beer 2',
];

const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
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
                            <Route path={'/4'}>
                                <FloorPlan2 />
                            </Route>
                            <Route path={'/5'}>
                                <EdgeDetection />
                            </Route>
                            <Route path={'/6'}>
                                <Beer />
                            </Route>
                            <Route path={'/7'}>
                                <Beer1 />
                            </Route>
                            <Route path='/'>
                                <div/>
                            </Route>
                        </Switch>
                    </div>
                </>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
