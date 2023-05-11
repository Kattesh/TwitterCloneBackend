import {Router} from 'express'

const router=Router()

//Tweet
router.post('/',(req,res)=>{
    res.status(501).json({error:"not implementing"})
})
router.get('/',(req,res)=>{
    res.status(501).json({error:"not implementing"})
})
router.get('/:id',(req,res)=>{
    const {id}=req.params
    res.status(501).json({error:`not implementing:${id}`})
})
router.put('/:id',(req,res)=>{
    const {id}=req.params
    res.status(501).json({error:`not implementing:${id}`})
})
router.delete('/:id',(req,res)=>{
    const {id}=req.params
    res.status(501).json({error:`not implementing:${id}`})
})
export default router
