const anadirImgButton = document.querySelector('#addImage');
const inputImg = document.querySelector('#inputImage');
const itemSection = document.querySelector('#sectionItems');

anadirImgButton.addEventListener('click',()=>{
    inputImg.click();
})

inputImg.addEventListener('change',(event)=>{
    const [file] = event.target.files;
    if (file){
        const reader = new FileReader()
        reader.onload = (eventReader)=>{
            const imgElement = document.createElement('img');
            imgElement.src = eventReader.target.result;
            imgElement.className='imgItem';
            itemSection.appendChild(imgElement)
        }
        reader.readAsDataURL(file);
    }
})