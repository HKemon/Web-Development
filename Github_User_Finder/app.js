const github = new Github;
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', ev => {
    // Get input text
    const userText = ev.target.value;

    if (userText !== '') {
        github.getUser(userText)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    // Alert
                    ui.showAlert('User not Found', 'alert alert-danger');
                } else {
                    // Show Profile
                    ui.showProfile(data.profile);
                }
            })
    } else {
        // Clear Profile
        ui.clearProfile();
    }
});