
import jsonwebtoken from 'jsonwebtoken'

export const jwtSign = (payload, expiresIn = '2m') =>
    jsonwebtoken.sign(payload, "localsecret", { expiresIn })

export default {
    jwtSign,
}