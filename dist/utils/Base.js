export class Base {
    static reducer = (state = {}, action) => {
        if (action.type) {
            return {
                ...state,
                ...action,
            };
        }
        return state;
    };
    dispatch;
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
}
//# sourceMappingURL=Base.js.map