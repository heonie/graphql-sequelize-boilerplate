import {User} from '../../../models';
import {bcryptComparePassword} from '../../../util';
import {generateToken} from '../../../passport';

export default {
    Mutation: {
        logIn: async (_, args) => {
            const {email, password} = args;

            const logInUser = await User.findOne({
                where: {email}
            });
            if(logInUser && bcryptComparePassword(password, logInUser.password)) {
                return generateToken(logInUser.id);
            }
            else {
                throw new Error("Wrong email and password combination");
            }
        }
    }
}
