import {DataTypes} from 'sequelize';
import seq from '../database';
import {bcryptPassword} from '../util';

const hooks = {
    beforeCreate(user) {
        user.password = bcryptPassword(user.password); // eslint-disable-line no-param-reassign
    }
};

const User = seq.define('User', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true
    },
    password: {
        type: DataTypes.STRING,
        notNull: true
    },
    name: {
        type: DataTypes.STRING,
        notNull: true
    },
    role: {
        type: DataTypes.ENUM(['USER', 'ADMIN']),
        defaultValue: 'USER',
        validate: {
            isIn: {
                args: [
                    ['USER', 'ADMIN']
                ],
                msg: "Invalid role name"
            }
        }
    },
    state: {
        type: DataTypes.ENUM(['INUSE', 'BLOCKED']),
        defaultValue: 'INUSE',
        validate: {
            isIn: {
                args: [
                    ['INUSE', 'BLOCKED']
                ],
                msg: "Invalid state"
            }
        }
    }
}, { hooks });

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

export default User;
