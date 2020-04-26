const express = require('express');

const router = express.Router();
// const config = require('../config.json');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

const checkUserCreate = checkAuth.scope('create-users');
const checkUserEdit = checkAuth.scope('edit-users');
const checkUserDelete = checkAuth.scope('delete-users');
const checkUserCreateAndEdit = checkAuth.scopes('create-users,edit-users');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
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
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter,
});

router.get('/', checkUserCreateAndEdit, UsersController.users_get_all);

router.post('/', checkUserCreate, UsersController.users_create_user);

router.get('/:userId', checkUserCreate, UsersController.users_get_one);

router.post('/file/fileUpload', upload.single('image_path'), UsersController.users_file_upload);

router.patch('/profile/:userId', checkUserEdit, upload.single('image_path'), UsersController.users_profile_user);


router.put('/:userId', checkUserEdit, UsersController.users_edit_user);

router.post('/login', UsersController.users_login);

router.delete('/:userId', checkUserDelete, UsersController.users_delete_user);

router.get('/user/user_has_role', UsersController.users_user_has_role);

router.get('/user/user_has_role/:userId', UsersController.users_user_has_role_one);

router.post('/user/user_has_role/:userId', UsersController.users_create_user_has_role);

module.exports = router;
