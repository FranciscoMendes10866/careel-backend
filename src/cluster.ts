import cluster from 'cluster'
import OS from 'os'

if (cluster.isMaster) {
	// Master worker spins up
	console.log(`Master ${process.pid} is running`)
	// Gets the number of cores
	const numCPUs = OS.cpus().length
	console.log(`🔥Runing in total ${numCPUs} workers.🧨`)
	// Creates a worker for each cpu core
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}
	// Listen for dying workers
	cluster.on('exit', (worker) => {
		// The worker dies
		console.log(`💀worker ${worker.process.pid} died`)
		// After he dies, we create a new one
		cluster.fork()
		console.log(`🍼Worker ${process.pid} was born.`)
	})
} else {
	console.log(`👨‍🔧Worker ${process.pid} started.`)
	require('./main')
}
