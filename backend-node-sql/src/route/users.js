import ResponseError from "../libs/responseError"
import jwt from 'jsonwebtoken';

const { user } = require("../db");
const { jwtSign } = require("../libs/jwt-util");
const { hashPassword, comparePassword } = require("../libs/passwordhash");


async function getAll(req, res) {

    const users = await user.findAll();
    res.status(200).json(users);
};

async function getById(req, res) {
    const { id } = req.params
    const user = await user.findByPk(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('404 - Not found');
    }
};

async function create(req, res) {
    try {

        if (req.body.pid) {
            res.status(400).send(`Bad request: PID should not  be provided, auto Provide `)
        } else {
            const password = await hashPassword(req?.body?.password)
            const userDATA = {
                name: req?.body?.name,
                username: req?.body?.username,
                password: password
            }
            await user.create(userDATA);
            res.status(201).end();
        }
    } catch (e) {
        ResponseError(e, res)
    }
};

async function update(req, res) {
    const id = getIdParam(req);

    // We only accept an UPDATE request if the `:id` param matches the body `id`
    if (req.body.id === id) {
        await user.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).end();
    } else {
        res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
    }
};

async function remove(req, res) {
    const id = getIdParam(req);
    await user.destroy({
        where: {
            id: id
        }
    });
    res.status(200).end();
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

    const foundUser = await user.findOne({
        where: {
            username: username
        }
    })
    console.log(foundUser.password);
    if (!foundUser) return res.status(401).json({ message: 'Username or password is incorrect.' }); //Unauthorized 
    const match = await comparePassword(password, `${foundUser?.password}`);
    if (!match) return res.status(401).json({ message: 'Username or password is incorrect.' });

    const accessToken = await jwtSign(
        {
            pid: foundUser?.pid,
            username: foundUser?.username,
        },
        "30d"
    );
    res.json({ accessToken });


}
const getMe = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!`${authHeader}`?.startsWith('Bearer ')) return res.status(401).json({
            status: 401,
            code: 'Unauthorized',
            message: 'Unauthorized',
        });
        const token = `${authHeader}`?.split(' ')[1];
        jwt.verify(
            token,
            "localsecret",
            async (err, decoded) => {
                if (err) {
                    console.log('in me ', err);
                    res.status(403).json({
                        status: 403,
                        code: 'INVALID_TOKEN',
                        message: 'Invalid Token',
                    })
                }
                const foundUser = await user.findByPk(decoded?.pid);
                console.log('founin me', foundUser);
                res.status(200).json(
                    {
                        pid: foundUser?.pid,
                        name: foundUser?.name,
                        username: foundUser?.username,
                    }
                )
            }
        );
    } catch (e) {
        ResponseError(e, res)
    }

}

module.exports = {
    getMe,
    login,
    getAll,
    getById,
    create,
    update,
    remove,
};