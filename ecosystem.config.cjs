// PM2 Configuration for Enhanced GBV Dashboard
module.exports = {
  apps: [
    {
      name: 'enhanced-gbv-dashboard',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=gbv-dashboard-db --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      restart_delay: 3000,
      max_restarts: 3
    }
  ]
}