
it("Registartion", () => {
    const name = randomName()
    cy.visit("https://app.finevinume.com");
    cy.get('input[name="email"]').type('info@finevinume.com');
    cy.get('input[name="password"]').type('fgh5bjh5%$')
    cy.get('input[name="remember"]').check()
    cy.get('button[type="Submit"]').click()
    cy.wait(2000)
    cy.contains('V8ciO3W4uLdY7QgMwFiX54MVHLCd7L19l3CELKDO')
    cy.get('a#toggle-btn').click()
    cy.contains('CRM').click()
    cy.contains('Категории').click()
    cy.contains('Добавить элемент ').click()
    cy.wait(1000)
    cy.get('div.modal-body input[placeholder="Название"]').first().type(name)
    cy.get('div.modal-body input[placeholder="Ярлык категории (англ.)"]').first().type(`${name}123`)
    cy.contains('Сохранить').click()
    cy.wait(1000)
    cy.get('#elements-table tbody>tr:nth-child(1)').should('exist')
    //edit
    let last_modal_edit_btn = cy.get('#elements-table tbody tr:first-child a[data-toggle]')
    let last_modal_edit_id = last_modal_edit_btn.invoke('attr', 'data-target').then(dt => {
        cy.get('#elements-table tbody tr:first-child a[data-toggle]').click()
        cy.wait(1000)
        cy.get(`${dt} input[name="name"]`).type(`${name}555`)
        cy.get(`${dt} input[name="label"]`).type(`${name}777`)
        cy.get(`${dt} button[type="submit"]`).click()
        cy.get('#elements-table tbody>tr:nth-child(1)').should('contain', `${name}555`)
      });
  });





  