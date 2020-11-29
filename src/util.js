import bcrypt from 'bcrypt-nodejs';

export const bcryptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

export const bcryptComparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
);
