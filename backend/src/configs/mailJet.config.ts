import mailjet from 'node-mailjet'

const connection = mailjet.connect(process.env.MJ_KEY_01, process.env.MJ_KEY_02)

export default connection
