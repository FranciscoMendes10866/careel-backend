import cluster from 'cluster'
import OS from 'os'

if (cluster.isMaster) {
	// Master worker spins up
	console.log(`Master ${process.pid} is running`)
	// Gets the number of cores
	const numCPUs = OS.cpus().length
	// Creates a worker for each cpu core
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}
	// Listen for dying workers
	cluster.on('exit', () => {
		cluster.fork()
	})
} else {
	require('./main')
}
