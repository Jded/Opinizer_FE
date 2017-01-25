
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from "./Main";
import Admin from "./Admin/Admin.jsx";
import SiteSettings from "./Admin/SiteSettings.jsx";
import Users from "./Admin/Users.jsx";
import Dashboard from "./Dashboard.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import UserHeader from "./User/UserHeader.jsx";
import UserSettings from "./User/UserSettings.jsx";
import RegisterContainer from "./User/RegisterContainer";
import CategoryItemList from "./Item/CategoryItemList.jsx";
import UserItemList from "./Item/UserItemList.jsx";
import ItemHeader from "./Item/ItemHeader.jsx";
import ItemView from "./Item/ItemView.jsx";
import ItemNew from "./Item/ItemNew.jsx";
import ItemEdit from "./Item/ItemEdit.jsx";
import CategoriesList from "./Category/CategoriesList.jsx";
import CategoryEdit from "./Category/CategoryEdit.jsx";
import CategoryHeader from "./Category/CategoryHeader.jsx";
import CategoryNew from "./Category/CategoryNew.jsx";
import CategoryView from "./Category/CategoryView.jsx";
import UserCategoriesList from "./Category/UserCategoriesList.jsx";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './../reducers/index';
import {getSession} from "./../actions/user";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

class Routes extends React.Component {

    render() {
        function onAppInit(dispatch) {
            return (nextState, replace, callback) => {
                dispatch(getSession())
                    .then(() => {
                        callback();
                    });
            };
        }

        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Main} onEnter={onAppInit(store.dispatch)}>
                        <IndexRoute component={Dashboard} />
                        <Route path="search" component={GlobalSearch} />
                        <Route path="categories" component={CategoriesList}/>
                        <Route path="category/:categoryId" component = {CategoryHeader}>
                            <IndexRoute component={CategoryView} />
                            <Route path="edit" component = {CategoryEdit}/>
                            <Route path="items" component = {CategoryItemList}/>
                            <Route path="newItem" component = {ItemNew}/>
                        </Route>
                        <Route path="newCategory" component = {CategoryNew}/>
                        <Route path="item/:itemId" component={ItemHeader}>
                            <IndexRoute component={ItemView} />
                            <Route path="edit"component={ItemEdit} />
                        </Route>
                        <Route path="user" component={UserHeader}>
                            <Route path="categories/:mode" component={UserCategoriesList}/>
                            <Route path="items/:mode" component={UserItemList}/>
                            <Route path="settings" component={UserSettings}/>
                        </Route>
                        <Route path="register" component={RegisterContainer}/>
                        <Route path="admin" component={Admin}>
                            <IndexRoute component={SiteSettings} />
                            <Route path="users" component={Users}/>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

export default Routes;

