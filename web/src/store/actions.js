import getDipDappDoeInstance from "../contracts/dip-dapp-doe"

export function fetchOpenGames() {
    // NOTE: Using the read-only instance
    const DipDappDoe = getDipDappDoeInstance(false)

    return (dispatch, getState) => {
        DipDappDoe.methods.getOpenGames().call().then(games => {
            return Promise.all(games.map(gameId => {
                return DipDappDoe.methods.getGameInfo(gameId).call()
                    .then(gameData => {
                        gameData.id = gameId
                        return gameData
                    })
            })).then(games => {
                dispatch({ type: "SET", openGames: games })
            })
        })
    }
}
