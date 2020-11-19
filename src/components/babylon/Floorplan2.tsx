import * as React from 'react';
import '@babylonjs/loaders';
import { Vector3, ScreenshotTools, Engine as BabylonEngine, Scene as BabylonScene } from '@babylonjs/core';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useBabylonEngine, useBabylonScene, Engine, Scene } from 'react-babylonjs';

interface IModel {
    rootUrl: string;
    sceneFilename: string;
}

const model: IModel = {
    rootUrl: `./assets/apartment1/`,
    sceneFilename: 'C10.obj',
}

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

const x = 43;
const y = 0;
const z = -42;

const MyScene = () => {
    const engine = useBabylonEngine();
    const scene = useBabylonScene();

    const makeScreenshot = (engine: BabylonEngine | null, scene: BabylonScene | null) => {
        if (!engine || !scene) {
            return;
        }
        
        ScreenshotTools.CreateScreenshot(engine, scene.cameras[0], 1000);
    }

    React.useEffect(() => {
        document.addEventListener('onMakeScreenshot', () => makeScreenshot(engine, scene));
    }, [engine, scene]);

    return (
        <>
            <arcRotateCamera
                name="camera1"
                alpha={Math.PI / -2}
                beta={Math.PI / 2}
                radius={0.05}
                target={Vector3.Zero()}
                minZ={0.001}
            />

            <hemisphericLight
                name="light1"
                intensity={0.7}
                direction={Vector3.Up()}
            />

            <directionalLight
                name="shadow-light"
                setDirectionToTarget={[new Vector3(x, y, z)]}
                direction={new Vector3(x, y, z)}
                position={new Vector3(x + 5, y + 10, z + 5)}
                intensity={0.9}
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
        </>
    );
}

export const FloorPlan2 = () => {
    const classes = useStyles();

    const makeScreenshot = () => {
        document.dispatchEvent(new Event('onMakeScreenshot'));
    }

    return (
        <>
            <div className={classes.buttons}>
                <Button
                    color={'primary'}
                    onClick={makeScreenshot}
                    variant={'contained'}
                >
                    Make Screenshot
                </Button>
            </div>

            <Engine
                antialias
                adaptToDeviceRatio
                canvasId='babylonJS'
                engineOptions={{preserveDrawingBuffer: true}}
            >
                <Scene>
                    <MyScene/>
                </Scene>
            </Engine>
        </>
    )
}

export default FloorPlan2;
