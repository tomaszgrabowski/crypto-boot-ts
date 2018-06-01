

describe('CommunicationService', ()=>{

    test('ProcessRequest_WhenCalledForMessage_ShouldCheckForCommands');// "check coin btc"

    test('ProcessRequest_WhenCalledForMessageWithoutCommand_ShouldReturnErrorMsg');// ask user to specify question

    test('ProcessRequest_WhenCalledWithCheckCommand_ShouldCallCoinApiAndReturnAskedValueIfCoinExists');

    test('ProcessRequest_WhenCalledWithCheckCommand_ShouldCallCoinApiAndReturnErrorMsgIfCoinDoesNotExists');


    test('ProcessRequest_WhenCalledForMessageWithCheckCommandOnMultipleCoins_ShouldCallCoinApiOnce');

    test('ProcessRequest_WhenCalledForMessageWithCheckCommandOnMultipleCoins_ShouldReturnAskedValuesForEachCoinOrErrorForNonExistingOnes');// "check coin btc eth zec"

    test('ProcessRequest_WhenEndpointError_ShouldReturnNetworkError');


});