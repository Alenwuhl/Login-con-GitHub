import { Router } from 'express'

const router = Router()

router.get("/login", (req, res) => {
    res.render("gitHubLogin")
})


router.get("/error", (req, res) => {
    res.render("error", {error: "No ha sido posible hacer el login con gitHub"})
})

export default router