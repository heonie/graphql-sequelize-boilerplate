import {User} from "../../../models";

export default {
    Query: {
        user: (_, args) => {
            const { id } = args;
            return User.findByPk(id);
        }
    }
}
