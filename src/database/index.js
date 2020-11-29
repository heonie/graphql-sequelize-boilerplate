import Sequelize from 'sequelize';
import {development, production} from './config';

const environment = process.env.NODE_ENV;

const opts = (environment == 'production') ? production : development;
const sequelize = new Sequelize(opts);

export const startDB = async () => {
    switch(environment) {
        case 'production':
            try {
                await sequelize.authenticate();
                await sequelize.sync();
            }
            catch(ex) {
                console.error('DB Initialize Error', ex);
            }
            break;
        default:
            try {
                await sequelize.authenticate();
                //await sequelize.drop();
                await sequelize.sync();
            }
            catch(ex) {
                console.error('DB Initialize Error', ex);
            }
    }
}

export default sequelize;
