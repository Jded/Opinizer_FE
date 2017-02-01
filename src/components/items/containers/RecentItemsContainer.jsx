import { connect } from 'react-redux';
import ItemList from "../display/ItemList";


const mapStateToProps = (state) => {
    /*return {
     user: state.user
     }*/
}
const mapDispatchToProps = (dispatch) => {
    /*return {
     doRegister: (userData) => {
     dispatch(doRegister(userData))
     }
     }*/
}



const RecentItemsContainer = ()=>{
    null;//<ItemList data={items} multiline={false}/>
}

/*const RecentItemsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)*/

export default RecentItemsContainer