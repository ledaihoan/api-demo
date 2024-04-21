module.exports = {
  apps: [
    {
      name: 'api-demo',
      script: './dist/main.js', // cluster mode run with node only, not npm
      args: '',
      exec_mode: 'cluster', // default fork
      instances: 4, //"max",
      kill_timeout: 4000,
      wait_ready: true,
      auto_restart: true,
      watch: false,
      max_memory_restart: '1536M',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      node_args: '--max-old-space-size=2048',
    },
  ],
};
