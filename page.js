module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    paymentMethodButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]',
    addcardButton: '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div[3]/div[2]',
    fillcardnumberButton: '//*[@id="number"]',
    cardcodeButton: '/html/body/div/div/div[2]/div[2]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input',
    addingACardLabel: '//*[@id="root"]/div/div[2]/div[2]/div[2]/div',
    linkButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    paymentMethodModalCloseButton: '.payment-picker .section.active .close-button',
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodAddedCard: 'div=Card',
    messageField: '//*[@id="comment"]',
    blanketandHandkerchiefsButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/span',
    blanketButtonStatus: '.switch-input',
    ordertwoicecreamButton: '.counter-plus',
    twoIceCream: '.counter-value',
    glossyButton: 'div=Glossy',
    orderButton: '.smart-button',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        await browser.pause(2000)
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    selectSupportive: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.click();
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addCreditCard: async function(number, code) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.click();
        const addcardButton = await $(this.addcardButton);
        await addcardButton.click();
        const fillcardnumberButton = await $(this.fillcardnumberButton);
        await fillcardnumberButton.waitForDisplayed ();
        await fillcardnumberButton.setValue (number);
        const cardcodeButton = await $(this.cardcodeButton);
        await cardcodeButton.waitForDisplayed ();
        await cardcodeButton.setValue (code);
        await browser.pause(2000);
        const addingACardLabel = await $(this.addingACardLabel);
        await addingACardLabel.click();
        const linkButton = await $(this.linkButton);
        await linkButton.click();
        await browser.pause(5000);
        const paymentMethodModalCloseButton = await $(this.paymentMethodModalCloseButton);
        await paymentMethodModalCloseButton.click();
       }, 
       writeMessage: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message)
       },
       clickblanketandHandkerchiefs: async function() {
       const blanketandHandkerchiefsButton = await $(this.blanketandHandkerchiefsButton);
       await blanketandHandkerchiefsButton.click();
       },

       clickordertwoicecream: async function() {
        const clickordertwoicecreamButton = await $(this.ordertwoicecreamButton);
        await clickordertwoicecreamButton.click();
        await clickordertwoicecreamButton.click();
       },
       
        submitAnorder: async function() {
        const glossyButton = await $(this.glossyButton);
        await glossyButton.click();
        const orderButton = await $(this.orderButton);
        await orderButton.click();
    },
    };
