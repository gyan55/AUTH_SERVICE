const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db  = require('./models/index');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const UserRepository = require('./repository/user-repository');
const UserService = require('./services/user-service');

const {User,Role} = require('./models/index');
const prepareAndStartServer = () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at: ${PORT}`);

        if(process.env.DB_SYNC){
           db.sequelize.sync({alter:true});
        }
     const u1 = await User.findByPk(4);
     const r1 = await Role.findByPk(2);
     u1.addRole (r1);
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