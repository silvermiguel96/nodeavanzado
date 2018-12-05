'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()
  // Lo que se hace con el setup es sincronizar con la bases de datos , si existe borrar y crear otra nueva.
  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}
  //
  return {
    Agent,
    Metric
    // Use previous Emc Javascript
    // Agent : Agent,
    // Metric : Metric
  }
}
