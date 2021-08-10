import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };

const upload = multer({
    storage,
    //fileFilter: multerFilter
})


router.post('/', upload.array('images',5), (req, res)=>{
    //var paths = req.files.map(file => file.path)
    //console.log("req.file" , paths)
    //res.send(paths)
    console.log(req.files)
    //res.send(`/${req.file.path}`)
})

export default router