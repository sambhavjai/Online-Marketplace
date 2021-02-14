var mongoose=require('mongoose');
var crypto=require('crypto');
var uuidv1=require('uuid/v1');
mongoose.set('useFindAndModify', false);

var userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname:{
        type: String,
        maxlength:32,
        trim:true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userInfo:{
        type: String,
        trim: true
    },
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    role:{
        type: Number,
        default: 0
    },
    purchases:{
        type: Array,
        default: []
    }
},
{
    timestamps: true
});
userSchema.virtual("password").get(function(){
    return this._password;
}).set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password);
});

userSchema.methods={
    authenticate: function(plainPassword){
        return this.securePassword(plainPassword)===this.encry_password;
    },
    securePassword: function(plainPassword){
        if(!plainPassword)
        return "";
        try{
            return crypto.createHmac("sha256",this.salt).update(plainPassword).digest("hex");
        }
        catch(err){
            return "";
        }
    }
};
module.exports=mongoose.model("User",userSchema);