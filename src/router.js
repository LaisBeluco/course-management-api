import jsonwebtoken from 'jsonwebtoken';
import { PRIVATE_KEY, tokenValited } from "./auth.js";
import express from 'express';
import CourseController from "./controllers/CourseController.js";

const routes = express.Router();

routes.get('/', (_, res) => res.status(200).json({
    message: 'This is a public router...'
}));

routes.get('/login', (req, res) => {
    const [, hash] = req.headers.authorization?.split(' ') || [' ', ' '];
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    try{
        const correctPassword = email === 'lais@teste.com' && password === '1234';

        console.log(correctPassword);

        if(!correctPassword) return res.status(401).send('Password or E-mail incorrect!');

        const user = {
            id: 1,
            name: 'Lais Beluco Marba',
            email: 'lais@teste.com'
        };

        const token = jsonwebtoken.sign(
            { user },
            PRIVATE_KEY,
            { expiresIn: '60m' }
        );

        return res.status(200).json({data: { user, token } });
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

routes.use(tokenValited);

routes.get('/private', (req, res) => {
    const currentUser = req.user;
    
    return res.status(200).json({
        message: "This is a private router ...",
        data: {
            userLogged: currentUser
        }
    })
})

routes.get('/courses', CourseController.list);
routes.get('/courses/:id', CourseController.show);
routes.post('/courses', CourseController.create);
routes.put('/courses/:id', CourseController.update);
routes.delete('/courses/:id', CourseController.delete);

export default routes;

