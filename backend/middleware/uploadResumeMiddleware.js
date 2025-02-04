import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resume/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

const upload = multer({storage: storage});

const uploadResumeMiddleware = upload.single('resume');

export default uploadResumeMiddleware;