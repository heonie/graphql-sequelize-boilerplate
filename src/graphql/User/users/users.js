import {User} from "../../../models";

export default {
    Query: {
        users: (_, args) => {
            return User.findAll();
        }
    }
}
