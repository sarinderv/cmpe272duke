import { Auth } from 'aws-amplify';

async function userSession() {
    return Auth.currentAuthenticatedUser()
        .catch((e) => console.log("Not signed in", e));
}

async function isRole(group) {
    var userData = await userSession();
    const payload = userData.signInUserSession.accessToken.payload
    return payload && payload['cognito:groups'] && payload['cognito:groups'].includes(group);
}

export async function isAdmin() {
    return isRole('Admins');
}

export async function isEmployee() {
    return isRole('Employee');
}

export async function isManager() {
    return isRole('Manager');
}

export async function isHrManager() {
    return isRole('HrManager');
}
