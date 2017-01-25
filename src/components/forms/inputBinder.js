export function changeHandler(valueHolder, errorHolder, customChangeFunction){
        return {
            value: this.state[valueHolder],
            errorText: this.state[errorHolder],
            onChange: customChangeFunction? customChangeFunction: (event) => {
                    event.persist();
                    const statePatch = {
                        [valueHolder]: event.target.value,
                        [errorHolder]: null
                    };
                    this.setState((prevState, props) => Object.assign({}, prevState, statePatch));
                }
        }
}
