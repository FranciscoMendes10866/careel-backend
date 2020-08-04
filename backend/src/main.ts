import 'dotenv/config'
import app from './app'

const port = process.env.PORT || 3030

app.listen(port, () => {
	console.log(`🔥 Server up and runing on http://localhost:${port}/api/v1/ 🥇`)
})
