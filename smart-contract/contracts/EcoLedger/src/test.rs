#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, vec, Env};

#[test]
fn test_log_action() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);

    client.log_action(&user, &String::from_str(&env, "Recycling"), &10);

    let score = client.get_user_score(&user);
    assert_eq!(score, 10);
}

#[test]
fn test_multiple_actions() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);

    client.log_action(&user, &String::from_str(&env, "Recycling"), &10);
    client.log_action(
        &user,
        &String::from_str(&env, "Using public transport"),
        &20,
    );

    let score = client.get_user_score(&user);
    assert_eq!(score, 30);
}

#[test]
fn test_get_user_actions() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);

    client.log_action(&user, &String::from_str(&env, "Recycling"), &10);
    client.log_action(
        &user,
        &String::from_str(&env, "Using public transport"),
        &20,
    );

    let actions = client.get_user_actions(&user);
    assert_eq!(
        actions,
        vec![
            &env,
            String::from_str(&env, "Recycling"),
            String::from_str(&env, "Using public transport")
        ]
    );
}

#[test]
fn test_multiple_users() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);

    client.log_action(&user1, &String::from_str(&env, "Recycling"), &10);
    client.log_action(
        &user2,
        &String::from_str(&env, "Using public transport"),
        &20,
    );

    let score1 = client.get_user_score(&user1);
    let score2 = client.get_user_score(&user2);

    assert_eq!(score1, 10);
    assert_eq!(score2, 20);
}

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    client.initialize();
    let total_impact = client.get_total_impact();
    assert_eq!(total_impact, 0);
}

#[test]
fn test_get_total_impact() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    client.initialize();

    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);

    client.log_action(&user1, &String::from_str(&env, "Recycling"), &10);
    client.log_action(
        &user2,
        &String::from_str(&env, "Using public transport"),
        &20,
    );

    let total_impact = client.get_total_impact();
    assert_eq!(total_impact, 30);
}

#[test]
fn test_calculate_rewards() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);

    client.log_action(&user, &String::from_str(&env, "Recycling"), &10);
    client.log_action(
        &user,
        &String::from_str(&env, "Using public transport"),
        &20,
    );

    let rewards = client.calculate_rewards(&user);
    assert_eq!(rewards, 3); // (10 + 20) / 10 = 3
}

#[test]
fn test_log_action_returns_score() {
    let env = Env::default();
    let contract_id = env.register_contract(None, EcoLedgerContract);
    let client = EcoLedgerContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);

    let score1 = client.log_action(&user, &String::from_str(&env, "Recycling"), &10);
    assert_eq!(score1, 10);

    let score2 = client.log_action(
        &user,
        &String::from_str(&env, "Using public transport"),
        &20,
    );
    assert_eq!(score2, 30);
}
