const router = require('express').Router();
const User = require('../Schema/UserSchema.js');


router.get('/', (req,res)=>{
    res.redirect(process.env.REACT_APP_PORT+'/home')
    // res.status(200).json({message:"Success"});
});

router.post('/posts/:id', async (req,res)=>{
    const Id = req.params.id;
    
    const { title , description, image } = req.body;
    
    try {
        const user = await User.findById(Id);
        if(!user)
        {
            return res.status(404).json({ message: 'User not found' });
        }
        user.posts.push({title , description, image});
        await user.save();

        return res.status(200).json({ message: 'Post added successfully' });

    } catch (error) {
        console.error(error);
        res.status(400).json({message:error.message})
    }

})
module.exports = router;