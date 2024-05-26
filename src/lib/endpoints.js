
const user = {
    get : (id = '') => '/user.json',
}

const plans = {
    get : (id = '') => '/plans.json',
}

const endpoints = {
    plans,
    user
}

export {endpoints};