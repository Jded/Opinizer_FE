import React from 'react'

const style={

}

class PictureSelector extends React.Component {

    state = {
        newFileName: ""
    };

    constructor(props){
        super(props);
    }

    click = ()=>{
        alert('something')
    }

    render = ()=>{
        const img = this.props.imageAddress;

        const avatarAddress = this.props.user.address;
        const avatarLetter = this.props.user.login.toUpperCase().substr(0,1);
        return (
            <div>
                <RaisedButton
                    containerElement='label' // <-- Just add me!
                    label='My Label'>
                    <input type="file" onChange={this.click}/>
                </RaisedButton>
            </div>
        )
    }
}

export default PictureSelector;