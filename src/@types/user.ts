export default interface User {
    id: string,
    name: string,
    email: string,
    avatar: string,
    provider: string,
    provider_id: string,
    onboarding_completed: boolean,
    created_at: string,
    updated_at: string,
}