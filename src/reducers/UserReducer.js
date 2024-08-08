export const initialState = {
    id: '',
    avatar: '',
    name: '',
    lastname: '',
    email: ''
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setProfile':
            return {
                ...state,
                id: action.payload.id,
                avatar: action.payload.avatar,
                name: action.payload.name,
                lastname: action.payload.lastname,
                email: action.payload.email
            };
            break;
        default:
            return state;
    }
}