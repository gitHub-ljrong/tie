module.exports = {
  client: {
    includes: ['./src/**/*.ts'], // array of glob patterns
    excludes: ['**/node_modules/**/*'],
    service: {
      name: '',
      url: 'http://localhost:5001/graphql',
      // optional headers
      headers: {},
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
}
