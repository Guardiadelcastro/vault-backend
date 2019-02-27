import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';


import mongoConfig from './config/mongo';
import * as users from './routes/usersRouter';
export default class Server {

  app: express.Application

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    mongoose.connect(mongoConfig.URI || process.env.MONGODB_URL, mongoConfig.options)
      .then(() => console.log(`MongoDB is connected...`))
      .catch(err => console.error(`MongoDB connection unsccessfull due to error: ${err}`));

    this.app.set('port', process.env.PORT || 3000);

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
  }

  routes() {
    this.app.get('/', (req, res) => res.json({msg: 'Welcome to the Vault API'}));
    this.app.use('/users', users);
  }

  start() {
    this.app.listen(this.app.get('port'), () => console.log(`Listening on port ${this.app.get('port')}`));
  }
}

const server = new Server();
server.start();
