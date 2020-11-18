import React, { useEffect, useState, useRef} from 'react';
import "@babylonjs/loaders/glTF"; // side-effects
import { Vector3, Color3 } from '@babylonjs/core';
import { Engine, Scene } from 'react-babylonjs';

import ScaledModelWithProgress from './ScaledModelWIthProgress';

let baseUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/'

interface IModel {
    rootUrl: string;
    sceneFilename: string;
}

const models: IModel[] = [{
    rootUrl: `./assets/apartment1/`,
    sceneFilename: 'C10.obj',
}, {
    rootUrl: `./assets/`,
    sceneFilename: 'house.gltf',
}];

interface ILoadModelsProps {
    model: IModel;
}

const LoadModels = (props: ILoadModelsProps) => {
    return (
        <>
            <ground name='ground1' width={10} height={6} subdivisions={2} position={new Vector3(0, -2, 0)}>
                <ScaledModelWithProgress
                    key={props.model.sceneFilename}
                    rootUrl={props.model.rootUrl}
                    sceneFilename={props.model.sceneFilename}
                    scaleTo={3}
                    progressBarColor={Color3.FromInts(135, 206, 235)}
                    center={new Vector3(2, 1, 0)}/>
            </ground>
        </>
    )
}

export const FloorPlan = () => {
    const [stateModel, setModel] = useState<IModel>(models[0]);
    const ref = useRef(stateModel);

    useEffect(() => {
        ref.current = stateModel;
    }, [stateModel]);

    const onClick = () => {
        const nextModel = models.find(m => m.sceneFilename !== ref.current.sceneFilename);

        if (!nextModel) {
            return;
        }

        setModel(nextModel);
    };

    return (
        <div style={{flex: 1, display: 'flex'}}>
            <button onClick={onClick}>change model</button>
            <Engine antialias adaptToDeviceRatio canvasId='babylonJS'>
                <Scene>
                    <arcRotateCamera name='camera1' alpha={Math.PI / 2} beta={Math.PI / 4} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
                    <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()}/>
                    <LoadModels model={stateModel} />
                </Scene>
            </Engine>
        </div>
    )
}

export default FloorPlan;
