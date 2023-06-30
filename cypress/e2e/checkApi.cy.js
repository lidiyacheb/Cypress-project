

it("check status", () => {cy.request({
    method: 'GET', 
    url: 'https://app.finevinume.com/api/products', 
  }).then( ({status}) => {
    expect(status).to.eq(200)
  })
})

it("check body", () => {cy.request({
    method: 'GET', 
    url: 'https://app.finevinume.com/api/products', 
  }).then( ({body}) => {
    expect(body.success).to.eq(true)
    expect(body.message).to.eq('Products retrieved successfully.')
  })
})

it("check headers", () => {cy.request({
    method: 'GET', 
    url: 'https://app.finevinume.com/api/products', 
  }).then( ({headers}) => {
    expect(headers['content-length']).to.eq('71')
  })
})

it("check status of categories", () => {cy.request({
    method: 'GET', 
    url: 'https://app.finevinume.com/api/categories', 
  }).then( ({status}) => {
    expect(status).to.eq(200)
  })
})

it("check body of categories", () => {cy.request({
    method: 'GET', 
    url: 'https://app.finevinume.com/api/categories', 
  }).then( ({status}) => {
    expect(status).to.eq(200)
  })
})

it("check auth", () => {cy.request({
    method: 'POST', 
    url: 'https://app.finevinume.com/api/auth', 
    body: {
      email: 'info@finevinume.com',
      password: 'fgh5bjh5%$'
    }
  }).then( ({body,status}) => {
    expect(status).to.be.eq(200)
    expect(body.data.api_token).to.be.eq("wH3vs7KrPTjbsv208rqt8dhmNM0UI4MABDbOYsel")
  })
})

// method POST doesn't work

it("edit name", () => {cy.request({
    method: 'POST', 
    url: 'https://app.finevinume.com/api/profile', 
    headers: {
        Authorization: 'Bearer wH3vs7KrPTjbsv208rqt8dhmNM0UI4MABDbOYsel'
      },
    body: {
    name: 'New Admin'
    }
  }).then( ({body,status}) => {
    console.log(body)
    expect(body.data.name).to.be.eq('New Admin')
  })
})


it("check user by ID", () => {cy.request({
    method: 'POST', 
    url: 'https://app.finevinume.com/api/check-user/wH3vs7KrPTjbsv208rqt8dhmNM0UI4MABDbOYsel', 
    body: {
        email: 'info@finevinume.com',
        password: 'fgh5bjh5%$'
      }
  }).then( ({status, body}) => {
    console.log(body)
    expect(status).to.be.eq(200)
    expect(body.data.api_token).to.be.eq('wH3vs7KrPTjbsv208rqt8dhmNM0UI4MABDbOYsel')
  })
})

it("check add categories", ()=>{cy.request({
    method: 'POST', 
    url: 'https://app.finevinume.com/api/categories/2',
    headers: {
        Authorization: 'Bearer wH3vs7KrPTjbsv208rqt8dhmNM0UI4MABDbOYsel'
    },
    body: {
        email: 'info@finevinume.com',
        password: 'fgh5bjh5%$'
      }
}).then( ({status, body}) => {
    console.log(body)
    expect(status).to.be.eq(200)
  })

})

it("check categories", ()=>{cy.request({
    method: 'GET', 
    url: 'https://app.finevinume.com/api/categories',
}).then( ({status, body}) => {
    console.log(body)
    expect(status).to.be.eq(200)
    expect(body.data[0].id).to.be.eq(1)
    expect(body.data[0].name).to.be.eq('Sweet wine')
    expect(body.data[1].id).to.be.eq(2)
    expect(body.data[1].name).to.be.eq('Dry Wine')
    expect(body.data.length).to.be.greaterThan(1)
    expect(body.data).to.have.length(2)
  })
})