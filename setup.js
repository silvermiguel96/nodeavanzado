'use strict'

const debug = require('debug')('platziverse:db:setup')
const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'miguel',
    password: process.env.DB_PASS || 'miguel',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // Con que encontro trabajamos
    logging: s => debug(s), // Arroy Function
    setup: true,
    operatorsAliases: false
  }
  await db(config).catch(handlerFatalError)

  console.log('Success!')
  process.exit(0)
}

function handlerFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
setup()
