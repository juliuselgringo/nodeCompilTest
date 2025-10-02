document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener('click', () => {
        const userDirtMsg = userInput.value
         const userMessage = DOMPurify.sanitize(userDirtMsg);
         console.log(userMessage);
         fetch('/api/ia', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: userMessage}),
         })
         .then(response => response.json())
         .then(data => {
            console.log("success", data);
         })
         .catch(error => {
            console.log("error fetch: ", error)
         })
    })
    
})