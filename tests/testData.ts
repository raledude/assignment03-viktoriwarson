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


export const generateRandomClientPayloadByID = (id: number, created: string) => {
    return {
        id: id,
        created: created,
        name: faker.person.fullName(),
        email: faker.internet.exampleEmail(),
        telephone: faker.phone.number()
    }
}

export const generateRandomRoomPayload = () => {
    let category = ['single', 'double', 'twin']
    let features = ['ensuite', 'sea_view', 'penthouse', 'balcony']

    return {
        available: faker.datatype.boolean(),
        category: faker.helpers.arrayElement(category),
        features: faker.helpers.arrayElements(features),
        floor: faker.number.int({ min: 1, max: 20 }),
        number: faker.number.int({ min: 1, max: 300 }),
        price: faker.number.int({ min: 1000, max: 10000 })
    }
}

export const generateRandomRoomPayloadID = (id: string, created: string) => {
    let category = ['single', 'double', 'twin']
    let features = ['ensuite', 'sea_view', 'penthouse', 'balcony']

    return {
        id: id,
        created: created,
        available: faker.datatype.boolean(),
        category: faker.helpers.arrayElement(category),
        features: faker.helpers.arrayElements(features),
        floor: faker.number.int({ min: 1, max: 20 }),
        number: faker.number.int({ min: 1, max: 300 }),
        price: faker.number.int({ min: 1000, max: 10000 })
    }
}

export const generateRandomBillPayload = () => {
    return {
        value: faker.number.int({ min: 1000, max: 10000 }),
        paid: faker.datatype.boolean()
    }
}