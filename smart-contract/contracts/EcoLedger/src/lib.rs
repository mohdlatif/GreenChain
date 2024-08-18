#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, String, Vec};

#[contract]
pub struct EcoLedgerContract;

#[contractimpl]
impl EcoLedgerContract {
    // Initialize the contract with default values
    pub fn initialize(env: Env) {
        let total_impact = 0u32;
        env.storage()
            .instance()
            .set(&symbol_short!("t_impact"), &total_impact);
    }

    // Log a sustainable action
    pub fn log_action(env: Env, user: Address, action: String, impact: u32) -> u32 {
        let user_key = user.clone();
        let mut user_actions: Vec<(String, u32)> = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or_else(|| Vec::new(&env));
        user_actions.push_back((action, impact));
        env.storage().persistent().set(&user_key, &user_actions);

        // Update total impact
        let mut total_impact: u32 = env
            .storage()
            .instance()
            .get(&symbol_short!("t_impact"))
            .unwrap_or(0);
        total_impact += impact;
        env.storage()
            .instance()
            .set(&symbol_short!("t_impact"), &total_impact);

        // Calculate and return new user score
        EcoLedgerContract::get_user_score(env, user)
    }

    // Get the user's current score
    pub fn get_user_score(env: Env, user: Address) -> u32 {
        let user_key = user.clone();
        let user_actions: Vec<(String, u32)> = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or_else(|| Vec::new(&env));
        user_actions.iter().map(|(_, impact)| impact).sum()
    }

    // Get the user's actions
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

    // Get the total impact of all users
    pub fn get_total_impact(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&symbol_short!("t_impact"))
            .unwrap_or(0)
    }

    // Get the top contributors

    // Calculate rewards for a user based on their score
    pub fn calculate_rewards(env: Env, user: Address) -> u32 {
        let user_score = EcoLedgerContract::get_user_score(env.clone(), user);
        // Simple reward calculation: 1 token per 10 points
        user_score / 10
    }
}

#[cfg(test)]
mod test;
