document.getElementById('currentYear').innerHTML = new Date().getFullYear();
        document.addEventListener("DOMContentLoaded", function() {
            const contents = document.querySelectorAll('.blog-content');
            const newUrl = "/";
            history.pushState({}, "", newUrl);
            contents.forEach((content) => {
                const text = content.textContent;

                // Split the text into paragraphs
                const paragraphs = text.split('\n\n');
                
                // Replace the content with the first paragraph
                content.textContent = paragraphs[0];

                // Create new paragraphs for the remaining paragraphs
                for (let i = 1; i < paragraphs.length; i++) {
                    const newParagraph = document.createElement('p');
                    newParagraph.textContent = paragraphs[i];
                    newParagraph.style.display = 'none';
                    content.parentNode.insertBefore(newParagraph, content.nextSibling);
                }
            })
            
        });

        let isDisplayed = false;

        function filterPosts(filter) {
            isDisplayed = false;
            const posts = document.querySelectorAll('.blog-post');
            posts.forEach((post) => {
                let isThisDisplayed = false;
                if (filter === 'all') {
                    isDisplayed = true;
                    post.style.display = '';
                } else {
                    isThisDisplayed = post.getAttribute('tag') === filter;
                    post.style.display = isThisDisplayed ? 'block' : 'none';
                }
                if(isThisDisplayed){
                    isDisplayed = true
                }
            });
            if (!isDisplayed) {
                document.querySelector('.alert').style.display = 'block';
            } else {
                document.querySelector('.alert').style.display = 'none';
            }
        }

        function searchPost() {
            isDisplayed = false;
            const posts = document.querySelectorAll('.blog-post');
            const search = document.querySelector('.blog-search').value;

            posts.forEach((post) => {
                const title = post.querySelector('.blog-title').textContent;
                const author = post.querySelector('.blog-author').textContent;

                
                
                let isThisDisplayed = false;
                if (title.toLowerCase().includes(search.toLowerCase()) || author.toLowerCase().includes(search.toLowerCase())) {
                    isThisDisplayed = true;
                    isDisplayed = true
                }
                post.style.display = isThisDisplayed ? 'block' : 'none';
                if (!search) {
                    post.style.display = '';
                }
                if (!isDisplayed) {
                    document.querySelector('.alert').style.display = 'block';
                } else {
                    document.querySelector('.alert').style.display = 'none';
                }
            });
        }
