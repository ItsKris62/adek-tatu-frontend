const { spawn } = require('node:child_process')

const nextBin = require.resolve('next/dist/bin/next', { paths: [__dirname] })
const port = process.env.PORT ? String(process.env.PORT) : '3000'

const child = spawn(process.execPath, [nextBin, 'start', '-p', port], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env,
})

child.on('error', (err) => {
  console.error('[start-server] failed to spawn next start:', err)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  if (signal) {
    console.log(`[start-server] next start killed by signal ${signal}`)
    process.exit(0)
  }
  process.exit(code ?? 0)
})

process.on('SIGINT', () => child.kill('SIGINT'))
process.on('SIGTERM', () => child.kill('SIGTERM'))
