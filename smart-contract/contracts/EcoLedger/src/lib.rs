#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

#[contract]
pub struct EcoLedgerContract;

#[contractimpl]
impl EcoLedgerContract {
    pub fn log_action(env: Env, user: Address, action: String, impact: u32) {
        let user_key = user.clone();
        let mut user_actions: Vec<(String, u32)> = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or_else(|| Vec::new(&env));
        user_actions.push_back((action, impact));
        env.storage().persistent().set(&user_key, &user_actions);
    }

    pub fn get_user_score(env: Env, user: Address) -> u32 {
        let user_key = user.clone();
        let user_actions: Vec<(String, u32)> = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or_else(|| Vec::new(&env));
        user_actions.iter().map(|(_, impact)| impact).sum()
    }

    pub fn get_user_actions(env: Env, user: Address) -> Vec<String> {
        let user_key = user.clone();
        let user_actions: Vec<(String, u32)> = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or_else(|| Vec::new(&env));

        let mut result = Vec::new(&env);
        for (action, _) in user_actions.iter() {
            result.push_back(action.clone());
        }
        result
    }
}

mod test;
