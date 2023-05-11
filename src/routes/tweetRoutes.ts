import {Router} from 'express'
import {PrismaClient} from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();
//Tweet
router.post('/', async (req, res) => {
    const {content, image, userId} = req.body

    try {
        const result = await prisma.tweet.create({
            data: {
                content,
                image,
                userId
            }
        })
        res.json(result)
    } catch (e) {
        res.status(400).json({error: "Username and email should be unique"})
    }
})
router.get('/', async (req, res) => {
    const allTweets = await prisma.tweet.findMany()

    res.json(allTweets)
})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const tweet = await prisma.tweet.findUnique({where: {id: Number(id)}})
    if (!tweet) {
        return res.status(404).json({error:"Tweet not found"})
    }
    res.json(tweet)
})
router.put('/:id', (req, res) => {
    const {id} = req.params
    res.status(501).json({error: `not implementing:${id}`})
})
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await prisma.tweet.delete({where: {id: Number(id)}})
    res.sendStatus(200)
})
export default router
