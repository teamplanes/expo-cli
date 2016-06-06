var crayon = require('@ccheever/crayon');

import {
  UrlUtils,
} from 'xdl';

var log = require('../log');
var urlOpts = require('../urlOpts');

async function action(projectDir, options) {
  await urlOpts.optsAsync(projectDir, options);

  let url = await UrlUtils.constructManifestUrlAsync(projectDir);

  log("Your URL is\n\n" + crayon.underline(url) + "\n");
  log.raw(url);

  urlOpts.handleQROpt(url, options);
  await urlOpts.handleMobileOptsAsync(url, options);
}

module.exports = (program) => {
  program
    .command('url [project-dir]')
    .alias('u')
    .description('Displays the URL you can use to view your project in Exponent')
    //.help('You must have the server running for this command to work')
    .urlOpts()
    .asyncActionProjectDir(action);
};