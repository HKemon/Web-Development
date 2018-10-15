// Basic Structure

// (function () {
//     // Declare private vars and functions
//     return {
//         // Declare public vars and functions
//     }
// })();

const UICtrl = (function () {
    let text = 'Hello From JS File';

    const changeText = function () {
        const element = document.querySelector('h1');
        element.textContent = text;
    };

    return{
        callChangeText : function () {
            changeText();
            console.log(text);
        }    
    }

})();

UICtrl.callChangeText();