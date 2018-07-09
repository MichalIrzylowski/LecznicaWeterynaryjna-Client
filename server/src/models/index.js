import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import User from './User';
import Message from './Message';

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/lecznica_weterynaryjna', {
  keepAlive: true
})

var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

const gfs = Grid(conn);

const storage = GridFsStorage({
  gfs,
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${file.fieldname}-${timestamp}.${file.originalname.split('.')[file.originalname.split('.').length -1]}`)
  },
  metadata: function (req, file, cb) {
    cb(null, {originalname: file.originalname})
  },
  root: 'profileImages'
})
export const upload = multer({
  storage,
}).single('file');
export {User};
export {Message};
