import React from "react";
import BigMan from "../../../static/svg/svg_homepage/bigman.svg"
import NearBigMan from "../../../static/svg/svg_homepage/near_bigman.svg"

export default function BigManPicture(){
    return (
        <div className="bigmanpicture_div">
            <div className="bigman_itself_div">
                <BigMan viewBox="-40 0 600 600" className="bigman_itself_logo"/>
            </div>

            <div className="particles_div">
                <NearBigMan viewBox="150 0 300 300" className="particles_logo"/>
            </div>
        </div>
    )
}