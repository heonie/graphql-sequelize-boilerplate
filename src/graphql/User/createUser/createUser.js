import {User} from '../../../models';

export default {
    Mutation: {
        createUser: (_, args) => {
            const {email, password, name} = args;
            return User.create({email, password, name});
        }
    }
}
