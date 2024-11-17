module.exports = {
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*'
        }
      ]
    }
  }