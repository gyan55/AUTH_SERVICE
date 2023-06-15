const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const UserRepository = require('./repository/user-repository');
const UserService = require('./services/user-service');
const prepareAndStartServer = () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at: ${PORT}`);
       // const repo = new UserRepository();
        //const response = await repo.getById(1);
       // console.log(response);
      /* const service = new UserService();
       const newToken = service.createToken({
        email: 'sanket@admin.com',
        id:1
       });
       console.log("new token is",newToken); */
    });
}

prepareAndStartServer(); 