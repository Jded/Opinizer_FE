
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from "./Main";
import Admin from "./Admin/Admin.jsx";
import SiteSettings from "./Admin/SiteSettings.jsx";
import Users from "./Admin/Users.jsx";
import Dashboard from "./Dashboard.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import UserHeader from "./User/UserHeader.jsx";
import UserSettingsContainer from "../components/user/containers/UserSettingsContainer.jsx";
import RegisterContainer from "../components/user/containers/RegisterContainer";
import CategoryItemList from "./Item/CategoryItemList.jsx";
import UserItemList from "./User/UserItemList.jsx";
import ItemHeader from "./Item/ItemHeader.jsx";
import ItemView from "./Item/ItemView.jsx";
import ItemNew from "./Item/ItemNew.jsx";
import ItemEdit from "./Item/ItemEdit.jsx";
import CategoriesList from "./Category/CategoriesList.jsx";
import CategoryEdit from "./Category/CategoryEdit.jsx";
import CategoryHeader from "./Category/CategoryHeader.jsx";
import CategoryNew from "./Category/CategoryNew.jsx";
import CategoryView from "./Category/CategoryView.jsx";
import UserCategoriesList from "./User/UserCategoriesList.jsx";
import UserCommentsList from "./User/UserCommentsList.jsx";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './../reducers/index';
import {getSession} from "./../actions/user";
import {getAllCategories, getCategory, getMyCategories, getRecentCategories, newCategory} from "./../actions/category"


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

        function allCategoriesInit(dispatch){
            return (nextState, replace, callback) => {
                dispatch(getAllCategories())
                    .then(() => {
                        callback();
                    });
            };
        }

        function myCategoriesInit(dispatch){
            return (nextState, replace, callback) => {
                dispatch(getMyCategories())
                    .then(() => {
                        callback();
                    });
            };
        }
        function categoryInit(dispatch){
            return (nextState, replace, callback) => {
                dispatch(getCategory(nextState.params.categoryId))
                    .then(() => {
                        callback();
                    });
            };
        }
        function dashboardInit(dispatch){
            return (nextState, replace, callback) => {
                Promise.all([
                    dispatch(getRecentCategories(7))
                ])
                .then(() => {
                    callback();
                });
            };
        }

        function newCategoryInit(dispatch){
            return (nextState, replace, callback) => {
                dispatch(newCategory());
                callback();
            };
        }

        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Main} onEnter={onAppInit(store.dispatch)}>
                        <IndexRoute component={Dashboard} onEnter={dashboardInit(store.dispatch)}/>
                        <Route path="search" component={GlobalSearch} />
                        <Route path="categories" component={CategoriesList} onEnter={allCategoriesInit(store.dispatch)}/>
                        <Route path="category/:categoryId" component = {CategoryHeader} onEnter={categoryInit(store.dispatch)}>
                            <IndexRoute component={CategoryView} />
                            <Route path="edit" component = {CategoryEdit}/>
                            <Route path="items" component = {CategoryItemList}/>
                            <Route path="newItem" component = {ItemNew}/>
                        </Route>
                        <Route path="newCategory" component = {CategoryNew} onEnter={newCategoryInit(store.dispatch)}/>
                        <Route path="item/:itemId" component={ItemHeader}>
                            <IndexRoute component={ItemView} />
                            <Route path="edit"component={ItemEdit} />
                        </Route>
                        <Route path="user" component={UserHeader}>
                            <Route path="categories" component={UserCategoriesList} onEnter={myCategoriesInit(store.dispatch)}/>
                            <Route path="items" component={UserItemList}/>
                            <Route path="comments" component={UserCommentsList}/>
                            <Route path="settings" component={UserSettingsContainer}/>
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

