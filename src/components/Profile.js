import React, { Component } from 'react';
import fire from './firebase';
import yogaStyles from './yoga-styles';
import Yoga from "./Yoga";
import YogaForm from "./YogaForm"
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibGxveWQtY2hhbWJyaWVyIiwiYSI6ImNqcmh4NHd0ajJyZ3I0M24wZjJnOWVwZzgifQ.SaVzj9bmSvp4Zg7FhwC_Mg"
  });

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            yoga_list: yogaStyles,
        }
        this.logout = this.logout.bind(this)
        
    }
    logout(){
        fire.auth().signOut();
    }
    render(){
        var user = fire.auth().currentUser;
        var email;

        if (user != null) {
            email = user.email;
        }
        return(
            <div className="Profile">
                <div className="Profile_Yoga_List">
                <header className="Profile-header">
                        <h1>Know Your Yoga</h1>
                        <ul className="yogalist">                    
                            {Object.keys(this.state.yoga_list).map(key => 
                                <Yoga key={key} index={key} details={this.state.yoga_list[key]} />
                            )}
                        </ul>
                </header>
                </div>
                <div className="Profile_Side">
                    <h1>Welcome to your profile {email}</h1>
                    <button onClick={this.logout} className="PageSwitcher__Item">Logout</button>
                    <YogaForm/>
                    <Map style="mapbox://styles/mapbox/streets-v11"
                        containerStyle={{
                            height: "200px",
                            width: "200px"
                        }} pitch={[9]} center={[4.899, 52.372]}>
                            <Layer
                            type="symbol"
                            id="marker"
                            layout={{ "icon-image": "marker-15" }}>
                            </Layer>
                        </Map>
                </div>
            </div>
        )
    }
}
export default Profile;