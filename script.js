const btnEl = document.getElementById('btn');
const errorMessageEl = document.getElementById('errorMessage');
const galleryEl = document.getElementById('gallery');

async function fetchImage(){
    const inputValue = document.getElementById('input').value;

    if(inputValue > 15 || inputValue < 1){
        errorMessageEl.style.display = 'block';
        errorMessageEl.innerText = 'Number should be between 0 and 15'
        return
    }

    image = "";

    try {
        btnEl.style.display = 'none';
        const loadingEl = `<img src='Spinner.svg'/>`
        galleryEl.innerHTML = loadingEl;

        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000
        )}&client_id=k5oSxKwgWQNjtlYKQouT0dNDhjX0w1wFpHuDsvfD_o0`
    ).then((res) =>
        res.json().then((data) => {
        if(data){
            data.forEach((pic) => {
                image += `
                <img src=${pic.urls.small} alt='image'>
                `
                galleryEl.style.display = 'block';
                galleryEl.innerHTML = image;
                btnEl.style.display = 'block';
                errorMessageEl.style.display = 'none';
            });
        }
        })
    );

    errorMessageEl.style.display = 'none';
    } catch (error) {
        errorMessageEl.style.display = 'block';
        errorMessageEl.innerHTML = 'An error happened while fetching, try again later.';
        btnEl.style.display = 'block';
        galleryEl.style.display = 'none';
    }
};

btnEl.addEventListener('click', fetchImage)