const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
express = require('express');
var router = express.Router();

module.exports = {
    main: function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
       // const scopes = req.headers.authorization.split(" ");
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const decoded1 = jwt_decode(token);
        console.log(decoded1['scopes']);
       // const decoded1 = jwt.verify(token, "create-clients,edit-clients,create-tasks,edit-tasks");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
},
    scope: function (scope) {
        return function (req, res, next) {
            let decoded_scopes;
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt_decode(token);
            decoded_scopes = decoded['scopes'].split(",");
            scope = scope.split(",");
            console.log(decoded_scopes);
            console.log(scope);
                if (decoded_scopes.indexOf(scope[0]) !== -1) next();
                else return res.status(401).json({
                    message: 'Auth failed'
                });
        }
    },
    scopes: function (scopes) {
            return function (req, res, next) {
                let decoded_scopes;
                const token = req.headers.authorization.split(" ")[1];
                const decoded = jwt_decode(token);
                decoded_scopes = decoded['scopes'].split(",");
                scopes = scopes.split(",");
                console.log(decoded_scopes);
                console.log(scopes);
                let count = 0;
                for(let i = 0; i < scopes.length; i++) {
                 if (decoded_scopes.indexOf(scopes[i]) !== -1){count+=1; if(count === scopes.length){next();}}
                 else {return res.status(401).json({
                     message: 'Auth failed'
                 });}
                }
        }
    },
};
