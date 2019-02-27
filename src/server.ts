import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';

export default class Server {

  app: express.Application

  constructor() {
    this.app = express();
    this.config()
    this.routes()
  }

  config() {
    this.app.set('port', process.env.PORT || 3000);

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
  }

  routes() {
    this.app.use('/', (req, res) => res.json({msg: 'Welcome to the Vault API'}))
  }

  start() {
    this.app.listen(this.app.get('port'), () => console.log(`Listening on port ${this.app.get('port')}`));
  }
}

const server = new Server();
server.start();
