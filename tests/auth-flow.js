module.exports = {
  'get to signup page': (browser) => {

    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.navbar', 1000)
      .click('a[href="/signup"]')

      browser.assert.urlContains('signup')
  },
}
