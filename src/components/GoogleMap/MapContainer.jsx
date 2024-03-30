import React,{Component} from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";

class MapContainer extends Component {
    render(){
        return(
            <Map
                google={this.props.google}
                style={{
                    width:"60%", height: "40%",
                    margin:"auto"
                }}
                zoom = {10}
                initialCenter={
                    {
                        lat:24.792480,
                        lng:85.007713
                    }
                }
            />
        )
    }
}

export default GoogleApiWrapper({
    apiKey:"AIzaSyAX_a52KmWrMWZrWrVphhzq4owAiN6_8U8"
})(MapContainer)