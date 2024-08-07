
/* Open Sidebar */
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.body.classList.add("overlay");
    document.addEventListener("click", closeNavOnClickOutside);
}

/* Close Sidebar */
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.body.classList.remove("overlay");
    document.removeEventListener("click", closeNavOnClickOutside);
}

function closeNavOnClickOutside(event) {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.querySelector(".openbtn");
    if (!sidebar.contains(event.target) && !openBtn.contains(event.target)) {
        closeNav();
    }
}

/* Footer Copy Info */
function copyToClipboard(type) {
    let textToCopy = '';
    let message = '';

    if (type === 'whatsapp') {
        textToCopy = '+55 (44) 9926-4101';
    }
    else if (type === 'email') {
        textToCopy = 'rafaelsanches.s35@gmail.com';
    }

    message = 'Copiado!';

    navigator.clipboard.writeText(textToCopy).then(() => {
        document.getElementById('copy-message').innerText = message;
        setTimeout(() => {
            document.getElementById('copy-message').innerText = '';
        }, 3000);
    }).catch(err => {
        console.error('Erro ao copiar o texto: ', err);
    });
}

/* Change Theme */
function lightDarkTheme() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        document.getElementById("moon").style.display = "revert";
        document.getElementById("sun").style.display = "none";
        localStorage.setItem("theme", "dark-mode");
    }
    else {
        document.getElementById("moon").style.display = "none";
        document.getElementById("sun").style.display = "revert";
        localStorage.setItem("theme", "light-mode");
    }
 }

 function applyStoredTheme() {
    var storedTheme = localStorage.getItem("theme");
    var element = document.body;

    if (storedTheme === "dark-mode") {
        element.classList.add("dark-mode");
        document.getElementById("moon").style.display = "revert";
        document.getElementById("sun").style.display = "none";
    }
    else {
        element.classList.remove("dark-mode");
        document.getElementById("moon").style.display = "none";
        document.getElementById("sun").style.display = "revert";
    }
}
document.addEventListener("DOMContentLoaded", applyStoredTheme);


 /* Change DEV Function */
 function devFunctionChange(selectedFunction) {
    const functions = document.querySelectorAll('.function');
    const labels = document.querySelectorAll('.functions label');

    functions.forEach((func, index) => { func.classList.remove('function-active');});
    labels.forEach((label) => { label.classList.remove('active');});

    const activeFunction = document.querySelector(`.function-${selectedFunction}`);
    activeFunction.classList.add('function-active');
    document.querySelector(`#function-${selectedFunction}`).classList.add('active');

    localStorage.setItem('activeFunction', selectedFunction);
}

function restoreFunctionState() {
    let activeFunction = localStorage.getItem('activeFunction');

    if (!activeFunction) {
        activeFunction = 1;
        localStorage.setItem('activeFunction', activeFunction);
    }
    devFunctionChange(activeFunction);
}
window.addEventListener('load', restoreFunctionState);


/* Function 1 */
function calculate() {
    const value1 = parseFloat(document.getElementById('value-1').value) || 0;
    const value2 = parseFloat(document.getElementById('value-2').value) || 0;
    const value3 = parseFloat(document.getElementById('value-3').value) || 0;
    let result = 0;

    if (value1 && value2 && value3) {
        result = (value2 * value3) / value1;
        document.getElementById('value-4').value = result.toFixed(2);
    }
    else { document.getElementById('value-4').value = '';}
}
document.querySelectorAll('input[type="number"]').forEach(input => { input.addEventListener('input', calculate);});

/* Function 2 */
const apiKey = 'live_5jRg2gw73o32tb4H1Sf5wdhViKm1ryAiRZfUxYwpCKvItBfn0hNNblWsWihje8o3'; // Substitua pela sua chave de API
        const imageElement = document.getElementById('dog-image');
        const button = document.getElementById('new-dog-button');

        // Função para buscar uma imagem de cão
        function fetchDogImage() {
            fetch(`https://api.thedogapi.com/v1/images/search?api_key=${apiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao obter imagem: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    // Verifica se a resposta contém dados
                    if (data && data.length > 0) {
                        imageElement.src = data[0].url;
                    } else {
                        console.error('Nenhuma imagem encontrada.');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        }

        // Adiciona evento ao botão para buscar nova imagem
        button.addEventListener('click', fetchDogImage);

        // Busca uma imagem quando a página é carregada
        fetchDogImage();

// Get the initial image when the page loads
getImage();