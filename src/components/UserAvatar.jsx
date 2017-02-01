import React from 'react'
import {Avatar} from 'material-ui'
import {
    lightWhite,
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';

class UserAvatar extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const colors = [ blue300, indigo900, orange200, deepOrange300, pink400, purple500];
        const size = this.props.size?this.props.size:40;
        const avatarAddress = this.props.tempUrl?this.props.tempUrl:(this.props.user.address?`/api/img/${this.props.user.address}?dim=${size+10}x${size+10}`:null);
        const avatarLetter = this.props.user.login.toUpperCase().substr(0,1);

        return (
            <div>
            {avatarAddress ? (
                <Avatar
                    src={avatarAddress}
                    size={size}
                />
                ) : (
                <Avatar
                    color={lightWhite}
                    backgroundColor={colors[parseInt(this.props.user.id)%colors.length]}
                    size={size}
                >{avatarLetter}</Avatar>
                )}
            </div>
        )
    }
}

export default UserAvatar;