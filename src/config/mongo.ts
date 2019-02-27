const mongo = {
  URI: 'mongodb://localhost:27017/vault',
  options: {
    autoIndex: false, // Don't build indexes
    reconnectTries: 10, // Retry up to 10 times
    reconnectInterval: 1000, // Reconnect every 1s
    bufferMaxEntries: 0,
    useNewUrlParser: true
  }
}

export default mongo
