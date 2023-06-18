const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
            }
         catch (error) {
            console.log("Something went wrong in password comparision", error);
            throw error;
        }
     } 

     async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }
     
     async signIn(email,plainPassword){
        try {
            // step-1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // console.log(user);
            // step-2-> compare the incoming plain password with the stored encrypted pasword
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("password doesnt match");
                throw {error:'incorrect password'};
            }
          //if password match then create a token and send it to the user
            const newJWT = this.createToken({
                email:user.email,
                id:user.id
            });
            return newJWT;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
     }
    }



module.exports = UserService;
