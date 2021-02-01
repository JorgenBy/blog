import jsonPlaceholder from '../apis/jsonPlaceholder';
import jsonplaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    //lodash chain
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}

export const fetchPosts = () => async dispatch => {
        const response = await jsonplaceholder.get('/posts');
        
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}` );

    dispatch({ type: 'FETCH_USER', payload: response.data });
};


// Lodash Memoize solution for handle problem with multiple fetching of users
/* export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}` );

    dispatch({ type: 'FETCH_USER', payload: response.data });
}); */
