function randomCharUpperCase(length) {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function randomCharLowerCase(length) {
    var result           = ''
    var characters       = 'abcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function randomNumeric(length) {
    var result           = ''
    var characters       = '1234567890'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function randomSymbol(length) {
    var result           = ''
    var characters       = '!@#$%^&*()-_+={}[]|\:;<>,.?/~'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function randomCharName(length) {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const generate_random_password = randomCharUpperCase(2) + randomNumeric(4) + randomCharLowerCase(2) + randomSymbol(4)
const generate_random_email = randomCharLowerCase(4) + randomNumeric(2)
const generate_random_phone = '085' + randomNumeric(9)
let email = ''

describe('autobahn signup testing', () => {
    it.only('create json file', () => {
        cy.writeFile('./cypress/fixtures/user.json', { email:`${generate_random_email}@eurokool.com`})
        cy.readFile('./cypress/fixtures/user.json').then((user) => {
        expect(user.email).to.equal(`${generate_random_email}@eurokool.com`) // true
        email = user.email
        })
    })

    beforeEach(function () {
        cy.visit('https://autobahn.security/signup')
    })

    it.only('register valid user with very strong password', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(generate_random_password)
        cy.get('.input-group-icon > .fa').click()
        cy.wait(2000)
        cy.get('.input-group-icon > .fa').click()
        cy.get('div[class="bar-text"]').should("have.text","Very Strong")
        cy.wait(1000)
        cy.contains('Sign up').click()
        cy.wait(10000)
        cy.get('input[name="first-name"]').type(randomCharName(2))
        cy.get('input[name="last-name"]').type(randomCharName(15))
        cy.get('div.dropdown.in-input-set').find('.items')
        cy.contains('Software').click({force: true})
        cy.get('body').click(0,0)
        cy.get('div.iti__flag-container').click({ multiple: true })
        cy.contains('Indonesia').click({force: true})
        cy.get('input[name="phone-number"]').type(generate_random_phone)
        cy.contains('Start using Autobahn').click({force: true})
        cy.wait(5000)
        cy.get('#create-new-account-btn').click()
        cy.wait(3000)
        cy.get('h1[class="heading"]').should("have.text","Verify Your Email")
    })

    it('register valid user with strong password', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type('QAtest!123456')
        cy.get('.input-group-icon > .fa').click()
        cy.get('div[class="bar-text"]').should("have.text","Strong")
        cy.wait(1000)
        cy.contains('Sign up').click()
        cy.wait(10000)
        cy.get('input[name="first-name"]').type(randomCharName(2))
        cy.get('input[name="last-name"]').type(randomCharName(15))
        cy.get('div.dropdown.in-input-set').find('.items')
        cy.contains('Software').click({force: true})
        cy.get('body').click(0,0)
        cy.get('div.iti__flag-container').click({ multiple: true })
        cy.contains('Indonesia').click({force: true})
        cy.get('input[name="phone-number"]').type(generate_random_phone)
        cy.contains('Start using Autobahn').click({force: true})
        cy.wait(5000)
        cy.get('#create-new-account-btn').click()
        cy.wait(3000)
        cy.get('h1[class="heading"]').should("have.text","Verify Your Email")
    })
    
    it('register with incorrect email', () => {
        cy.get('input[name="email"]').type(`${generate_random_email}@yopmail.com`)
        cy.get('input[name="password"]').type(generate_random_password)
        cy.wait(1000)
        cy.contains('Sign up').click({force: true})
        cy.get('label[class="label"]').should("have.text","Email domain is not allowed. You must use a company email.")
    })

    it('register with incorrect email format', () => {
        cy.get('input[name="email"]').type(`${generate_random_email}.@com_`)
        cy.get('input[name="password"]').type(generate_random_password)
        cy.wait(1000)
        cy.get('label[class="label"]').should("have.text","Must be a valid email")
        cy.contains('Sign up').click({force: true})
    })
    
    it('register with weak password format', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type('testQA1')
        cy.wait(1000)
        cy.get('div[class="bar-text"]').should("have.text","Weak")
        cy.contains('Sign up').click({force: true})
    })

    it('register with average password format', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type('testQA@1')
        cy.wait(1000)
        cy.get('div[class="bar-text"]').should("have.text","Average")
        cy.contains('Sign up').click({force: true})
    })

    it('register with empty first name', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(generate_random_password)
        cy.get('.input-group-icon > .fa').click()
        cy.get('div[class="bar-text"]').should("have.text","Very Strong")
        cy.wait(1000)
        cy.contains('Sign up').click()
        cy.wait(10000)
        cy.get('input[name="last-name"]').type(randomCharName(15))
        cy.get('label[class="label"]').should("have.text","Field cannot be empty")
        cy.get('div.dropdown.in-input-set').find('.items')
        cy.contains('Software').click({force: true})
        cy.get('body').click(0,0)
        cy.get('div.iti__flag-container').click({ multiple: true })
        cy.contains('Indonesia').click({force: true})
        cy.get('input[name="phone-number"]').type(generate_random_phone)
        cy.contains('Start using Autobahn').click({force: true})
    })

    it('register with empty last name', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(generate_random_password)
        cy.get('.input-group-icon > .fa').click()
        cy.get('div[class="bar-text"]').should("have.text","Very Strong")
        cy.wait(1000)
        cy.contains('Sign up').click()
        cy.wait(10000)
        cy.get('input[name="first-name"]').type(randomCharName(2))
        cy.get('div.dropdown.in-input-set').find('.items')
        cy.contains('Software').click({force: true})
        cy.get('body').click(0,0)
        cy.get('div.iti__flag-container').click({ multiple: true })
        cy.contains('Indonesia').click({force: true})
        cy.get('input[name="phone-number"]').type(generate_random_phone)
        cy.get('input[name="last-name"]').click()
        cy.contains('Start using Autobahn').click({force: true})
        cy.get('label[class="label"]').should("have.text","Field cannot be empty")
    })

    it('register with invalid phone number', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(generate_random_password)
        cy.get('.input-group-icon > .fa').click()
        cy.get('div[class="bar-text"]').should("have.text","Very Strong")
        cy.wait(1000)
        cy.contains('Sign up').click()
        cy.wait(10000)
        cy.get('input[name="first-name"]').type(randomCharName(2))
        cy.get('input[name="last-name"]').type(randomCharName(15))
        cy.get('div.dropdown.in-input-set').find('.items')
        cy.contains('Software').click({force: true})
        cy.get('body').click(0,0)
        cy.get('div.iti__flag-container').click({ multiple: true })
        cy.contains('Indonesia').click({force: true})
        cy.get('input[name="phone-number"]').type('081234')
        cy.get('label[class="label"]').should("have.text","Please enter a valid phone number")
        cy.get('input[name="phone-number"]').clear().type('0812345678900000000000')
        cy.get('label[class="label"]').should("have.text","Please enter a valid phone number")
        cy.get('input[name="phone-number"]').clear().type('qwertyu')
        cy.get('label[class="label"]').should("have.text","Please enter a valid phone number")
        cy.get('input[name="phone-number"]').clear().type('qwer1234')
        cy.get('label[class="label"]').should("have.text","Please enter a valid phone number")
        cy.contains('Start using Autobahn').click({force: true})
    })
})