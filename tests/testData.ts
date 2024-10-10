import { faker } from "@faker-js/faker";

export const generateRandomClientPayload = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.exampleEmail(),
        telephone: faker.phone.number()
    }
}

export const clients = faker.helpers.multiple(generateRandomClientPayload, {
    count: 5
})