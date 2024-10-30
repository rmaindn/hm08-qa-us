const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it ('should select address', async () => {
       await browser.url('/')
       await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
       await expect($(page.fromField)).toHaveValue('East 2nd Street, 601')
       await expect($(page.toField)).toHaveValue('1300 1st St')
    }) 
    it ('should select supportive', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive ()
        await expect((await $(page.supportiveButton)).parentElement()).toHaveElementClass('active');
     })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
    
    it('should save the credit card', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard ('1234 1234 1234', '12');
        await expect(page.addCreditCard);
        await expect(await $(`${page.paymentMethodAddedCard}`)).toBeExisting();
    })

    it ('should enter message to the driver', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.writeMessage('How long is my ride going to take');
        await expect(await $(page.messageField)).toHaveValue('How long is my ride going to take')
    })
    
    it ('should order blanket and handkerchief', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive ()
        await page.clickblanketandHandkerchiefs()
        await expect(await $(page.blanketButtonStatus)).toBeChecked();
     })

    it ('should order two ice cream', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive ()
        await page.clickordertwoicecream()
        await expect(await $(page.twoIceCream)).toBeExisting();
     })

     it ('should display car search modal', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitAnorder();
        await expect(await $('div=Car search')).toBeExisting();
     })

     it ('should display driver info modal', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.submitAnorder();
        await browser.pause(40000)
        await expect(await $('div*=The driver will arrive in')).toBeExisting();
    })
})
