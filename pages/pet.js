
class MyPets {

constructor(page){
    this.page = page;
    this.addAPetButton = page.locator('.show-pet-modal-btn.show-pet-modal-btn-account');
    this.petName = page.locator('#name');
    this.petType = page.locator('#pet-type');
    this.petBreed = page.locator('#select2-dog-breed-container');
    this.petGender = page.locator('#pet-gender-select');
    this.petWeight = page.locator('#weight');
    this.petBirthday = page.locator('#birthday');
    this.createButton = page.getByRole('button', {name:'Create', exact: true });
}

 async addingAPet({pet}){
    await this.addAPetButton.click();
    await this.petName.fill(pet.name);
    await this.petType.selectOption(pet.petType);
    await this.petBreed.click();
    await this.page.keyboard.type(pet.petBreed);
    await this.page.keyboard.press('Enter');
    await this.petGender.selectOption(pet.petGender);
    await this.petWeight.fill(pet.petWeight);
    await this.petBirthday.fill(pet.petBirthday);
    await this.createButton.click();
 }
}

module.exports = { MyPets };

