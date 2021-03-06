import React, {
    Component
} from 'react';
import fire from '../utils/firebase';
import yogaStyles from '../data/yoga-styles';
import Yoga from "../components/YogaComponent/Yoga";
import YogaForm from "../components/FormComponents/YogaForm";
import Map from '../components/MapComponent/Map';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            yoga_list: yogaStyles
        }
        this.logout = this.logout.bind(this)
    }
    logout() {
        fire.auth().signOut();
    }

    render() {
        const user = fire.auth().currentUser;

        return ( <
            div className = "Profile" >
            <
            div className = "Profile_Yoga_List" >
            <
            header className = "Profile-header" >
            <
            h1 onClick = {
                this.renderMarker
            } > Know Your Yoga < /h1> <
            div className = "User_Info" >
            <
            ul className = "yogalist" > {
                Object.keys(this.state.yoga_list).map(key =>
                    <
                    Yoga key = {
                        key
                    }
                    index = {
                        key
                    }
                    details = {
                        this.state.yoga_list[key]
                    }
                    renderMarker = {
                        this.renderMarker
                    }
                    />
                )
            } <
            /ul>  <
            /
            div > <
            /header> < /
            div > <
            div className = "Profile_Side" >
            <
            h1 > Welcome to your profile {
                user.email
            } < /h1> <
            button onClick = {
                this.logout
            }
            className = "PageSwitcher__Item" > Logout < /button> <
            Map / >
            <
            YogaForm / >
            <
            /div>   <
            /
            div >
        )
    }
}
export default Profile;