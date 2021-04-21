import * as React from 'react';
import '@babylonjs/loaders';
import { Vector3 } from '@babylonjs/core';
import { Engine, Scene } from 'react-babylonjs';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';

interface IModel {
    rootUrl: string;
    sceneFilename: string;
}

const model: IModel = {
    rootUrl: `./assets/`,
    sceneFilename: 'bier.obj',
}

const MODEL_DEFAULT_X = 0;
const MODEL_DEFAULT_Y = -30;
const MODEL_DEFAULT_Z = 0;
const DEFAULT_LIGHT = '0.7';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttons: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '1000px',
            margin: theme.spacing(2),
        },
    }),
);

export const Beer1 = () => {
    const classes = useStyles();

    const [x, setX] = React.useState<number>(MODEL_DEFAULT_X);
    const [y, setY] = React.useState<number>(MODEL_DEFAULT_Y);
    const [z, setZ] = React.useState<number>(MODEL_DEFAULT_Z);
    const [light, setLight] = React.useState<string>(DEFAULT_LIGHT);

    const onChange = (event: any) => {
        event.preventDefault();

        if (event.target.id === 'x') {
            setX(parseInt(event.target.value || MODEL_DEFAULT_X, 10));
        }

        if (event.target.id === 'y') {
            setY(parseInt(event.target.value || MODEL_DEFAULT_Y, 10));
        }

        if (event.target.id === 'z') {
            setZ(parseInt(event.target.value || MODEL_DEFAULT_Z, 10));
        }

        if (event.target.id === 'light') {
            setLight(event.target.value || DEFAULT_LIGHT);
        }
    }

    return (
        <>
            <div className={classes.buttons}>
                <div>
                    <TextField
                        id={'x'}
                        type={'number'}
                        onChange={onChange}
                        value={x}
                        variant={'outlined'}
                        label={'x'}
                    />
                </div>

                <div>
                    <TextField
                        id={'y'}
                        type={'number'}
                        onChange={onChange}
                        value={y}
                        variant={'outlined'}
                        label={'y'}
                    />
                </div>

                <div>
                    <TextField
                        id={'z'}
                        type={'number'}
                        onChange={onChange}
                        value={z}
                        variant={'outlined'}
                        label={'z'}
                    />
                </div>

                <div>
                    <TextField
                        id={'light'}
                        type={'number'}
                        onChange={onChange}
                        value={light}
                        variant={'outlined'}
                        label={'light'}
                    />
                </div>
            </div>

            <Engine
                antialias
                adaptToDeviceRatio
                canvasId='babylonJS'
                engineOptions={{preserveDrawingBuffer: true}}
            >
                <Scene>
                    <arcRotateCamera
                        name="camera1"
                        alpha={Math.PI / -2}
                        beta={Math.PI / 2}
                        radius={0.05}
                        target={Vector3.Zero()}
                        minZ={0.1}
                    />

                    <hemisphericLight
                        name="light1"
                        intensity={parseFloat(light)}
                        direction={Vector3.Up()}
                    />

                    <directionalLight
                        name="shadow-light"
                        setDirectionToTarget={[new Vector3(x, y, z)]}
                        direction={new Vector3(x, y, z)}
                        position={new Vector3(x + 5, y + 10, z + 5)}
                        intensity={parseFloat(light)}
                        shadowMinZ={1}
                        shadowMaxZ={2500}
                    >
                        <shadowGenerator
                            mapSize={1024}
                            useBlurExponentialShadowMap={true}
                            blurKernel={32}
                            darkness={0.8}
                            shadowCasters={['sphere1', 'dialog']}
                            forceBackFacesOnly={true}
                            depthScale={100}
                        />
                    </directionalLight>

                    <model
                        sceneFilename={model.sceneFilename}
                        rootUrl={model.rootUrl}
                        position={new Vector3(x, y, z)}
                    />
                </Scene>
            </Engine>
        </>
    )
}

export default Beer1;
