
import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const colorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'colors/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const fileUpload = multer({storage: storage, fileFilter: filefilter});
const colorUpload = multer({storage: colorStorage, fileFilter: filefilter});


export{ fileUpload, colorUpload }