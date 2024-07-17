document.getElementById('currentYear').innerHTML = new Date().getFullYear();
function back() {
    window.location.href = document.referrer;
}
document.querySelector('a.about').innerHTML = 'About<span class="sr-only">(current)</span>';
document.querySelector('li.about').classList.add('active')