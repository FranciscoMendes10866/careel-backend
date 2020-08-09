import mailjet from 'node-mailjet'

const connection = mailjet.connect(
	process.env.MJ_KEY, 
	process.env.MJ_SECRET
)

export default connection
