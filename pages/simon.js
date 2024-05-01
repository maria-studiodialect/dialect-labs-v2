'use client'
import * as THREE from 'three'
import Spline from '@splinetool/react-spline';

export default function Simon() {

    function onLoad(spline) {
        spline.setZoom(-1);
    }
    return (
        <div className='bg-black h-screen w-screen flex space-x-10'>
                <Spline 
                    scene="https://prod.spline.design/PWFDei3kJIp1vCWt/scene.splinecode" 
                    // onLoad={onLoad}
                />
        </div>
    )
}