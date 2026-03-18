const anadirImgButton = document.querySelector('#addImage');
const inputImg = document.querySelector('#inputImage');
const itemSection = document.querySelector('#sectionItems');
const resetButton = document.querySelector('#resetButton');


anadirImgButton.addEventListener('click',()=>{
    inputImg.click();
})

function creatItem (src){
    const imgElement = document.createElement('img');
    imgElement.draggable = true;
    imgElement.src = src;
    imgElement.className='imgItem';
    imgElement.addEventListener('dragstart',handleDragStart)
    imgElement.addEventListener('dragend',handleDragEnd)
    itemSection.appendChild(imgElement);
    return imgElement
}

function useFilesToCreateItems(files){
    if (files && files.length>0){
        Array.from(files).forEach(file=>{ // paso los files a formato array para poder usar el for each
            const reader = new FileReader()
        reader.onload = (eventReader)=>{
            creatItem(eventReader.target.result)
        }
        reader.readAsDataURL(file);
        })
    }
}

inputImg.addEventListener('change',(event)=>{
    const {files} = event.target
    useFilesToCreateItems(files)
})

let draggedElement = null;
let sourceConteiner = null;

const tiers = document.querySelectorAll('.tier')

function handleDragStart(event){
    draggedElement = event.target // que elemento esta llamando a este evento
    sourceConteiner = draggedElement.parentNode
    event.dataTransfer.setData('text/plain', draggedElement.src) //obtengo el src de la imagen
}

function handleDragEnd(event){
    console.log('drag end')
    draggedElement = null
    sourceConteiner = null
}
tiers.forEach(tier =>{
    tier.addEventListener('drop',handleDrop);
    tier.addEventListener('dragover',handleOver);
    tier.addEventListener('dragleave',handleLeave);
})

    itemSection.addEventListener('drop',handleDrop);
    itemSection.addEventListener('dragover',handleOver);
    itemSection.addEventListener('dragleave',handleLeave);

    itemSection.addEventListener('drop',handleDropFromDesktop);
    itemSection.addEventListener('dragover',handleOverFromDesktop);

function handleDropFromDesktop(event){
    event.preventDefault();
    const {currentTarget, dataTransfer} = event;
        if (dataTransfer.types.includes('Files')){
        currentTarget.classList.remove('dragFiles');
        const {files} = dataTransfer;
        useFilesToCreateItems(files)
    }
}

function handleOverFromDesktop(event){
    event,preventDefault();
    const {currentTarget, dataTransfer} = event;
    if (dataTransfer.types.includes('Files')){
        currentTarget.classList.add('dragFiles');
    }
}

function handleDrop(event){
    event.preventDefault() //obligatorio
    const {currentTarget, dataTransfer} = event
    if (sourceConteiner && draggedElement){
        sourceConteiner.removeChild(draggedElement)
    }

    if (draggedElement){
        const src = dataTransfer.getData('text/plain') //traigo el src de la imagen
        const imgElement = creatItem(src)
        currentTarget.appendChild(imgElement)
    }
    currentTarget.classList.remove('dragOver')
    currentTarget.querySelector('.preview')?.remove() //optional chaning por si no esta la clase todavia
}

function handleOver(event){
    event.preventDefault()
    const {currentTarget, dataTransfer} = event
    currentTarget.classList.add('dragOver')
    if (sourceConteiner === currentTarget){
        return
    }

    const preview = document.querySelector('.preview')

    if (draggedElement && !preview){
        const previewElement = draggedElement.cloneNode(true) // clono el elemento
        previewElement.classList.add('preview')
        currentTarget.appendChild(previewElement)
    }
}

function handleLeave(event){
    event.preventDefault()
    const {currentTarget} = event
    currentTarget.classList.remove('dragOver')
    currentTarget.querySelector('.preview')?.remove()
}

resetButton.addEventListener('click',()=>{
    const items = document.querySelectorAll('.imgItem')
    items.forEach(item =>{
        item.remove()
        itemSection.appendChild(item)
    })
})