document.getElementById('currentYear').innerHTML = new Date().getFullYear();
function back() {
    window.location.href = document.referrer;
}
document.querySelector('a.admin').innerHTML = 'Admin<span class="sr-only">(current)</span>';
document.querySelector('li.admin').classList.add('active')