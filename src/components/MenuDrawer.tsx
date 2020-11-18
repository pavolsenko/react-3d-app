import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
    createStyles,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import {DRAWER_WIDTH} from '../App';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

interface IMenuDrawerProps {
    routes: string[];
}

const MenuDrawer: React.FC<IMenuDrawerProps> = (props: IMenuDrawerProps) => {
    const classes = useStyles();
    const history = useHistory();

    const onClick = (event: React.MouseEvent) => {
        event.preventDefault();
        history.push('/' + event.currentTarget.id);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{paper: classes.drawerPaper}}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {props.routes.map((text: string, index: number) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText
                            id={index.toString()}
                            primary={text}
                            onClick={onClick}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default MenuDrawer;
