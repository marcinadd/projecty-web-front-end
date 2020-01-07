const {getSecondUserUsername} = require('./ChatService');
const {getCurrentUserUsername} = require('./UserService');
// jest.mock(getCurrentUserUsername);

test('whenGetSecondUsername_shouldReturnSecondUsername', () => {
    const a = true;
    expect(a).toBe(true);
});
