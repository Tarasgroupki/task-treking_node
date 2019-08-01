const express = require("express");
const router = express.Router();
//const config = require('../config.json');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter
});

router.get("/", checkAuth.main, UsersController.users_get_all);

router.post("/", checkAuth.main, UsersController.users_create_user);

router.get("/:userId", checkAuth.main, UsersController.users_get_one);

router.post("/file/fileUpload", upload.single('image_path'), UsersController.users_file_upload);

router.patch("/profile/:userId", checkAuth.main, upload.single('image_path'), UsersController.users_profile_user);


router.put("/:userId", checkAuth.main, UsersController.users_edit_user);

router.post("/login", UsersController.users_login);

router.delete("/:userId", checkAuth.main, UsersController.users_delete_user);

router.get("/user/user_has_role", UsersController.users_user_has_role);

router.get("/user/user_has_role/:userId", UsersController.users_user_has_role_one);

router.post("/user/user_has_role/:userId", UsersController.users_create_user_has_role);

module.exports = router;