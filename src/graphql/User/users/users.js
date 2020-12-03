import {User} from "../../../models";

export default {
    Query: {
        users: (_, args, {request}) => {
            const {user} = request;
            return User.findAll();
        }
    }
}
