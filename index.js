require('dotenv').config();

const xl = require('excel4node');
const constants = require('./src/constants.js');
const steamApi = require('./src/steamApi.js');
const lifetimeStats = require('./src/lifetimeStats.js');
const gunStats = require('./src/gunStats.js');

steamApi.run('mrseacow', (res) => {
  if (res == 'private') return console.log('Seems like this user\'s game data is private.')
  console.log(res.playerstats.steamID)
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Lifetime Stats');
  let ws2 = wb.addWorksheet('Gun Stats');

  let bodyStyles = constants.getBodyStyles(wb);
  let format = constants.format

  lifetimeStats.run(wb, ws, res.playerstats.stats, bodyStyles, format)
  gunStats.run(wb, ws2, res.playerstats.stats, bodyStyles, format)

  wb.write('Excel.xlsx', function (err, stats) {
    if (err) {
      console.error(err);
    } else {
    }
  });
})


