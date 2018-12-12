'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

// Permite hacer preguntas cada vez que requiera Son Promesas

const prompt = inquirer.createPromptModule()

async function setup () {
  const question = process.argv.indexOf('yes') !== -1
  if (!question) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])
    if (!answer.setup) {
      return console.log('Nothing happened :) ')
    }
  }
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
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
setup()
