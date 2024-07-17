document.getElementById('currentYear').innerHTML = new Date().getFullYear();
document.addEventListener("DOMContentLoaded", function() {
    const newUrl = "/blog-post";
    history.pushState({}, "", newUrl);
    const contents = document.querySelectorAll('.blog-content');
    contents.forEach((content) => {
        const text = content.textContent;

        // Split the text into paragraphs
        const paragraphs = text.split('\n\n');
        content.innerHTML = ""
        
        // Create new paragraphs for the remaining paragraphs
        for (let i = 0; i < paragraphs.length; i++) {
            const newParagraph = document.createElement('p');
            newParagraph.innerHTML = paragraphs[i];
            content.appendChild(newParagraph);
        }
    })
    const button = document.getElementById('read');
    button.style.display = 'none';
});
function back() {
    window.location.href = document.referrer;
}