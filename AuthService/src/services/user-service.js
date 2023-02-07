const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const{ JWT_KEY } = require('../config/serverConfig');
class UserService {

    constructor() {
        this.userRepository = new UserRepository();

    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
           // if(error.name == 'SequelizeValidationError') {
           //     throw error;
           // }
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{ expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in the token creation");
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {

            return bycrypt.compareSync(userInputPlainPassword,encryptedPassword);
            
        } catch (error) {
            console.log("Something went wrong in password comparision", error);
            throw error;
        }
        }
    }

}

module.exports = UserService;
