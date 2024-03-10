const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');


const Post = new mongoose.Schema({
    
});

const UserSchema = new mongoose.Schema({
    googleid:{
        type: String,
    },
    emailid:{
        type: String,
    },
    name:{
        type: String,
    },
    profile_image:{
        type: String,
    },
    posts: [
        {
            title:{
                type:String
            },
            description:{
                type: String
            },
            image:{
                type:String
            }
        }
    ],
    password:{
        type: String,
    }
},{timestamps: true});

UserSchema.plugin(passportLocalMongoose,{usernameField: 'emailid'});
UserSchema.plugin(findOrCreate);

UserSchema.static.createStrategy = function() {
    return passportLocalMongoose.createStrategy();
};

module.exports = mongoose.model("User", UserSchema);
